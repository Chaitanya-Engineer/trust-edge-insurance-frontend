import React from "react";

import { genderOptions } from "../constant";
import CustomInput from "../../../../component/core_components/CustomInput/CustomeInput";
import CustomDatePicker from "../../../../component/core_components/DatePicker/CustomDatePicker";
import CustomSelect from "../../../../component/core_components/CustomSelect/CustomSelect";
import DocumentUpload from "../../../../component/core_components/DocumentUpload/DocumentUpload";

const UserRegistrationForm = ({
  formData,
  onChange,
  onClickBack,
  onSubmit,
  onCancel,
}) => {
  const handleInputChange = (field, value) => {
    onChange?.((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <div
        className="text-navy-light py-3 cursor-pointer"
        onClick={onClickBack}
      >
        Back
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(formData);
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
                value={formData?.name || ""}
                onChange={(value) => handleInputChange("name", value)}
                width="w-full"
                type="text"
                placeholder="Enter full name"
              />
            </div>

            {/* Date of Birth */}
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Date of Birth
              </label>

              <CustomDatePicker
                value={formData?.date_of_birth || ""}
                onChange={(value) => handleInputChange("date_of_birth", value)}
                width="w-full"
              />
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
              />
            </div>

            {/* Mobile Number */}
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Mobile Number
              </label>

              <CustomInput
                value={formData?.phone || ""}
                onChange={(value) => handleInputChange("phone", value)}
                width="w-full"
                type="numeric"
                placeholder="Enter mobile number"
              />
            </div>

            {/* Email Address */}
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>

              <CustomInput
                value={formData?.email || ""}
                onChange={(value) => handleInputChange("email", value)}
                width="w-full"
                type="text"
                placeholder="Enter email address"
              />
            </div>

            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Address
              </label>

              <CustomInput
                value={formData?.address || ""}
                onChange={(value) => handleInputChange("address", value)}
                width="w-full"
                type="text"
                placeholder="Enter address"
              />
            </div>
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                City
              </label>

              <CustomInput
                value={formData?.city || ""}
                onChange={(value) => handleInputChange("city", value)}
                width="w-full"
                type="text"
                placeholder="Enter city Name"
              />
            </div>
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                State
              </label>

              <CustomInput
                value={formData?.state || ""}
                onChange={(value) => handleInputChange("state", value)}
                width="w-full"
                type="text"
                placeholder="Enter State Name"
              />
            </div>

            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Pin Code
              </label>

              <CustomInput
                value={formData?.pincode || ""}
                onChange={(value) => handleInputChange("pincode", value)}
                width="w-full"
                type="text"
                placeholder="Enter Pincode"
              />
            </div>

            {/* PAN Number */}
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                PAN Number
              </label>

              <CustomInput
                value={formData?.pan_no || ""}
                onChange={(value) =>
                  handleInputChange("pan_no", value.toUpperCase())
                }
                width="w-full"
                type="alphanumeric"
                placeholder="Enter PAN number"
              />
            </div>

            {/* Aadhaar Number */}
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Aadhaar Number
              </label>

              <CustomInput
                value={formData?.aadhar_no || ""}
                onChange={(value) => handleInputChange("aadhar_no", value)}
                width="w-full"
                type="numeric"
                placeholder="Enter Aadhaar number"
              />
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
