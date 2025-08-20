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
          onChange={onChange}
          required={required}
        />
      </label>
    </div>
  );
};

export default TextInput;
