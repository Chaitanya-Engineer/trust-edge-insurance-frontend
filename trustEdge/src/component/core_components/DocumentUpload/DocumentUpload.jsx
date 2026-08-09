import React, { useRef, useState } from "react";

const DocumentUpload = ({
  onChange,
  accept = [],
  maxSize = 5, // MB
  multiple = false,
  disabled = false,
  width = "w-full",
  height = "h-40",
  placeholder = "Drag & drop your file here",
}) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

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
    setError("");

    const fileArray = Array.from(selectedFiles);

    const validFiles = [];

    for (const file of fileArray) {
      const validationError = validateFile(file);

      if (validationError) {
        setError(validationError);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) {
      return;
    }

    const finalFiles = multiple ? [...files, ...validFiles] : [validFiles[0]];

    setFiles(finalFiles);

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
          rounded-lg
          border-2
          border-dashed
          px-4
          text-center
          transition
          ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-gray-100"
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

        <div className="mb-2 text-3xl">📁</div>

        <p className="text-sm font-medium text-gray-700">
          {isDragging ? "Drop your file here" : placeholder}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {accept.length > 0
            ? `Allowed: ${accept.join(", ")}`
            : "All file types allowed"}
        </p>

        <p className="mt-1 text-xs text-gray-500">Maximum size: {maxSize} MB</p>
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-700">
                  {file.name}
                </p>

                <p className="text-xs text-gray-400">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleRemove(index);
                }}
                className="ml-3 text-sm font-medium text-red-500 hover:text-red-700"
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
