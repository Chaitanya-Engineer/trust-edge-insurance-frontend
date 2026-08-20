import React from "react";

const CustomDatePicker = ({
  value = "",
  defaultDate = "",
  onChange,
  width = "w-full",
  disabled = false,
  min,
  max,
  className = "",
  error = false,
}) => {
  const selectedDate = value || defaultDate;

  const handleChange = (e) => {
    onChange?.(e.target.value, e);
  };

  return (
    <input
      type="date"
      value={selectedDate}
      onChange={handleChange}
      disabled={disabled}
      min={min}
      max={max}
      className={`${width} ${className} h-10 rounded-md border ${
        error
          ? "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-1"
          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
      } bg-white px-3 text-sm text-gray-800 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100`}
    />
  );
};

export default CustomDatePicker;
