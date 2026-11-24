export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const MAX_TOTAL_SIZE = 25 * 1024 * 1024;
export const MAX_FILES = 5;
export const MAX_BODY_SIZE = MAX_TOTAL_SIZE + 1024 * 1024;
export const ALLOWED_EXTENSIONS = [
  "pdf",
  "dwg",
  "dxf",
  "jpg",
  "jpeg",
  "png",
  "webp",
];
export type AttachmentInfo = { name: string; size: number; type?: string };
export function fileExtension(name: string) {
  return name.split(".").pop()?.toLowerCase() || "";
}
export function validateAttachments(files: AttachmentInfo[]): string[] {
  const errors: string[] = [];
  if (files.length > MAX_FILES)
    errors.push(`Хамгийн ихдээ ${MAX_FILES} файл хавсаргана.`);
  if (files.reduce((sum, f) => sum + f.size, 0) > MAX_TOTAL_SIZE)
    errors.push("Нийт файлын хэмжээ 25 МБ-аас хэтрэхгүй байна.");
  const names = new Set<string>();
  for (const file of files) {
    if (!ALLOWED_EXTENSIONS.includes(fileExtension(file.name)))
      errors.push(`${file.name}: зөвшөөрөгдөөгүй файлын төрөл.`);
    if (file.size === 0) errors.push(`${file.name}: хоосон файл байна.`);
    if (file.size > MAX_FILE_SIZE)
      errors.push(`${file.name}: нэг файл 10 МБ-аас хэтрэхгүй байна.`);
    if (file.name.length > 200 || /[\x00-\x1f/\\]/.test(file.name))
      errors.push("Файлын нэр буруу эсвэл хэт урт байна.");
    if (names.has(file.name.toLowerCase()))
      errors.push(`${file.name}: ижил нэртэй файл давхар орсон байна.`);
    names.add(file.name.toLowerCase());
  }
  return errors;
}
export async function verifyFileSignature(file: File): Promise<boolean> {
  const bytes = new Uint8Array(await file.slice(0, 2048).arrayBuffer());
  const text = new TextDecoder().decode(bytes);
  const ext = fileExtension(file.name);
  if (ext === "pdf") return text.startsWith("%PDF-");
  if (ext === "png")
    return [137, 80, 78, 71, 13, 10, 26, 10].every((v, i) => bytes[i] === v);
  if (ext === "jpg" || ext === "jpeg")
    return bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  if (ext === "webp")
    return (
      text.startsWith("RIFF") &&
      new TextDecoder().decode(bytes.slice(8, 12)) === "WEBP"
    );
  if (ext === "dwg") return /^AC10\d{2}/.test(text);
  if (ext === "dxf")
    return (
      text.startsWith("AutoCAD Binary DXF") ||
      /(?:^|\r?\n)\s*0\s*\r?\nSECTION\s*\r?\n/.test(text)
    );
  return false;
}
export function readableSize(size: number) {
  return size < 1024 * 1024
    ? `${Math.ceil(size / 1024)} КБ`
    : `${(size / (1024 * 1024)).toFixed(1)} МБ`;
}
