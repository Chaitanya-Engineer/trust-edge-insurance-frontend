import React from "react";
import dataNotFoundIllustration from "../../../assets/Data_Not_Found_Illustration.png";
import { RotateCw, FilterX, AlertCircle } from "lucide-react";

/**
 * NoDataFound Component
 *
 * Used both inside TableComponent (when records are empty / filtered out / API fails)
 * and as a standalone canvas empty-state across pages & modals.
 */
const NoDataFound = ({
  title,
  description,
  isError = false,
  errorMessage = "",
  onRetry = null,
  onClearFilters = null,
  action = null,
  className = "",
  imageClassName = "",
  compact = false,
}) => {
  const resolvedTitle =
    title || (isError ? "Unable to Load Data" : "No Data Found");

  const resolvedDescription =
    description ||
    (isError
      ? errorMessage ||
        "We encountered an issue communicating with the server. Please check your connection or try again."
      : "There are currently no records available to display.");

  return (
    <div
      className={`flex flex-col items-center justify-center text-center select-none transition-all duration-300 ${
        compact ? "py-6 px-3" : "py-10 px-4 sm:py-12"
      } ${className}`}
    >
      {/* 3D Brand Illustration */}
      <div className="relative mb-3 flex items-center justify-center">
        <img
          src={dataNotFoundIllustration}
          alt={resolvedTitle}
          className={`object-contain transition-transform duration-300 hover:scale-102 ${
            compact ? "w-40 max-h-36" : "w-56 sm:w-64 max-h-56"
          } ${imageClassName}`}
          loading="lazy"
        />

        {isError && (
          <div className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-[#FDECEC] border border-[#FCD2D2] text-[#B42318] shadow-sm animate-bounce">
            <AlertCircle className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Title */}
      <h3
        className={`font-bold tracking-tight text-[#0B2545] font-sans ${
          compact ? "text-[15px]" : "text-[18px] sm:text-[20px]"
        }`}
      >
        {resolvedTitle}
      </h3>

      {/* Description */}
      <p
        className={`mt-1.5 text-[#667085] leading-relaxed max-w-md ${
          compact ? "text-xs" : "text-xs sm:text-sm"
        }`}
      >
        {resolvedDescription}
      </p>

      {/* Action Buttons */}
      {(onRetry || onClearFilters || action) && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 rounded-[9px] bg-[#0B2545] hover:bg-[#0E2F52] text-white px-4 py-2 text-xs font-semibold shadow-sm transition-all duration-150 active:scale-98 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
          )}

          {onClearFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 rounded-[9px] border border-[#D0DCEB] bg-white hover:bg-[#F4F7F6] text-[#0B2545] px-4 py-2 text-xs font-semibold transition-all duration-150 active:scale-98 cursor-pointer"
            >
              <FilterX className="w-3.5 h-3.5 text-[#667085]" />
              <span>Clear Filters</span>
            </button>
          )}

          {action}
        </div>
      )}
    </div>
  );
};

export default NoDataFound;
