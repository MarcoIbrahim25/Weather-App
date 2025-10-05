export default function WeatherCard({ data, units }) {
  if (!data) return null;
  const tempUnit = units === "metric" ? "°C" : "°F";
  return (
    <div className="rounded-xl border p-4 space-y-1">
      <h2 className="text-xl font-semibold">{data.name}</h2>
      <div className="text-4xl font-bold">
        {Math.round(data.main.temp)}{tempUnit}
      </div>
      <div className="opacity-80">
        <span>{data.weather?.[0]?.main}</span> ·
        <span> Humidity {data.main.humidity}%</span> ·
        <span> Wind {Math.round(data.wind.speed)}</span>
      </div>
    </div>
  );
}
