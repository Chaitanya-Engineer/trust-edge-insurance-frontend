import React, { useState } from "react";
import PropTypes from "prop-types";
import { RotateCcw, AlertCircle, FolderOpen } from "lucide-react";
import noDataIllustration from "../../../assets/Data_Not_Found_Illustration.png";

/**
 * NoDataFound Component
 *
 * Prominent empty-state component featuring a high-res noticeable illustration
 * and a focused "Try Again" action button.
 */
const NoDataFound = ({
  title,
  description,
  isError = false,
  errorMessage = "",
  onRetry = null,
  action = null,
  className = "",
  imageClassName = "",
  compact = false,
  illustration = noDataIllustration,
}) => {
  const [imageError, setImageError] = useState(false);

  const resolvedDescription =
    description ||
    (isError
      ? errorMessage || "An unexpected issue occurred while loading data. Please try again."
      : "There are currently no records available to display.");

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center text-center select-none py-4 px-4 ${className}`}
    >
      {/* ── Big Noticeable Illustration ──────────────────────── */}
      <div className="relative flex items-center justify-center mb-3 group">
        {!imageError && illustration ? (
          <img
            src={illustration}
            alt={title || "Data Not Found"}
            onError={() => setImageError(true)}
            className={`object-contain transition-transform duration-300 ease-out group-hover:scale-102 drop-shadow-md ${
              compact
                ? "w-64 max-w-[260px] sm:max-w-[300px] h-auto"
                : "w-72 sm:w-84 md:w-96 max-w-[380px] h-auto"
            } ${imageClassName}`}
            loading="lazy"
          />
        ) : (
          <div
            className={`flex items-center justify-center rounded-2xl ${
              isError
                ? "bg-red-50 text-red-500 border border-red-100"
                : "bg-slate-50 text-slate-400 border border-slate-200/80"
            } ${compact ? "w-28 h-28" : "w-36 h-36"}`}
          >
            {isError ? (
              <AlertCircle size={compact ? 44 : 56} strokeWidth={1.75} />
            ) : (
              <FolderOpen size={compact ? 44 : 56} strokeWidth={1.75} />
            )}
          </div>
        )}
      </div>

      {/* ── Content Details ─────────────────────────────────── */}
      <div className="max-w-md mx-auto space-y-1.5 px-2">
        {title && (
          <h3 className="text-base sm:text-lg font-bold text-[#0B2545] tracking-tight">
            {title}
          </h3>
        )}

        {resolvedDescription && (
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm sm:max-w-md font-normal leading-relaxed">
            {resolvedDescription}
          </p>
        )}

        {isError && errorMessage && (
          <div className="mt-2 text-xs font-mono text-red-600 bg-red-50/80 border border-red-100 rounded-lg px-3 py-1.5 inline-block max-w-xs break-all">
            {errorMessage}
          </div>
        )}
      </div>

      {/* ── Primary Action: "Try Again" ─────────────────────── */}
      {(onRetry || action) && (
        <div className="mt-6 flex items-center justify-center">
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="group inline-flex items-center gap-2.5 px-6 py-2.5 text-sm font-semibold rounded-xl text-white bg-[#0B2545] hover:bg-[#133E6D] active:scale-95 transition-all duration-200 cursor-pointer shadow-md shadow-[#0B2545]/20 hover:shadow-lg hover:shadow-[#0B2545]/30"
            >
              <RotateCcw
                size={16}
                className="transition-transform duration-500 ease-out group-hover:-rotate-180"
              />
              <span>Try Again</span>
            </button>
          ) : (
            action
          )}
        </div>
      )}
    </div>
  );
};

NoDataFound.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  onRetry: PropTypes.func,
  action: PropTypes.node,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  compact: PropTypes.bool,
  illustration: PropTypes.string,
};

export default NoDataFound;
