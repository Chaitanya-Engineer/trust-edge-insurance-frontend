import { useState } from "react";
import { Pencil, Eye, Lock } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { genderOptions } from "../constant";
import CustomInput from "../../../../component/core_components/CustomInput/CustomeInput";
import CustomDatePicker from "../../../../component/core_components/DatePicker/CustomDatePicker";
import CustomSelect from "../../../../component/core_components/CustomSelect/CustomSelect";
import DocumentUpload from "../../../../component/core_components/DocumentUpload/DocumentUpload";
import {
  validateFullName,
  validateDob,
  validateMobileNumber,
  validateEmail,
  validatePanNumber,
  validateAadhaarNumber,
  validatePinCode,
} from "../../../../lib/validation";

import { showToast } from "../../../../component/core_components/CustomToast/CustomToast";

const UserRegistrationForm = ({
  formData,
  onChange,
  onClickBack,
  onSubmit,
  onCancel,
  isEditMode = false,
  isViewMode = false,
  onEnableEdit,
  customerId,
}) => {
  const [errors, setErrors] = useState({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleInputChange = (field, value) => {
    if (isViewMode) return;
    onChange?.((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name (DB: name)
    const fullNameError = validateFullName(formData?.name);
    if (fullNameError) newErrors.name = fullNameError;

    const dobError = validateDob(formData?.date_of_birth);
    if (dobError) newErrors.date_of_birth = dobError;

    const mobileError = validateMobileNumber(formData?.phone);
    if (mobileError) newErrors.phone = mobileError;

    const emailError = validateEmail(formData?.email);
    if (emailError) newErrors.email = emailError;

    const panError = validatePanNumber(formData?.pan_no);
    if (panError) newErrors.pan_no = panError;

    const aadhaarError = validateAadhaarNumber(formData?.aadhar_no);
    if (aadhaarError) newErrors.aadhar_no = aadhaarError;

    const pinCodeError = validatePinCode(formData?.pincode);
    if (pinCodeError) newErrors.pincode = pinCodeError;

    // PAN Card Upload in Create Mode
    if (!isEditMode && !isViewMode && !formData?.panCard) {
      newErrors.panCard = "Please upload PAN Card document";
    }

    if (!isEditMode && !isViewMode && !formData?.aadhaarCard) {
      newErrors.aadhaarCard = "Please upload Aadhaar Card document";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => ({
    name: formData?.name,
    date_of_birth: formData?.date_of_birth,
    gender: formData?.gender,
    phone: formData?.phone,
    email: formData?.email,
    address: formData?.address,
    city: formData?.city,
    state: formData?.state,
    pincode: formData?.pincode,
    pan_no: formData?.pan_no,
    aadhar_no: formData?.aadhar_no,
    gst_no: formData?.gst_no,
    panCard: formData?.panCard,
    aadhaarCard: formData?.aadhaarCard,
    customer_id: customerId,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isViewMode) return;

    if (!validateForm()) {
      showToast.error(
        "Form Validation Failed",
        "Please fill out all mandatory fields correctly."
      );
      setTimeout(() => {
        const firstErrorField = document.querySelector(
          ".text-[#B42318], .text-red-500"
        );
        if (firstErrorField) {
          firstErrorField.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
      return;
    }

    const payload = buildPayload();

    // Apply confirmation popup only to new user registration, not existing user updates
    if (!isEditMode) {
      setIsVerified(false);
      setIsConfirmOpen(true);
      return;
    }

    // Direct submit for existing user updates
    onSubmit?.(payload);
  };

  const handleConfirmSubmit = () => {
    if (!isVerified) return;
    setIsConfirmOpen(false);
    onSubmit?.(buildPayload());
  };

  return (
    <div className="w-full bg-white border border-[#E5E9E7] rounded-xl p-6 sm:p-8 lg:p-10 shadow-lg max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="mb-4">
        <button
          type="button"
          className="flex items-center gap-1.5 text-[#0B2545] hover:text-[#0E2F52] bg-transparent border-none text-sm font-semibold transition-colors cursor-pointer p-0"
          onClick={onClickBack}
        >
          ← Back to Directory
        </button>
      </div>

      {/* Page Title & Status Badges */}
      <div className="border-b border-[#E5E9E7] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#0B2545]">
            {isViewMode
              ? "Member Details"
              : isEditMode
              ? "Edit Member Details"
              : "Member Registration"}
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            {isViewMode
              ? "Review customer information in read-only mode."
              : isEditMode
              ? "Modify customer profile details and save your updates."
              : "Fill out the fields to register a new member."}
          </p>
        </div>
        <div>
          {isViewMode && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF0F6] text-[#0B2545] border border-[#CBD5E1]">
              <Eye size={13} className="text-[#0B2545]" />
              View Mode (Read-Only)
            </span>
          )}
          {isEditMode && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Edit Mode
            </span>
          )}
        </div>
      </div>

      {/* Edit Mode Banner */}
      {isEditMode && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50/90 p-4 shadow-xs animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0B2545] text-white">
              <Pencil size={15} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-[#0B2545]">
                Edit form is active to update it.
              </h4>
              <p className="mt-0.5 text-xs text-slate-600">
                You can now modify the existing details and save your changes.
              </p>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleFormSubmit}
        className="w-full"
      >
        <fieldset disabled={isViewMode} className="space-y-8 border-none p-0 m-0 min-w-0">
          {/* ================= SECTION 1: Personal Information ================= */}
          <div>
            <h2 className="mb-6 text-lg font-bold text-[#0B2545] border-b border-[#E5E9E7] pb-2 sm:text-xl">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Full Name */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[13px] font-semibold text-[#344054]">
                    Full Name <span className="text-[#B42318] ml-0.5">*</span>
                  </label>
                  {isEditMode && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded select-none">
                      <Lock className="w-3 h-3 text-slate-400" /> Locked
                    </span>
                  )}
                </div>

                <CustomInput
                  value={formData?.name ?? ""}
                  onChange={(value) => handleInputChange("name", value)}
                  width="w-full"
                  type="text"
                  placeholder="Enter full name"
                  disabled={isViewMode || isEditMode}
                  error={!!errors.name}
                />
                {isEditMode && (
                  <p className="mt-1 text-[11px] text-slate-400">
                    Full name cannot be modified after registration.
                  </p>
                )}
                {(errors.name || errors.fullName) && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.name || errors.fullName}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[13px] font-semibold text-[#344054]">
                    Date of Birth <span className="text-[#B42318] ml-0.5">*</span>
                  </label>
                  {isEditMode && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded select-none">
                      <Lock className="w-3 h-3 text-slate-400" /> Locked
                    </span>
                  )}
                </div>

                <CustomDatePicker
                  value={formData?.date_of_birth ?? formData?.dob ?? ""}
                  onChange={(value) => handleInputChange("date_of_birth", value)}
                  max={new Date().toISOString().split("T")[0]}
                  width="w-full"
                  disabled={isViewMode || isEditMode}
                  error={!!(errors?.date_of_birth || errors?.dob)}
                />
                {isEditMode && (
                  <p className="mt-1 text-[11px] text-slate-400">
                    Date of birth cannot be modified after registration.
                  </p>
                )}
                {(errors?.date_of_birth || errors?.dob) && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors?.date_of_birth || errors?.dob}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div className="w-full">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  Gender <span className="text-[#B42318] ml-0.5">*</span>
                </label>

                <CustomSelect
                  options={genderOptions}
                  value={
                    genderOptions.find(
                      (option) => option?.value === formData?.gender
                    ) || null
                  }
                  onChange={(option) =>
                    handleInputChange("gender", option?.value || "")
                  }
                  width="w-full"
                  placeholder="Select gender"
                  isDisabled={isViewMode}
                  error={!!errors.gender}
                />
                {errors.gender && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.gender}</p>
                )}
              </div>

              {/* Mobile Number (DB: phone) */}
              <div className="w-full">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  Mobile Number <span className="text-[#B42318] ml-0.5">*</span>
                </label>

                <CustomInput
                  value={formData?.phone ?? formData?.mobileNumber ?? ""}
                  onChange={(value) => handleInputChange("phone", value)}
                  width="w-full"
                  type="numeric"
                  placeholder="Enter mobile number"
                  disabled={isViewMode}
                  error={!!(errors.phone || errors.mobileNumber)}
                  maxLength={10}
                />
                {(errors.phone || errors.mobileNumber) && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.phone || errors.mobileNumber}
                  </p>
                )}
              </div>

              {/* Email Address (DB: email) */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[13px] font-semibold text-[#344054]">
                    Email Address <span className="text-[#B42318] ml-0.5">*</span>
                  </label>
                  {isEditMode && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded select-none">
                      <Lock className="w-3 h-3 text-slate-400" /> Locked
                    </span>
                  )}
                </div>

                <CustomInput
                  value={formData?.email ?? formData?.emailAddress ?? ""}
                  onChange={(value) => handleInputChange("email", value)}
                  width="w-full"
                  type="text"
                  placeholder="Enter email address"
                  disabled={isViewMode || isEditMode}
                  error={!!(errors.email || errors.emailAddress)}
                />
                {isEditMode && (
                  <p className="mt-1 text-[11px] text-slate-400">
                    Email address cannot be modified after registration.
                  </p>
                )}
                {(errors.email || errors.emailAddress) && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.email || errors.emailAddress}
                  </p>
                )}
              </div>

             {/* Aadhaar Number (DB: aadhar_no) */}
              <div className="w-full">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  Aadhaar Number <span className="text-[#B42318] ml-0.5">*</span>
                </label>

                <CustomInput
                  value={formData?.aadhar_no ?? formData?.aadhaarNumber ?? ""}
                  onChange={(value) => handleInputChange("aadhar_no", value)}
                  width="w-full"
                  type="numeric"
                  placeholder="Enter Aadhaar number"
                  disabled={isViewMode}
                  error={!!(errors.aadhar_no || errors.aadhaarNumber)}
                  maxLength={12}
                />
                {(errors.aadhar_no || errors.aadhaarNumber) && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.aadhar_no || errors.aadhaarNumber}
                  </p>
                )}
              </div>

              {/* PAN Number (DB: pan_no) */}
              <div className="w-full">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  PAN Number <span className="text-[#B42318] ml-0.5">*</span>
                </label>

                <CustomInput
                  value={formData?.pan_no ?? formData?.panNumber ?? ""}
                  onChange={(value) =>
                    handleInputChange("pan_no", value.toUpperCase())
                  }
                  width="w-full"
                  type="alphanumeric"
                  placeholder="Enter PAN number"
                  disabled={isViewMode}
                  error={!!(errors.pan_no || errors.panNumber)}
                  maxLength={10}
                />
                {(errors.pan_no || errors.panNumber) && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.pan_no || errors.panNumber}
                  </p>
                )}
              </div>

              {/* GST Number (Optional) */}
              <div className="w-full">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  GST Number (Optional)
                </label>

                <CustomInput
                  value={formData?.gst_no ?? ""}
                  onChange={(value) =>
                    handleInputChange("gst_no", value.toUpperCase())
                  }
                  width="w-full"
                  type="alphanumeric"
                  placeholder="Enter GST number"
                  disabled={isViewMode}
                  maxLength={15}
                />
              </div>
            </div>
          </div>

          {/* ================= SECTION 2: Address Details ================= */}
          <div>
            <h2 className="mb-6 text-lg font-bold text-[#0B2545] border-b border-[#E5E9E7] pb-2 sm:text-xl">
              Address Details
            </h2>

            <div className="space-y-6">
              {/* Address (Full Row) */}
              <div className="w-full">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  Address <span className="text-[#B42318] ml-0.5">*</span>
                </label>

                <CustomInput
                  value={formData?.address || ""}
                  onChange={(value) => handleInputChange("address", value)}
                  width="w-full"
                  type="text"
                  placeholder="Enter address"
                  disabled={isViewMode}
                  error={!!errors.address}
                />
                {errors.address && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.address}</p>
                )}
              </div>

              {/* City, State, PIN Code (3-column grid) */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                {/* State */}
                <div className="w-full">
                  <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                    State <span className="text-[#B42318] ml-0.5">*</span>
                  </label>

                  <CustomInput
                    value={formData?.state || ""}
                    onChange={(value) => handleInputChange("state", value)}
                    width="w-full"
                    type="text"
                    placeholder="Enter state"
                    disabled={isViewMode}
                    error={!!errors.state}
                  />
                  {errors.state && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.state}</p>
                  )}
                </div>

                {/* City */}
                <div className="w-full">
                  <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                    City <span className="text-[#B42318] ml-0.5">*</span>
                  </label>

                  <CustomInput
                    value={formData?.city || ""}
                    onChange={(value) => handleInputChange("city", value)}
                    width="w-full"
                    type="text"
                    placeholder="Enter city"
                    disabled={isViewMode}
                    error={!!errors.city}
                  />
                  {errors.city && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.city}</p>
                  )}
                </div>
                {/* PIN Code (DB: pincode) */}
                <div className="w-full">
                  <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                    PIN Code <span className="text-[#B42318] ml-0.5">*</span>
                  </label>

                  <CustomInput
                    value={formData?.pincode ?? formData?.pinCode ?? ""}
                    onChange={(value) => handleInputChange("pincode", value)}
                    width="w-full"
                    type="numeric"
                    placeholder="Enter PIN code"
                    disabled={isViewMode}
                    error={!!(errors.pincode || errors.pinCode)}
                    maxLength={6}
                  />
                  {(errors?.pincode || errors?.pinCode) && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors?.pincode || errors?.pinCode}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </fieldset>


        {/* ================= SECTION 3: Documents Display & Uploads ================= */}
        {/* Existing Documents in View or Edit Mode */}
        {(isViewMode || isEditMode) && formData?.documents && formData?.documents.length > 0 && (
          <div className="mb-8 mt-8">
            <h2 className="mb-4 text-lg font-bold text-[#0B2545] border-b border-[#E5E9E7] pb-2 sm:text-xl">
              Existing Documents
            </h2>

            <div className="space-y-2.5">
              {formData?.documents.map((document) => (
                <div
                  key={document?.id || document?.document_type}
                  className="flex items-center justify-between rounded-lg border border-[#E5E9E7] bg-[#F8FAFC] p-3.5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#0B2545]"></span>
                    <span className="text-sm font-medium text-[#344054]">
                      {document?.document_type}
                    </span>
                  </div>
                  <a
                    href={document?.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    <Eye size={15} />
                    <span>View Document</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Document Replacement Controls (Only in Edit Mode) */}
        {isEditMode && (
          <div className="mb-8 mt-8">
            <div className="border-b border-[#E5E9E7] pb-2 mb-4">
              <h2 className="text-lg font-bold text-[#0B2545] sm:text-xl">
                Replace Documents (Optional)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload new files only if you wish to replace the existing member documents.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              

              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  New Aadhaar Card
                </label>
                <DocumentUpload
                  accept={["jpg", "jpeg", "png", "pdf"]}
                  maxSizeKB={320}
                  documentCategory="KYC Document"
                  multiple={false}
                  placeholder="Upload replacement Aadhaar card (Max 320 KB)"
                  onChange={(file) => handleInputChange("aadhaarCard", file)}
                  value={formData?.aadhaarCard}
                  width="w-full"
                  error={errors?.aadhaarCard}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  New PAN Card
                </label>
                <DocumentUpload
                  accept={["jpg", "jpeg", "png", "pdf"]}
                  maxSizeKB={320}
                  documentCategory="KYC Document"
                  multiple={false}
                  placeholder="Upload replacement PAN card (Max 320 KB)"
                  onChange={(file) => handleInputChange("panCard", file)}
                  value={formData?.panCard}
                  width="w-full"
                  error={errors?.panCard}
                />
              </div>
            </div>
          </div>
        )}

        {/* Initial Document Upload Controls (Create Mode Only) */}
        {!isEditMode && !isViewMode && (
          <div className="mb-8 mt-8">
            <h2 className="mb-6 text-lg font-bold text-[#0B2545] border-b border-[#E5E9E7] pb-2 sm:text-xl">
              Upload Documents
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* PAN Card */}
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  PAN Card <span className="text-[#B42318] ml-0.5">*</span>
                </label>

                <DocumentUpload
                  accept={["jpg", "jpeg", "png", "pdf"]}
                  maxSizeKB={320}
                  documentCategory="KYC Document"
                  multiple={false}
                  placeholder="Upload PAN card (Max 320 KB)"
                  onChange={(file) => handleInputChange("panCard", file)}
                  value={formData?.panCard}
                  width="w-full"
                  error={errors?.panCard}
                />
              </div>

              {/* Aadhaar Card */}
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  Aadhaar Card <span className="text-[#B42318] ml-0.5">*</span>
                </label>

                <DocumentUpload
                  accept={["jpg", "jpeg", "png", "pdf"]}
                  maxSizeKB={320}
                  documentCategory="KYC Document"
                  multiple={false}
                  placeholder="Upload Aadhaar card (Max 320 KB)"
                  onChange={(file) => handleInputChange("aadhaarCard", file)}
                  value={formData?.aadhaarCard}
                  width="w-full"
                  error={errors?.aadhaarCard}
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= Action Buttons ================= */}
        <div className="flex flex-col-reverse gap-4 border-t border-[#E5E9E7] pt-6 mt-8 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-[9px] border border-[#E5E9E7] bg-white px-6 py-2.5 text-sm font-semibold text-[#0B2545] transition hover:bg-[#F4F7F6] sm:w-auto cursor-pointer"
          >
            {isViewMode ? "Back to Directory" : "Cancel"}
          </button>

          {isViewMode ? (
            <button
              type="button"
              onClick={onEnableEdit}
              className="w-full rounded-[9px] bg-[#0B2545] hover:bg-[#0E2F52] px-6 py-2.5 text-sm font-semibold text-white transition sm:w-auto cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <Pencil size={15} />
              <span>Update</span>
            </button>
          ) : (
            <button
              type="submit"
              className="w-full rounded-[9px] bg-[#0B2545] px-6 py-2.5
               text-sm font-semibold text-white transition
               hover:bg-[#0E2F52] sm:w-auto cursor-pointer"
            >
              {isEditMode ? "Update Customer" : "Register Customer"}
            </button>
          )}
        </div>
      </form>

      {/* MUI Confirmation Popup for New User Registration */}
      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "14px",
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#0B2545", pb: 1 }}>
          Confirm User Registration
        </DialogTitle>
        <DialogContent dividers sx={{ py: 2.5 }}>
          <p className="text-xs sm:text-sm text-slate-600 mb-3">
            Please ensure the user's primary details are accurate before proceeding with registration.
          </p>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 mb-4 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Name:</span>
              <span className="text-[#0B2545] font-semibold">{formData?.name || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Email:</span>
              <span className="text-[#0B2545] font-semibold">{formData?.email || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Date of Birth:</span>
              <span className="text-[#0B2545] font-semibold">{formData?.date_of_birth || "—"}</span>
            </div>
          </div>

          <FormControlLabel
            control={
              <Checkbox
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
                sx={{
                  color: "#0B2545",
                  "&.Mui-checked": {
                    color: "#0B2545",
                  },
                }}
              />
            }
            label={
              <span className="text-xs sm:text-sm font-medium text-slate-800 select-none">
                I confirm that I have verified the user's Name, Email, and Date of Birth.
              </span>
            }
            sx={{ alignItems: "flex-start", ml: 0 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <button
            type="button"
            onClick={() => setIsConfirmOpen(false)}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmSubmit}
            disabled={!isVerified}
            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white transition ${
              isVerified
                ? "bg-[#0B2545] hover:bg-[#0E2F52] cursor-pointer shadow-xs"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          >
            Confirm
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserRegistrationForm;
