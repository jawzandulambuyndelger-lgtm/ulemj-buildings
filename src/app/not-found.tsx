import { ButtonLink } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="not-found">
      <span>404 / ХУУДАС ОЛДСОНГҮЙ</span>
      <h1>Энэ орон зай хараахан бүтээгдээгүй.</h1>
      <p>Холбоосоо шалгах эсвэл нүүр хуудас руу буцна уу.</p>
      <ButtonLink href="/">Нүүр хуудас руу</ButtonLink>
    </section>
  );
}
