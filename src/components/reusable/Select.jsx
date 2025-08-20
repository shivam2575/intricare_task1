export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  required,
}) {
  return (
    <label className="block mb-3">
      <span className="block text-sm font-medium mb-1">{label}</span>
      <select
        className="w-full rounded-xl border p-2 outline-none focus:ring focus:ring-indigo-200 bg-white"
        name={name}
        value={value}
        required={required}
        onChange={(e) => onChange({ [name]: e.target.value })}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
