import React from "react";
import { RefreshCw, Calendar, AlertCircle, CheckCircle2, Clock, BellRing } from "lucide-react";
import { MASTER_RENEWALS } from "../constant";
import { showToast } from "../../../../component/core_components/CustomToast/CustomToast";

export default function RenewalReportSection({ renewalsStats }) {
  const formatINR = (val) => Number(val || 0).toLocaleString("en-IN");

  const handleSendReminder = (policy) => {
    showToast.success(
      "Renewal Reminder Dispatched",
      `Automated renewal notice sent to ${policy.customer} for Policy ${policy.policyNumber}`
    );
  };

  const getRenewalBadge = (status) => {
    switch (status) {
      case "Due This Week":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3 h-3" />
            Due This Week
          </span>
        );
      case "Due Soon":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" />
            Due Soon
          </span>
        );
      case "Upcoming":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            <Calendar className="w-3 h-3" />
            Upcoming (30d)
          </span>
        );
      case "Renewed":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF4EC] text-[#2F6F3E] border border-[#CDE5D2]">
            <CheckCircle2 className="w-3 h-3" />
            Renewed
          </span>
        );
      case "Expired":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
            Expired
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E9E7] p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#E5E9E7]">
        <div>
          <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#0B2545]" />
            Policy Renewal Pipeline & Expiry Tracker
          </h3>
          <p className="text-xs text-[#667085] mt-0.5">
            Identify imminent policy expirations, follow-up queues, and retention ratios.
          </p>
        </div>
      </div>

      {/* Renewal Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E5E9E7]">
          <span className="text-[11px] font-bold text-[#667085] block mb-1">Renewals Due</span>
          <p className="text-lg font-bold text-[#0B2545]">{renewalsStats.totalDue}</p>
          <span className="text-[10px] text-gray-400">Total upcoming</span>
        </div>

        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
          <span className="text-[11px] font-bold text-rose-800 block mb-1">Due This Week</span>
          <p className="text-lg font-bold text-rose-700">{renewalsStats.dueThisWeek}</p>
          <span className="text-[10px] text-rose-600 font-semibold">Immediate action</span>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
          <span className="text-[11px] font-bold text-amber-800 block mb-1">Due This Month</span>
          <p className="text-lg font-bold text-amber-700">{renewalsStats.dueThisMonth}</p>
          <span className="text-[10px] text-amber-600">30-day pipeline</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#EAF4EC] border border-[#CDE5D2]">
          <span className="text-[11px] font-bold text-[#2F6F3E] block mb-1">Renewed Policies</span>
          <p className="text-lg font-bold text-[#2F6F3E]">{renewalsStats.renewed}</p>
          <span className="text-[10px] text-[#2F6F3E]/80">Retention secured</span>
        </div>

        <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
          <span className="text-[11px] font-bold text-gray-700 block mb-1">Expired / Lapsed</span>
          <p className="text-lg font-bold text-gray-800">{renewalsStats.expired}</p>
          <span className="text-[10px] text-gray-500">Unrenewed risk</span>
        </div>
      </div>

      {/* Upcoming Renewals Table */}
      <div className="overflow-x-auto rounded-xl border border-[#E5E9E7]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F8FAF9] text-[#667085] uppercase text-[10px] font-bold tracking-wider border-b border-[#E5E9E7]">
              <th className="py-3 px-3.5">Customer</th>
              <th className="py-3 px-3.5">Policy Number</th>
              <th className="py-3 px-3.5">Insurance Category</th>
              <th className="py-3 px-3.5">Underwriter</th>
              <th className="py-3 px-3.5">Expiry Date</th>
              <th className="py-3 px-3.5 text-right">Renewal Premium (₹)</th>
              <th className="py-3 px-3.5 text-center">Status</th>
              <th className="py-3 px-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E9E7]">
            {MASTER_RENEWALS.map((item) => (
              <tr key={item.policyNumber} className="hover:bg-[#F0F4F8] transition-colors">
                <td className="py-3 px-3.5 font-bold text-[#0B2545]">
                  {item.customer}
                </td>
                <td className="py-3 px-3.5 font-mono font-semibold text-[#0B2545]">
                  {item.policyNumber}
                </td>
                <td className="py-3 px-3.5 text-[#334155]">
                  <span className="px-2 py-0.5 rounded bg-gray-100 text-[#0B2545] font-medium text-[11px]">
                    {item.category}
                  </span>
                </td>
                <td className="py-3 px-3.5 text-[#475569] font-medium">
                  {item.partner}
                </td>
                <td className="py-3 px-3.5 font-mono text-[11px] text-[#0B2545] font-bold">
                  {item.expiryDate}
                </td>
                <td className="py-3 px-3.5 text-right font-bold text-[#0B2545] font-mono">
                  ₹{formatINR(item.premium)}
                </td>
                <td className="py-3 px-3.5 text-center">
                  {getRenewalBadge(item.status)}
                </td>
                <td className="py-3 px-3.5 text-right">
                  <button
                    type="button"
                    onClick={() => handleSendReminder(item)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold text-[#0B2545] bg-[#EAF0F6] hover:bg-[#DCE6F1] transition cursor-pointer"
                  >
                    <BellRing className="w-3 h-3" />
                    <span>Send Notice</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
