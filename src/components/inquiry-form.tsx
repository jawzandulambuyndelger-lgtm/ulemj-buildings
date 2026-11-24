"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, Download, Loader2 } from "lucide-react";
import { company, marbleCategories, products, services } from "@/lib/data";
import {
  fieldErrors,
  inquirySchema,
  type InquiryFields,
} from "@/lib/validation";
import { validateAttachments } from "@/lib/files";
import { FileUpload } from "./file-upload";
export type InitialInquiry = Partial<
  Pick<
    InquiryFields,
    "service" | "product" | "material" | "color" | "description"
  >
>;
type Status = "idle" | "loading" | "draft" | "success" | "error";
const serviceOptions = [
  ...services.map((s) => s.title),
  "ULEMJ MARBLE",
  "Бүтээгдэхүүний зөвлөгөө",
];
export function InquiryForm({
  kind,
  enabled,
  initial = {},
}: {
  kind: "quote" | "contact";
  enabled: boolean;
  initial?: InitialInquiry;
}) {
  const [fields, setFields] = useState<InquiryFields>({
    kind,
    name: "",
    company: "",
    phone: "",
    email: "",
    service: "",
    product: "",
    description: "",
    size: "",
    material: "",
    color: "",
    consent: false,
    website: "",
    ...initial,
  });
  const [files, setFiles] = useState<File[]>([]),
    [errors, setErrors] = useState<Record<string, string>>({}),
    [status, setStatus] = useState<Status>("idle"),
    [message, setMessage] = useState(""),
    [progress, setProgress] = useState(0);
  const formRef = useRef<HTMLFormElement>(null),
    statusRef = useRef<HTMLDivElement>(null);
  const [requestKey, setRequestKey] = useState<string | null>(null);
  const isQuote = kind === "quote",
    busy = status === "loading";
  function change(name: keyof InquiryFields, value: string | boolean) {
    setFields((f) => ({ ...f, [name]: value }));
    setErrors((e) => {
      const next = { ...e };
      delete next[name];
      return next;
    });
    if (status !== "idle") setStatus("idle");
    setRequestKey(null);
  }
  function validate() {
    const result = inquirySchema.safeParse(fields);
    const nextErrors = result.success ? {} : fieldErrors(result.error);
    const fileErrors = validateAttachments(files);
    if (fileErrors.length) nextErrors.files = fileErrors.join(" ");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() =>
        formRef.current
          ?.querySelector<HTMLElement>("[aria-invalid=true]")
          ?.focus(),
      );
      return false;
    }
    return result.success;
  }
  const labels: Record<string, string> = {
    name: "Овог, нэр",
    company: "Байгууллага",
    phone: "Утас",
    email: "Имэйл",
    service: "Үйлчилгээ",
    product: "Бүтээгдэхүүн",
    size: "Хэмжээ",
    material: "Материал",
    color: "Өнгө",
    description: "Тайлбар",
  };
  function draftText() {
    return [
      `ULEMJ BUILDINGS — ${isQuote ? "Үнийн саналын хүсэлт" : "Холбоо барих зурвас"}`,
      "Энэ хүсэлтийг компанид хараахан илгээгээгүй.",
      "",
      ...Object.entries(labels)
        .filter(([key]) => fields[key as keyof InquiryFields])
        .map(
          ([key, label]) => `${label}: ${fields[key as keyof InquiryFields]}`,
        ),
      "",
      `Хавсралт: ${files.length ? files.map((f) => f.name).join(", ") : "байхгүй"}`,
      "Файлуудаа имэйлд тусад нь хавсаргана уу.",
      `Хүлээн авагч: ${company.email}`,
    ].join("\n");
  }
  function downloadDraft() {
    const blob = new Blob(["\uFEFF", draftText()], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isQuote ? "ulemj-uniin-sanal.txt" : "ulemj-zurvas.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function showStatus(next: Status, text = "") {
    setStatus(next);
    setMessage(text);
    requestAnimationFrame(() => statusRef.current?.focus());
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || busy) return;
    if (!enabled) {
      downloadDraft();
      showStatus("draft");
      return;
    }
    setStatus("loading");
    setProgress(0);
    const body = new FormData();
    Object.entries(fields).forEach(([k, v]) => body.set(k, String(v)));
    files.forEach((f) => body.append("files", f, f.name));
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/inquiries");
    xhr.timeout = 35000;
    const submissionKey = requestKey || crypto.randomUUID();
    setRequestKey(submissionKey);
    xhr.setRequestHeader("Idempotency-Key", submissionKey);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable)
        setProgress(Math.round((event.loaded / event.total) * 100));
    };
    xhr.onload = () => {
      let result: { message?: string; errors?: Record<string, string> } = {};
      try {
        result = JSON.parse(xhr.responseText);
      } catch {}
      if (xhr.status >= 200 && xhr.status < 300) {
        showStatus("success");
        setFiles([]);
        setRequestKey(null);
      } else {
        if (result.errors) setErrors(result.errors);
        showStatus(
          "error",
          result.message || "Хүсэлт илгээхэд алдаа гарлаа. Дахин оролдоно уу.",
        );
      }
    };
    xhr.onerror = () =>
      showStatus(
        "error",
        "Сүлжээний алдаа гарлаа. Холболтоо шалгаад дахин оролдоно уу.",
      );
    xhr.ontimeout = () =>
      showStatus(
        "error",
        "Хариу хүлээх хугацаа дууслаа. Имэйлээр эсвэл утсаар холбогдоно уу.",
      );
    xhr.send(body);
  }
  function field(
    name: keyof InquiryFields,
    label: string,
    options: {
      type?: string;
      required?: boolean;
      full?: boolean;
      placeholder?: string;
      textarea?: boolean;
      list?: string;
      autoComplete?: string;
    } = {},
  ) {
    const id = `${kind}-${name}`,
      error = errors[name];
    const shared = {
      id,
      name,
      value: String(fields[name]),
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => change(name, e.target.value),
      "aria-invalid": !!error,
      "aria-describedby": error ? `${id}-error` : undefined,
      required: options.required,
      disabled: busy || status === "success",
      placeholder: options.placeholder,
      maxLength: name === "description" ? 5000 : name === "name" ? 100 : 200,
    };
    return (
      <div className={`field ${options.full ? "full" : ""}`}>
        <label htmlFor={id}>
          {label}
          {options.required && <span>*</span>}
        </label>
        {options.textarea ? (
          <textarea {...shared} rows={5} />
        ) : (
          <input
            {...shared}
            type={options.type || "text"}
            list={options.list}
            autoComplete={options.autoComplete}
          />
        )}{" "}
        {error && (
          <p className="field-error" id={`${id}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
  return (
    <form
      className={`inquiry-form ${!isQuote ? "contact-form" : ""}`}
      noValidate
      onSubmit={submit}
      ref={formRef}
      aria-busy={busy}
    >
      {!enabled && (
        <div className="integration-notice">
          <strong>Хүсэлтээ бэлтгээд, имэйлээр илгээгээрэй.</strong>Цахим
          илгээлтийн үйлчилгээ хараахан холбогдоогүй байна. Маягтыг бөглөн
          хүсэлтээ файл болгон татаж, {company.email} хаягт хавсралтуудын хамт
          илгээх боломжтой. Энд бөглөсөн мэдээлэл автоматаар компанид очихгүй.
        </div>
      )}
      <fieldset>
        <legend>
          {isQuote
            ? "01 — Холбоо барих мэдээлэл"
            : "Бидэнд зурвас үлдээгээрэй."}
        </legend>
        <div className="form-grid">
          {field("name", "Овог, нэр", {
            required: true,
            autoComplete: "name",
            placeholder: "Таны нэр",
          })}
          {isQuote &&
            field("company", "Байгууллагын нэр", {
              autoComplete: "organization",
              placeholder: "Байгууллагын нэр",
            })}
          {field("phone", "Утасны дугаар", {
            type: "tel",
            required: true,
            autoComplete: "tel",
            placeholder: "+976 99999999",
          })}
          {field("email", "Имэйл", {
            type: "email",
            required: true,
            autoComplete: "email",
            placeholder: "name@company.mn",
          })}
        </div>
      </fieldset>
      {isQuote && (
        <fieldset>
          <legend>02 — Төслийн мэдээлэл</legend>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="quote-service">
                Үйлчилгээний төрөл <span>*</span>
              </label>
              <select
                id="quote-service"
                name="service"
                value={fields.service}
                onChange={(e) => change("service", e.target.value)}
                required
                disabled={busy || status === "success"}
                aria-invalid={!!errors.service}
                aria-describedby={
                  errors.service ? "quote-service-error" : undefined
                }
              >
                <option value="">Сонгоно уу</option>
                {serviceOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              {errors.service && (
                <p className="field-error" id="quote-service-error">
                  {errors.service}
                </p>
              )}
            </div>
            {field("product", "Бүтээгдэхүүний төрөл", {
              list: "product-options",
              placeholder: "Сонгох эсвэл бичих",
            })}
            {field("size", "Хэмжээ", { placeholder: "Жишээ: урт × өргөн, м²" })}
            {field("material", "Материалын сонголт", {
              placeholder: "Материал эсвэл системийн нэр",
            })}
            {field("color", "Өнгөний сонголт", {
              full: true,
              placeholder: "Өнгөний нэр, код эсвэл жишиг сонголт",
            })}
          </div>
          <datalist id="product-options">
            {[...products.map((p) => p.name), ...marbleCategories].map(
              (name) => (
                <option key={name} value={name} />
              ),
            )}
          </datalist>
        </fieldset>
      )}
      <fieldset>
        {isQuote && <legend>03 — Дэлгэрэнгүй ба хавсралт</legend>}
        <div className="form-grid">
          {field("description", isQuote ? "Төслийн тайлбар" : "Зурвас", {
            required: true,
            full: true,
            textarea: true,
            placeholder: isQuote
              ? "Төслийн зорилго, байршил, хэрэгцээ, төлөвлөж буй ажлын талаар бичнэ үү."
              : "Таны асуулт, санал хүсэлт…",
          })}
        </div>
        {isQuote && (
          <div style={{ marginTop: 25 }}>
            <FileUpload
              files={files}
              onChange={(next) => {
                setFiles(next);
                setStatus("idle");
                setRequestKey(null);
              }}
              disabled={busy || status === "success"}
            />
            {errors.files && (
              <p className="field-error" role="alert">
                {errors.files}
              </p>
            )}
          </div>
        )}
      </fieldset>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${kind}-website`}>Вэбсайт</label>
        <input
          id={`${kind}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={(e) => change("website", e.target.value)}
        />
      </div>
      <label className="consent-field">
        <input
          type="checkbox"
          name="consent"
          checked={fields.consent}
          onChange={(e) => change("consent", e.target.checked)}
          disabled={busy || status === "success"}
          aria-invalid={!!errors.consent}
          aria-describedby={
            errors.consent ? `${kind}-consent-error` : undefined
          }
        />
        <span>
          Миний оруулсан мэдээллийг хүсэлтийн дагуу холбоо барих зорилгоор
          боловсруулахыг зөвшөөрч,{" "}
          <Link href="/privacy">мэдээллийн нууцлалын нөхцөлтэй</Link> танилцлаа.
        </span>
      </label>
      {errors.consent && (
        <p className="field-error" id={`${kind}-consent-error`}>
          {errors.consent}
        </p>
      )}
      {busy && (
        <div className="upload-progress">
          <label htmlFor="request-progress">
            {progress === 100
              ? "Хүсэлтийн хариу хүлээж байна…"
              : "Хүсэлт, файлуудыг дамжуулж байна…"}
            <span>{progress}%</span>
          </label>
          <progress id="request-progress" max={100} value={progress} />
        </div>
      )}
      {status !== "success" && (
        <div className="form-actions">
          <button type="submit" className="button button-dark" disabled={busy}>
            {busy ? (
              <>
                Илгээж байна…
                <Loader2 size={17} className="spin" />
              </>
            ) : enabled ? (
              <>
                Хүсэлт илгээх
                <ArrowUpRight size={17} />
              </>
            ) : (
              <>
                Хүсэлтээ файл болгон татах
                <Download size={17} />
              </>
            )}
          </button>
          <a href={`tel:${company.phoneHref}`}>Утсаар холбогдох</a>
        </div>
      )}
      {(status === "draft" || status === "success" || status === "error") && (
        <div
          ref={statusRef}
          tabIndex={-1}
          className={`form-status ${status === "error" ? "error" : ""}`}
          role={status === "error" ? "alert" : "status"}
        >
          {status === "draft" && (
            <>
              <h3>Хүсэлтийн файл бэлтгэгдлээ.</h3>
              <p>
                Хүсэлтийг компанид хараахан илгээгээгүй. Татсан файл болон{" "}
                {files.length ? `${files.length} хавсралтаа` : "төслийн зургаа"}{" "}
                имэйлд хавсарган илгээнэ үү. Имэйлийн холбоос нь зөвхөн таны
                имэйл программыг нээнэ.
              </p>
              <a
                className="button button-dark"
                href={`mailto:${company.email}?subject=${encodeURIComponent(isQuote ? "Үнийн саналын хүсэлт — ULEMJ BUILDINGS" : "Холбоо барих — ULEMJ BUILDINGS")}&body=${encodeURIComponent(draftText())}`}
              >
                Имэйл бэлтгэх
                <ArrowUpRight size={15} />
              </a>
            </>
          )}
          {status === "success" && (
            <>
              <CheckCircle2 size={24} />
              <h3 style={{ marginTop: 12 }}>
                Таны хүсэлт амжилттай илгээгдлээ.
              </h3>
              <p>Манай баг тантай холбогдох болно.</p>
            </>
          )}
          {status === "error" && (
            <>
              <h3>Хүсэлт илгээгдсэнгүй.</h3>
              <p>{message}</p>
              <button
                type="button"
                className="text-link"
                onClick={downloadDraft}
                style={{ marginTop: 15, background: "transparent" }}
              >
                Хүсэлтээ файл болгон хадгалах
                <Download size={14} />
              </button>
            </>
          )}
        </div>
      )}
    </form>
  );
}
