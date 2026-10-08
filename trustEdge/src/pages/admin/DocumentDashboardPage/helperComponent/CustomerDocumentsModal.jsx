import React, { useState } from "react";
import {
  X,
  Download,
  FileText,
  Eye,
  ZoomIn,
  ZoomOut,
  RotateCw,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  FileEdit,
} from "lucide-react";
import { showToast } from "../../../../component/core_components/CustomToast/CustomToast";
import { buildDocumentFormData, DB_TABLES, DB_COLUMNS } from "../constant";

export default function CustomerDocumentsModal({
  isOpen,
  onClose,
  customer,
  onUpdateDocument,
}) {
  const [activePreviewDoc, setActivePreviewDoc] = useState(null);
  const [updatingDoc, setUpdatingDoc] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  if (!isOpen || !customer) return null;

  const customer_id = customer.customer_id || customer.customerId;
  const customer_name = customer.name || customer.customerName;

  // Flatten all documents cleanly: Just document name, status, and database column info
  const customerDocs = (customer.customerDocuments || []).map((d) => ({
    ...d,
    isKyc: true,
    customer_id,
    customerId: customer_id,
    db_table: d.db_table || DB_TABLES.CUSTOMERS_CUSTOMER,
    db_field: d.db_field || d.id,
  }));

  const policyDocs = (customer.policies || []).flatMap((p) => {
    const policy_id = p.policy_id || p.policyId;
    const policy_pdf_url = p.policy_pdf_url || p.policyDocPreviewUrl || null;
    const hasPolicyDoc = Boolean(policy_pdf_url || p.hasPolicyDoc);

    return [
      {
        id: `schedule-${policy_id}`,
        db_table: DB_TABLES.POLICIES_POLICY,
        db_field: DB_COLUMNS.POLICIES.POLICY_PDF_URL, // "policy_pdf_url"
        label: `Policy Schedule PDF (${policy_id})`,
        name: p.policyDocName || (policy_pdf_url ? `${policy_id}_Policy_Schedule.pdf` : "Pending Activation PDF"),
        type: "image",
        size: p.policyDocSize || "2.4 MB",
        uploaded_at: p.issue_date || p.issueDate,
        uploadedAt: p.issue_date || p.issueDate,
        previewUrl:
          policy_pdf_url ||
          "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=80",
        status: hasPolicyDoc ? "ATTACHED" : "PENDING",
        isOfficialSchedule: true,
        policy_id,
        policyId: policy_id,
        customer_id,
        customerId: customer_id,
      },
      ...(p.policyAttachedDocs || []).map((d) => ({
        ...d,
        policy_id,
        policyId: policy_id,
        customer_id,
        customerId: customer_id,
        db_table: d.db_table || DB_TABLES.POLICIES_POLICY,
        db_field: d.db_field || d.id,
        isOfficialSchedule: false,
      })),
    ];
  });

  const allDocuments = [...customerDocs, ...policyDocs];

  const handleOpenView = (doc) => {
    setActivePreviewDoc(doc);
    setZoomLevel(1);
    setRotation(0);
    setPanPosition({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handleResetZoomAndPan = () => {
    setZoomLevel(1);
    setRotation(0);
    setPanPosition({ x: 0, y: 0 });
    setIsDragging(false);
  };

  // Drag / Pan Handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // only left click
    setIsDragging(true);
    setDragStart({
      x: e.clientX - panPosition.x,
      y: e.clientY - panPosition.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.2 : -0.2;
    setZoomLevel((prev) => Math.min(3.5, Math.max(0.5, Number((prev + delta).toFixed(1)))));
  };

  const handleDoubleClick = () => {
    if (zoomLevel > 1) {
      handleResetZoomAndPan();
    } else {
      setZoomLevel(2);
    }
  };

  const handleDownload = (doc) => {
    alert(`Downloading ${doc.name || "document.pdf"}`);
  };

  const handleConfirmUpdate = (e) => {
    e.preventDefault();
    if (!uploadedFile) {
      alert("Please select a file to update.");
      return;
    }

    const customer_id = customer.customer_id || customer.customerId;
    const policy_id = updatingDoc.policy_id || updatingDoc.policyId || null;
    const db_table =
      updatingDoc.db_table ||
      (updatingDoc.isOfficialSchedule
        ? DB_TABLES.POLICIES_POLICY
        : updatingDoc.isKyc
        ? DB_TABLES.CUSTOMERS_CUSTOMER
        : DB_TABLES.POLICIES_POLICY);
    const db_field =
      updatingDoc.db_field ||
      (updatingDoc.isOfficialSchedule
        ? DB_COLUMNS.POLICIES.POLICY_PDF_URL
        : updatingDoc.id);

    // Build the FormData with 100% exact database schema column names
    const formData = buildDocumentFormData({
      customer_id,
      policy_id,
      db_table,
      db_field,
      file: uploadedFile,
    });

    const newDocData = {
      name: uploadedFile.name,
      size: `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      uploaded_at: new Date().toISOString(),
      uploadedAt: new Date().toISOString(),
      type: "image",
      previewUrl: URL.createObjectURL(uploadedFile),
      file: uploadedFile,
      formData,
      db_table,
      db_field,
      customer_id,
      policy_id,
    };

    onUpdateDocument?.(customer_id, updatingDoc, newDocData, formData);

    showToast.success(
      "Document Updated Successfully",
      `${updatingDoc.label} has been replaced with ${uploadedFile.name}`
    );

    setUpdatingDoc(null);
    setUploadedFile(null);
  };

  return (
    <>
      {/* ── Minimalist Apple-Grade Main Modal ─────────────────── */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto animate-fadeIn">
        <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col max-h-[88vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-bold text-[#0B2545] font-sans">
                  {customer.customerName}
                </h3>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-[#52627A]">
                  {customer.customerId}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EAF4EC] text-[#2F6F3E]">
                  {allDocuments.length} Documents
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {customer.customerPhone} • {customer.totalPolicies} Registered Policies
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

          {/* Simple, Minimal Document List (No KYC clutter, just document name & actions) */}
          <div className="p-6 overflow-y-auto space-y-3 flex-1 bg-[#FAFAFA]">
            {allDocuments.map((doc) => {
              const isPending = doc.status === "PENDING";

              return (
                <div
                  key={doc.id || doc.name}
                  className="bg-white rounded-xl border border-gray-200/80 hover:border-gray-300 p-4 transition-all shadow-2xs flex items-center justify-between gap-3"
                >
                  {/* Left: Document Icon & Document Name */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isPending ? "bg-amber-50 text-amber-600" : "bg-[#F0F4F8] text-[#0B2545]"
                      }`}
                    >
                      <FileText className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-[#0B2545] truncate">
                          {doc.label}
                        </h4>
                        <span
                          className={`text-[10px] px-2 py-0.2 rounded-full font-semibold ${
                            isPending
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}
                        >
                          {isPending ? "Pending Upload" : "Attached"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {doc.name} • {doc.size}
                      </p>
                    </div>
                  </div>

                  {/* Right: Clean Action Buttons (View, Update, Download) */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* View Button */}
                    {!isPending && (
                      <button
                        type="button"
                        onClick={() => handleOpenView(doc)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0B2545] bg-[#F0F4F8] hover:bg-[#E2E8F0] transition cursor-pointer active:scale-98"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    )}

                    {/* Download Button */}
                    {!isPending && (
                      <button
                        type="button"
                        onClick={() => handleDownload(doc)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}

                    {/* Update Button */}
                    <button
                      type="button"
                      onClick={() => setUpdatingDoc(doc)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer active:scale-98 ${
                        isPending
                          ? "bg-[#B54708] hover:bg-[#93370D] text-white shadow-xs"
                          : "bg-[#0B2545] hover:bg-[#0E2F52] text-white shadow-xs"
                      }`}
                    >
                      <FileEdit className="w-3.5 h-3.5" />
                      <span>{isPending ? "Upload" : "Update"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-gray-100 bg-white flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* ── High-Fidelity Image & Document Lightbox Popup ──────── */}
      {activePreviewDoc && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setActivePreviewDoc(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#1E293B] rounded-2xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Topbar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#0F172A] border-b border-gray-700 text-white">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold truncate">{activePreviewDoc.label}</h4>
                  <p className="text-[11px] text-gray-400 truncate">
                    {activePreviewDoc.name} • {activePreviewDoc.size}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.6, Number((z - 0.2).toFixed(1))))}
                  className="p-1.5 text-gray-300 hover:text-white rounded hover:bg-gray-800 transition cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoomAndPan}
                  className="px-2 py-1 text-xs text-gray-300 hover:text-white rounded hover:bg-gray-800 font-mono transition cursor-pointer"
                  title="Reset Zoom & Position"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(3.5, Number((z + 0.2).toFixed(1))))}
                  className="p-1.5 text-gray-300 hover:text-white rounded hover:bg-gray-800 transition cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="p-1.5 text-gray-300 hover:text-white rounded hover:bg-gray-800 transition cursor-pointer"
                  title="Rotate 90°"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoomAndPan}
                  className="p-1.5 text-gray-300 hover:text-white rounded hover:bg-gray-800 transition cursor-pointer text-xs font-semibold"
                  title="Reset View"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(activePreviewDoc)}
                  className="p-1.5 text-blue-400 hover:text-blue-300 rounded hover:bg-gray-800 transition cursor-pointer ml-1"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActivePreviewDoc(null)}
                  className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-gray-800 transition cursor-pointer ml-1"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Image Canvas with Drag-to-Pan */}
            <div
              className={`p-6 flex flex-col items-center justify-center min-h-[420px] bg-[#0A0E17] overflow-hidden relative select-none ${
                isDragging ? "cursor-grabbing" : zoomLevel > 1 ? "cursor-grab" : "cursor-default"
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              onDoubleClick={handleDoubleClick}
            >
              {activePreviewDoc.previewUrl ? (
                <div
                  className="will-change-transform select-none"
                  style={{
                    transform: `translate3d(${panPosition.x}px, ${panPosition.y}px, 0) scale(${zoomLevel}) rotate(${rotation}deg)`,
                    transition: isDragging ? "none" : "transform 0.15s ease-out",
                    transformOrigin: "center center",
                  }}
                >
                  <img
                    src={activePreviewDoc.previewUrl}
                    alt={activePreviewDoc.label}
                    draggable={false}
                    className="max-h-[66vh] max-w-full rounded-xl shadow-2xl object-contain border border-gray-800 bg-white pointer-events-none select-none"
                  />
                </div>
              ) : (
                <div
                  className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 text-gray-800 select-none"
                  style={{
                    transform: `translate3d(${panPosition.x}px, ${panPosition.y}px, 0) scale(${zoomLevel}) rotate(${rotation}deg)`,
                    transition: isDragging ? "none" : "transform 0.15s ease-out",
                  }}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <span className="font-bold text-xs text-[#0B2545]">
                      {activePreviewDoc.label}
                    </span>
                    <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold border border-green-200">
                      Verified Document
                    </span>
                  </div>
                  <div className="py-6 space-y-2 text-xs">
                    <p className="font-semibold text-gray-700">
                      File: {activePreviewDoc.name}
                    </p>
                    <p className="text-gray-500">Size: {activePreviewDoc.size}</p>
                    <p className="text-gray-500">Owner: {customer.customerName}</p>
                  </div>
                </div>
              )}

              {/* Bottom Interactive Floating Hint */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-gray-300 pointer-events-none border border-white/10 font-sans">
                {zoomLevel > 1
                  ? "🖐️ Drag to pan picture • Scroll wheel to zoom • Double-click to reset"
                  : "🔍 Scroll wheel to zoom • Drag to pan when zoomed"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Sub-Modal: Clean Minimalist Update Document Dialog ── */}
      {updatingDoc && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fadeIn"
          onClick={() => {
            setUpdatingDoc(null);
            setUploadedFile(null);
          }}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
              <div>
                <h4 className="text-sm font-bold text-[#0B2545]">
                  Update {updatingDoc.label}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Replace document for {customer.customerName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUpdatingDoc(null);
                  setUploadedFile(null);
                }}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmUpdate} className="p-5 space-y-4">
              <div className="border-2 border-dashed border-gray-200 hover:border-[#0B2545] rounded-xl p-6 text-center bg-gray-50/50 hover:bg-gray-50 transition">
                <input
                  type="file"
                  id="doc-update-file-input"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setUploadedFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="doc-update-file-input"
                  className="cursor-pointer flex flex-col items-center justify-center gap-2"
                >
                  <UploadCloud className="w-8 h-8 text-[#0B2545]" />
                  <span className="text-xs font-bold text-[#0B2545]">
                    {uploadedFile ? uploadedFile.name : "Click to select or drop new file"}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Supports JPG, PNG, PDF up to 10 MB
                  </span>
                </label>
              </div>

              {uploadedFile && (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                  <span className="truncate font-semibold">{uploadedFile.name}</span>
                  <span className="font-mono text-[10px]">
                    {(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB
                  </span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setUpdatingDoc(null);
                    setUploadedFile(null);
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!uploadedFile}
                  className={`px-4 py-2 rounded-lg text-xs font-bold text-white transition shadow-xs ${
                    uploadedFile
                      ? "bg-[#0B2545] hover:bg-[#0E2F52] cursor-pointer"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Confirm & Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
