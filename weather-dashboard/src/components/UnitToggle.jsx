export default function UnitToggle({ units, onChange }) {
  return (
    <div className="inline-flex rounded-full p-1 bg-white/70 backdrop-blur border border-white/40 shadow-sm">
      <button
        onClick={() => onChange("metric")}
        className={`px-4 py-2 rounded-full text-sm transition ${
          units === "metric"
            ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow"
            : "text-gray-700 hover:bg-white"
        }`}
      >
        °C
      </button>
      <button
        onClick={() => onChange("imperial")}
        className={`px-4 py-2 rounded-full text-sm transition ${
          units === "imperial"
            ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow"
            : "text-gray-700 hover:bg-white"
        }`}
      >
        °F
      </button>
    </div>
  );
}
