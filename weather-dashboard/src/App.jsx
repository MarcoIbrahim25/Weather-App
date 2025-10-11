import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import UnitToggle from "./components/UnitToggle";
import { fetchCurrent } from "./logic/api";

export default function App() {
  const [units, setUnits] = useState("metric");
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [lastCity, setLastCity] = useState("");

  const handleSearch = async (city) => {
    setErr("");
    setData(null);
    setLastCity(city);
    try {
      const res = await fetchCurrent(city, units);
      setData(res);
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

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Weather Dashboard</h1>
        <UnitToggle units={units} onChange={setUnits} />
      </header>
      <SearchBar onSearch={handleSearch} />
      <ErrorMessage msg={err} />
      <WeatherCard data={data} units={units} />
    </div>
  );
}
