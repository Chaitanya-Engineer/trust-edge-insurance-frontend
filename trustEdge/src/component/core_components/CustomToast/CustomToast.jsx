import React from "react";
import { Toaster, toast } from "sonner";

/**
 * CustomToaster - Global Toast Provider Component
 * Configured with Trust Edge design tokens, fonts, and styling.
 */
export const CustomToaster = ({ position = "top-center", ...props }) => {
  return (
    <Toaster
      position={position}
      richColors
      closeButton
      duration={3500}
      toastOptions={{
        style: {
          fontFamily: "'Lexend', system-ui, -apple-system, sans-serif",
          borderRadius: "10px",
          padding: "12px 16px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)",
          border: "1px solid #E5E9E7",
          fontSize: "13px",
        },
        className: "trust-edge-toast",
      }}
      {...props}
    />
  );
};

/**
 * showToast Utility Helper
 * Simplifies triggering styled toasts anywhere across the app.
 * Usage:
 *  showToast.success("User registered!", "Account created successfully.")
 *  showToast.error("Form error", "Please fill required fields.")
 *  showToast.info("Member added")
 *  showToast.warning("Member removed")
 */
export const showToast = {
  success: (title, description, options = {}) => {
    return toast.success(title, {
      description,
      ...options,
    });
  },
  error: (title, description, options = {}) => {
    return toast.error(title, {
      description,
      ...options,
    });
  },
  info: (title, description, options = {}) => {
    return toast.info(title, {
      description,
      ...options,
    });
  },
  warning: (title, description, options = {}) => {
    return toast.warning(title, {
      description,
      ...options,
    });
  },
  promise: (promise, messages, options = {}) => {
    return toast.promise(promise, {
      loading: messages.loading || "Processing...",
      success: messages.success || "Done!",
      error: messages.error || "Failed!",
      ...options,
    });
  },
  dismiss: (id) => toast.dismiss(id),
};

export default CustomToaster;
