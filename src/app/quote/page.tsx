import { InquiryForm, type InitialInquiry } from "@/components/inquiry-form";
import { PageHeading } from "@/components/ui";
import { company, services } from "@/lib/data";
import { deliveryEnabled } from "@/lib/delivery";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Үнийн санал авах",
  "Барилга угсралт, үйлдвэрлэл, цонх хаалга, фасад болон ULEMJ MARBLE бүтээгдэхүүний үнийн саналын хүсэлтээ бэлтгээрэй.",
  "/quote",
);
export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const get = (key: string) =>
    typeof params[key] === "string"
      ? (params[key] as string).slice(0, key === "description" ? 5000 : 200)
      : "";
  const requested = get("service"),
    product = get("product"),
    material = get("material");
  const service = [
    ...services.map((s) => s.title),
    "ULEMJ MARBLE",
    "Бүтээгдэхүүний зөвлөгөө",
  ].includes(requested)
    ? requested
    : material === "ULEMJ MARBLE"
      ? "ULEMJ MARBLE"
      : product
        ? "Бүтээгдэхүүний зөвлөгөө"
        : "";
  const initial: InitialInquiry = {
    service,
    product,
    material,
    color: get("color"),
    description: get("description"),
  };
  return (
    <>
      <PageHeading
        eyebrow="Үнийн санал авах"
        title={"Таны санааг\nхамтдаа бүтээе."}
        description="Төслийн хэрэгцээ, хэмжээс, материалын сонголтоо бидэнтэй хуваалцаарай. Мэдээлэл тодорхой байх тусам тохирох шийдэл санал болгоход дөхөм болно."
      />
      <section className="container form-page">
        <aside className="form-sidebar">
          <h2>
            Бүтээн байгуулалтын
            <br />
            эхний алхам.
          </h2>
          <p>
            Төслийн зураг, ажлын даалгавар эсвэл санаагаа ирүүлээрэй. Материал,
            хэмжээ болон гүйцэтгэлийн боломжийг хамтдаа тодорхойлъё.
          </p>
          <div className="form-steps">
            <div>
              <span>01</span>Төслийн мэдээллээ бэлтгэх
            </div>
            <div>
              <span>02</span>Зураг, файлаа хавсаргах
            </div>
            <div>
              <span>03</span>Мэргэжлийн багтай ярилцах
            </div>
          </div>
          <div className="sidebar-contact">
            <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <small>Шууд холбогдон зөвлөгөө авах боломжтой.</small>
          </div>
        </aside>
        <InquiryForm
          key={JSON.stringify(initial)}
          kind="quote"
          enabled={deliveryEnabled()}
          initial={initial}
        />
      </section>
    </>
  );
}
