export default function Loader() {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-block h-5 w-5 rounded-full border-2 border-gray-300 border-t-transparent animate-spin" />
      <span className="text-sm opacity-80">Loading…</span>
    </div>
  );
}
