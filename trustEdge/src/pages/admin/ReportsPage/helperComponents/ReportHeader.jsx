import React from "react";
import { Download, Filter, Calendar, RotateCcw } from "lucide-react";
import { DATE_RANGE_OPTIONS } from "../constant";

export default function ReportHeader({
  selectedDateRange,
  onDateRangeChange,
  showFilters,
  onToggleFilters,
  onOpenExport,
  isFiltered,
  onResetFilters,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-[#E5E9E7]">
      <div>
        <h1 className="text-[26px] font-bold text-[#0B2545] tracking-tight font-sans">
          Reports & Analytics
        </h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Monitor insurance performance, financial activity, claims, renewals, and operational insights.
        </p>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Quick Date Range Selector */}
        <div className="flex items-center gap-1.5 bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 shadow-2xs">
          <Calendar className="w-3.5 h-3.5 text-[#0B2545]" />
          <select
            value={selectedDateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="text-xs font-semibold text-[#0B2545] bg-transparent outline-none cursor-pointer"
          >
            {DATE_RANGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Toggle Button */}
        <button
          type="button"
          onClick={onToggleFilters}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer ${
            showFilters
              ? "bg-[#0B2545] text-white"
              : "bg-white border border-[#CBD5E1] text-[#0B2545] hover:bg-[#F0F4F8]"
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Filters</span>
          {isFiltered && (
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          )}
        </button>

        {/* Reset Filter Button if Filtered */}
        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition cursor-pointer"
            title="Reset All Filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}

        {/* Export Report Button */}
        <button
          type="button"
          onClick={onOpenExport}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0B2545] hover:bg-[#0E2F52] shadow-xs transition active:scale-98 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Report</span>
        </button>
      </div>
    </div>
  );
}
