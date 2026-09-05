import React, { useRef, useState } from "react";
import { showToast } from "../CustomToast/CustomToast";

const DocumentUpload = ({
  onChange,
  accept = [],
  maxSize = 5, // MB
  multiple = false,
  disabled = false,
  width = "w-full",
  height = "h-40",
  placeholder = "Drag & drop your file here",
  error = "",
}) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadError, setUploadError] = useState("");

  /*
   * Convert:
   * ["jpg", "png", "pdf"]
   *
   * into:
   * ".jpg,.png,.pdf"
   */
  const acceptString = accept
    .map((extension) =>
      extension.startsWith(".") ? extension : `.${extension}`
    )
    .join(",");

  const validateFile = (file) => {
    const extension = `.${file.name.split(".").pop().toLowerCase()}`;

    // Extension validation
    if (
      accept.length > 0 &&
      !accept.some(
        (allowedExtension) =>
          `.${allowedExtension.replace(".", "").toLowerCase()}` === extension
      )
    ) {
      return `${file.name} is not an allowed file type.`;
    }

    // File size validation
    const fileSizeInMB = file.size / (1024 * 1024);

    if (fileSizeInMB > maxSize) {
      return `${file.name} exceeds the maximum size of ${maxSize} MB.`;
    }

    return null;
  };

  const processFiles = (selectedFiles) => {
    setUploadError("");

    const fileArray = Array.from(selectedFiles);

    const validFiles = [];

    for (const file of fileArray) {
      const validationError = validateFile(file);

      if (validationError) {
        setUploadError(validationError);
        showToast.error("File Upload Failed", validationError);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) {
      return;
    }

    const finalFiles = multiple ? [...files, ...validFiles] : [validFiles[0]];

    setFiles(finalFiles);
    showToast.success(
      "Document Attached",
      `${validFiles[0].name} selected.`
    );

    onChange?.(multiple ? finalFiles : finalFiles[0]);
  };

  const handleInputChange = (event) => {
    processFiles(event.target.files);

    // Allow selecting the same file again
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();

    setIsDragging(false);

    if (disabled) return;

    processFiles(event.dataTransfer.files);
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
          flex
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-[10px]
          border
          border-dashed
          px-4
          text-center
          transition-all
          duration-150
          ${error
            ? "border-[#B42318] bg-[#FDECEC] hover:border-[#B42318] hover:bg-[#FDECEC]"
            : isDragging
              ? "border-[#0B2545] bg-[#EAF0F6]"
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
          <svg className="w-6 h-6 text-[#0B2545]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        <p className="text-xs font-semibold text-[#17212B]">
          {isDragging ? "Drop your file here" : placeholder}
        </p>

        <p className="mt-1 text-[11px] text-[#667085]">
          {accept.length > 0
            ? `Allowed: ${accept.join(", ")}`
            : "All file types allowed"}
        </p>

        <p className="mt-0.5 text-[11px] text-[#667085]">Maximum size: {maxSize} MB</p>
      </div>

      {(uploadError || error) && (
        <p className="mt-2 text-xs text-[#B42318]">{uploadError || error}</p>
      )}

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-[8px] border border-[#E5E9E7] bg-white px-3 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#17212B]">
                  {file.name}
                </p>

                <p className="text-xs text-[#667085]">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleRemove(index);
                }}
                className="ml-3 text-xs font-semibold text-[#B42318] hover:text-[#B42318] bg-[#FDECEC] px-2.5 py-1 rounded-[6px] border border-[#FDECEC] transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
