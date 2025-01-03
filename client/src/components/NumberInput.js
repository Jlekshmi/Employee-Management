import React, { useState } from "react";

export default function NumberInput({ id, name, value, onChange, required, fallback, disabled }) {
  const [internalValue, setInternalValue] = useState(value || fallback);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue === "" || /^\d+$/.test(newValue)) {
      setInternalValue(newValue);
    }
  };

  const handleBlur = (e) => {
    onChange(e, parseInt(internalValue));
  };

  return (
    <input
      type="text"
      id={id}
      name={name}
      value={internalValue}
      onChange={handleChange}
      onBlur={handleBlur}
      required={required}
      disabled={disabled}
    />
  );
}
