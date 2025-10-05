export default function ErrorMessage({ msg }) {
  if (!msg) return null;
  return <p className="text-red-600">{msg}</p>;
}
