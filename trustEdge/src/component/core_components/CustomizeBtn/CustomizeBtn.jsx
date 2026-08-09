import React from "react";

const CustomizeBtn = ({ disabled = false, onClick, title }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg p-2 ${
        disabled
          ? "bg-black text-light-gray"
          : "bg-gold hover:bg-gold-light text-navy"
      }`}
    >
      {title}
    </button>
  );
};

export default CustomizeBtn;
