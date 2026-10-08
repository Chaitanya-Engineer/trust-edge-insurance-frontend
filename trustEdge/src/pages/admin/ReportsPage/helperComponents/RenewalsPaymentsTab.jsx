import React, { useState } from "react";
import { RefreshCw, BellRing, Clock, CheckCircle2, CreditCard } from "lucide-react";
import NoDataFound from "../../../../component/core_components/NoDataFound/NoDataFound";
import { showToast } from "../../../../component/core_components/CustomToast/CustomToast";

export default function RenewalsPaymentsTab({
  upcomingRenewals,
  policies,
  onResetFilters,
}) {
  const [activeSubTab, setActiveSubTab] = useState("renewals"); // "renewals" | "payments"
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const formatINR = (val) => Number(val || 0).toLocaleString("en-IN");

  const handleSendReminder = (policy) => {
    showToast.success(
      "Renewal Reminder Dispatched",
      `Automated renewal notice sent to ${policy.customer_name} for Policy ${policy.policy_id}`
    );
  };

  const currentDataset = activeSubTab === "renewals" ? upcomingRenewals : policies;
  const totalPages = Math.ceil(currentDataset.length / pageSize) || 1;
  const paginatedData = currentDataset.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Sub-Switch: Renewals Queue vs Transactions Journal */}
      <div className="bg-white rounded-2xl border border-[#E5E9E7] p-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              setActiveSubTab("renewals");
              setCurrentPage(1);
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSubTab === "renewals"
                ? "bg-[#0B2545] text-white shadow-sm"
                : "text-[#667085] hover:bg-gray-100 hover:text-[#0B2545]"
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Upcoming Renewals Queue</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500 text-white">
              {upcomingRenewals.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveSubTab("payments");
              setCurrentPage(1);
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSubTab === "payments"
                ? "bg-[#0B2545] text-white shadow-sm"
                : "text-[#667085] hover:bg-gray-100 hover:text-[#0B2545]"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Payment Receipts Journal</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-gray-200 text-[#0B2545]">
              {policies.length}
            </span>
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-[#E5E9E7] p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E9E7]">
          <div>
            <h3 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">
              {activeSubTab === "renewals"
                ? "Actionable Renewal Follow-up Roster"
                : "Collections & Payment Clearance Ledger"}
            </h3>
            <p className="text-[11px] text-[#667085]">
              {activeSubTab === "renewals"
                ? "Policies expiring within the next 45 days requiring agent outreach or renewal notices."
                : "Direct log of premium receipts, payment modes (UPI, Card, Cheque), and clearance status."}
            </p>
          </div>
        </div>

        {currentDataset.length === 0 ? (
          <NoDataFound
            title="No records found in this queue"
            description="There are currently no active policies or renewals matching your criteria."
            onClearFilters={onResetFilters}
            compact={true}
          />
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border border-[#E5E9E7]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8FAF9] text-[#667085] uppercase text-[10px] font-bold tracking-wider border-b border-[#E5E9E7]">
                    <th className="py-3 px-3.5">Policy ID</th>
                    <th className="py-3 px-3.5">Customer Name</th>
                    <th className="py-3 px-3.5">Category</th>
                    <th className="py-3 px-3.5">Underwriter</th>
                    <th className="py-3 px-3.5">
                      {activeSubTab === "renewals" ? "Expiry Date" : "Issue / Txn Date"}
                    </th>
                    <th className="py-3 px-3.5 text-right">Premium (₹)</th>
                    <th className="py-3 px-3.5 text-center">
                      {activeSubTab === "renewals" ? "Urgency" : "Payment Status"}
                    </th>
                    <th className="py-3 px-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E9E7]">
                  {paginatedData.map((row) => (
                    <tr key={row.policy_id} className="hover:bg-[#F0F4F8] transition-colors">
                      <td className="py-3 px-3.5 font-mono font-bold text-[#0B2545]">
                        {row.policy_id}
                      </td>
                      <td className="py-3 px-3.5 font-bold text-[#0B2545]">
                        {row.customer_name}
                        <div className="text-[10px] font-normal text-gray-400 font-mono">
                          {row.customer_id}
                        </div>
                      </td>
                      <td className="py-3 px-3.5 text-[#334155]">
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-[#0B2545] font-medium text-[11px]">
                          {row.category}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-[#475569] font-medium">
                        {row.partner}
                      </td>
                      <td className="py-3 px-3.5 font-mono text-[11px] text-[#0B2545] font-semibold">
                        {activeSubTab === "renewals" ? row.expiry_date : row.issue_date}
                      </td>
                      <td className="py-3 px-3.5 text-right font-bold text-[#0B2545] font-mono">
                        ₹{formatINR(row.premium_amount)}
                      </td>
                      <td className="py-3 px-3.5 text-center">
                        {activeSubTab === "renewals" ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                            <Clock className="w-3 h-3" />
                            Due Soon
                          </span>
                        ) : (
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              row.payment_status === "PAID"
                                ? "bg-[#EAF4EC] text-[#2F6F3E] border-[#CDE5D2]"
                                : "bg-[#FEF6EE] text-[#B54708] border-[#F9DBAF]"
                            }`}
                          >
                            {row.payment_status === "PAID" ? (
                              <CheckCircle2 className="w-3 h-3" />
                            ) : (
                              <Clock className="w-3 h-3" />
                            )}
                            {row.payment_status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => handleSendReminder(row)}
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between text-xs text-[#667085] pt-2">
                <span>
                  Showing {(currentPage - 1) * pageSize + 1} to{" "}
                  {Math.min(currentPage * pageSize, currentDataset.length)} of{" "}
                  {currentDataset.length} records
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-2.5 py-1 rounded-md border border-[#E5E9E7] hover:bg-gray-100 disabled:opacity-50 transition cursor-pointer"
                  >
                    Previous
                  </button>
                  <span className="px-2 font-semibold text-[#0B2545]">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="px-2.5 py-1 rounded-md border border-[#E5E9E7] hover:bg-gray-100 disabled:opacity-50 transition cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
