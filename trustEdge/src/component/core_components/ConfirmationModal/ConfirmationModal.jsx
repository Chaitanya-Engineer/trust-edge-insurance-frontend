import React, { useEffect } from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "Please confirm your action to proceed.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary", // 'primary' | 'warning' | 'danger' | 'success'
  isLoading = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          iconBg: "bg-[#FDECEC] text-[#B42318]",
          icon: "⚠️",
          confirmBtn: "bg-[#B42318] hover:bg-[#911B13] text-white active:bg-[#72150F]",
        };
      case "warning":
        return {
          iconBg: "bg-[#FBF5DF] text-[#C9A227]",
          icon: "📌",
          confirmBtn: "bg-[#0B2545] hover:bg-[#061527] text-white active:bg-[#030A14]",
        };
      case "success":
        return {
          iconBg: "bg-[#EAF4EC] text-[#2F6F3E]",
          icon: "✓",
          confirmBtn: "bg-[#2F6F3E] hover:bg-[#235630] text-white active:bg-[#1A4224]",
        };
      case "primary":
      default:
        return {
          iconBg: "bg-[#EAF0F6] text-[#0B2545]",
          icon: "❓",
          confirmBtn: "bg-[#0B2545] hover:bg-[#061527] text-white active:bg-[#030A14]",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
      onClick={() => !isLoading && onClose()}
    >
      <div
        className="w-full max-w-md bg-white border border-[#E5E9E7] rounded-2xl p-6 shadow-2xl transition-transform transform scale-100 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg shrink-0 ${styles.iconBg}`}
          >
            {styles.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#0B2545] leading-snug">
              {title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-[9px] border border-[#CBD5E1] bg-white text-xs sm:text-sm font-semibold text-[#0B2545] hover:bg-[#F8FAFC] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-[9px] text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 ${styles.confirmBtn}`}
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
