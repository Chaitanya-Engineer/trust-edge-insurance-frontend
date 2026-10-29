/**
 * TrustEdge Insurance - Document File Validation Utility
 *
 * Enforces strict file type and file size limits without client-side compression:
 *   - Customer/KYC documents: maximum 320 KB per file
 *   - Policy documents: maximum 1 MB (1024 KB) per file
 */

/**
 * Format bytes into human-readable string (e.g. 245 KB, 1 MB)
 * @param {number} bytes 
 * @param {number} decimals 
 * @returns {string}
 */
export const formatBytes = (bytes, decimals = 1) => {
  if (bytes === 0 || !bytes) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  if (i >= sizes.length) return `${(bytes / Math.pow(k, sizes.length - 1)).toFixed(dm)} ${sizes[sizes.length - 1]}`;

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

/**
 * Extract normalized lower-case extension from file or file name
 * @param {File|string} fileOrName 
 * @returns {string} e.g. ".pdf", ".jpg", ".png"
 */
export const getFileExtension = (fileOrName) => {
  const name = typeof fileOrName === "string" ? fileOrName : fileOrName?.name || "";
  const dotIndex = name.lastIndexOf(".");
  if (dotIndex === -1) return "";
  return name.slice(dotIndex).toLowerCase();
};

/**
 * Checks if a file is a supported image (JPEG, PNG, WebP)
 * @param {File} file 
 * @returns {boolean}
 */
export const isImageFile = (file) => {
  if (!file) return false;
  const mime = (file.type || "").toLowerCase();
  const ext = getFileExtension(file);

  return (
    mime.startsWith("image/") ||
    [".jpg", ".jpeg", ".png", ".webp", ".bmp"].includes(ext)
  );
};

/**
 * Checks if a file is a PDF
 * @param {File} file 
 * @returns {boolean}
 */
export const isPdfFile = (file) => {
  if (!file) return false;
  const mime = (file.type || "").toLowerCase();
  const ext = getFileExtension(file);

  return mime === "application/pdf" || ext === ".pdf";
};

/**
 * Validates file type and size limit strictly.
 *
 * @param {File} file 
 * @param {Object} options
 * @param {number} [options.targetSizeBytes=320*1024] - Max allowed size in bytes (e.g. 327680 for 320 KB, 1048576 for 1 MB)
 * @param {string[]} [options.accept=[]] - Allowed extensions e.g. ["jpg", "jpeg", "png", "pdf"]
 * @param {string} [options.documentCategory="Document"] - e.g. "KYC Document" or "Policy Document"
 * @returns {{
 *   valid: boolean,
 *   file?: File,
 *   size?: number,
 *   formattedSize?: string,
 *   formattedLimit?: string,
 *   error?: string,
 *   isPdf?: boolean,
 *   isImage?: boolean
 * }}
 */
export const validateDocumentFile = (file, options = {}) => {
  if (!file) {
    return { valid: false, error: "No file provided." };
  }

  const {
    targetSizeBytes = 320 * 1024,
    accept = [],
    documentCategory = "Document",
  } = options;

  const extension = getFileExtension(file);
  const formattedLimit = formatBytes(targetSizeBytes);
  const formattedSize = formatBytes(file.size);
  const isPdf = isPdfFile(file);
  const isImage = isImageFile(file);

  // 1. File Extension / Allowed Format Check
  if (accept && accept.length > 0) {
    const normalizedAccept = accept.map((ext) =>
      ext.startsWith(".") ? ext.toLowerCase() : `.${ext.toLowerCase()}`
    );

    if (!normalizedAccept.includes(extension)) {
      const allowedText = accept
        .map((e) => e.replace(".", "").toUpperCase())
        .join(", ");
      return {
        valid: false,
        error: `"${file.name}" is not an allowed file type. Allowed formats: ${allowedText}`,
      };
    }
  }

  // 2. File Size Limit Check
  if (file.size > targetSizeBytes) {
    return {
      valid: false,
      size: file.size,
      formattedSize,
      formattedLimit,
      isPdf,
      isImage,
      error: `"${file.name}" (${formattedSize}) exceeds the maximum allowed size of ${formattedLimit} for ${documentCategory}.`,
    };
  }

  return {
    valid: true,
    file,
    size: file.size,
    formattedSize,
    formattedLimit,
    isPdf,
    isImage,
  };
};
