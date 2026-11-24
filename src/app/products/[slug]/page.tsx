import { notFound } from "next/navigation";
import { FileDown } from "lucide-react";
import {
  ButtonLink,
  CTA,
  ContentNotice,
  Eyebrow,
  PageHeading,
  Photo,
  ProductCard,
  SectionHeading,
  TextLink,
} from "@/components/ui";
import { products } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  return p
    ? pageMetadata(`${p.name} — ${p.brand}`, p.description, `/products/${slug}`)
    : {};
}
export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  const quote = `/quote?product=${encodeURIComponent(product.name)}&material=${encodeURIComponent(product.material)}`;
  return (
    <>
      <PageHeading
        eyebrow="Бүтээгдэхүүн"
        title={product.name}
        description={product.description}
      />
      <section className="container detail-hero">
        <div>
          <Photo
            src={product.image}
            alt={`${product.name} — хэрэглээний жишиг зураг`}
            className="product-detail-photo"
            priority
            sizes="(max-width: 800px) 100vw, 55vw"
            label="Хэрэглээний жишиг зураг"
          />
          <ContentNotice>
            Албан ёсны бүтээгдэхүүний гэрэл зураг хүлээгдэж байна.
          </ContentNotice>
        </div>
        <div className="detail-summary">
          <Eyebrow>{product.brand}</Eyebrow>
          <h2>{product.type}</h2>
          <p>{product.material}</p>
          <div style={{ marginTop: 20 }}>
            {product.applications.map((a) => (
              <span className="pill" key={a}>
                {a}
              </span>
            ))}
          </div>
          <table className="spec-table">
            <caption>Техникийн мэдээлэл</caption>
            <tbody>
              {product.specifications.map((s) => (
                <tr key={s.label}>
                  <th scope="row">{s.label}</th>
                  <td>{s.value || "Албан ёсны каталогоор баталгаажуулна"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: 11 }}>
            Өнгөний сонголт:{" "}
            {product.colors.length
              ? product.colors.join(", ")
              : "албан ёсны өнгөний каталог хүлээгдэж байна."}
          </p>
          <div className="catalog-note">
            <FileDown size={22} />
            <div>
              {product.catalog ? (
                <a href={product.catalog} download>
                  PDF каталог татах
                </a>
              ) : (
                <>
                  PDF каталог хараахан ороогүй байна.
                  <TextLink
                    href={`${quote}&description=${encodeURIComponent("Албан ёсны PDF каталог болон техникийн мэдээлэл авах хүсэлтэй байна.")}`}
                  >
                    Каталог хүсэх
                  </TextLink>
                </>
              )}
            </div>
          </div>
          <ButtonLink href={quote}>Үнийн санал авах</ButtonLink>
        </div>
      </section>
      <section className="section surface">
        <div className="container editorial-grid">
          <div>
            <Eyebrow>Материалын зөв сонголт</Eyebrow>
            <h2>
              Төслийн шаардлагаас
              <br />
              зөв шийдэл эхэлнэ.
            </h2>
          </div>
          <div className="prose">
            <p>
              Техникийн үзүүлэлт нь сонгосон систем, цуврал, шил, тоноглол,
              хэмжээ болон суурилуулалтын нөхцөлөөс хамаарна. Баталгаажаагүй
              тоон үзүүлэлт нийтлээгүй болно.
            </p>
            <p>
              Төслийн зураг, ажлын даалгавраа хуваалцсанаар тохирох материал,
              системийн сонголтын талаар манай багтай ярилцах боломжтой.
            </p>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="Холбоотой бүтээгдэхүүн"
          title="Шийдлээ цогцоор нь сонгоорой."
        />
        <div className="product-grid">
          {products
            .filter((p) => p.slug !== slug)
            .sort(
              (a, b) =>
                Number(b.brand === product.brand) -
                Number(a.brand === product.brand),
            )
            .slice(0, 3)
            .map((p) => (
              <ProductCard product={p} key={p.slug} />
            ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
