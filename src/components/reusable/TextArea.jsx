import React from "react";

const TextArea = ({ label, value, onChange, required }) => {
  return (
    <div>
      <label>
        <span>{label}</span>
        <textarea
          value={value}
          name={name}
          onChange={(e) => onChange({ [name]: e.target.value })}
          required={required}
        />
      </label>
    </div>
  );
};

export default TextArea;
