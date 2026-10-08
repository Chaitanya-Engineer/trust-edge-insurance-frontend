import React, { useState } from "react";
import {
  X,
  Download,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  FileCheck2,
} from "lucide-react";
import { exportPoliciesToCSV, generateExecutivePDFReport } from "../constant";
import { showToast } from "../../../../component/core_components/CustomToast/CustomToast";

export default function ExportReportModal({
  isOpen,
  onClose,
  policies = [],
  filteredTransactions = [],
  filters = {},
  financials = {},
}) {
  const [exportFormat, setExportFormat] = useState("csv"); // "csv" | "pdf"
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const dataset = policies.length > 0 ? policies : filteredTransactions;
  const recordsCount = dataset.length;

  const formatINR = (val) => Number(val || 0).toLocaleString("en-IN");
  const totalValue = dataset.reduce((acc, p) => acc + (p.premium_amount || 0), 0);

  const filterSummary = [];
  if (filters.category && filters.category !== "ALL") {
    filterSummary.push(filters.category);
  }
  if (filters.partner && filters.partner !== "ALL") {
    filterSummary.push(filters.partner);
  }
  if (filters.policyStatus && filters.policyStatus !== "ALL") {
    filterSummary.push(filters.policyStatus);
  }

  const handleExecuteExport = () => {
    setIsExporting(true);

    const categorySlug =
      filters.category && filters.category !== "ALL"
        ? filters.category.replace(/[^a-zA-Z0-9]/g, "_")
        : "All_Policies";
    const dateStr = new Date().toISOString().split("T")[0];
    const filename = `TrustEdge_${categorySlug}_Report_${dateStr}.csv`;

    setTimeout(() => {
      try {
        if (exportFormat === "pdf") {
          generateExecutivePDFReport({
            policies: dataset,
            filters,
            financials,
            title: `TrustEdge Insurance Report (${recordsCount} Policies)`,
          });
          showToast.success(
            "PDF Ready",
            `Generated printable PDF statement for ${recordsCount} policies.`
          );
        } else {
          exportPoliciesToCSV(dataset, filename, filters, financials);
          showToast.success(
            "Excel / CSV Downloaded",
            `Saved ${recordsCount} policies to your computer. Ready to open in Excel.`
          );
        }
      } catch (err) {
        console.error("Export error:", err);
        showToast.error("Download Error", "Could not complete the download. Please try again.");
      } finally {
        setIsExporting(false);
        onClose();
      }
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Simple Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <div>
            <h3 className="text-lg font-bold text-[#0B2545]">Download Report</h3>
            <p className="text-xs text-[#667085] mt-0.5">
              Choose the format that works best for you.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-3 space-y-4">
          {/* Friendly Data Summary Pill */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E9E7] text-xs">
            <div className="text-[#0B2545] font-medium">
              <span className="font-bold text-[#0B2545]">{recordsCount} Policies</span>
              {filterSummary.length > 0 && (
                <span className="text-gray-500"> ({filterSummary.join(", ")})</span>
              )}
            </div>
            <div className="font-bold text-[#2F6F3E]">
              ₹{formatINR(totalValue)}
            </div>
          </div>

          {/* Format Selection Cards - 2 Clean Options */}
          <div className="space-y-2.5">
            {/* 1. Excel / CSV Option */}
            <div
              onClick={() => setExportFormat("csv")}
              className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-start gap-3.5 relative ${
                exportFormat === "csv"
                  ? "border-[#0B2545] bg-[#0B2545]/5"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div className="flex-1 pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#0B2545]">
                    Excel Spreadsheet
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    CSV
                  </span>
                </div>
                <p className="text-xs text-[#667085] mt-1 leading-relaxed">
                  Best for editing numbers, applying formulas, or filtering in Microsoft Excel and Google Sheets.
                </p>
              </div>
              {exportFormat === "csv" && (
                <div className="absolute top-4 right-4 text-[#0B2545]">
                  <CheckCircle2 className="w-5 h-5 fill-[#0B2545] text-white" />
                </div>
              )}
            </div>

            {/* 2. PDF Option */}
            <div
              onClick={() => setExportFormat("pdf")}
              className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-start gap-3.5 relative ${
                exportFormat === "pdf"
                  ? "border-[#0B2545] bg-[#0B2545]/5"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#0B2545]">
                    PDF Document
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">
                    Printable
                  </span>
                </div>
                <p className="text-xs text-[#667085] mt-1 leading-relaxed">
                  Best for printing, emailing to clients, or sharing official statements with management.
                </p>
              </div>
              {exportFormat === "pdf" && (
                <div className="absolute top-4 right-4 text-[#0B2545]">
                  <CheckCircle2 className="w-5 h-5 fill-[#0B2545] text-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Clean Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-[#F8FAFC] flex items-center justify-end gap-2.5">
          <button
            type="button"
            disabled={isExporting}
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-200/60 rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isExporting || recordsCount === 0}
            onClick={handleExecuteExport}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0B2545] hover:bg-[#0E2F52] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition shadow-sm cursor-pointer active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>
              {isExporting
                ? "Preparing Download..."
                : exportFormat === "csv"
                ? "Download Excel File"
                : "Open & Print PDF"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
