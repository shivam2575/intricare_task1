import React from "react";

const TextInput = ({ label, type = "text", value, onChange, required }) => {
  return (
    <label className="block mb-3">
      <span className="block text-sm font-medium mb-1">{label}</span>
      <input
        type={type}
        value={value}
        name={name}
        onChange={(e) => onChange({ [name]: e.target.value })}
        required={required}
        className="w-full rounded-xl border p-2 outline-none focus:ring focus:ring-indigo-200"
      />
    </label>
  );
};

export default TextInput;
