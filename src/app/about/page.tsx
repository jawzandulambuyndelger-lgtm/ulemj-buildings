import {
  BrandCard,
  ButtonLink,
  CTA,
  ContentNotice,
  Eyebrow,
  PageHeading,
  Photo,
  SectionHeading,
} from "@/components/ui";
import { brands } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Бидний тухай",
  "1991 онд байгуулагдсан Үлэмж ХХК-ийн барилга, үйлдвэрлэлийн чиглэл. Бидний эрхэм зорилго, алсын хараа, инженерчлэл болон үйлдвэрлэлийн туршлага.",
  "/about",
);
export default function AboutPage() {
  return (
    <>
      <PageHeading
        eyebrow="Бидний тухай"
        title={"Чанараар бүтээж,\nитгэлээр холбогдоно."}
        description="Үлэмж Билдингс — Үлэмж ХХК-ийн барилга угсралт, үйлдвэрлэлийн чиглэл. Монгол ур чадварыг олон улсын технологитой нэгтгэнэ."
      />
      <Photo
        src="/images/building-detail.jpg"
        className="page-photo"
        alt="Орчин үеийн барилгын фасадны хэмнэл — архитектурын дүрслэлийн зураг"
        priority
        sizes="100vw"
        label="Архитектурын дүрслэлийн зураг"
      />
      <section className="section container editorial-grid">
        <div>
          <Eyebrow>Бид хэн бэ</Eyebrow>
          <h2>
            Мэдлэг, туршлага,
            <br />
            <span className="muted">технологийн нэгдэл.</span>
          </h2>
        </div>
        <div className="prose">
          <p>
            Үлэмж ХХК нь 1991 онд байгуулагдсан бөгөөд худалдаа, үйлчилгээ,
            зураг төсөл, барилга болон үйлдвэрлэлийн чиглэлээр үйл ажиллагаагаа
            өргөжүүлж ирсэн.
          </p>
          <p>
            Үлэмж Билдингс нь барилгын ерөнхий гүйцэтгэл, газар шорооны ажил,
            төлөвлөлт, зураг төсөл, төслийн менежментийн чиглэлээр цогц шийдэл
            санал болгодог.
          </p>
          <p>
            Компанийн албан ёсны танилцуулгад вакуум шилэн багцтай цонх, хаалга,
            хөнгөн цагаан цонх, хаалга болон фасадны үйлдвэрлэлийг онцолсон.
            Мэргэжлийн багийн мэдлэг, гүйцэтгэлийн туршлагыг орчин үеийн
            технологитой нэгтгэх нь бидний ажлын үндэс юм.
          </p>
          <ButtonLink href="/services">Бидний үйлчилгээ</ButtonLink>
        </div>
      </section>
      <section className="section surface">
        <div className="container">
          <Eyebrow>Бидний түүх</Eyebrow>
          <h2>Тууштай хөгжлийн эхлэл.</h2>
          <div className="history-line">
            <strong>1991</strong>
            <div>
              <p>
                Үлэмж ХХК байгуулагдав. Чанартай, найдвартай бүтээгдэхүүн,
                үйлчилгээг Монголын зах зээлд хүргэх зорилгоор эхэлсэн замнал
                өнөөдөр олон чиглэлийн мэргэжлийн үйл ажиллагаагаар үргэлжилж
                байна.
              </p>
              <ContentNotice>
                Үлэмж Билдингсийн тусдаа үүсгэн байгуулагдсан он болон түүхэн үе
                шатны мэдээллийг компаниас баталгаажуулсны дараа нэмж нийтэлнэ.
              </ContentNotice>
            </div>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="Бидний чиг баримжаа"
          title="Илүү сайн ирээдүйн төлөө."
        />
        <div className="values-grid">
          <article className="value-card">
            <span>01 / ЭРХЭМ ЗОРИЛГО</span>
            <h3>Мэдлэгийг технологитой холбоно.</h3>
            <p>
              Монголын оюун ухаан, мэдлэгийг орчин үеийн технологитой хослуулан
              ашигладаг тэргүүлэгч групп болох.
            </p>
          </article>
          <article className="value-card">
            <span>02 / АЛСЫН ХАРАА</span>
            <h3>Дэлхийд үнэлэгдэх Монгол.</h3>
            <p>
              Өндөр соёл иргэншилтэй, дэлхийд хүлээн зөвшөөрөгдсөн Монгол Улсыг
              бүтээн байгуулахад хувь нэмэр оруулах.
            </p>
          </article>
          <article className="value-card">
            <span>03 / ҮНЭТ ЗҮЙЛ</span>
            <h3>Хүмүүс бол бидний үнэ цэн.</h3>
            <p>
              Харилцагчид, бизнесийн түншүүд, ажилтнуудаа эрхэмлэн, урт
              хугацааны итгэлцэл, хамтын хөгжилд анхаарна.
            </p>
          </article>
        </div>
        <ContentNotice>
          Эрхэм зорилго, алсын хараа, үнэт зүйлийг ulemj.mn/about дахь албан
          ёсны англи танилцуулгаас монголчилсон.
        </ContentNotice>
      </section>
      <section className="section surface">
        <div className="container editorial-grid">
          <div>
            <Eyebrow>Инженерчлэл ба үйлдвэрлэл</Eyebrow>
            <h2>
              Деталь бүрд
              <br />
              мэргэжлийн хандлага.
            </h2>
          </div>
          <div className="prose">
            <h3>Том зургаас нарийн хийцлэл хүртэл.</h3>
            <p>
              Барилгын төсөл нь төлөвлөлт, материал, үйлдвэрлэл, гүйцэтгэлийн
              нарийн уялдаанаас бүрддэг. Бид эдгээр үе шатыг нэгтгэн, төслийн
              хэрэгцээнд нийцсэн шийдлийг санал болгоно.
            </p>
            <p>
              Цонх, хаалга, шилэн фасадны шийдлээс ULEMJ MARBLE захиалгат чулуун
              бүтээгдэхүүн хүртэл үйлдвэрлэл, угсралтын хэрэгцээг хамтад нь
              төлөвлөх боломжтой.
            </p>
            <ButtonLink href="/projects">Онцлох төслүүд</ButtonLink>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="Европын технологи"
          title="Дэлхийн шийдлийг Монголд."
          description="Материал, инженерийн системийн сонголтоор архитектурын боломжийг өргөжүүлнэ."
        />
        <div className="brand-grid">
          {brands.map((brand) => (
            <BrandCard brand={brand} key={brand.slug} />
          ))}
        </div>
        <ContentNotice>
          Брэндүүдтэй холбоотой албан ёсны төлөөлөл, хамтын ажиллагааны статус,
          ашиглах логоны зөвшөөрлийг компани баталгаажуулна.
        </ContentNotice>
      </section>
      <CTA />
    </>
  );
}
