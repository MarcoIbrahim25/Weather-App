const BASE = "https://api.openweathermap.org/data/2.5";

export async function fetchCurrent(city, units = "metric") {
  const key = import.meta.env.VITE_OWM_KEY;
  const url = `${BASE}/weather?q=${encodeURIComponent(
    city
  )}&units=${units}&appid=${key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Some errors");
  return res.json();
}
