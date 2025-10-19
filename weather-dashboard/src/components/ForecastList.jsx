export default function ForecastList({ forecast, units }) {
  if (!forecast?.length) return null;
  const tempUnit = units === "metric" ? "°C" : "°F";

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3">
      {forecast.map((item) => (
        <div
          key={item.dt}
          className="group rounded-2xl border border-white/40 bg-white/60 backdrop-blur p-3 text-center shadow-sm hover:shadow-md transition hover:-translate-y-0.5"
        >
          <p className="text-sm font-medium">{item.day}</p>
          <img
            src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
            alt={item.desc}
            className="mx-auto h-12 w-12 motion-safe:group-hover:scale-105 transition"
            loading="lazy"
          />
          <p className="text-lg font-semibold">
            {Math.round(item.temp)}
            {tempUnit}
          </p>
          <p className="text-xs text-gray-600">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
