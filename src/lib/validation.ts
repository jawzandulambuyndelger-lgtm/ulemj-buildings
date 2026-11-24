import { z } from "zod";
export const contactSchema = z.object({
  kind: z.literal("contact", { error: "Хүсэлтийн төрөл буруу байна." }),
  name: z
    .string()
    .trim()
    .min(2, "Овог, нэрээ 2-оос доошгүй тэмдэгтээр оруулна уу.")
    .max(100, "Нэр 100-аас ихгүй тэмдэгт байна."),
  phone: z
    .string()
    .trim()
    .max(30, "Утасны дугаар хэт урт байна.")
    .refine(
      (v) => /^(\d{8}|\+\d{8,15})$/.test(v.replace(/[\s()-]/g, "")),
      "8 оронтой утас эсвэл + улсын кодтой дугаар оруулна уу.",
    ),
  email: z
    .email("Зөв имэйл хаяг оруулна уу.")
    .max(254, "Имэйл хаяг хэт урт байна."),
  description: z
    .string()
    .trim()
    .min(10, "10-аас доошгүй тэмдэгттэй тайлбар оруулна уу.")
    .max(5000, "Тайлбар 5000-аас ихгүй тэмдэгт байна."),
  consent: z.literal(true, {
    error: "Мэдээлэл боловсруулах нөхцөлтэй танилцаж зөвшөөрнө үү.",
  }),
  website: z.string().max(0, "Хүсэлтийг баталгаажуулж чадсангүй.").default(""),
});
export const quoteSchema = contactSchema.extend({
  kind: z.literal("quote", { error: "Хүсэлтийн төрөл буруу байна." }),
  company: z
    .string()
    .trim()
    .max(200, "Байгууллагын нэр 200-аас ихгүй тэмдэгт байна.")
    .default(""),
  service: z
    .string()
    .trim()
    .min(1, "Үйлчилгээний төрлөө сонгоно уу.")
    .max(150, "Үйлчилгээний нэр хэт урт байна."),
  product: z
    .string()
    .trim()
    .max(200, "Бүтээгдэхүүний нэр 200-аас ихгүй тэмдэгт байна.")
    .default(""),
  size: z
    .string()
    .trim()
    .max(200, "Хэмжээний мэдээлэл 200-аас ихгүй тэмдэгт байна.")
    .default(""),
  material: z
    .string()
    .trim()
    .max(200, "Материалын мэдээлэл 200-аас ихгүй тэмдэгт байна.")
    .default(""),
  color: z
    .string()
    .trim()
    .max(200, "Өнгөний мэдээлэл 200-аас ихгүй тэмдэгт байна.")
    .default(""),
});
export const inquirySchema = z.discriminatedUnion("kind", [
  contactSchema,
  quoteSchema,
]);
export type Inquiry = z.infer<typeof inquirySchema>;
export type InquiryFields = {
  kind: "quote" | "contact";
  name: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  product: string;
  description: string;
  size: string;
  material: string;
  color: string;
  consent: boolean;
  website: string;
};
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] || "form");
    if (!out[field]) out[field] = issue.message;
  }
  return out;
}
