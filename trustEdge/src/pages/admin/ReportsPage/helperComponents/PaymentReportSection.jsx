import React, { useState } from "react";
import { CreditCard, CheckCircle2, Clock, XCircle, RotateCcw, ArrowUpDown } from "lucide-react";

export default function PaymentReportSection({ transactions }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalAmount = transactions.reduce((acc, t) => acc + (t.amount || 0), 0);
  const paidTxns = transactions.filter((t) => t.paymentStatus === "Paid");
  const pendingTxns = transactions.filter((t) => t.paymentStatus === "Pending");
  const failedTxns = transactions.filter((t) => t.paymentStatus === "Failed");
  const refundedTxns = transactions.filter((t) => t.paymentStatus === "Refunded");

  const paidAmount = paidTxns.reduce((acc, t) => acc + t.amount, 0);
  const pendingAmount = pendingTxns.reduce((acc, t) => acc + t.amount, 0);
  const failedAmount = failedTxns.reduce((acc, t) => acc + t.amount, 0);
  const refundedAmount = refundedTxns.reduce((acc, t) => acc + t.amount, 0);

  const totalPages = Math.ceil(transactions.length / pageSize) || 1;
  const paginatedData = transactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const formatINR = (val) => Number(val || 0).toLocaleString("en-IN");

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF4EC] text-[#2F6F3E] border border-[#CDE5D2]">
            <CheckCircle2 className="w-3 h-3" />
            Paid / Cleared
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEF6EE] text-[#B54708] border border-[#F9DBAF]">
            <Clock className="w-3 h-3" />
            Pending Clearance
          </span>
        );
      case "Failed":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FDECEC] text-[#B42318] border border-[#FCD2D2]">
            <XCircle className="w-3 h-3" />
            Payment Failed
          </span>
        );
      case "Refunded":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
            <RotateCcw className="w-3 h-3" />
            Refunded
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E9E7] p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#E5E9E7]">
        <div>
          <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#0B2545]" />
            Payment Activity & Transaction Journal
          </h3>
          <p className="text-xs text-[#667085] mt-0.5">
            Gateway inflows, payment reconciliations, failure rates, and recent transaction entries.
          </p>
        </div>

        <div className="text-xs font-semibold text-[#667085]">
          Total Volume: <span className="font-bold text-[#0B2545]">₹{formatINR(totalAmount)}</span> ({transactions.length} entries)
        </div>
      </div>

      {/* Payment Status Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Successful */}
        <div className="p-3.5 rounded-xl bg-[#EAF4EC] border border-[#CDE5D2]">
          <div className="flex items-center justify-between text-[#2F6F3E] text-xs font-bold mb-1">
            <span>Successful (Paid)</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <p className="text-base font-extrabold text-[#2F6F3E]">₹{formatINR(paidAmount)}</p>
          <span className="text-[10px] text-[#2F6F3E]/80">{paidTxns.length} transactions</span>
        </div>

        {/* Pending */}
        <div className="p-3.5 rounded-xl bg-[#FEF6EE] border border-[#F9DBAF]">
          <div className="flex items-center justify-between text-[#B54708] text-xs font-bold mb-1">
            <span>Pending</span>
            <Clock className="w-3.5 h-3.5" />
          </div>
          <p className="text-base font-extrabold text-[#B54708]">₹{formatINR(pendingAmount)}</p>
          <span className="text-[10px] text-[#B54708]/80">{pendingTxns.length} in transit</span>
        </div>

        {/* Failed */}
        <div className="p-3.5 rounded-xl bg-[#FDECEC] border border-[#FCD2D2]">
          <div className="flex items-center justify-between text-[#B42318] text-xs font-bold mb-1">
            <span>Failed</span>
            <XCircle className="w-3.5 h-3.5" />
          </div>
          <p className="text-base font-extrabold text-[#B42318]">₹{formatINR(failedAmount)}</p>
          <span className="text-[10px] text-[#B42318]/80">{failedTxns.length} declined</span>
        </div>

        {/* Refunded */}
        <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
          <div className="flex items-center justify-between text-gray-700 text-xs font-bold mb-1">
            <span>Refunded</span>
            <RotateCcw className="w-3.5 h-3.5" />
          </div>
          <p className="text-base font-extrabold text-gray-800">₹{formatINR(refundedAmount)}</p>
          <span className="text-[10px] text-gray-500">{refundedTxns.length} reversals</span>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="overflow-x-auto rounded-xl border border-[#E5E9E7]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F8FAF9] text-[#667085] uppercase text-[10px] font-bold tracking-wider border-b border-[#E5E9E7]">
              <th className="py-3 px-3.5">Transaction Date</th>
              <th className="py-3 px-3.5">Customer Name</th>
              <th className="py-3 px-3.5">Policy Number</th>
              <th className="py-3 px-3.5">Category</th>
              <th className="py-3 px-3.5">Method</th>
              <th className="py-3 px-3.5 text-right">Amount (₹)</th>
              <th className="py-3 px-3.5 text-center">Payment Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E9E7]">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400">
                  No payment records found for the selected filter.
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr key={row.id} className="hover:bg-[#F0F4F8] transition-colors">
                  <td className="py-3 px-3.5 text-[#667085] font-mono text-[11px]">
                    {row.date}
                  </td>
                  <td className="py-3 px-3.5 font-bold text-[#0B2545]">
                    {row.customer}
                    <div className="text-[10px] font-normal text-gray-400 font-mono">
                      {row.customerId}
                    </div>
                  </td>
                  <td className="py-3 px-3.5 font-mono font-semibold text-[#0B2545]">
                    {row.policyNumber}
                  </td>
                  <td className="py-3 px-3.5 text-[#334155]">
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-[#0B2545] font-medium text-[11px]">
                      {row.category}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-[#475569] font-medium">
                    {row.paymentMethod}
                  </td>
                  <td className="py-3 px-3.5 text-right font-bold text-[#0B2545] font-mono">
                    ₹{formatINR(row.amount)}
                  </td>
                  <td className="py-3 px-3.5 text-center">
                    {getStatusBadge(row.paymentStatus)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-[#667085] pt-2">
          <span>
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, transactions.length)} of {transactions.length} entries
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
    </div>
  );
}
