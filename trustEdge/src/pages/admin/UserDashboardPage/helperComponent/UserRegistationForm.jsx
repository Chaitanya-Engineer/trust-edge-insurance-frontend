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
} from "../../../../lib/validation";

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
    <div className="w-full rounded-xl bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <div
        className="text-navy-light py-3 cursor-pointer hover:text-blue-600 transition-colors"
        onClick={onClickBack}
      >
        Back
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validateForm()) {
            onSubmit?.(formData);
          } else {
            setTimeout(() => {
              const firstErrorField = document.querySelector(".text-red-500");
              if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }, 100);
          }
        }}
        className="w-full"
      >
        <div className="mb-8">
          <h2 className="mb-5 text-lg font-semibold text-gray-800 sm:text-xl">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Full Name */}
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
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
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Date of Birth
              </label>

              <CustomDatePicker
                value={formData?.dob || ""}
                onChange={(value) => handleInputChange("dob", value)}
                width="w-full"
                error={!!errors.dob}
              />
              {errors.dob && (
                <p className="mt-1.5 text-xs text-red-500">{errors.dob}</p>
              )}
            </div>

            {/* Gender */}
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Gender
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
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Mobile Number
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
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
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
              <label className="mb-2 block text-sm font-medium text-gray-700">
                PAN Number
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
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Aadhaar Number
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

        {/* ================= Document Upload ================= */}
        <div className="mb-8">
          <h2 className="mb-5 text-lg font-semibold text-gray-800 sm:text-xl">
            Upload Documents
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* PAN Card */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                PAN Card
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
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Aadhaar Card
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

        {/* ================= Buttons ================= */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
