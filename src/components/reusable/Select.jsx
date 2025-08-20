import React from "react";
import { CATEGORIES } from "../../utils/mockData";

const Select = ({ label, name, value, onChange, required }) => {
  return (
    <div>
      <label>
        <span>{label}</span>
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Select;
