import { notFound } from "next/navigation";
import {
  ButtonLink,
  CTA,
  Eyebrow,
  PageHeading,
  Photo,
  SectionHeading,
  ServiceCard,
} from "@/components/ui";
import { services } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  return s ? pageMetadata(s.title, s.description, `/services/${slug}`) : {};
}
export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  return (
    <>
      <PageHeading
        eyebrow="Үйлчилгээ"
        title={service.title}
        description={service.short}
      />
      <section className="container detail-hero">
        <Photo
          src={service.image}
          alt={`${service.title} — үйлчилгээний дүрслэлийн зураг`}
          label="Үйлчилгээний дүрслэлийн зураг"
          priority
          sizes="(max-width: 800px) 100vw, 55vw"
        />
        <div className="detail-summary">
          <Eyebrow>Таны төслийн шийдэл</Eyebrow>
          <h2>{service.outcome}</h2>
          <p>{service.description}</p>
          <ul className="detail-list">
            {service.offerings.map((o, i) => (
              <li key={o}>
                <span>0{i + 1}</span>
                {o}
              </li>
            ))}
          </ul>
          <ButtonLink
            href={`/quote?service=${encodeURIComponent(service.title)}`}
          >
            Энэ үйлчилгээгээр санал авах
          </ButtonLink>
        </div>
      </section>
      <section className="section surface">
        <div className="container editorial-grid">
          <div>
            <Eyebrow>Хамтын ажиллагаа</Eyebrow>
            <h2>
              Төслөө бидэнтэй
              <br />
              хуваалцаарай.
            </h2>
          </div>
          <div className="prose">
            <p>
              Зураг төсөл, ажлын даалгавар, талбайн болон хэрэгцээний мэдээллээ
              ирүүлснээр тохирох шийдэл, хамрах хүрээний талаар ярилцах
              боломжтой.
            </p>
            <p>
              Материал, ажлын хэмжээ, гүйцэтгэлийн хугацаа болон төсвийг төслийн
              мэдээлэлтэй танилцсаны дараа харилцан тохиролцоно.
            </p>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="Холбоотой үйлчилгээ"
          title="Төслийн дараагийн үе шат."
        />
        <div className="service-grid">
          {services
            .filter((s) => s.slug !== slug)
            .slice(0, 3)
            .map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
