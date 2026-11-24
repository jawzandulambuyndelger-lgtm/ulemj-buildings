import { CTA, PageHeading, ServiceCard, SectionHeading } from "@/components/ui";
import { process, services } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Үйлчилгээ",
  "Барилга угсралт, газар шороо, төслийн менежмент, зураг төсөл, цонх хаалганы үйлдвэрлэл, шилэн фасадны системийн цогц үйлчилгээ.",
  "/services",
);
export default function ServicesPage() {
  return (
    <>
      <PageHeading
        eyebrow="Үйлчилгээ"
        title={"Нэг баг.\nЦогц шийдэл."}
        description="Төлөвлөлтөөс гүйцэтгэл хүртэл. Төслийн үе шат бүрд мэргэжлийн мэдлэг, инженерийн шийдэл, үйлдвэрлэлийн боломжоо нэгтгэн ажиллана."
      />
      <section className="container section">
        <div className="service-directory">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>
      <section className="section surface">
        <div className="container">
          <SectionHeading
            eyebrow="Ажлын арга барил"
            title="Уялдаатай үйл явц. Тодорхой үр дүн."
            description="Үйлчилгээний цар хүрээг таны төслийн хэрэгцээ, баримт бичиг, талбайн нөхцөлтэй уялдуулан тохиролцоно."
          />
          <div className="process-grid">
            {process.map((step, i) => (
              <div key={step}>
                <span>0{i + 1}</span>
                <h3>{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
