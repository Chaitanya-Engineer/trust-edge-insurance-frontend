import React from "react";
import { FileSpreadsheet, ArrowDownRight, ArrowUpRight, DollarSign, Wallet } from "lucide-react";

export default function FinancialSummarySection({ financials }) {
  const formatINR = (val) => Number(val || 0).toLocaleString("en-IN");

  const moneyReceivedBreakdown = [
    { label: "Online Direct Premiums (UPI / Cards)", value: 16800000, share: "67.6%" },
    { label: "NetBanking & Corporate RTGS", value: 5250000, share: "21.1%" },
    { label: "Cleared Cheques & Direct Deposits", value: 2800000, share: "11.3%" },
  ];

  const moneyOutstandingBreakdown = [
    { label: "Outstanding Customer Premium (Grace Period)", value: 2450000, type: "Pending Receipt" },
    { label: "Cheques in Transit for Bank Clearance", value: 750000, type: "Processing" },
    { label: "Approved Claims Pending Disbursement", value: 420000, type: "Pending Payout" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E5E9E7] p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-[#E5E9E7]">
        <div>
          <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-[#0B2545]" />
            Financial Summary & Cash Position
          </h3>
          <p className="text-xs text-[#667085] mt-0.5">
            Institutional cash reconciliation clearly distinguishing Money Received vs Money Outstanding.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Money Received (Inflows / Realized) */}
        <div className="border border-[#CDE5D2] bg-[#FAFCFA] rounded-xl p-4.5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#CDE5D2]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2F6F3E]" />
              <h4 className="text-xs font-bold text-[#2F6F3E] uppercase tracking-wider">
                Money Received (Inflow)
              </h4>
            </div>
            <span className="text-sm font-extrabold text-[#2F6F3E]">
              ₹{formatINR(financials.totalCollected)}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {moneyReceivedBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-1 border-b border-[#EAF4EC] last:border-none">
                <span className="text-[#334155] font-medium">{item.label}</span>
                <div className="text-right">
                  <span className="font-bold text-[#0B2545]">₹{formatINR(item.value)}</span>
                  <span className="text-[10px] text-gray-500 ml-1.5 font-mono">({item.share})</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#CDE5D2] flex justify-between items-center text-xs font-bold text-[#2F6F3E]">
            <span>Net Realized Collections</span>
            <span>₹{formatINR(financials.totalCollected)}</span>
          </div>
        </div>

        {/* Money Outstanding (Outflows & Pending Receivables) */}
        <div className="border border-[#F9DBAF] bg-[#FFFDF9] rounded-xl p-4.5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#F9DBAF]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B54708]" />
              <h4 className="text-xs font-bold text-[#B54708] uppercase tracking-wider">
                Money Outstanding (Pending)
              </h4>
            </div>
            <span className="text-sm font-extrabold text-[#B54708]">
              ₹{formatINR(financials.outstandingPremium)}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {moneyOutstandingBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-1 border-b border-[#FEF6EE] last:border-none">
                <span className="text-[#334155] font-medium">{item.label}</span>
                <div className="text-right">
                  <span className="font-bold text-[#B54708]">₹{formatINR(item.value)}</span>
                  <span className="text-[10px] bg-amber-100/70 text-amber-800 px-1.5 py-0.2 rounded font-semibold ml-1.5">
                    {item.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#F9DBAF] flex justify-between items-center text-xs font-bold text-[#B54708]">
            <span>Total Outstanding Exposure</span>
            <span>₹{formatINR(financials.outstandingPremium)}</span>
          </div>
        </div>
      </div>

      {/* Net Underwriting Result Line */}
      <div className="bg-[#0B2545] text-white p-3.5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white flex-shrink-0">
            <Wallet className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold">Net Retained Underwriting Position</div>
            <div className="text-[11px] text-gray-300">
              Total Premium Collected (₹{formatINR(financials.totalCollected)}) − Settled Claims (₹{formatINR(financials.claimsPaid)}) − Refunds (₹{formatINR(financials.totalRefunds)})
            </div>
          </div>
        </div>
        <div className="text-lg font-extrabold text-emerald-400 self-end sm:self-auto font-mono">
          +₹{formatINR(financials.netPremium)}
        </div>
      </div>
    </div>
  );
}
