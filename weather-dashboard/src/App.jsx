import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import UnitToggle from "./components/UnitToggle";
import CityHistory from "./components/CityHistory";
import Loader from "./components/Loader";
import ForecastList from "./components/ForecastList";
import { fetchCurrent, fetchForecast } from "./logic/api";

const STORAGE_KEY = "recentCities";
const MAX_RECENT = 5;

export default function App() {
  const [units, setUnits] = useState("metric");
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [err, setErr] = useState("");
  const [lastCity, setLastCity] = useState("");
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (Array.isArray(saved)) setRecent(saved);
  }, []);

  const saveRecent = (city) => {
    const next = [
      city,
      ...recent.filter((c) => c.toLowerCase() !== city.toLowerCase()),
    ].slice(0, MAX_RECENT);
    setRecent(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const handleSearch = async (city) => {
    setErr("");
    setData(null);
    setForecast([]);
    setLastCity(city);
    setLoading(true);
    try {
      const [resCurrent, resForecast] = await Promise.all([
        fetchCurrent(city, units),
        fetchForecast(city, units),
      ]);
      setData(resCurrent);
      saveRecent(city);

      const daily = [];
      const map = {};
      resForecast.list.forEach((item) => {
        const date = new Date(item.dt_txt);
        const day = date.toLocaleDateString("en-US", { weekday: "short" });
        if (!map[day] && date.getHours() === 12) {
          map[day] = true;
          daily.push({
            dt: item.dt,
            day,
            temp: item.main.temp,
            icon: item.weather[0].icon,
            desc: item.weather[0].main,
          });
        }
      });
      setForecast(daily.slice(0, 5));
    } catch {
      setErr("City not found or API error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!lastCity) return;
    handleSearch(lastCity);
  }, [units]);

  const clearRecent = () => {
    setRecent([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-100 via-white to-indigo-100 text-gray-900">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />
      <div className="relative max-w-3xl mx-auto p-4 sm:p-8">
        <div className="rounded-3xl border border-white/40 bg-white/60 shadow-xl backdrop-blur-xl p-5 sm:p-8 space-y-5">
          <header className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between sm:items-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">
              Weather Dashboard
            </h1>
            <UnitToggle units={units} onChange={setUnits} />
          </header>

          <SearchBar onSearch={handleSearch} />
          <CityHistory
            items={recent}
            onSelect={handleSearch}
            onClear={clearRecent}
          />
          <ErrorMessage msg={err} />

          {loading ? (
            <div className="flex justify-center py-6">
              <Loader />
            </div>
          ) : (
            <>
              <WeatherCard data={data} units={units} />
              <ForecastList forecast={forecast} units={units} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
