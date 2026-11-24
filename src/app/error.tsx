"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="not-found">
      <span>ТҮР АЛДАА</span>
      <h1>Хуудсыг ачаалж чадсангүй.</h1>
      <p>Дахин оролдоно уу эсвэл холбоо барих дугаараар холбогдоорой.</p>
      <button className="button button-dark" onClick={reset}>
        Дахин ачаалах ↗
      </button>
      <a href="tel:+97677770090">+976 77770090</a>
    </section>
  );
}
