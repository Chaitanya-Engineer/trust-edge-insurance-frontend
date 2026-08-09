import React from "react";

const CustomInput = ({
  value = "",
  onChange,
  width = "w-full",
  type = "text",
  placeholder = "",
  disabled = false,
  name = "",
  className = "",
}) => {
  const handleChange = (e) => {
    let inputValue = e.target.value;

    // Only numbers
    if (type === "numeric") {
      inputValue = inputValue.replace(/[^0-9]/g, "");
    }

    // Only letters and numbers
    if (type === "alphanumeric") {
      inputValue = inputValue.replace(/[^a-zA-Z0-9]/g, "");
    }

    onChange?.(inputValue, e);
  };

  return (
    <input
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`${width} ${className} h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100`}
    />
  );
};

export default CustomInput;
