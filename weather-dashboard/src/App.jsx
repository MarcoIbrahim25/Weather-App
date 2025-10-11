import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import UnitToggle from "./components/UnitToggle";
import CityHistory from "./components/CityHistory";
import { fetchCurrent } from "./logic/api";

const STORAGE_KEY = "recentCities";
const MAX_RECENT = 5;

export default function App() {
  const [units, setUnits] = useState("metric");
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [lastCity, setLastCity] = useState("");
  const [recent, setRecent] = useState([]);

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
    setLastCity(city);
    try {
      const res = await fetchCurrent(city, units);
      setData(res);
      saveRecent(city);
    } catch {
      setErr("City not found or API error. Try again.");
    }
  };

  useEffect(() => {
    if (!lastCity) return;
    (async () => {
      try {
        const res = await fetchCurrent(lastCity, units);
        setData(res);
        setErr("");
      } catch {
        setErr("City not found or API error. Try again.");
        setData(null);
      }
    })();
  }, [units, lastCity]);

  const clearRecent = () => {
    setRecent([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <header className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center">
        <h1 className="text-2xl font-bold">Weather Dashboard</h1>
        <UnitToggle units={units} onChange={setUnits} />
      </header>

      <SearchBar onSearch={handleSearch} />
      <CityHistory
        items={recent}
        onSelect={handleSearch}
        onClear={clearRecent}
      />
      <ErrorMessage msg={err} />
      <WeatherCard data={data} units={units} />
    </div>
  );
}
