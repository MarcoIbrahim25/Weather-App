export default function ForecastList({ forecast, units }) {
  if (!forecast?.length) return null;
  const tempUnit = units === "metric" ? "°C" : "°F";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
      {forecast.map((item) => (
        <div
          key={item.dt}
          className="rounded-xl border bg-white/60 p-3 text-center"
        >
          <p className="text-sm font-medium">{item.day}</p>
          <img
            src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
            alt={item.desc}
            className="mx-auto h-12 w-12"
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
