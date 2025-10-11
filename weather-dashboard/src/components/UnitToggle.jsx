export default function UnitToggle({ units, onChange }) {
  return (
    <div className="inline-flex overflow-hidden rounded border">
      <button
        onClick={() => onChange("metric")}
        className={`px-3 py-1 ${
          units === "metric" ? "bg-black text-white" : ""
        }`}
      >
        °C
      </button>
      <button
        onClick={() => onChange("imperial")}
        className={`px-3 py-1 ${
          units === "imperial" ? "bg-black text-white" : ""
        }`}
      >
        °F
      </button>
    </div>
  );
}
