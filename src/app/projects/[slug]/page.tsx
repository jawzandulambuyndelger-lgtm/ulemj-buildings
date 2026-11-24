import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/project-gallery";
import {
  ButtonLink,
  CTA,
  ContentNotice,
  PageHeading,
  ProjectCard,
  SectionHeading,
} from "@/components/ui";
import { projects } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p ? pageMetadata(p.title, p.overview, `/projects/${slug}`) : {};
}
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return (
    <>
      <PageHeading
        eyebrow="Төслүүд"
        title={project.title}
        description={project.category}
      />
      <div className="container">
        <ProjectGallery project={project} index={projects.indexOf(project)} />
        <div className="project-info">
          <div>
            <h2>Төслийн тухай</h2>
            <p>{project.overview}</p>
            {project.note && <ContentNotice>{project.note}</ContentNotice>}
            <div style={{ marginTop: 30 }}>
              <ButtonLink
                href={`/quote?description=${encodeURIComponent(`${project.title} төслийн чиглэлтэй төстэй шийдлийн талаар зөвлөгөө авах хүсэлтэй байна.`)}`}
              >
                Төстэй шийдлээр санал авах
              </ButtonLink>
            </div>
          </div>
          <dl>
            <div>
              <dt>Төслийн ангилал</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt>Байршил</dt>
              <dd>
                {project.location || "Баталгаажуулах мэдээлэл хүлээгдэж байна"}
              </dd>
            </div>
            <div>
              <dt>Гүйцэтгэсэн ажил</dt>
              <dd>
                {project.scope || "Компанийн баталгаажуулалт хүлээгдэж байна"}
              </dd>
            </div>
            <div>
              <dt>Материал, систем</dt>
              <dd>
                {project.materials.length
                  ? project.materials.join(", ")
                  : "Баталгаажуулсны дараа нийтэлнэ"}
              </dd>
            </div>
            <div>
              <dt>Зургийн цомог</dt>
              <dd>
                {project.gallery.length
                  ? `${project.gallery.length} зураг`
                  : "Бодит төслийн зураг хүлээгдэж байна"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <section className="section surface">
        <div className="container">
          <SectionHeading
            eyebrow="Бусад төсөл"
            title="Бүтээн байгуулалтын үргэлжлэл."
          />
          <div className="project-grid">
            {projects
              .filter((p) => p.slug !== slug)
              .slice(0, 2)
              .map((p) => (
                <ProjectCard
                  key={p.slug}
                  project={p}
                  index={projects.indexOf(p)}
                />
              ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
