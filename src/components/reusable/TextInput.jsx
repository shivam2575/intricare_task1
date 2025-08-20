export default function TextInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
}) {
  return (
    <label className="block mb-3">
      <span className="block text-sm font-medium mb-1">{label}</span>
      <input
        className="w-full rounded-xl border p-2 outline-none focus:ring focus:ring-indigo-200"
        type={type}
        name={name}
        value={value}
        required={required}
        onChange={(e) => onChange({ [name]: e.target.value })}
      />
    </label>
  );
}
