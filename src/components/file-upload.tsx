"use client";
import { useRef, useState } from "react";
import { FileText, UploadCloud, X } from "lucide-react";
import {
  ALLOWED_EXTENSIONS,
  readableSize,
  validateAttachments,
} from "@/lib/files";
export function FileUpload({
  files,
  onChange,
  disabled = false,
}: {
  files: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
}) {
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const input = useRef<HTMLInputElement>(null);
  function addFiles(incoming: FileList | File[] | null) {
    if (!incoming || disabled) return;
    const combined = [...files, ...Array.from(incoming)];
    const issues = validateAttachments(combined);
    setErrors(issues);
    if (!issues.length) onChange(combined);
    if (input.current) input.current.value = "";
  }
  return (
    <div>
      <div
        className={`upload-zone ${dragActive ? "drag-active" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          addFiles(e.dataTransfer.files);
        }}
      >
        <UploadCloud size={28} strokeWidth={1} />
        <p>Зураг төсөл, файлаа энд чирж оруулах</p>
        <small>PDF, DWG, DXF, JPG, PNG, WEBP · Нэг файл 10 МБ</small>
        <small>Нийт 25 МБ хүртэл · Хамгийн ихдээ 5 файл</small>
        <label className="upload-trigger">
          Файл сонгох
          <input
            ref={input}
            type="file"
            multiple
            disabled={disabled}
            accept={ALLOWED_EXTENSIONS.map((e) => `.${e}`).join(",")}
            onChange={(e) => addFiles(e.target.files)}
            aria-label="Хавсралт файл сонгох"
          />
        </label>
      </div>
      {errors.length > 0 && (
        <ul className="upload-errors" role="alert">
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}
      {files.length > 0 && (
        <ul className="file-list" aria-label="Хавсаргасан файлууд">
          {files.map((file, i) => (
            <li key={`${file.name}-${file.lastModified}`}>
              <FileText size={20} />
              <div>
                <p>{file.name}</p>
                <small>
                  {readableSize(file.size)} · Сонгосон, хараахан илгээгээгүй
                </small>
              </div>
              <button
                type="button"
                disabled={disabled}
                aria-label={`${file.name} файлыг хасах`}
                onClick={() => {
                  onChange(files.filter((_, j) => j !== i));
                  setErrors([]);
                }}
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
