import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { siteUrl } from "@/lib/metadata";
import "./globals.css";
const manrope = localFont({
  src: "../../public/fonts/Manrope.ttf",
  display: "swap",
  variable: "--font-manrope",
  weight: "200 800",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ULEMJ BUILDINGS — Бүтээн байгуулалтын шинэ стандарт",
    template: "%s | ULEMJ BUILDINGS",
  },
  description:
    "Европын технологи, Монгол ур чадварт тулгуурласан барилга угсралт, үйлдвэрлэл, цонх хаалга, шилэн фасад болон ULEMJ MARBLE цогц шийдэл.",
  applicationName: "ULEMJ BUILDINGS",
  icons: { icon: "/icon.svg" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#252525",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn">
      <body className={manrope.variable}>
        <a className="skip-link" href="#main-content">
          Үндсэн агуулга руу шилжих
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
