export default function TextArea({ label, name, value, onChange, required }) {
  return (
    <label className="block mb-3">
      <span className="block text-sm font-medium mb-1">{label}</span>
      <textarea
        className="w-full rounded-xl border p-2 outline-none focus:ring focus:ring-indigo-200 min-h-[96px]"
        name={name}
        value={value}
        required={required}
        onChange={(e) => onChange({ [name]: e.target.value })}
      />
    </label>
  );
}
