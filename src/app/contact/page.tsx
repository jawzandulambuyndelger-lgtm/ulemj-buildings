import { ArrowUpRight, MapPin } from "lucide-react";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHeading } from "@/components/ui";
import { company } from "@/lib/data";
import { deliveryEnabled } from "@/lib/delivery";
import { pageMetadata } from "@/lib/metadata";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "Холбоо барих",
  "Үлэмж Билдингстэй холбогдох: +976 77770090, info@ulemj.mn. Барилга, үйлдвэрлэлийн төслийн талаар ярилцъя.",
  "/contact",
);
export default function ContactPage() {
  return (
    <>
      <PageHeading
        eyebrow="Холбоо барих"
        title={"Хамтын бүтээн\nбайгуулалт эндээс."}
        description="Асуулт, санаа эсвэл шинэ төслийн талаар ярилцахыг хүсвэл бидэнтэй холбогдоорой."
      />
      <section className="container contact-grid">
        <div className="contact-info">
          <h2>Бид тантай ярилцахад бэлэн.</h2>
          <div className="contact-method">
            <span>УТАСНЫ ДУГААР</span>
            <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
          </div>
          <div className="contact-method">
            <span>ИМЭЙЛ ХАЯГ</span>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>
          <div className="contact-method">
            <span>НИЙГМИЙН СҮЛЖЭЭ</span>
            <a
              className="social-contact"
              href={company.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook / ULEMJ LLC
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="contact-method">
            <span>АЖЛЫН ЦАГ</span>
            <p>
              {company.businessHours || "Цагийн хуваарийг утсаар лавлана уу."}
            </p>
          </div>
          <div className="contact-method" style={{ gridColumn: "1 / -1" }}>
            <span>ХАЯГ, БАЙРШИЛ</span>
            <p>
              {company.address ||
                "Баталгаажсан дэлгэрэнгүй хаягийг удахгүй оруулна. Ирэхээсээ өмнө утсаар холбогдоно уу."}
            </p>
          </div>
        </div>
        <InquiryForm kind="contact" enabled={deliveryEnabled()} />
      </section>
      <section className="container map-section" aria-label="Байршлын мэдээлэл">
        <div className="map-placeholder">
          <div>
            <MapPin size={28} strokeWidth={1} />
            <h3>Байршлаа баталгаажуулж байна.</h3>
            <p>
              Баталгаатай хаяг оруулсны дараа газрын зураг дээрх цэгийг нэмнэ.
              Одоогоор утсаар холбогдож, ирэх чиглэлээ лавлана уу.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=ULEMJ+LLC+Mongolia"
              target="_blank"
              rel="noopener noreferrer"
            >
              Газрын зурагт нэрээр хайх ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
