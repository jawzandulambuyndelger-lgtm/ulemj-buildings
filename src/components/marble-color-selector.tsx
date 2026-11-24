"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Columns2, X } from "lucide-react";
import Link from "next/link";
import { marbleCategories, marbleColors } from "@/lib/data";
import { ProductPreview, StoneTexture } from "./product-preview";
import { ContentNotice } from "./ui";
export function MarbleColorSelector() {
  const [selected, setSelected] = useState(marbleColors[0]);
  const [productType, setProductType] = useState(marbleCategories[0]);
  const [family, setFamily] = useState("");
  const [comparing, setComparing] = useState(false);
  const [compareId, setCompareId] = useState(marbleColors[4].id);
  const comparison =
    marbleColors.find((c) => c.id === compareId) || marbleColors[4];
  const visible = marbleColors.filter((c) => !family || c.family === family);
  const quote = new URLSearchParams({
    product: productType,
    material: "ULEMJ MARBLE",
    color: `${selected.name} (жишиг өнгө, ${selected.hex})`,
  });
  function selectColor(id: string) {
    const next = marbleColors.find((c) => c.id === id)!;
    if (next.id === compareId) setCompareId(selected.id);
    setSelected(next);
  }
  return (
    <div>
      <div className="selector-layout">
        <div>
          <ProductPreview color={selected} productType={productType} />
          <div className="preview-details" aria-live="polite">
            <div>
              <h3>{selected.name}</h3>
              <p>{productType}</p>
            </div>
            <span>Жишиг өнгө</span>
          </div>
          {comparing && (
            <div
              className="comparison-grid"
              aria-label="Хоёр өнгөний харьцуулалт"
            >
              <div>
                <ProductPreview color={selected} productType={productType} />
                <h4>{selected.name}</h4>
                <p>Одоогийн сонголт</p>
              </div>
              <div>
                <ProductPreview color={comparison} productType={productType} />
                <h4>{comparison.name}</h4>
                <p>Харьцуулах өнгө</p>
              </div>
            </div>
          )}
          <p className="selector-finish">
            Дэлгэцийн тохиргоо, гэрэлтүүлгээс хамаарч өнгө өөр харагдаж болно.
            Эцсийн сонголтоо бодит материалын дээжээр баталгаажуулна.
          </p>
        </div>
        <div className="selector-controls">
          <h3>Өөрийн өнгийг олоорой.</h3>
          <label className="selector-label" htmlFor="marble-product">
            01 — Бүтээгдэхүүний төрөл
          </label>
          <select
            id="marble-product"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
          >
            {marbleCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <div className="selector-label">
            02 — Өнгөний сонголт<span>{marbleColors.length} жишиг өнгө</span>
          </div>
          <div
            className="color-filters"
            role="group"
            aria-label="Өнгөний бүлэг"
          >
            {["", "Цайвар", "Дулаан", "Бараан"].map((f) => (
              <button
                key={f}
                onClick={() => setFamily(f)}
                aria-pressed={family === f}
              >
                {f || "Бүгд"}
              </button>
            ))}
          </div>
          <div className="swatch-grid">
            {visible.map((c) => (
              <button
                className="color-swatch"
                key={c.id}
                onClick={() => selectColor(c.id)}
                aria-pressed={c.id === selected.id}
                aria-label={`${c.name} өнгө сонгох`}
              >
                <span style={{ backgroundColor: c.hex }}>
                  <StoneTexture color={c} />
                  {c.id === selected.id && (
                    <span className="swatch-check">
                      <Check size={12} />
                    </span>
                  )}
                </span>
                <small>{c.name}</small>
              </button>
            ))}
          </div>
          <button
            className="comparison-toggle"
            onClick={() => setComparing(!comparing)}
            aria-expanded={comparing}
            aria-controls="comparison-controls"
          >
            {comparing ? <X size={15} /> : <Columns2 size={15} />}Хоёр өнгө
            харьцуулах
          </button>
          {comparing && (
            <div id="comparison-controls" className="comparison-controls">
              <label htmlFor="compare-color">Харьцуулах өнгө сонгох</label>
              <select
                id="compare-color"
                value={compareId}
                onChange={(e) => setCompareId(e.target.value)}
              >
                {marbleColors
                  .filter((c) => c.id !== selected.id)
                  .map((c) => (
                    <option value={c.id} key={c.id}>
                      {c.name} · {c.family}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <Link href={`/quote?${quote}`} className="button button-dark">
            Энэ сонголтоор санал авах
            <ArrowUpRight size={17} />
          </Link>
          <ContentNotice>
            Эдгээр нь интерфэйсийн жишиг өнгө бөгөөд албан ёсны бүтээгдэхүүний
            нэр, каталог биш. Компанийн бодит өнгөний каталогоор солино.
          </ContentNotice>
        </div>
      </div>
    </div>
  );
}
