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
        className="border border-gray-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 px-3 py-2 rounded-lg w-full outline-none"
      />
      <button className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90 active:opacity-80 transition">
        Search
      </button>
    </form>
  );
}
