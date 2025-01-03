import React, { useState } from "react";

export default function DateInput({ id, name, value, onChange, fallback, disabled }) {
  const [internalValue, setInternalValue] = useState(value || fallback || "");

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue === "" || /^[\d-]*$/.test(newValue)) {
      setInternalValue(newValue);
    }
  };

  const handleBlur = (e) => {
    if (isNaN(new Date(internalValue))) {
      setInternalValue(fallback || "");
      onChange(e, fallback || "");
    } else {
      onChange(e, internalValue);
    }
  };

  return (
    <input
      type="text"
      id={id}
      name={name}
      value={internalValue}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled}
    />
  );
}
