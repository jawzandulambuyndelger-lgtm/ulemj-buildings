"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { projectCategories, projects } from "@/lib/data";
import { ProjectCard } from "./ui";
export function ProjectFilter({ initial = "" }: { initial?: string }) {
  const [category, setCategory] = useState(initial);
  const filtered = projects.filter((p) => !category || p.category === category);
  function select(value: string) {
    setCategory(value);
    window.history.replaceState(
      window.history.state,
      "",
      `/projects${value ? `?category=${encodeURIComponent(value)}` : ""}`,
    );
  }
  return (
    <>
      <div
        className="project-filters"
        role="group"
        aria-label="Төслийн ангилал"
      >
        {["", ...projectCategories].map((c) => (
          <button
            key={c}
            onClick={() => select(c)}
            aria-pressed={category === c}
          >
            {c || "Бүх төсөл"}
          </button>
        ))}
      </div>
      <div className="filter-results">
        <span role="status" aria-live="polite">
          {filtered.length} төсөл
        </span>
        {category && (
          <button className="reset-button" onClick={() => select("")}>
            <RotateCcw size={12} />
            Бүгдийг үзэх
          </button>
        )}
      </div>
      <div className="project-grid">
        {filtered.map((p) => (
          <ProjectCard project={p} index={projects.indexOf(p)} key={p.slug} />
        ))}
        {!filtered.length && (
          <div className="empty-state">
            <h3>Энэ ангиллын төсөл хараахан ороогүй байна.</h3>
            <p>Шинэ төслийн мэдээллийг баталгаажуулсны дараа нэмнэ.</p>
            <button className="button button-dark" onClick={() => select("")}>
              Бүх төсөл үзэх
              <RotateCcw size={14} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
