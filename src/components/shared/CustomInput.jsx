import React from "react";

export const CustomInput = ({
  label,
  placeholder,
  name,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        required
        placeholder={placeholder}
        className="bg-transparent px-2 py-1 border rounded-lg"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
