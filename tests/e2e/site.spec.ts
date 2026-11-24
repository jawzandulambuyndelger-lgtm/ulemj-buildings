import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, readFile } from "node:fs/promises";
const routes = [
  "/",
  "/about",
  "/services",
  "/products",
  "/projects",
  "/marble",
  "/quote",
  "/contact",
  "/privacy",
  "/services/construction",
  "/services/earthworks",
  "/services/project-management",
  "/services/architecture",
  "/services/windows-doors",
  "/services/glass-facades",
  "/products/alucobond-facade",
  "/products/schueco-facade",
  "/products/schueco-windows",
  "/products/deceuninck-pvc",
  "/products/schueco-doors",
  "/products/astron-steel",
  "/projects/mms-green-building",
  "/projects/dragon-terminal",
  "/projects/toyota-munkhkhada",
  "/projects/huleg-school",
];
test("all public routes render, local links resolve and images load", async ({
  page,
  request,
}) => {
  test.setTimeout(120000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute("lang", "mn");
    await expect(page).toHaveTitle(/ULEMJ BUILDINGS/);
    await page
      .locator("img")
      .evaluateAll((imgs) =>
        imgs.forEach((i) => ((i as HTMLImageElement).loading = "eager")),
      );
    await page.waitForFunction(() =>
      [...document.images].every((i) => i.complete),
    );
    const broken = await page
      .locator("img")
      .evaluateAll((imgs) =>
        imgs
          .filter((i) => (i as HTMLImageElement).naturalWidth === 0)
          .map((i) => (i as HTMLImageElement).src),
      );
    expect(broken, route).toEqual([]);
  }
  await page.goto("/");
  const links = await page
    .locator("a[href^='/']")
    .evaluateAll((els) => [
      ...new Set(els.map((el) => el.getAttribute("href")!)),
    ]);
  for (const href of links) {
    expect((await request.get(href)).status(), href).toBe(200);
  }
  expect(errors).toEqual([]);
  expect((await request.get("/services/does-not-exist")).status()).toBe(404);
});
test("catalog filters, deep links and empty state work", async ({ page }) => {
  await page.goto("/products?brand=SCH%C3%9CCO");
  await expect(page.locator(".product-card")).toHaveCount(3);
  await page.getByLabel("Төрөл", { exact: true }).selectOption("Цонх, хаалга");
  await expect(page.locator(".product-card")).toHaveCount(2);
  await page.getByLabel("Материал", { exact: true }).selectOption("PVC");
  await expect(page.getByText("Тохирох бүтээгдэхүүн олдсонгүй.")).toBeVisible();
  await page.getByRole("button", { name: "Бүгдийг үзэх", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(6);
  await page.getByLabel("Зориулалт", { exact: true }).selectOption("Агуулах");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await expect(page).toHaveURL(/application=/);
});
test("project filters support populated and empty categories", async ({
  page,
}) => {
  await page.goto("/projects");
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page.getByRole("button", { name: "Дэд бүтэц", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card")).toContainText("Драгон");
  await page.getByRole("button", { name: "Орон сууц", exact: true }).click();
  await expect(
    page.getByText("Энэ ангиллын төсөл хараахан ороогүй байна."),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Бүх төсөл үзэх", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(4);
});
test("marble color, product preview, comparison and quote handoff work", async ({
  page,
}) => {
  await page.goto("/marble");
  await page
    .getByRole("button", { name: "Жишиг 06 өнгө сонгох", exact: true })
    .click();
  await expect(page.locator(".preview-details h3")).toHaveText("Жишиг 06");
  await expect(
    page.getByRole("img", {
      name: "Гал тогооны тавцан, Жишиг 06 өнгийн жишиг дүрслэл",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByLabel("01 — Бүтээгдэхүүний төрөл").selectOption("Угаалтуур");
  await expect(
    page.getByRole("img", {
      name: "Угаалтуур, Жишиг 06 өнгийн жишиг дүрслэл",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Хоёр өнгө харьцуулах" }).click();
  await expect(page.locator(".comparison-grid .product-preview")).toHaveCount(
    2,
  );
  await page.getByLabel("Харьцуулах өнгө сонгох").selectOption("sample-16");
  await expect(page.locator(".comparison-grid h4").last()).toHaveText(
    "Жишиг 16",
  );
  await page.getByRole("link", { name: "Энэ сонголтоор санал авах" }).click();
  await expect(page.locator("#quote-product")).toHaveValue("Угаалтуур");
  await expect(page.locator("#quote-color")).toHaveValue(/Жишиг 06/);
  await expect(page.locator("#quote-material")).toHaveValue("ULEMJ MARBLE");
  await expect(page.locator("#quote-service")).toHaveValue("ULEMJ MARBLE");
});
test("quote validates fields, rejects unsupported files, removes files and honestly downloads a draft", async ({
  page,
}) => {
  await page.goto("/quote");
  await page
    .getByRole("button", { name: "Хүсэлтээ файл болгон татах" })
    .click();
  await expect(page.locator("[aria-invalid=true]")).toHaveCount(6);
  await page.locator("#quote-name").fill("Тест Хэрэглэгч");
  await page.locator("#quote-phone").fill("+976 77770090");
  await page.locator("#quote-email").fill("test@example.mn");
  await page.locator("#quote-service").selectOption("Барилга угсралт");
  await page
    .locator("#quote-description")
    .fill("Барилгын төслийн талаар үнийн санал авах хүсэлтэй байна.");
  await page.locator("input[name=consent]").check();
  const input = page.getByLabel("Хавсралт файл сонгох");
  await input.setInputFiles({
    name: "bad.exe",
    mimeType: "application/octet-stream",
    buffer: Buffer.from("MZ"),
  });
  await expect(page.locator(".upload-errors")).toContainText("зөвшөөрөгдөөгүй");
  await input.setInputFiles({
    name: "drawing.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("%PDF-1.7\nTest"),
  });
  await expect(page.locator(".file-list")).toContainText("drawing.pdf");
  await page.getByRole("button", { name: "drawing.pdf файлыг хасах" }).click();
  await expect(page.locator(".file-list")).toHaveCount(0);
  await input.setInputFiles({
    name: "drawing.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("%PDF-1.7\nTest"),
  });
  let sent = false;
  page.on("request", (r) => {
    if (r.url().includes("/api/inquiries")) sent = true;
  });
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Хүсэлтээ файл болгон татах" })
    .click();
  const file = await download;
  expect(file.suggestedFilename()).toBe("ulemj-uniin-sanal.txt");
  const content = await readFile((await file.path())!, "utf8");
  expect(content).toContain("Тест Хэрэглэгч");
  expect(content).toContain("drawing.pdf");
  await expect(
    page.getByRole("heading", { name: "Хүсэлтийн файл бэлтгэгдлээ." }),
  ).toBeVisible();
  expect(sent).toBe(false);
  await expect(
    page.getByRole("link", { name: "Имэйл бэлтгэх" }),
  ).toHaveAttribute("href", /^mailto:info@ulemj.mn/);
});
test("unconfigured API never reports success and rejects foreign origins", async ({
  request,
}) => {
  const result = await request.post("/api/inquiries", {
    multipart: { kind: "contact" },
  });
  expect(result.status()).toBe(503);
  expect((await result.json()).code).toBe("DELIVERY_NOT_CONFIGURED");
  const foreign = await request.post("/api/inquiries", {
    headers: { Origin: "https://foreign.invalid" },
    multipart: { kind: "contact" },
  });
  expect(foreign.status()).toBe(403);
});
test("configured form exposes loading, success and retryable error states using a mocked delivery response", async ({
  page,
}) => {
  await page.goto("http://localhost:3101/contact");
  await page.locator("#contact-name").fill("Тест Хэрэглэгч");
  await page.locator("#contact-phone").fill("77770090");
  await page.locator("#contact-email").fill("test@example.mn");
  await page
    .locator("#contact-description")
    .fill("Барилгын зөвлөгөө авах хүсэлтэй байна.");
  await page.locator("input[name=consent]").check();
  let release: () => void = () => {};
  let responseStatus = 502;
  await page.route("**/api/inquiries", async (route) => {
    await new Promise<void>((resolve) => {
      release = resolve;
    });
    await route.fulfill({
      status: responseStatus,
      contentType: "application/json",
      body: JSON.stringify({ message: "Туршилтын хариу" }),
    });
  });
  await page.getByRole("button", { name: "Хүсэлт илгээх" }).click();
  await expect(
    page.getByRole("button", { name: "Илгээж байна…" }),
  ).toBeDisabled();
  await expect(page.locator("progress")).toBeVisible();
  release();
  await expect(
    page.getByRole("heading", { name: "Хүсэлт илгээгдсэнгүй." }),
  ).toBeVisible();
  responseStatus = 200;
  await page.getByRole("button", { name: "Хүсэлт илгээх" }).click();
  await expect(page.locator("progress")).toBeVisible();
  release();
  await expect(
    page.getByRole("heading", { name: "Таны хүсэлт амжилттай илгээгдлээ." }),
  ).toBeVisible();
});
test("configured API validates fields and attachment contents before any external delivery", async ({
  request,
}) => {
  const base = "http://localhost:3101/api/inquiries";
  const invalid = await request.post(base, {
    multipart: {
      kind: "contact",
      name: "A",
      email: "bad",
      phone: "1",
      description: "x",
      consent: "false",
    },
  });
  expect(invalid.status()).toBe(422);
  expect((await invalid.json()).errors.email).toBeTruthy();
  const badFile = await request.post(base, {
    multipart: {
      kind: "quote",
      name: "Тест Хэрэглэгч",
      email: "test@example.mn",
      phone: "77770090",
      service: "Барилга угсралт",
      description: "Төслийн зөвлөгөө авах хүсэлтэй байна.",
      consent: "true",
      files: {
        name: "renamed.pdf",
        mimeType: "application/pdf",
        buffer: Buffer.from("MZ executable"),
      },
    },
  });
  expect(badFile.status()).toBe(422);
  expect((await badFile.json()).errors.files).toBeTruthy();
});
test("mobile navigation, Escape, responsive layout and accessibility", async ({
  page,
}) => {
  test.setTimeout(120000);
  await mkdir("qa", { recursive: true });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/products", "/marble", "/quote", "/contact"]) {
      await page.goto(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      expect(overflow, `${route} at ${width}`).toBe(false);
      if (width === 390 || width === 1440) {
        await page.locator("img").evaluateAll((images) =>
          images.forEach((image) => {
            (image as HTMLImageElement).loading = "eager";
          }),
        );
        await page.waitForFunction(() =>
          [...document.images].every((image) => image.complete),
        );
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({
          path: `qa/${route === "/" ? "home" : route.slice(1)}-${width}.png`,
          fullPage: true,
        });
      }
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of [
    "/about",
    "/services",
    "/products/alucobond-facade",
    "/services/windows-doors",
    "/projects/dragon-terminal",
    "/privacy",
  ]) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      route,
    ).toBe(false);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Цэс нээх" }).click();
  await expect(
    page.getByRole("navigation", { name: "Гар утасны үндсэн цэс" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("navigation", { name: "Гар утасны үндсэн цэс" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Цэс нээх" }).click();
  await page
    .getByRole("navigation", { name: "Гар утасны үндсэн цэс" })
    .getByRole("link", { name: "Бүтээгдэхүүн" })
    .click();
  await expect(page).toHaveURL(/\/products$/);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  for (const route of ["/", "/products", "/marble", "/quote", "/contact"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        description: v.description,
        nodes: v.nodes.map((n) => n.target),
      })),
      route,
    ).toEqual([]);
  }
});
