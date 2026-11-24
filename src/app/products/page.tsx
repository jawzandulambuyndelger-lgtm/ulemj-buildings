import { CTA, ContentNotice, PageHeading } from "@/components/ui";
import {
  ProductFilter,
  type ProductFilters,
} from "@/components/product-filter";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Бүтээгдэхүүн",
  "ALUCOBOND, SCHÜCO, DECEUNINCK, ASTRON брэндийн фасад, цонх, хаалга, ган бүтээцийн шийдлийг брэнд, материал, зориулалтаар сонгоорой.",
  "/products",
);
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const string = (key: string) =>
    typeof params[key] === "string" ? (params[key] as string) : "";
  const initial: ProductFilters = {
    brand: string("brand"),
    type: string("type"),
    material: string("material"),
    application: string("application"),
  };
  return (
    <>
      <PageHeading
        eyebrow="Бүтээгдэхүүн"
        title={"Архитектурын боломж.\nМатериалын чанар."}
        description="Фасад, цонх, хаалга, ган бүтээц. Таны төслийн хэрэгцээнд нийцэх систем, материалын шийдлээ сонгоорой."
      />
      <section className="section container">
        <ProductFilter key={JSON.stringify(initial)} initial={initial} />
        <ContentNotice>
          Зураг нь хэрэглээний жишиг дүрслэл. Бүтээгдэхүүний албан ёсны зураг,
          цуврал, техникийн үзүүлэлт, өнгө болон PDF каталогийг компаниас
          баталгаажуулсны дараа шинэчилнэ.
        </ContentNotice>
      </section>
      <CTA />
    </>
  );
}
