import test from "node:test";
import assert from "node:assert/strict";
import { inquirySchema, fieldErrors } from "../src/lib/validation";
import {
  MAX_FILE_SIZE,
  MAX_TOTAL_SIZE,
  validateAttachments,
  verifyFileSignature,
} from "../src/lib/files";
import { filterProducts } from "../src/lib/catalog";
const contact = {
  kind: "contact",
  name: "Тест Хэрэглэгч",
  email: "test@example.mn",
  phone: "+976 77770090",
  description: "Төслийн талаар зөвлөгөө авах хүсэлтэй байна.",
  consent: true,
  website: "",
};
test("contact and quote accept valid Mongolian contact details", () => {
  assert.equal(inquirySchema.safeParse(contact).success, true);
  assert.equal(
    inquirySchema.safeParse({ ...contact, phone: "77770090" }).success,
    true,
  );
  assert.equal(
    inquirySchema.safeParse({
      ...contact,
      kind: "quote",
      service: "Барилга угсралт",
    }).success,
    true,
  );
});
test("invalid phone, email, consent, short description and missing service are rejected", () => {
  const result = inquirySchema.safeParse({
    ...contact,
    kind: "quote",
    phone: "999",
    email: "bad-email",
    consent: false,
    description: "товч",
    service: "",
  });
  assert.equal(result.success, false);
  if (!result.success) {
    const errors = fieldErrors(result.error);
    assert.deepEqual(
      Object.keys(errors).sort(),
      ["consent", "description", "email", "phone", "service"].sort(),
    );
  }
  assert.equal(
    inquirySchema.safeParse({ ...contact, website: "spam" }).success,
    false,
  );
});
test("combined catalog filters are intersected", () => {
  assert.equal(
    filterProducts({ brand: "", type: "", material: "", application: "" })
      .length,
    6,
  );
  assert.equal(
    filterProducts({
      brand: "SCHÜCO",
      type: "Цонх, хаалга",
      material: "Хөнгөн цагаан",
      application: "Орон сууц",
    }).length,
    2,
  );
  assert.equal(
    filterProducts({
      brand: "ASTRON",
      type: "",
      material: "PVC",
      application: "",
    }).length,
    0,
  );
});
test("attachments enforce count, extension, individual/combined size and unique safe names", () => {
  const valid = { name: "drawing.pdf", size: 100, type: "application/pdf" };
  assert.deepEqual(validateAttachments([valid]), []);
  assert.ok(validateAttachments([{ ...valid, name: "run.exe" }]).length);
  assert.ok(validateAttachments([{ ...valid, size: 0 }]).length);
  assert.ok(
    validateAttachments([{ ...valid, size: MAX_FILE_SIZE + 1 }]).length,
  );
  assert.ok(
    validateAttachments([valid, { ...valid, name: "DRAWING.PDF" }]).length,
  );
  assert.ok(
    validateAttachments(
      Array.from({ length: 6 }, (_, i) => ({ ...valid, name: `${i}.pdf` })),
    ).length,
  );
  assert.ok(validateAttachments([{ ...valid, size: MAX_TOTAL_SIZE }]).length);
  assert.ok(validateAttachments([{ ...valid, name: "../drawing.pdf" }]).length);
});
test("server signature check detects renamed executables and accepts supported content", async () => {
  assert.equal(
    await verifyFileSignature(new File(["%PDF-1.7\ncontent"], "drawing.pdf")),
    true,
  );
  assert.equal(
    await verifyFileSignature(new File(["MZ executable"], "drawing.pdf")),
    false,
  );
  assert.equal(
    await verifyFileSignature(new File(["AC1032"], "drawing.dwg")),
    true,
  );
  assert.equal(
    await verifyFileSignature(
      new File(["0\nSECTION\n2\nHEADER\n"], "drawing.dxf"),
    ),
    true,
  );
  assert.equal(
    await verifyFileSignature(
      new File(
        [new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10])],
        "image.png",
      ),
    ),
    true,
  );
  assert.equal(
    await verifyFileSignature(new File(["plain text"], "image.png")),
    false,
  );
});
