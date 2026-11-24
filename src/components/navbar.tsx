"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { company, navigation } from "@/lib/data";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="ULEMJ BUILDINGS — Нүүр хуудас"
      className={`logo ${light ? "logo-light" : ""}`}
    >
      <svg viewBox="0 0 40 44" fill="none" aria-hidden="true">
        <path
          d="M3 8L19 2V40L3 34V8ZM22 2L37 8V34L22 40V2Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M9 12L13 10V31L9 29V12ZM27 10L31 12V29L27 31V10Z"
          fill="currentColor"
        />
      </svg>
      <span>
        ULEMJ<small>BUILDINGS</small>
      </span>
    </Link>
  );
}
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1025px)");
    const closeOnDesktop = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const links =
          panel.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
        const first = links?.[0],
          last = links?.[links.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          toggle.current?.focus();
        }
        if (e.shiftKey && document.activeElement === toggle.current) {
          e.preventDefault();
          last?.focus();
        }
        if (!e.shiftKey && document.activeElement === toggle.current) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Үндсэн цэс">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={active(item.href) ? "active" : ""}
              aria-current={active(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/quote" className="header-quote">
          Үнийн санал авах
          <ArrowUpRight size={15} />
        </Link>
        <button
          className="menu-toggle"
          ref={toggle}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Цэс хаах" : "Цэс нээх"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="mobile-navigation" id="mobile-navigation" ref={panel}>
          <nav aria-label="Гар утасны үндсэн цэс">
            {navigation.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active(item.href) ? "page" : undefined}
              >
                <span>0{i + 1}</span>
                {item.label}
                <ArrowUpRight size={20} />
              </Link>
            ))}
          </nav>
          <Link
            href="/quote"
            className="button button-dark"
            onClick={() => setOpen(false)}
          >
            Үнийн санал авах
            <ArrowUpRight size={18} />
          </Link>
          <a href={`tel:${company.phoneHref}`} className="mobile-phone">
            {company.phone}
          </a>
        </div>
      )}
    </header>
  );
}
