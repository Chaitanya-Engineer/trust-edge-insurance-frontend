import React from "react";
import {
  ShieldAlert,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  FileSearch,
  ArrowRight,
} from "lucide-react";

export default function ClaimsPerformanceSection({ claimsStats }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E9E7] p-5 shadow-xs space-y-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#E5E9E7]">
        <div>
          <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#0B2545]" />
            Claims Performance & Settlement Efficiency
          </h3>
          <p className="text-xs text-[#667085] mt-0.5">
            Operational claims intake, review bottlenecks, approved settlements, and settlement ratio KPI.
          </p>
        </div>

        {/* Claim Settlement Ratio (CSR) Prominent Badge */}
        <div className="flex items-center gap-2 bg-[#EAF4EC] border border-[#CDE5D2] px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
          <CheckCircle2 className="w-4 h-4 text-[#2F6F3E]" />
          <div>
            <div className="text-[10px] uppercase font-bold text-[#2F6F3E]">
              Claim Settlement Ratio (CSR)
            </div>
            <div className="text-base font-extrabold text-[#2F6F3E]">
              {claimsStats.settlementRatio}%
              <span className="text-[10px] font-normal text-[#2F6F3E]/80 ml-1">
                (Industry Benchmark ≥ 90%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Claims Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {/* Total Claims */}
        <div className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E5E9E7]">
          <span className="text-[11px] font-bold text-[#667085] block mb-1">
            Total Claims
          </span>
          <p className="text-lg font-bold text-[#0B2545]">{claimsStats.total}</p>
          <span className="text-[10px] text-gray-400">Claims logged</span>
        </div>

        {/* Claims Received */}
        <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100">
          <span className="text-[11px] font-bold text-blue-900 block mb-1">
            Received
          </span>
          <p className="text-lg font-bold text-blue-900">{claimsStats.total}</p>
          <span className="text-[10px] text-blue-600">Fresh intake</span>
        </div>

        {/* Under Review */}
        <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200">
          <span className="text-[11px] font-bold text-amber-900 block mb-1">
            Under Review
          </span>
          <p className="text-lg font-bold text-amber-800">{claimsStats.underReview}</p>
          <span className="text-[10px] text-amber-700">Audit in progress</span>
        </div>

        {/* Approved */}
        <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100">
          <span className="text-[11px] font-bold text-indigo-900 block mb-1">
            Approved
          </span>
          <p className="text-lg font-bold text-indigo-800">{claimsStats.approved}</p>
          <span className="text-[10px] text-indigo-700">Awaiting disbursement</span>
        </div>

        {/* Settled */}
        <div className="p-3 rounded-xl bg-[#EAF4EC] border border-[#CDE5D2]">
          <span className="text-[11px] font-bold text-[#2F6F3E] block mb-1">
            Settled
          </span>
          <p className="text-lg font-bold text-[#2F6F3E]">{claimsStats.settled}</p>
          <span className="text-[10px] text-[#2F6F3E]/80">Disbursed successfully</span>
        </div>

        {/* Rejected */}
        <div className="p-3 rounded-xl bg-[#FDECEC] border border-[#FCD2D2]">
          <span className="text-[11px] font-bold text-[#B42318] block mb-1">
            Rejected
          </span>
          <p className="text-lg font-bold text-[#B42318]">{claimsStats.rejected}</p>
          <span className="text-[10px] text-[#B42318]/80">Ineligible / Fraud</span>
        </div>

        {/* Pending (>30 Days) */}
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
          <span className="text-[11px] font-bold text-rose-800 block mb-1">
            Overdue Pending
          </span>
          <p className="text-lg font-bold text-rose-700">{claimsStats.pending}</p>
          <span className="text-[10px] text-rose-600">&gt;30 days aging</span>
        </div>
      </div>

      {/* Visual Claims Movement Workflow */}
      <div className="bg-[#F8FAF9] rounded-xl border border-[#E5E9E7] p-4">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#667085] mb-3">
          Claim Resolution Pipeline Movement
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          {/* Stage 1 */}
          <div className="bg-white p-3 rounded-xl border border-[#E5E9E7] shadow-2xs flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-[#667085] uppercase">
                Stage 1: Intake & Docs
              </div>
              <div className="text-xs font-bold text-[#0B2545] mt-0.5">
                {claimsStats.total} Intimated
              </div>
              <div className="text-[10px] text-gray-500">100% verified</div>
            </div>
            <FileSearch className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </div>

          {/* Stage 2 */}
          <div className="bg-white p-3 rounded-xl border border-[#E5E9E7] shadow-2xs flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-amber-700 uppercase">
                Stage 2: Adjudication
              </div>
              <div className="text-xs font-bold text-[#0B2545] mt-0.5">
                {claimsStats.underReview} Under Scrutiny
              </div>
              <div className="text-[10px] text-gray-500">Avg 2.4 days</div>
            </div>
            <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
          </div>

          {/* Stage 3 */}
          <div className="bg-white p-3 rounded-xl border border-[#E5E9E7] shadow-2xs flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-indigo-700 uppercase">
                Stage 3: Approved
              </div>
              <div className="text-xs font-bold text-[#0B2545] mt-0.5">
                {claimsStats.approved} Cleared
              </div>
              <div className="text-[10px] text-gray-500">Bank processing</div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0" />
          </div>

          {/* Stage 4 */}
          <div className="bg-white p-3 rounded-xl border border-[#E5E9E7] shadow-2xs flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-[#2F6F3E] uppercase">
                Stage 4: Completed
              </div>
              <div className="text-xs font-bold text-[#2F6F3E] mt-0.5">
                {claimsStats.settled} Settled (₹21.5L)
              </div>
              <div className="text-[10px] text-[#2F6F3E]/80">4.2 Days Avg TAT</div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-[#2F6F3E] flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
