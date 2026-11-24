import { ArrowDown } from "lucide-react";
import { MarbleColorSelector } from "@/components/marble-color-selector";
import {
  CTA,
  ContentNotice,
  Eyebrow,
  Photo,
  SectionHeading,
} from "@/components/ui";
import { marbleCategories, marbleClaims, marbleClaimNotice } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "ULEMJ MARBLE — Чулуун бүтээгдэхүүн",
  "Захиалгат чулуун тавцан, угаалтуур, цонхны тавцан. ULEMJ MARBLE-ийн жишиг өнгийг сонгож, бүтээгдэхүүний дүрслэл дээр харьцуулан үзээрэй.",
  "/marble",
);
export default function MarblePage() {
  return (
    <>
      <div className="container">
        <div
          className="breadcrumbs"
          style={{ paddingTop: 25, marginBottom: 25 }}
        >
          ULEMJ BUILDINGS / ULEMJ MARBLE
        </div>
      </div>
      <section className="marble-hero">
        <Photo
          src="/images/kitchen.jpg"
          alt="Чулуун тавцантай гал тогоо — хэрэглээний жишиг зураг"
          priority
          sizes="100vw"
        />
        <div className="marble-hero-copy">
          <Eyebrow light>ULEMJ MARBLE · Монголдоо үйлдвэрлэв</Eyebrow>
          <h1>
            ЧУЛУУНЫ
            <br />
            ШИНЭ ТҮВШНИЙ
            <br />
            ШИЙДЭЛ.
          </h1>
          <p>
            Орчин үеийн технологиор үйлдвэрлэсэн, олон төрлийн өнгө, загварын
            сонголттой чулуун бүтээгдэхүүн.
          </p>
          <a href="#color-selector" className="button button-light">
            Өнгөө сонгох
            <ArrowDown size={17} />
          </a>
        </div>
        <span className="photo-caption">Хэрэглээний жишиг зураг</span>
      </section>
      <section className="container" aria-label="Бүтээгдэхүүний боломж">
        <div className="marble-claims">
          {marbleClaims.map((c) => (
            <div key={c.label}>
              <strong>
                {c.value}
                <sup>*</sup>
              </strong>
              <p>{c.label}</p>
            </div>
          ))}
        </div>
        <ContentNotice>{marbleClaimNotice}</ContentNotice>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="Бүтээгдэхүүний сонголт"
          title="Орон зайд тань уусах гоо зүй."
          description="Нэг материалын олон боломж. Хэрэглээ, хэмжээ, хийцлэлд тохируулсан захиалгат шийдлүүд."
        />
        <div className="marble-category-grid">
          {marbleCategories.map((c, i) => (
            <div key={c}>
              <span>0{i + 1}</span>
              <h3>{c}</h3>
              <p>
                {
                  [
                    "Өдөр тутмын хэрэглээнд нийцсэн орон зай.",
                    "Цэвэрхэн хийцлэл, тайван өнгөний сонголт.",
                    "Тавцантайгаа зохицох нэгэн цул шийдэл.",
                    "Интерьерийн деталь бүрд анхаарна.",
                    "Таны санаа, хэрэгцээнд тохирсон хийцлэл.",
                  ][i]
                }
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="section surface selector" id="color-selector">
        <div className="container">
          <SectionHeading
            eyebrow="Материал сонгох туршлага"
            title="Өнгө бүр өөрийн мэдрэмжтэй."
            description="Бүтээгдэхүүний төрлөө сонгоод, жишиг өнгийг сольж үзээрэй. Хоёр өнгийг зэрэгцүүлэн харьцуулах боломжтой."
          />
          <MarbleColorSelector />
        </div>
      </section>
      <section className="section container editorial-grid">
        <div>
          <Eyebrow>Захиалгат үйлдвэрлэл</Eyebrow>
          <h2>
            Таны хэмжээс.
            <br />
            Таны хэв маяг.
          </h2>
        </div>
        <div className="prose">
          <p>
            Гал тогоо, угаалгын өрөө, цонхны тавцан болон захиалгат чулуун
            бүтээгдэхүүнийг орон зайн онцлогт нийцүүлэн төлөвлөх боломжтой.
          </p>
          <p>
            Захиалга өгөхдөө хэмжээс, зориулалт, өнгө болон угсралтын нөхцөлөө
            тодорхойлж ирүүлээрэй. Үйлдвэрлэх боломж, хугацаа, материалын
            сонголтыг манай багтай баталгаажуулна.
          </p>
          <p>
            Арчилгааны заавар, химийн бодис болон халуунд тэсвэрлэх үзүүлэлтийг
            албан ёсны техникийн баримт бичигтэй хамт авахыг зөвлөж байна.
          </p>
        </div>
      </section>
      <CTA />
    </>
  );
}
