import React, { useState } from "react";

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
  validateAddress,
  validateCity,
  validateState,
  validatePinCode,
} from "../../../../lib/validation";

import { showToast } from "../../../../component/core_components/CustomToast/CustomToast";

const UserRegistrationForm = ({
  formData,
  onChange,
  onClickBack,
  onSubmit,
  onCancel,
}) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    onChange?.((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name
    const fullNameError = validateFullName(formData?.fullName);
    if (fullNameError) newErrors.fullName = fullNameError;

    // Date of Birth
    const dobError = validateDob(formData?.dob);
    if (dobError) newErrors.dob = dobError;

    // Gender
    if (!formData?.gender) {
      newErrors.gender = "Gender is required";
    }

    // Mobile Number
    const mobileError = validateMobileNumber(formData?.mobileNumber);
    if (mobileError) newErrors.mobileNumber = mobileError;

    // Email Address
    const emailError = validateEmail(formData?.emailAddress);
    if (emailError) newErrors.emailAddress = emailError;

    // PAN Number
    const panError = validatePanNumber(formData?.panNumber);
    if (panError) newErrors.panNumber = panError;

    // Aadhaar Number
    const aadhaarError = validateAadhaarNumber(formData?.aadhaarNumber);
    if (aadhaarError) newErrors.aadhaarNumber = aadhaarError;

    // Address
    const addressError = validateAddress(formData?.address);
    if (addressError) newErrors.address = addressError;

    // City
    const cityError = validateCity(formData?.city);
    if (cityError) newErrors.city = cityError;

    // State
    const stateError = validateState(formData?.state);
    if (stateError) newErrors.state = stateError;

    // PIN Code
    const pinCodeError = validatePinCode(formData?.pinCode);
    if (pinCodeError) newErrors.pinCode = pinCodeError;

    // PAN Card Upload
    if (!formData?.panCard) {
      newErrors.panCard = "Please upload PAN Card document";
    }

    // Aadhaar Card Upload
    if (!formData?.aadhaarCard) {
      newErrors.aadhaarCard = "Please upload Aadhaar Card document";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

      {/* Page Title */}
      <div className="border-b border-[#E5E9E7] pb-4 mb-8">
        <h1 className="text-2xl font-bold text-[#0B2545]">Member Details</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validateForm()) {
            showToast.success(
              "User Registered Successfully!",
              "New member account details have been saved."
            );
            onSubmit?.(formData);
          } else {
            showToast.error(
              "Form Validation Failed",
              "Please fill out all mandatory fields correctly."
            );
            setTimeout(() => {
              const firstErrorField = document.querySelector(".text-[#B42318]");
              if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }, 100);
          }
        }}
        className="w-full"
      >
        {/* ================= SECTION 1: Personal Information ================= */}
        <div className="mb-8">
          <h2 className="mb-6 text-lg font-bold text-[#0B2545] border-b border-[#E5E9E7] pb-2 sm:text-xl">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Full Name */}
            <div className="w-full">
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                Full Name <span className="text-[#B42318] ml-0.5">*</span>
              </label>

              <CustomInput
                value={formData?.fullName || ""}
                onChange={(value) => handleInputChange("fullName", value)}
                width="w-full"
                type="text"
                placeholder="Enter full name"
                error={!!errors.fullName}
              />
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="w-full">
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                Date of Birth <span className="text-[#B42318] ml-0.5">*</span>
              </label>

              <CustomDatePicker
                value={formData?.dob || ""}
                onChange={(value) => handleInputChange("dob", value)}
                max={new Date().toISOString().split("T")[0]}
                width="w-full"
                error={!!errors.dob}
              />
              {errors.dob && (
                <p className="mt-1.5 text-xs text-red-500">{errors.dob}</p>
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
                error={!!errors.gender}
              />
              {errors.gender && (
                <p className="mt-1.5 text-xs text-red-500">{errors.gender}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="w-full">
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                Mobile Number <span className="text-[#B42318] ml-0.5">*</span>
              </label>

              <CustomInput
                value={formData?.mobileNumber || ""}
                onChange={(value) => handleInputChange("mobileNumber", value)}
                width="w-full"
                type="numeric"
                placeholder="Enter mobile number"
                error={!!errors.mobileNumber}
                maxLength={10}
              />
              {errors.mobileNumber && (
                <p className="mt-1.5 text-xs text-red-500">{errors.mobileNumber}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="w-full">
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                Email Address <span className="text-[#B42318] ml-0.5">*</span>
              </label>

              <CustomInput
                value={formData?.emailAddress || ""}
                onChange={(value) => handleInputChange("emailAddress", value)}
                width="w-full"
                type="text"
                placeholder="Enter email address"
                error={!!errors.emailAddress}
              />
              {errors.emailAddress && (
                <p className="mt-1.5 text-xs text-red-500">{errors.emailAddress}</p>
              )}
            </div>

            {/* PAN Number */}
            <div className="w-full">
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                PAN Number <span className="text-[#B42318] ml-0.5">*</span>
              </label>

              <CustomInput
                value={formData?.panNumber || ""}
                onChange={(value) =>
                  handleInputChange("panNumber", value.toUpperCase())
                }
                width="w-full"
                type="alphanumeric"
                placeholder="Enter PAN number"
                error={!!errors.panNumber}
                maxLength={10}
              />
              {errors.panNumber && (
                <p className="mt-1.5 text-xs text-red-500">{errors.panNumber}</p>
              )}
            </div>

            {/* Aadhaar Number */}
            <div className="w-full">
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                Aadhaar Number <span className="text-[#B42318] ml-0.5">*</span>
              </label>

              <CustomInput
                value={formData?.aadhaarNumber || ""}
                onChange={(value) => handleInputChange("aadhaarNumber", value)}
                width="w-full"
                type="numeric"
                placeholder="Enter Aadhaar number"
                error={!!errors.aadhaarNumber}
                maxLength={12}
              />
              {errors.aadhaarNumber && (
                <p className="mt-1.5 text-xs text-red-500">{errors.aadhaarNumber}</p>
              )}
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: Address Details ================= */}
        <div className="mb-8 mt-8">
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
                error={!!errors.address}
              />
              {errors.address && (
                <p className="mt-1.5 text-xs text-red-500">{errors.address}</p>
              )}
            </div>

            {/* City, State, PIN Code (3-column grid) */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                  error={!!errors.city}
                />
                {errors.city && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.city}</p>
                )}
              </div>

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
                  error={!!errors.state}
                />
                {errors.state && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.state}</p>
                )}
              </div>

              {/* PIN Code */}
              <div className="w-full">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  PIN Code <span className="text-[#B42318] ml-0.5">*</span>
                </label>

                <CustomInput
                  value={formData?.pinCode || ""}
                  onChange={(value) => handleInputChange("pinCode", value)}
                  width="w-full"
                  type="numeric"
                  placeholder="Enter PIN code"
                  error={!!errors.pinCode}
                  maxLength={6}
                />
                {errors.pinCode && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.pinCode}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 3: Upload Documents ================= */}
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
                maxSize={5}
                multiple={false}
                placeholder="Upload PAN card"
                onChange={(file) => handleInputChange("panCard", file)}
                width="w-full"
                error={errors.panCard}
              />
            </div>

            {/* Aadhaar Card */}
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                Aadhaar Card <span className="text-[#B42318] ml-0.5">*</span>
              </label>

              <DocumentUpload
                accept={["jpg", "jpeg", "png", "pdf"]}
                maxSize={5}
                multiple={false}
                placeholder="Upload Aadhaar card"
                onChange={(file) => handleInputChange("aadhaarCard", file)}
                width="w-full"
                error={errors.aadhaarCard}
              />
            </div>
          </div>
        </div>

        {/* ================= Action Buttons ================= */}
        <div className="flex flex-col-reverse gap-4 border-t border-[#E5E9E7] pt-6 mt-8 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-[9px] border border-[#E5E9E7] bg-white px-6 py-2.5 text-sm font-semibold text-[#0B2545] transition hover:bg-[#F4F7F6] sm:w-auto cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full rounded-[9px] bg-[#0B2545] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0E2F52] sm:w-auto cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
