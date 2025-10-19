export default function WeatherCard({ data, units }) {
  if (!data) return null;

  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "km/h" : "mph";
  const icon = data.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : null;
  const condition = data.weather?.[0]?.main ?? "";
  const windSpeed =
    units === "metric"
      ? Math.round(data.wind.speed * 3.6)
      : Math.round(data.wind.speed);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-5 shadow-sm">
      <div className="flex items-center gap-4">
        {icon && (
          <img
            src={icon}
            alt={condition || "weather icon"}
            className="h-16 w-16"
            loading="lazy"
          />
        )}
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-semibold">{data.name}</h2>
          <p className="text-gray-600">{condition}</p>
        </div>

        <div className="text-4xl sm:text-5xl font-bold shrink-0">
          {Math.round(data.main.temp)}
          {tempUnit}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
        <span>
          Humidity <strong>{data.main.humidity}%</strong>
        </span>
        <span>
          Wind <strong>{windSpeed}</strong> {windUnit}
        </span>
      </div>
    </div>
  );
}
