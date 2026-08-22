import React from "react";

const CustomTimePicker = ({
  value = "",
  onChange,
  width = "w-full",
  disabled = false,
  className = "",
  error = false,
}) => {
  const handleChange = (e) => {
    onChange?.(e.target.value, e);
  };

  return (
    <input
      type="time"
      value={value}
      onChange={handleChange}
      disabled={disabled}
      className={`${width} ${className} h-10 rounded-md border ${
        error
          ? "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-1"
          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
      } bg-white px-3 text-sm text-gray-800 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100`}
    />
  );
};

export default CustomTimePicker;
