import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import {
  CATEGORY_OPTIONS,
  PARTNER_OPTIONS,
  POLICY_STATUS_OPTIONS,
  CLAIM_STATUS_OPTIONS,
  PAYMENT_STATUS_OPTIONS,
} from "../constant";

export default function ReportFilters({
  filters,
  onFilterChange,
  onResetFilters,
  isOpen,
}) {
  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-2xl border border-[#E5E9E7] p-4 shadow-xs animate-fadeIn space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#E5E9E7]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#0B2545]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
            Global Report Filters
          </h3>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* 1. Insurance Category */}
        <div>
          <label className="block text-[11px] font-semibold text-[#667085] mb-1">
            Insurance Category
          </label>
          <select
            value={filters.category || "ALL"}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="w-full text-xs rounded-xl border border-[#CBD5E1] bg-white text-[#0B2545] py-2 px-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545] cursor-pointer"
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Insurance Partner */}
        <div>
          <label className="block text-[11px] font-semibold text-[#667085] mb-1">
            Insurance Partner
          </label>
          <select
            value={filters.partner || "ALL"}
            onChange={(e) => onFilterChange("partner", e.target.value)}
            className="w-full text-xs rounded-xl border border-[#CBD5E1] bg-white text-[#0B2545] py-2 px-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545] cursor-pointer"
          >
            {PARTNER_OPTIONS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Policy Status */}
        <div>
          <label className="block text-[11px] font-semibold text-[#667085] mb-1">
            Policy Status
          </label>
          <select
            value={filters.policyStatus || "ALL"}
            onChange={(e) => onFilterChange("policyStatus", e.target.value)}
            className="w-full text-xs rounded-xl border border-[#CBD5E1] bg-white text-[#0B2545] py-2 px-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545] cursor-pointer"
          >
            {POLICY_STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Claim Status */}
        <div>
          <label className="block text-[11px] font-semibold text-[#667085] mb-1">
            Claim Status
          </label>
          <select
            value={filters.claimStatus || "ALL"}
            onChange={(e) => onFilterChange("claimStatus", e.target.value)}
            className="w-full text-xs rounded-xl border border-[#CBD5E1] bg-white text-[#0B2545] py-2 px-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545] cursor-pointer"
          >
            {CLAIM_STATUS_OPTIONS.map((cs) => (
              <option key={cs.value} value={cs.value}>
                {cs.label}
              </option>
            ))}
          </select>
        </div>

        {/* 5. Payment Status */}
        <div>
          <label className="block text-[11px] font-semibold text-[#667085] mb-1">
            Payment Status
          </label>
          <select
            value={filters.paymentStatus || "ALL"}
            onChange={(e) => onFilterChange("paymentStatus", e.target.value)}
            className="w-full text-xs rounded-xl border border-[#CBD5E1] bg-white text-[#0B2545] py-2 px-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545] cursor-pointer"
          >
            {PAYMENT_STATUS_OPTIONS.map((ps) => (
              <option key={ps.value} value={ps.value}>
                {ps.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
