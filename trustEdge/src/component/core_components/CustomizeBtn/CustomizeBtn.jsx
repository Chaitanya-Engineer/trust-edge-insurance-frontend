import React from "react";

const CustomizeBtn = ({ disabled = false, onClick, title, type = "button" }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-[9px] px-4 py-2.5 text-[13px] font-semibold transition-colors ${
        disabled
          ? "bg-[#F2F4F7] text-[#667085] cursor-not-allowed"
          : "bg-[#2F6F3E] hover:bg-[#255A32] text-white"
      }`}
    >
      {title}
    </button>
  );
};

export default CustomizeBtn;
