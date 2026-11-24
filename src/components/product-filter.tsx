"use client";
import { useState } from "react";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "./ui";
import { filterProducts, type ProductFilters } from "@/lib/catalog";
export type { ProductFilters } from "@/lib/catalog";
const blank: ProductFilters = {
  brand: "",
  type: "",
  material: "",
  application: "",
};
export function ProductFilter({ initial }: { initial: ProductFilters }) {
  const [filters, setFilters] = useState(initial);
  function update(next: ProductFilters) {
    setFilters(next);
    const params = new URLSearchParams();
    Object.entries(next).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    window.history.replaceState(
      window.history.state,
      "",
      `/products${params.size ? `?${params}` : ""}`,
    );
  }
  const options = [
    {
      key: "brand" as const,
      label: "Брэнд",
      values: [...new Set(products.map((p) => p.brand))],
    },
    {
      key: "type" as const,
      label: "Төрөл",
      values: [...new Set(products.map((p) => p.type))],
    },
    {
      key: "material" as const,
      label: "Материал",
      values: [...new Set(products.map((p) => p.material))],
    },
    {
      key: "application" as const,
      label: "Зориулалт",
      values: [...new Set(products.flatMap((p) => p.applications))],
    },
  ];
  const visible = filterProducts(filters);
  const hasFilters = Object.values(filters).some(Boolean);
  return (
    <>
      <div className="filter-bar">
        <span className="filter-heading">
          <SlidersHorizontal size={15} />
          Бүтээгдэхүүн шүүх
        </span>
        <div className="filter-selects">
          {options.map((o) => (
            <label className="select-wrap" key={o.key}>
              <span>{o.label}</span>
              <select
                aria-label={o.label}
                value={filters[o.key]}
                onChange={(e) =>
                  update({ ...filters, [o.key]: e.target.value })
                }
              >
                <option value="">Бүгд</option>
                {o.values.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </div>
      <div className="filter-results">
        <span role="status" aria-live="polite">
          {visible.length} бүтээгдэхүүн
        </span>
        {hasFilters && (
          <button className="reset-button" onClick={() => update(blank)}>
            <RotateCcw size={12} />
            Шүүлтүүр цэвэрлэх
          </button>
        )}
      </div>
      <div className="product-grid">
        {visible.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
        {!visible.length && (
          <div className="empty-state">
            <h3>Тохирох бүтээгдэхүүн олдсонгүй.</h3>
            <p>Шүүлтүүрийн сонголтоо өөрчлөөд дахин үзээрэй.</p>
            <button
              className="button button-dark"
              onClick={() => update(blank)}
            >
              Бүгдийг үзэх
              <RotateCcw size={15} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
