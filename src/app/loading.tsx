export default function Loading() {
  return (
    <div
      className="loading-page"
      role="status"
      aria-label="Хуудсыг ачаалж байна"
    >
      <div className="loading-line" />
      <div className="loading-line" />
      <span style={{ fontSize: 11, color: "#777" }}>Ачаалж байна…</span>
    </div>
  );
}
