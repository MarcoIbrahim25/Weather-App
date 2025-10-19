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
    <div className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur p-5 sm:p-6 shadow-lg">
      <div className="flex items-center gap-5">
        {icon && (
          <img
            src={icon}
            alt={condition || "weather icon"}
            className="h-16 w-16 sm:h-20 sm:w-20 drop-shadow"
            loading="lazy"
          />
        )}
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-semibold">{data.name}</h2>
          <p className="text-gray-600">{condition}</p>
        </div>
        <div className="text-5xl sm:text-6xl font-extrabold tracking-tight">
          {Math.round(data.main.temp)}
          {tempUnit}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-gray-700">
        <div className="rounded-2xl bg-white/70 border border-white/40 p-3 text-center">
          <p className="opacity-70">Humidity</p>
          <p className="text-lg font-semibold">{data.main.humidity}%</p>
        </div>
        <div className="rounded-2xl bg-white/70 border border-white/40 p-3 text-center">
          <p className="opacity-70">Wind</p>
          <p className="text-lg font-semibold">
            {windSpeed} {windUnit}
          </p>
        </div>
      </div>
    </div>
  );
}
