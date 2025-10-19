export default function Loader() {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="inline-block h-5 w-5 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
      <span className="text-sm opacity-80">Loading…</span>
    </div>
  );
}
