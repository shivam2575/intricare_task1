const Select = ({ label, name, value, onChange, options = [], required }) => {
  return (
    <div>
      <label>
        <span>{label}</span>
        <select
          name={name}
          value={value}
          onChange={(e) => onChange({ [name]: e.target.value })}
          required={required}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Select;
