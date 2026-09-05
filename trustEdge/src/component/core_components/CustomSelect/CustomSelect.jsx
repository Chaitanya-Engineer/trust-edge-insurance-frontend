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
      height: "44px",
      minHeight: "44px",
      borderRadius: "8px",
      backgroundColor: "#FFFFFF",
      borderColor: error
        ? "#B42318"
        : state.isFocused
        ? "#0B2545"
        : "#D9E0DD",
      boxShadow: error
        ? "0 0 0 3px rgba(180, 35, 24, 0.10)"
        : state.isFocused
        ? "0 0 0 3px rgba(11, 37, 69, 0.10)"
        : "none",
      "&:hover": {
        borderColor: error ? "#B42318" : "#0B2545",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 12px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#98A2B3",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#EAF0F6"
        : state.isFocused
        ? "#F4F7F6"
        : "#FFFFFF",
      color: "#17212B",
      "&:active": {
        backgroundColor: "#EAF0F6",
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
