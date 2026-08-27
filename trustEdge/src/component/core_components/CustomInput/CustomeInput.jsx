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
  error = false,
  maxLength,
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
      type={type === "numeric" || type === "alphanumeric" ? "text" : type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      className={`${width} ${className} h-11 rounded-lg border ${
        error
          ? "border-[#B42318] focus:border-[#B42318] focus:ring-[3px] focus:ring-[rgba(180,35,24,0.10)]"
          : "border-[#D9E0DD] focus:border-[#0B2545] focus:ring-[3px] focus:ring-[rgba(11,37,69,0.10)]"
      } bg-white px-3 text-sm text-[#17212B] placeholder-[#98A2B3] outline-none transition disabled:cursor-not-allowed disabled:bg-[#F4F7F6]`}
    />
  );
};

export default CustomInput;
