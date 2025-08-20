import React from "react";

const TextArea = ({ label, value, onChange, required }) => {
  return (
    <label className="block mb-3">
      <span className="block text-sm font-medium mb-1">{label}</span>
      <textarea
        value={value}
        name={name}
        onChange={(e) => onChange({ [name]: e.target.value })}
        required={required}
        className="w-full rounded-xl border p-2 outline-none focus:ring focus:ring-indigo-200 min-h-[96px]"
      />
    </label>
  );
};

export default TextArea;
