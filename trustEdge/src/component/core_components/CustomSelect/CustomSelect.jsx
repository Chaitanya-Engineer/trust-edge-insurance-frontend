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
}) => {
  const handleChange = (selectedOption) => {
    onChange?.(selectedOption);
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
      />
    </div>
  );
};

export default CustomSelect;
