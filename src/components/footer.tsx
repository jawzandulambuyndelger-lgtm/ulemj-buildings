import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company, navigation, services } from "@/lib/data";
import { Logo } from "./navbar";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              Европ стандарт.
              <br />
              Монгол ур чадвар.
              <br />
              Цогц бүтээн байгуулалт.
            </p>
            <span className="footer-parent">ҮЛЭМЖ ХХК · 1991 ОНООС</span>
          </div>
          <div>
            <h3>Хуудас</h3>
            {navigation
              .filter((n) => n.href !== "/")
              .map((n) => (
                <Link href={n.href} key={n.href}>
                  {n.label}
                </Link>
              ))}
          </div>
          <div>
            <h3>Бидний шийдэл</h3>
            {services.slice(0, 4).map((s) => (
              <Link href={`/services/${s.slug}`} key={s.slug}>
                {s.title}
              </Link>
            ))}
            <Link href="/products">Цонх, хаалга, фасад</Link>
            <Link href="/marble">ULEMJ MARBLE</Link>
          </div>
          <div className="footer-contact">
            <h3>Холбоо барих</h3>
            <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a
              href={company.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
            >
              Facebook <ArrowUpRight size={14} />
            </a>
            <Link href="/quote" className="footer-quote">
              Төслөө ярилцъя <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} ULEMJ BUILDINGS. Бүх эрх хуулиар
            хамгаалагдсан.
          </span>
          <Link href="/privacy">Мэдээллийн нууцлал</Link>
          <span>Чанараар бүтээж, итгэлээр холбогдоно.</span>
        </div>
      </div>
    </footer>
  );
}
