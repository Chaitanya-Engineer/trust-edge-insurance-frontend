import React, { useState } from "react";
import {
  ShieldAlert,
  Award,
  FileCheck2,
  Clock,
  Building2,
  CheckCircle2,
} from "lucide-react";
import NoDataFound from "../../../../component/core_components/NoDataFound/NoDataFound";

export default function ClaimsPartnersTab({
  claims = [],
  partnerPerformance = [],
  onResetFilters,
}) {
  const [activeSection, setActiveSection] = useState("claims"); // "claims" | "partners"
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const formatINR = (val) => Number(val || 0).toLocaleString("en-IN");

  // Claims summary calculations
  const totalClaimsCount = claims.length;
  const settledClaimsCount = claims.filter((c) => c.status === "Settled").length;
  const inReviewClaimsCount = claims.filter(
    (c) => c.status === "Under Review" || c.status === "Approved"
  ).length;
  const settlementRate =
    totalClaimsCount > 0
      ? ((settledClaimsCount / totalClaimsCount) * 100).toFixed(1)
      : "0.0";

  const totalClaimedAmt = claims.reduce((acc, c) => acc + (c.claimed_amount || 0), 0);
  const totalSettledAmt = claims.reduce((acc, c) => acc + (c.settled_amount || 0), 0);

  // Pagination
  const currentList = activeSection === "claims" ? claims : partnerPerformance;
  const totalPages = Math.ceil(currentList.length / pageSize) || 1;
  const paginatedList = currentList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Total gross premium across partners for percentage
  const totalPartnerGross = partnerPerformance.reduce(
    (acc, p) => acc + (p.premium || 0),
    0
  );

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Top Claims & Underwriting KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Settlement Ratio */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E9E7] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200 min-h-[125px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
              Settlement Ratio (CSR)
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 text-[#2F6F3E] flex items-center justify-center shrink-0">
              <Award className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <div className="text-[24px] font-extrabold text-[#0B2545] tracking-tight">
              {settlementRate}%
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{settledClaimsCount} of {totalClaimsCount} settled</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Total Disbursed */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E9E7] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200 min-h-[125px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
              Total Disbursed
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-[#0B2545] flex items-center justify-center shrink-0">
              <FileCheck2 className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <div className="text-[24px] font-extrabold text-[#0B2545] tracking-tight">
              ₹{formatINR(totalSettledAmt)}
            </div>
            <p className="text-[11px] text-[#667085] mt-1">
              From ₹{formatINR(totalClaimedAmt)} claimed
            </p>
          </div>
        </div>

        {/* KPI 3: Under Review */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E9E7] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200 min-h-[125px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
              Under Review
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 text-[#C9A227] flex items-center justify-center shrink-0">
              <Clock className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <div className="text-[24px] font-extrabold text-[#B54708] tracking-tight">
              {inReviewClaimsCount} Claims
            </div>
            <p className="text-[11px] text-amber-700 font-medium mt-1">
              Avg TAT: 4.2 business days
            </p>
          </div>
        </div>

        {/* KPI 4: Underwriter Partners */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E9E7] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200 min-h-[125px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
              Underwriter Partners
            </span>
            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 text-[#0B2545] flex items-center justify-center shrink-0">
              <Building2 className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <div className="text-[24px] font-extrabold text-[#0B2545] tracking-tight">
              {partnerPerformance.length} Partners
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-[#2F6F3E] mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% active SLA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Switch: Claims Register vs Partner Ledger */}
      <div className="bg-white rounded-2xl border border-[#E5E9E7] p-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              setActiveSection("claims");
              setCurrentPage(1);
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSection === "claims"
                ? "bg-[#0B2545] text-white shadow-sm"
                : "text-[#667085] hover:bg-gray-100 hover:text-[#0B2545]"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Claims Settlement Register</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-[#0B2545] font-semibold">
              {claims.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveSection("partners");
              setCurrentPage(1);
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSection === "partners"
                ? "bg-[#0B2545] text-white shadow-sm"
                : "text-[#667085] hover:bg-gray-100 hover:text-[#0B2545]"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Underwriter Partner Performance</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-[#0B2545] font-semibold">
              {partnerPerformance.length}
            </span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-[#E5E9E7] overflow-hidden shadow-sm">
        {currentList.length === 0 ? (
          <NoDataFound
            title="No Records Found"
            description="No matching claim or underwriter partner data meets your active filter criteria."
            onClearFilters={onResetFilters}
            compact
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E5E9E7] text-[#667085] font-semibold text-[11px] uppercase tracking-wider">
                    {activeSection === "claims" ? (
                      <>
                        <th className="py-3 px-4">Claim ID</th>
                        <th className="py-3 px-4">Policy ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Underwriter & Line</th>
                        <th className="py-3 px-4 text-right">Claimed Amt</th>
                        <th className="py-3 px-4 text-right">Settled Amt</th>
                        <th className="py-3 px-4 text-center">TAT</th>
                        <th className="py-3 px-4 text-center">Status</th>
                      </>
                    ) : (
                      <>
                        <th className="py-3 px-4">Insurance Underwriter</th>
                        <th className="py-3 px-4 text-center">Policies Underwritten</th>
                        <th className="py-3 px-4 text-right">Gross Written Premium</th>
                        <th className="py-3 px-4 text-center">Volume Share</th>
                        <th className="py-3 px-4 text-center">Integration Status</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E9E7]/60">
                  {activeSection === "claims"
                    ? paginatedList.map((claim) => (
                        <tr
                          key={claim.claim_id}
                          className="hover:bg-[#F8FAFC]/80 transition"
                        >
                          <td className="py-3.5 px-4 font-mono font-bold text-[#0B2545]">
                            {claim.claim_id}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[#667085]">
                            {claim.policy_id}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-[#0B2545]">
                            {claim.customer_name}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-[#0B2545]">
                              {claim.partner}
                            </div>
                            <div className="text-[10px] text-[#667085]">
                              {claim.category}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right font-medium text-[#0B2545]">
                            ₹{formatINR(claim.claimed_amount)}
                          </td>
                          <td className="py-3.5 px-4 text-right font-bold text-[#2F6F3E]">
                            ₹{formatINR(claim.settled_amount)}
                          </td>
                          <td className="py-3.5 px-4 text-center text-[#667085]">
                            {claim.tat_days} days
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                claim.status === "Settled"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : claim.status === "Approved"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : claim.status === "Under Review"
                                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                                  : "bg-rose-50 text-rose-700 border border-rose-200"
                              }`}
                            >
                              {claim.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    : paginatedList.map((partner) => {
                        const share =
                          totalPartnerGross > 0
                            ? ((partner.premium / totalPartnerGross) * 100).toFixed(1)
                            : 0;
                        return (
                          <tr
                            key={partner.name}
                            className="hover:bg-[#F8FAFC]/80 transition"
                          >
                            <td className="py-3.5 px-4 font-bold text-[#0B2545] flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-[#0B2545]/5 text-[#0B2545] flex items-center justify-center font-bold text-xs">
                                {partner.name.charAt(0)}
                              </div>
                              <span>{partner.name}</span>
                            </td>
                            <td className="py-3.5 px-4 text-center font-bold text-[#0B2545]">
                              {partner.policiesCount}
                            </td>
                            <td className="py-3.5 px-4 text-right font-bold text-[#0B2545]">
                              ₹{formatINR(partner.premium)}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <div className="inline-flex items-center gap-2">
                                <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                  <div
                                    className="bg-[#0B2545] h-1.5 rounded-full"
                                    style={{ width: `${share}%` }}
                                  />
                                </div>
                                <span className="font-semibold text-[11px] text-[#0B2545]">
                                  {share}%
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2F6F3E]">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Direct API Sync</span>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="p-3.5 bg-[#F8FAFC] border-t border-[#E5E9E7] flex items-center justify-between text-xs text-[#667085]">
              <span>
                Showing {Math.min(currentList.length, (currentPage - 1) * pageSize + 1)} to{" "}
                {Math.min(currentPage * pageSize, currentList.length)} of {currentList.length} items
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-2.5 py-1 rounded-lg border border-[#E5E9E7] bg-white text-[#0B2545] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition cursor-pointer font-medium"
                >
                  Prev
                </button>
                <span className="px-2 font-bold text-[#0B2545]">
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-2.5 py-1 rounded-lg border border-[#E5E9E7] bg-white text-[#0B2545] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition cursor-pointer font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
