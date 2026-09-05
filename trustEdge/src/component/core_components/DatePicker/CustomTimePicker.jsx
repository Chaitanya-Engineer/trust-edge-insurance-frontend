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
      className={`${width} ${className} h-11 rounded-lg border ${error
        ? "border-[#B42318] focus:border-[#B42318] focus:ring-[3px] focus:ring-[rgba(180,35,24,0.10)]"
        : "border-[#D9E0DD] focus:border-[#0B2545] focus:ring-[3px] focus:ring-[rgba(11,37,69,0.10)]"
        } bg-white px-3 text-sm text-[#17212B] outline-none transition disabled:cursor-not-allowed disabled:bg-[#F4F7F6]`}
    />
  );
};

export default CustomTimePicker;
