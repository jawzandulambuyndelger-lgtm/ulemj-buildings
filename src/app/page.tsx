import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, MoveUpRight, Plus } from "lucide-react";
import {
  BrandCard,
  ButtonLink,
  CTA,
  ContentNotice,
  Eyebrow,
  Photo,
  ProjectCard,
  SectionHeading,
  ServiceCard,
  TextLink,
} from "@/components/ui";
import {
  brands,
  marbleClaims,
  marbleClaimNotice,
  marbleColors,
  process,
  projects,
  services,
} from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Бүтээн байгуулалтын шинэ стандарт",
  "Европ стандарт, Монгол ур чадвар, цогц бүтээн байгуулалт. Үлэмж Билдингсийн барилга угсралт, үйлдвэрлэл, архитектурын шийдлүүдтэй танилцаарай.",
  "/",
);
export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <Image
          src="/images/hero.jpg"
          alt="Тэнгэр өөд өргөсөн орчин үеийн шилэн фасадтай барилгууд — архитектурын дүрслэлийн зураг"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <Eyebrow light>Инженерчлэл. Архитектур. Үйлдвэрлэл.</Eyebrow>
          <h1 id="hero-title">
            БҮТЭЭН БАЙГУУЛАЛТЫН
            <br />
            ШИНЭ СТАНДАРТЫГ
            <br />
            <span>БҮТЭЭНЭ.</span>
          </h1>
          <p>
            Европын дэвшилтэт технологи, чанартай материал, мэргэжлийн
            инженерчлэлд тулгуурласан барилга угсралт болон үйлдвэрлэлийн цогц
            шийдэл.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/projects" variant="light">
              Төслүүд үзэх
            </ButtonLink>
            <Link href="/quote" className="hero-secondary">
              Үнийн санал авах <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#introduction">
            <ArrowDown size={16} />
            Бидэнтэй танилцах
          </a>
          <span>Архитектурын дүрслэлийн зураг</span>
          <span className="hero-number">
            01 <i>/</i> БҮТЭЭН БАЙГУУЛАЛТ
          </span>
        </div>
        <span className="hero-cross">
          <Plus size={22} strokeWidth={1} />
        </span>
      </section>
      <div className="trust-strip container">
        <span>
          ЕВРОП СТАНДАРТ.
          <br />
          <strong>МОНГОЛ УР ЧАДВАР.</strong>
        </span>
        <div>
          <strong>1991</strong>
          <span>Үлэмж ХХК байгуулагдсан</span>
        </div>
        <div>
          <strong>04</strong>
          <span>Европын технологийн брэнд</span>
        </div>
        <div>
          <strong>06</strong>
          <span>Нэгдсэн шийдлийн үе шат</span>
        </div>
        <Link href="/about" aria-label="Компанийн тухай дэлгэрэнгүй">
          <MoveUpRight size={28} strokeWidth={1} />
        </Link>
      </div>
      <section className="section container introduction" id="introduction">
        <div className="intro-copy">
          <Eyebrow index="01 / 07">Бидний тухай</Eyebrow>
          <h2>
            Өнөөдрийн чанар.
            <br />
            <span className="muted">Маргаашийн үнэ цэн.</span>
          </h2>
          <p className="intro-lead">
            Европ стандарт, Монгол ур чадвар,
            <br />
            цогц бүтээн байгуулалт.
          </p>
          <p>
            Үлэмж Билдингс нь барилга угсралт, үйлдвэрлэл, төлөвлөлт, зураг
            төсөл болон төслийн менежментийн чиглэлээр цогц шийдэл санал
            болгодог.
          </p>
          <p>
            Бид архитектурын үзэл санааг инженерийн нарийн шийдэл, олон улсын
            технологи, дотоодын үйлдвэрлэлтэй холбож, таны төслийг бодит бүтээн
            байгуулалт болгоно.
          </p>
          <TextLink href="/about">Үлэмж Билдингстэй танилцах</TextLink>
        </div>
        <div className="intro-visual">
          <Photo
            src="/images/building-detail.jpg"
            alt="Гэрэл сүүдрийн хэмнэлтэй орчин үеийн архитектурын деталь"
            sizes="(max-width: 800px) 100vw, 50vw"
          />
          <div className="intro-image-note">
            <span>
              АЛСЫН ХАРААГ
              <br />
              БОДИТОЙ БҮТЭЭНЭ.
            </span>
            <span>
              ULEMJ
              <br />
              BUILDINGS ↗
            </span>
          </div>
        </div>
      </section>
      <section className="advantages container" aria-label="Бидний давуу тал">
        {[
          [
            "Европ технологи",
            "Дэлхийн брэндүүдийн дэвшилтэт материал, инженерийн систем.",
          ],
          [
            "Туршлага",
            "Барилга, дэд бүтцийн төслүүдэд хуримтлуулсан мэргэжлийн ур чадвар.",
          ],
          [
            "Дотоодын үйлдвэрлэл",
            "ULEMJ MARBLE болон захиалгат цонх, хаалганы шийдэл.",
          ],
          [
            "Цогц шийдэл",
            "Төлөвлөлтөөс үйлдвэрлэл, угсралт, суурилуулалт хүртэл.",
          ],
        ].map(([title, text], i) => (
          <div key={title}>
            <span className="advantage-number">
              0{i + 1}
              <Plus size={13} />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </section>
      <section className="section services-home surface">
        <div className="container">
          <SectionHeading
            eyebrow="Бидний үйлчилгээ"
            index="02 / 07"
            title="Төсөл бүрт тохирсон шийдэл."
            description="Нэг баг. Нэгдсэн төлөвлөлт. Чанартай гүйцэтгэл."
            link={{ href: "/services", label: "Бүх үйлчилгээ" }}
          />
          <div className="service-grid">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
      <section className="section container brands-home">
        <SectionHeading
          eyebrow="Олон улсын технологи"
          index="03 / 07"
          title="Дэлхийн тэргүүлэгч технологиуд."
          description="Архитектурын чанарыг тодорхойлох материал, системийн сонголт."
        />
        <div className="brand-grid">
          {brands.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} />
          ))}
        </div>
        <ContentNotice>
          Брэндийн нэрийг мэдээллийн зориулалтаар үзүүлэв. Албан ёсны төлөөлөл,
          хамтын ажиллагааны статусыг нийтлэхээс өмнө компани баталгаажуулна.
        </ContentNotice>
      </section>
      <section className="section container projects-home">
        <SectionHeading
          eyebrow="Онцлох төслүүд"
          index="04 / 07"
          title="Бидний бүтээн байгуулалт."
          description="Төсөл бүр өөрийн түүхтэй. Бүтээн байгуулалт бүр үнэ цэнтэй."
          link={{ href: "/projects", label: "Бүх төсөл үзэх" }}
        />
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>
      <section className="marble-home">
        <div className="marble-home-image">
          <Image
            src="/images/kitchen.jpg"
            alt="Чулуун тавцантай гал тогооны хэрэглээний жишиг зураг"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
          <span className="marble-image-title">
            ULEMJ
            <br />
            <strong>MARBLE</strong>
          </span>
          <span className="photo-caption">Хэрэглээний жишиг зураг</span>
        </div>
        <div className="marble-home-copy">
          <Eyebrow index="05 / 07">Монголдоо үйлдвэрлэв</Eyebrow>
          <h2>
            Байгалийн чулууны
            <br />
            гоо үзэсгэлэн.
            <br />
            <span className="muted">
              Орчин үеийн
              <br />
              технологийн шийдэл.
            </span>
          </h2>
          <p>
            Таны орон зай, таны хэв маягт тохирсон чулуун бүтээгдэхүүн.
            Тавцангаас угаалтуур хүртэл нэгэн цул шийдэл.
          </p>
          <div className="marble-mini-stats">
            {marbleClaims.slice(0, 2).map((c) => (
              <div key={c.label}>
                <strong>
                  {c.value}
                  <sup>*</sup>
                </strong>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
          <div className="mini-swatches" aria-label="Жишиг өнгөнүүд">
            {marbleColors.slice(0, 6).map((c) => (
              <span
                key={c.id}
                style={{ backgroundColor: c.hex }}
                title={`${c.name} — албан ёсны каталог биш`}
              />
            ))}
            <span className="swatch-more">+</span>
            <small>Жишиг өнгө</small>
          </div>
          <ButtonLink href="/marble">Бүх өнгө үзэх</ButtonLink>
          <ContentNotice>
            Өнгө, хэмжээ, үйлдвэрлэлийн үзүүлэлтийг компани баталгаажуулна.
          </ContentNotice>
        </div>
      </section>
      <section className="section container process-section">
        <SectionHeading
          eyebrow="Нэг цэгийн үйлчилгээ"
          index="06 / 07"
          title="Санаанаас суурилуулалт хүртэл."
          description="Төслийн үе шат бүрийг уялдуулж, төлөвлөлтөөс эцсийн гүйцэтгэл хүртэл тантай хамт ажиллана."
        />
        <div className="process-grid">
          {process.map((step, i) => (
            <div key={step}>
              <span>0{i + 1}</span>
              <ArrowUpRight size={20} strokeWidth={1} />
              <h3>{step}</h3>
            </div>
          ))}
        </div>
        <ContentNotice>{marbleClaimNotice}</ContentNotice>
      </section>
      <CTA />
    </>
  );
}
