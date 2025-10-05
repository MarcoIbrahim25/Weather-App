export default function SearchBar({ onSearch }) {
  const submit = (e) => {
    e.preventDefault();
    const city = new FormData(e.currentTarget).get("city")?.trim();
    if (city) onSearch(city);
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        name="city"
        placeholder="Enter city..."
        className="border px-3 py-2 rounded w-full"
      />
      <button className="px-4 py-2 rounded bg-black text-white">Search</button>
    </form>
  );
}
