export default function CityHistory({ items = [], onSelect, onClear }) {
  if (!items.length) return null;
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {items.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className="px-3 py-1.5 rounded-full border border-white/50 bg-white/70 backdrop-blur text-sm hover:shadow hover:-translate-y-0.5 transition"
          title={`Search ${c}`}
        >
          {c}
        </button>
      ))}
      <button
        onClick={onClear}
        className="ml-auto text-sm underline opacity-70 hover:opacity-100"
        title="Clear recent"
      >
        Clear
      </button>
    </div>
  );
}
