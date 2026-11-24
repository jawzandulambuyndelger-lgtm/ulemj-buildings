"use client";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { type Project } from "@/lib/data";
import { Photo, ProjectPlaceholder } from "./ui";
export function ProjectGallery({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  if (!project.gallery.length)
    return (
      <div className="project-detail-visual">
        <ProjectPlaceholder project={project} index={index} />
      </div>
    );
  const current = project.gallery[active];
  return (
    <>
      <div className="gallery-grid project-detail-visual">
        {project.gallery.map((item, i) => (
          <button
            key={item.src}
            onClick={() => {
              setActive(i);
              dialog.current?.showModal();
            }}
            aria-label={`${item.alt} — томруулж харах`}
          >
            <Photo src={item.src} alt={item.alt} />
          </button>
        ))}
      </div>
      <dialog
        className="gallery-dialog"
        ref={dialog}
        aria-label={`${project.title} — зургийн цомог`}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight")
            setActive((a) => (a + 1) % project.gallery.length);
          if (e.key === "ArrowLeft")
            setActive(
              (a) => (a - 1 + project.gallery.length) % project.gallery.length,
            );
        }}
      >
        <div className="dialog-toolbar">
          <span>{project.title}</span>
          <button
            onClick={() => dialog.current?.close()}
            aria-label="Зураг хаах"
          >
            <X size={22} />
          </button>
        </div>
        <Photo src={current.src} alt={current.alt} sizes="95vw" />
        <div className="dialog-navigation">
          <button
            onClick={() =>
              setActive(
                (a) =>
                  (a - 1 + project.gallery.length) % project.gallery.length,
              )
            }
            aria-label="Өмнөх зураг"
          >
            <ArrowLeft size={18} />
            Өмнөх
          </button>
          <span aria-live="polite">
            {active + 1} / {project.gallery.length}
          </span>
          <button
            onClick={() => setActive((a) => (a + 1) % project.gallery.length)}
            aria-label="Дараах зураг"
          >
            Дараах
            <ArrowRight size={18} />
          </button>
        </div>
      </dialog>
    </>
  );
}
