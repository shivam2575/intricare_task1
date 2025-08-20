import React from "react";

const TextInput = ({ label, type = "text", value, onChange, required }) => {
  return (
    <div>
      <label>
        <span>{label}</span>
        <input
          type={type}
          value={value}
          name={name}
          onChange={(e) => onChange({ [name]: e.target.value })}
          required={required}
        />
      </label>
    </div>
  );
};

export default TextInput;
