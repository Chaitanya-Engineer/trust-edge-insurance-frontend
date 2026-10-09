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
    onChange?.((prev) => {
      const updated = { ...prev, [field]: value };
      // Synchronize database schema names and camelCase aliases
      if (field === "name" || field === "fullName") {
        updated.name = value;
        updated.fullName = value;
      }
      if (field === "date_of_birth" || field === "dob") {
        updated.date_of_birth = value;
        updated.dob = value;
      }
      if (field === "phone" || field === "mobileNumber") {
        updated.phone = value;
        updated.mobileNumber = value;
      }
      if (field === "email" || field === "emailAddress") {
        updated.email = value;
        updated.emailAddress = value;
      }
      if (field === "pan_no" || field === "panNumber") {
        updated.pan_no = value;
        updated.panNumber = value;
      }
      if (field === "aadhar_no" || field === "aadhaarNumber") {
        updated.aadhar_no = value;
        updated.aadhaarNumber = value;
      }
      if (field === "pincode" || field === "pinCode") {
        updated.pincode = value;
        updated.pinCode = value;
      }
      return updated;
    });

    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      if (field === "name" || field === "fullName") {
        delete next.name;
        delete next.fullName;
      }
      if (field === "date_of_birth" || field === "dob") {
        delete next.date_of_birth;
        delete next.dob;
      }
      if (field === "phone" || field === "mobileNumber") {
        delete next.phone;
        delete next.mobileNumber;
      }
      if (field === "email" || field === "emailAddress") {
        delete next.email;
        delete next.emailAddress;
      }
      if (field === "pan_no" || field === "panNumber") {
        delete next.pan_no;
        delete next.panNumber;
      }
      if (field === "aadhar_no" || field === "aadhaarNumber") {
        delete next.aadhar_no;
        delete next.aadhaarNumber;
      }
      if (field === "pincode" || field === "pinCode") {
        delete next.pincode;
        delete next.pinCode;
      }
      return next;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name (DB: name)
    const fullNameError = validateFullName(formData?.name || formData?.fullName);
    if (fullNameError) {
      newErrors.name = fullNameError;
      newErrors.fullName = fullNameError;
    }

    // Date of Birth (DB: date_of_birth)
    const dobError = validateDob(formData?.date_of_birth || formData?.dob);
    if (dobError) {
      newErrors.date_of_birth = dobError;
      newErrors.dob = dobError;
    }

    // Gender (DB: gender)
    if (!formData?.gender) {
      newErrors.gender = "Gender is required";
    }

    // Mobile Number (DB: phone)
    const mobileError = validateMobileNumber(formData?.phone || formData?.mobileNumber);
    if (mobileError) {
      newErrors.phone = mobileError;
      newErrors.mobileNumber = mobileError;
    }

    // Email Address (DB: email)
    const emailError = validateEmail(formData?.email || formData?.emailAddress);
    if (emailError) {
      newErrors.email = emailError;
      newErrors.emailAddress = emailError;
    }

    // PAN Number (DB: pan_no)
    const panError = validatePanNumber(formData?.pan_no || formData?.panNumber);
    if (panError) {
      newErrors.pan_no = panError;
      newErrors.panNumber = panError;
    }

    // Aadhaar Number (DB: aadhar_no)
    const aadhaarError = validateAadhaarNumber(formData?.aadhar_no || formData?.aadhaarNumber);
    if (aadhaarError) {
      newErrors.aadhar_no = aadhaarError;
      newErrors.aadhaarNumber = aadhaarError;
    }

    // Address (DB: address)
    const addressError = validateAddress(formData?.address);
    if (addressError) newErrors.address = addressError;

    // City (DB: city)
    const cityError = validateCity(formData?.city);
    if (cityError) newErrors.city = cityError;

    // State (DB: state)
    const stateError = validateState(formData?.state);
    if (stateError) newErrors.state = stateError;

    // PIN Code (DB: pincode)
    const pinCodeError = validatePinCode(formData?.pincode || formData?.pinCode);
    if (pinCodeError) {
      newErrors.pincode = pinCodeError;
      newErrors.pinCode = pinCodeError;
    }

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
            const payload = {
              ...formData,
              name: formData?.name || formData?.fullName || "",
              date_of_birth: formData?.date_of_birth || formData?.dob || "",
              phone: formData?.phone || formData?.mobileNumber || "",
              email: formData?.email || formData?.emailAddress || "",
              pan_no: formData?.pan_no || formData?.panNumber || "",
              aadhar_no: formData?.aadhar_no || formData?.aadhaarNumber || "",
              pincode: formData?.pincode || formData?.pinCode || "",
            };
            onSubmit?.(payload);
          } else {
            showToast.error(
              "Form Validation Failed",
              "Please fill out all mandatory fields correctly."
            );
            setTimeout(() => {
              const firstErrorField = document.querySelector(".text-[#B42318], .text-red-500");
              if (firstErrorField) {
                firstErrorField.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
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
                value={formData?.name ?? formData?.fullName ?? ""}
                onChange={(value) => handleInputChange("name", value)}
                width="w-full"
                type="text"
                placeholder="Enter full name"
                error={!!(errors.name || errors.fullName)}
              />
              {(errors.name || errors.fullName) && (
                <p className="mt-1.5 text-xs text-red-500">{errors.name || errors.fullName}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="w-full">
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                Date of Birth <span className="text-[#B42318] ml-0.5">*</span>
              </label>

              <CustomDatePicker
                value={formData?.date_of_birth ?? formData?.dob ?? ""}
                onChange={(value) => handleInputChange("date_of_birth", value)}
                max={new Date().toISOString().split("T")[0]}
                width="w-full"
                error={!!(errors.date_of_birth || errors.dob)}
              />
              {(errors.date_of_birth || errors.dob) && (
                <p className="mt-1.5 text-xs text-red-500">{errors.date_of_birth || errors.dob}</p>
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
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                Email Address <span className="text-[#B42318] ml-0.5">*</span>
              </label>

              <CustomInput
                value={formData?.email ?? formData?.emailAddress ?? ""}
                onChange={(value) => handleInputChange("email", value)}
                width="w-full"
                type="text"
                placeholder="Enter email address"
                error={!!(errors.email || errors.emailAddress)}
              />
              {(errors.email || errors.emailAddress) && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.email || errors.emailAddress}
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
                error={!!(errors.pan_no || errors.panNumber)}
                maxLength={10}
              />
              {(errors.pan_no || errors.panNumber) && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.pan_no || errors.panNumber}
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
                error={!!(errors.aadhar_no || errors.aadhaarNumber)}
                maxLength={12}
              />
              {(errors.aadhar_no || errors.aadhaarNumber) && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.aadhar_no || errors.aadhaarNumber}
                </p>
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
                  error={!!(errors.pincode || errors.pinCode)}
                  maxLength={6}
                />
                {(errors.pincode || errors.pinCode) && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.pincode || errors.pinCode}
                  </p>
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
                maxSizeKB={320}
                documentCategory="KYC Document"
                multiple={false}
                placeholder="Upload PAN card (Max 320 KB)"
                onChange={(file) => handleInputChange("panCard", file)}
                value={formData?.panCard}
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
                maxSizeKB={320}
                documentCategory="KYC Document"
                multiple={false}
                placeholder="Upload Aadhaar card (Max 320 KB)"
                onChange={(file) => handleInputChange("aadhaarCard", file)}
                value={formData?.aadhaarCard}
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
