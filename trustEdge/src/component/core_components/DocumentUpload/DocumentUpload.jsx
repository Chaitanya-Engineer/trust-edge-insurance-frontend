import React, { useRef, useState, useEffect, useMemo } from "react";
import { showToast } from "../CustomToast/CustomToast";
import {
  formatBytes,
  validateDocumentFile,
  isPdfFile,
} from "../../../lib/fileValidation";

const DocumentUpload = ({
  onChange,
  accept = ["jpg", "jpeg", "png", "pdf"],
  maxSizeKB = null, // e.g. 320 for KYC, 1024 for Policy
  maxSizeMB = null, // e.g. 1
  maxSize = 5, // Legacy MB fallback
  documentCategory = "Document",
  multiple = false,
  disabled = false,
  width = "w-full",
  height = "h-40",
  placeholder = "Drag & drop your file here, or click to browse",
  error = "",
  value = null,
}) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadError, setUploadError] = useState("");

  // Target size in bytes based on priority: maxSizeKB -> maxSizeMB -> maxSize (MB)
  const targetSizeBytes = useMemo(() => {
    if (typeof maxSizeKB === "number" && maxSizeKB > 0) {
      return maxSizeKB * 1024;
    }
    if (typeof maxSizeMB === "number" && maxSizeMB > 0) {
      return Math.round(maxSizeMB * 1024 * 1024);
    }
    if (typeof maxSize === "number" && maxSize > 0) {
      return Math.round(maxSize * 1024 * 1024);
    }
    return 320 * 1024; // Default fallback: 320 KB
  }, [maxSizeKB, maxSizeMB, maxSize]);

  const formattedLimit = useMemo(() => formatBytes(targetSizeBytes), [targetSizeBytes]);

  // Sync external value when reset or provided
  useEffect(() => {
    if (!value) {
      setFiles([]);
    } else if (Array.isArray(value)) {
      setFiles(value);
    } else if (value instanceof File || value instanceof Blob || typeof value === "object") {
      setFiles([value]);
    }
  }, [value]);

  /*
   * Convert: ["jpg", "png", "pdf"] into: ".jpg,.png,.pdf"
   */
  const acceptString = useMemo(() => {
    return (accept || [])
      .map((extension) =>
        extension.startsWith(".") ? extension : `.${extension}`
      )
      .join(",");
  }, [accept]);

  const processFiles = (selectedFiles) => {
    setUploadError("");

    const fileArray = Array.from(selectedFiles || []);
    if (fileArray.length === 0) return;

    const validFiles = [];

    for (const file of fileArray) {
      const validationResult = validateDocumentFile(file, {
        targetSizeBytes,
        accept,
        documentCategory,
      });

      if (!validationResult.valid) {
        const errText = validationResult.error || "File validation failed.";
        setUploadError(errText);
        showToast.error("File Validation Error", errText);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) {
      return;
    }

    const finalFiles = multiple ? [...files, ...validFiles] : [validFiles[0]];
    setFiles(finalFiles);

    const latest = validFiles[0];
    showToast.success(
      "Document Attached",
      `${latest.name} (${formatBytes(latest.size)}) selected.`
    );

    onChange?.(multiple ? finalFiles : finalFiles[0]);
  };

  const handleInputChange = (event) => {
    processFiles(event.target.files);
    // Allow re-uploading the same file if needed
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    if (event.dataTransfer?.files?.length) {
      processFiles(event.dataTransfer.files);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleRemove = (index) => {
    const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);
    setFiles(updatedFiles);
    setUploadError("");
    onChange?.(multiple ? updatedFiles : updatedFiles[0] || null);
  };

  const handleBrowse = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <div className={width}>
      <div
        onClick={handleBrowse}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          ${height}
          relative
          flex
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-[10px]
          border
          border-dashed
          px-4
          py-3
          text-center
          transition-all
          duration-150
          ${
            uploadError || error
              ? "border-[#B42318] bg-[#FDECEC] hover:border-[#B42318] hover:bg-[#FDECEC]"
              : isDragging
              ? "border-[#0B2545] bg-[#EAF0F6] scale-[1.01]"
              : "border-[#C8D4CD] bg-[#F8FAF9] hover:border-[#0B2545] hover:bg-[#EAF0F6]"
          }
          ${disabled ? "cursor-not-allowed opacity-50" : ""}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={acceptString}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="mb-2 text-[#0B2545] p-2 bg-[#EAF0F6] rounded-full">
          <svg
            className="w-5 h-5 text-[#0B2545]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        <p className="text-xs font-semibold text-[#17212B]">
          {isDragging ? "Drop your file here" : placeholder}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-1.5">
          <span className="text-[11px] text-[#667085]">
            {accept.length > 0
              ? `Allowed: ${accept.map((a) => a.replace(".", "").toUpperCase()).join(", ")}`
              : "All file types allowed"}
          </span>
          <span className="text-[11px] text-[#98A2B3]">•</span>
          <span className="inline-flex items-center font-semibold text-[11px] text-[#0B2545] bg-[#EAF0F6] px-1.5 py-0.5 rounded">
            Max: {formattedLimit}
          </span>
        </div>
      </div>

      {/* Validation Error Feedback */}
      {(uploadError || error) && (
        <div className="mt-2 flex items-start gap-1.5 text-xs text-[#B42318] bg-[#FDECEC] p-2 rounded-[6px] border border-[#FECDCA]">
          <span className="font-bold text-sm leading-none">⚠️</span>
          <p className="flex-1 font-medium">{uploadError || error}</p>
        </div>
      )}

      {/* Uploaded File List with Details */}
      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => {
            const isPdf = isPdfFile(file);

            return (
              <div
                key={`${file.name || "doc"}-${index}`}
                className="flex items-center justify-between rounded-[8px] border border-[#E5E9E7] bg-white p-2.5 shadow-sm transition-all hover:border-[#D0DCEB]"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${
                      isPdf ? "bg-[#FEF3F2] text-[#B42318]" : "bg-[#EAF0F6] text-[#0B2545]"
                    }`}
                  >
                    {isPdf ? (
                      <span className="text-[10px] font-bold">PDF</span>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.75}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-[#17212B]" title={file.name}>
                      {file.name || "Uploaded Document"}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#667085] mt-0.5">
                      <span className="font-semibold text-[#17212B]">
                        {formatBytes(file.size)}
                      </span>
                      <span className="inline-flex items-center text-[10px] font-medium text-[#027A48] bg-[#ECFDF3] px-1.5 py-0.2 rounded border border-[#ABEFC6]">
                        ✓ Valid size (≤ {formattedLimit})
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRemove(index);
                  }}
                  className="ml-3 text-xs font-semibold text-[#B42318] hover:bg-[#FEE4E2] bg-[#FEF3F2] px-2.5 py-1 rounded-[6px] border border-[#FECDCA] transition-colors cursor-pointer shrink-0"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
