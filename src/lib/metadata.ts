import type { Metadata } from "next";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: { absolute: `${title} | ULEMJ BUILDINGS` },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ULEMJ BUILDINGS`,
      description,
      url: path,
      locale: "mn_MN",
      type: "website",
      images: [
        {
          url: "/images/hero.jpg",
          width: 2400,
          height: 1600,
          alt: "Шилэн фасадтай орчин үеийн архитектурын дүрслэлийн зураг",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero.jpg"],
    },
  };
}
