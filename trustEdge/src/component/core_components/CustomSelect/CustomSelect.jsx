import React from "react";
import Select from "react-select";

const CustomSelect = ({
  value = null,
  onChange,
  options = [],
  placeholder = "Select...",
  width = "w-full",
  isDisabled = false,
  isClearable = true,
  isSearchable = true,
  name = "",
  className = "",
  error = false,
}) => {
  const handleChange = (selectedOption) => {
    onChange?.(selectedOption);
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: error
        ? "#ef4444"
        : state.isFocused
        ? "#3b82f6"
        : "#d1d5db",
      boxShadow: error
        ? "0 0 0 1px #ef4444"
        : state.isFocused
        ? "0 0 0 1px #3b82f6"
        : "none",
      "&:hover": {
        borderColor: error ? "#dc2626" : "#9ca3af",
      },
    }),
  };

  return (
    <div className={`${width} ${className}`}>
      <Select
        name={name}
        value={value}
        options={options}
        onChange={handleChange}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isClearable={isClearable}
        isSearchable={isSearchable}
        className="text-sm"
        classNamePrefix="custom-select"
        styles={customStyles}
      />
    </div>
  );
};

export default CustomSelect;
