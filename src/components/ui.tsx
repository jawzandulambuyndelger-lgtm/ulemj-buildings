import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Plus } from "lucide-react";
import { brands, type Product, type Project, type Service } from "@/lib/data";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "dark",
  className = "",
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light" | "outline";
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={`button button-${variant} ${className}`}>
      {children}
      {arrow && <ArrowUpRight size={17} aria-hidden="true" />}
    </Link>
  );
}
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`text-link ${className}`}>
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
export function Eyebrow({
  children,
  index,
  light = false,
}: {
  children: ReactNode;
  index?: string;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span className="tiny-square" />
      {children}
      {index && <span className="eyebrow-index">{index}</span>}
    </p>
  );
}
export function SectionHeading({
  title,
  eyebrow,
  index,
  description,
  link,
  children,
}: {
  title: string;
  eyebrow?: string;
  index?: string;
  description?: string;
  link?: { href: string; label: string };
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {link && <TextLink href={link.href}>{link.label}</TextLink>}
      {children}
    </div>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-heading container">
      <div className="breadcrumbs">
        <Link href="/">Нүүр</Link>
        <ArrowRight size={12} />
        <span>{eyebrow}</span>
      </div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="page-heading-grid">
        <h1>{title}</h1>
        <div>
          <p>{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 33vw",
  label,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  label?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} />
      {label && <span className="photo-caption">{label}</span>}
    </div>
  );
}
export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <Link href={`/services/${service.slug}`} className="service-card">
      <Photo
        src={service.image}
        alt={`${service.title} — үйлчилгээний дүрслэлийн зураг`}
      />
      <div className="service-card-content">
        <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3>{service.title}</h3>
          <p>{service.short}</p>
        </div>
        <ArrowUpRight size={20} className="card-arrow" aria-hidden="true" />
      </div>
    </Link>
  );
}
export function BrandCard({ brand }: { brand: (typeof brands)[number] }) {
  return (
    <Link
      href={`/products?brand=${encodeURIComponent(brand.name)}`}
      className="brand-card"
    >
      <div className={`brand-wordmark ${brand.className}`}>{brand.name}</div>
      <span>{brand.category}</span>
      <p>{brand.description}</p>
      <span className="brand-card-link">
        Бүтээгдэхүүн үзэх <ArrowUpRight size={15} aria-hidden="true" />
      </span>
    </Link>
  );
}
export function ProjectPlaceholder({
  project,
  index = 0,
  className = "",
}: {
  project: Project;
  index?: number;
  className?: string;
}) {
  return (
    <div
      className={`project-placeholder placeholder-${index % 4} ${className}`}
      role="img"
      aria-label={`${project.title} — төслийн бодит зураг хүлээгдэж байна`}
    >
      <svg viewBox="0 0 600 400" fill="none" aria-hidden="true">
        <defs>
          <pattern
            id={`grid-${project.slug}-${index}`}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M24 0H0V24"
              stroke="currentColor"
              strokeWidth=".35"
              opacity=".22"
            />
          </pattern>
        </defs>
        <rect
          width="600"
          height="400"
          fill={`url(#grid-${project.slug}-${index})`}
        />
        <g stroke="currentColor" strokeWidth=".8" opacity=".5">
          <path d="M60 312H540M100 336H500M148 312V127L313 60L449 142V312M148 127L313 192L449 142M313 192V312M181 141V312M214 154V312M247 167V312M280 180V312M345 180V312M379 168V312M414 156V312M148 220L313 262L449 230M148 174L313 228L449 185M313 60V192M181 113L345 179M215 99L379 167M249 86L414 155" />
          <path
            d="M115 127V312M108 127H122M108 312H122M148 355H449M148 348V362M449 348V362"
            strokeDasharray="3 4"
          />
        </g>
      </svg>
      <span className="placeholder-number">0{index + 1}</span>
      <span className="placeholder-label">
        <Plus size={12} />
        Төслийн зураг хүлээгдэж байна
      </span>
    </div>
  );
}
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <Link href={`/projects/${project.slug}`} className="project-card">
      {project.gallery[0] ? (
        <Photo src={project.gallery[0].src} alt={project.gallery[0].alt} />
      ) : (
        <ProjectPlaceholder project={project} index={index} />
      )}
      <div className="project-card-meta">
        <span>{project.category}</span>
        <ArrowUpRight size={20} aria-hidden="true" />
      </div>
      <h3>{project.title}</h3>
      <p>Төслийн дэлгэрэнгүй үзэх</p>
    </Link>
  );
}
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="product-card">
      <Photo
        src={product.image}
        alt={`${product.name} — материалын хэрэглээний жишиг зураг`}
        label="Хэрэглээний жишиг зураг"
      />
      <div className="product-card-body">
        <div className="product-card-meta">
          <span>{product.brand}</span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </div>
        <h3>{product.name}</h3>
        <p>
          {product.type} <span> / </span> {product.material}
        </p>
      </div>
    </Link>
  );
}
export function CTA() {
  return (
    <section className="cta">
      <div className="container cta-inner">
        <div>
          <Eyebrow light>Хамтдаа бүтээцгээе</Eyebrow>
          <h2>
            Таны дараагийн бүтээн
            <br className="desktop-break" /> байгуулалт эндээс эхэлнэ.
          </h2>
        </div>
        <ButtonLink href="/quote" variant="light">
          Үнийн санал авах
        </ButtonLink>
      </div>
    </section>
  );
}
export function ContentNotice({ children }: { children: ReactNode }) {
  return (
    <p className="content-notice">
      <span aria-hidden="true">*</span>
      {children}
    </p>
  );
}
