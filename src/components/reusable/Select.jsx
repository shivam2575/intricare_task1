const Select = ({ label, name, value, onChange, options = [], required }) => {
  return (
    <label className="block mb-3">
      <span className="block text-sm font-medium mb-1">{label}</span>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange({ [name]: e.target.value })}
        required={required}
        className="w-full border rounded-xl p-2 outline-none focus:ring focus:ring-indigo-200 bg-white"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
