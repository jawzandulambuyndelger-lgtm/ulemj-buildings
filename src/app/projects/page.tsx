import { CTA, ContentNotice, PageHeading } from "@/components/ui";
import { ProjectFilter } from "@/components/project-filter";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Төслүүд",
  "MMS Green Building, Шинэ Улаанбаатар Драгон терминал, Toyota Мөнххада, HULEG International School — Үлэмж Билдингсийн онцлох төслүүд.",
  "/projects",
);
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const { category } = await searchParams;
  return (
    <>
      <PageHeading
        eyebrow="Төслүүд"
        title={"Үнэ цэн бүтээсэн\nбүтээн байгуулалтууд."}
        description="Оффисоос олон нийтийн барилга, дэд бүтэц хүртэл. Үлэмж Билдингсийн туршлагыг илэрхийлэх онцлох төслүүд."
      />
      <section className="section container">
        <ProjectFilter
          key={String(category)}
          initial={typeof category === "string" ? category : ""}
        />
        <ContentNotice>
          Төслийн нэрийг захиалагчийн өгсөн мэдээллээр оруулав. Бодит зураг,
          гүйцэтгэлийн хүрээ, байршил, техникийн мэдээллийг компани
          баталгаажуулсны дараа нийтэлнэ. Бүдүүвч нь бодит барилгын зураг биш.
        </ContentNotice>
      </section>
      <CTA />
    </>
  );
}
