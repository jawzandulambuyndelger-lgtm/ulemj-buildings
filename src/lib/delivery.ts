import "server-only";
import { type Inquiry } from "./validation";
export function deliveryEnabled() {
  if (
    process.env.INQUIRY_DELIVERY_ENABLED !== "true" ||
    !process.env.INQUIRY_WEBHOOK_URL
  )
    return false;
  try {
    return new URL(process.env.INQUIRY_WEBHOOK_URL).protocol === "https:";
  } catch {
    return false;
  }
}
export interface InquiryRepository {
  submit(
    inquiry: Inquiry,
    files: File[],
    idempotencyKey: string,
  ): Promise<void>;
}
// Replace this adapter with a database/Firebase implementation while keeping the form/API contract.
export const webhookRepository: InquiryRepository = {
  async submit(inquiry, files, idempotencyKey) {
    if (!deliveryEnabled()) throw new Error("DELIVERY_NOT_CONFIGURED");
    const body = new FormData();
    body.set(
      "inquiry",
      JSON.stringify({ ...inquiry, submittedAt: new Date().toISOString() }),
    );
    files.forEach((file) => body.append("files", file, file.name));
    const headers: Record<string, string> = {
      "Idempotency-Key": idempotencyKey,
    };
    if (process.env.INQUIRY_WEBHOOK_TOKEN)
      headers.Authorization = `Bearer ${process.env.INQUIRY_WEBHOOK_TOKEN}`;
    try {
      const response = await fetch(process.env.INQUIRY_WEBHOOK_URL!, {
        method: "POST",
        headers,
        body,
        signal: AbortSignal.timeout(25000),
        redirect: "error",
      });
      if (!response.ok) throw new Error("DELIVERY_FAILED");
    } catch {
      throw new Error("DELIVERY_FAILED");
    }
  },
};
