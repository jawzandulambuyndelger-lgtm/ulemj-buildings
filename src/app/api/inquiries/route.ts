import { NextResponse } from "next/server";
import { deliveryEnabled, webhookRepository } from "@/lib/delivery";
import { inquirySchema, fieldErrors } from "@/lib/validation";
import {
  MAX_BODY_SIZE,
  validateAttachments,
  verifyFileSignature,
} from "@/lib/files";
export const runtime = "nodejs";
const attempts = new Map<string, { count: number; reset: number }>();
function json(data: unknown, status: number) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}
async function boundedFormData(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("EMPTY_BODY");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_SIZE) {
        await reader.cancel();
        throw new Error("BODY_TOO_LARGE");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return new Response(bytes, {
    headers: { "Content-Type": request.headers.get("content-type") || "" },
  }).formData();
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return json(
      { message: "Хүсэлтийн эх сурвалжийг баталгаажуулж чадсангүй." },
      403,
    );
  if (!deliveryEnabled())
    return json(
      {
        code: "DELIVERY_NOT_CONFIGURED",
        message:
          "Цахим илгээлтийн үйлчилгээ холбогдоогүй байна. Хүсэлтээ файл болгон татаж, info@ulemj.mn хаягт илгээнэ үү.",
      },
      503,
    );
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data"))
    return json({ message: "Хүсэлтийн формат буруу байна." }, 415);
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_SIZE)
    return json({ message: "Хүсэлтийн хэмжээ хэтэрсэн байна." }, 413);
  // A bounded, best-effort per-process limit. Add platform/WAF rate limits in production.
  const now = Date.now();
  for (const [key, entry] of attempts) {
    if (entry.reset < now) attempts.delete(key);
  }
  const key =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const record = attempts.get(key) || { count: 0, reset: now + 600000 };
  if (record.count >= 5 || (!attempts.has(key) && attempts.size >= 10000))
    return json(
      {
        message:
          "Олон хүсэлт илгээсэн байна. Хэсэг хугацааны дараа дахин оролдоно уу.",
      },
      429,
    );
  record.count++;
  attempts.set(key, record);
  try {
    const form = await boundedFormData(request);
    const raw: Record<string, unknown> = {};
    for (const name of [
      "kind",
      "name",
      "company",
      "phone",
      "email",
      "service",
      "product",
      "description",
      "size",
      "material",
      "color",
      "website",
    ]) {
      const value = form.get(name);
      raw[name] = typeof value === "string" ? value : "";
    }
    raw.consent = form.get("consent") === "true";
    const result = inquirySchema.safeParse(raw);
    if (!result.success)
      return json(
        {
          message: "Мэдээллээ шалгаад дахин оролдоно уу.",
          errors: fieldErrors(result.error),
        },
        422,
      );
    const entries = form.getAll("files");
    if (entries.some((f) => !(f instanceof File)))
      return json({ message: "Хавсралтын формат буруу байна." }, 422);
    const files = entries as File[];
    const issues = validateAttachments(files);
    if (issues.length)
      return json(
        { message: issues.join(" "), errors: { files: issues.join(" ") } },
        422,
      );
    if (result.data.kind === "contact" && files.length)
      return json(
        {
          message:
            "Зурваст файл хавсаргах боломжгүй. Үнийн саналын маягтыг ашиглана уу.",
        },
        422,
      );
    for (const file of files) {
      if (!(await verifyFileSignature(file)))
        return json(
          {
            message: `${file.name}: файлын агуулга төрөлтэйгээ тохирохгүй байна.`,
            errors: { files: "Файлын төрлөө шалгана уу." },
          },
          422,
        );
    }
    const suppliedKey = request.headers.get("idempotency-key") || "";
    const idempotencyKey = /^[a-zA-Z0-9-]{16,80}$/.test(suppliedKey)
      ? suppliedKey
      : crypto.randomUUID();
    await webhookRepository.submit(result.data, files, idempotencyKey);
    return json(
      {
        message:
          "Таны хүсэлт амжилттай илгээгдлээ. Манай баг тантай холбогдох болно.",
      },
      200,
    );
  } catch (error) {
    const reason = error instanceof Error ? error.message : "";
    if (reason === "BODY_TOO_LARGE")
      return json(
        { message: "Хүсэлт болон файлын нийт хэмжээ хэтэрсэн байна." },
        413,
      );
    if (
      reason === "DELIVERY_FAILED" ||
      (error instanceof Error && error.name === "TimeoutError")
    )
      return json(
        {
          message:
            "Хүсэлт хүлээн авах үйлчилгээ түр боломжгүй байна. Дахин оролдоно уу эсвэл имэйлээр холбогдоно уу.",
        },
        502,
      );
    return json(
      {
        message:
          "Хүсэлтийг боловсруулж чадсангүй. Мэдээлэл, файлаа шалгаад дахин оролдоно уу.",
      },
      400,
    );
  }
}
