export default function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const city = new FormData(e.currentTarget).get("city")?.trim();
    if (city) onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        name="city"
        aria-label="Search city"
        placeholder="Enter city name..."
        className="w-full rounded-2xl border border-white/50 bg-white/70 backdrop-blur px-4 py-3 outline-none shadow-sm focus:ring-4 ring-sky-200"
      />
      <button className="rounded-2xl px-5 py-3 font-medium text-white bg-gradient-to-r from-sky-500 to-indigo-500 shadow hover:scale-[1.01] active:scale-[.99] transition">
        Search
      </button>
    </form>
  );
}
