import React, { useState, useEffect } from "react";
import CustomInput from "../../../../component/core_components/CustomInput/CustomeInput";
import CustomDatePicker from "../../../../component/core_components/DatePicker/CustomDatePicker";
import CustomTimePicker from "../../../../component/core_components/DatePicker/CustomTimePicker";
import CustomSelect from "../../../../component/core_components/CustomSelect/CustomSelect";
import DocumentUpload from "../../../../component/core_components/DocumentUpload/DocumentUpload";
import {
  validateChequeNumber,
  validateVehicleNumber,
} from "../../../../lib/validation";
import {
  subTypes,
  relations,
  categoryOptions,
  transactionModeOptions,
  vehicleOwnerOptions,
  paymentStatusOptions,
  users,
  CommissionStatusOptions,
} from "../constant";

const chequeStatusOptions = [
  { value: "cleared", label: "Cleared" },
  { value: "pending_clearance", label: "Pending Clearance" },
  { value: "bounced", label: "Bounced" },
];

const PolicyRegistrationForm = ({
  formData,
  onChange,
  onClickBack,
  onSubmit,
  onCancel,
  selectedCustomer = null,
  onSelectCustomer,
}) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedCustomer && errors.selectedCustomer) {
      setErrors((prev) => ({ ...prev, selectedCustomer: null }));
    }
  }, [selectedCustomer]);

  const handleInputChange = (field, value) => {
    onChange?.((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }

    // Dynamic field error resetting logic
    if (field === "category") {
      setErrors((prev) => ({
        ...prev,
        category: null,
        subType: null,
        vehicleOwner: null,
        vehicleName: null,
        vehicleNumber: null,
        gvw: null,
        rcFile: null,
        dlFile: null,
        previousPolicyFile: null,
        gstFile: null,
        gumastaFile: null,
        udyamFile: null,
        members: null,
      }));
    }
    if (field === "txMode" && value !== "cheque") {
      setErrors((prev) => ({ ...prev, chequeNum: null, chequeStatus: null }));
    }
    if (field === "CommissionMode" && value !== "cheque") {
      setErrors((prev) => ({ ...prev, commissionChequeNum: null, commissionChequeStatus: null }));
    }
    if (field === "showCommission" && !value) {
      setErrors((prev) => ({
        ...prev,
        CommissionAmount: null,
        CommissionMode: null,
        CommissionStatus: null,
        CommissionDate: null,
        commissionChequeNum: null,
        commissionChequeStatus: null,
      }));
    }
  };

  // Convert users directory to options for search select
  const customerOptions = users.map((u) => ({
    value: u.id,
    label: `${u.fullName} (${u.mobileNumber})`,
    originalUser: u,
  }));

  // Dynamic conditions
  const isMotor = formData.category === "motor";
  const isHealthFamily =
    formData.category === "health" &&
    (formData.subType === "Family Floater" || formData.subType === "Group Health");
  const isMiscVehicle = formData.subType === "Miscellaneous Vehicle";
  const isCommercial = formData.vehicleOwner === "commercial";
  const isCheque = formData.txMode === "cheque";
  const isCommissionCheque = formData.CommissionMode === "cheque";

  const renderChequeDetails = (className, isCommission = false) => {
    const numKey = isCommission ? "commissionChequeNum" : "chequeNum";
    const statusKey = isCommission ? "commissionChequeStatus" : "chequeStatus";
    const numError = isCommission ? errors.commissionChequeNum : errors.chequeNum;
    const statusError = isCommission ? errors.commissionChequeStatus : errors.chequeStatus;

    return (
      <div className={className}>
        <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-4">
          Cheque Details
        </h3>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-medium text-gray-700">
              Cheque Number
            </label>
            <CustomInput
              value={formData[numKey] || ""}
              onChange={(val) => handleInputChange(numKey, val)}
              placeholder="e.g. 000123"
              width="w-full"
              type="numeric"
              error={!!numError}
              maxLength={6}
            />
            {numError && (
              <p className="mt-1 text-xs text-red-500">{numError}</p>
            )}
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium text-gray-700">
              Cheque Status
            </label>
            <CustomSelect
              options={chequeStatusOptions}
              value={
                chequeStatusOptions.find(
                  (o) => o.value === formData[statusKey]
                ) || null
              }
              onChange={(opt) =>
                handleInputChange(statusKey, opt?.value || "pending_clearance")
              }
              placeholder="Select status"
              width="w-full"
              error={!!statusError}
            />
            {statusError && (
              <p className="mt-1 text-xs text-red-500">{statusError}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Dynamic Member management
  const addMember = () => {
    const currentMembers = formData.members || [];
    handleInputChange("members", [
      ...currentMembers,
      { id: Date.now(), name: "", age: "", relation: "" },
    ]);
  };

  const removeMember = (id) => {
    const currentMembers = formData.members || [];
    handleInputChange(
      "members",
      currentMembers.filter((m) => m.id !== id)
    );
    // Clear errors associated with the removed member
    if (errors.members && errors.members[id]) {
      setErrors((prev) => {
        const nextMembers = { ...prev.members };
        delete nextMembers[id];
        const nextErrors = { ...prev, members: nextMembers };
        if (Object.keys(nextMembers).length === 0) {
          delete nextErrors.members;
        }
        return nextErrors;
      });
    }
  };

  const updateMember = (id, field, value) => {
    const currentMembers = formData.members || [];
    handleInputChange(
      "members",
      currentMembers.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );

    // Clear specific member field error on change
    if (errors.members && errors.members[id] && errors.members[id][field]) {
      setErrors((prev) => {
        const nextMembers = { ...prev.members };
        if (nextMembers[id]) {
          nextMembers[id] = { ...nextMembers[id], [field]: null };
          if (Object.values(nextMembers[id]).every((v) => !v)) {
            delete nextMembers[id];
          }
        }
        const nextErrors = { ...prev, members: nextMembers };
        if (Object.keys(nextMembers).length === 0) {
          delete nextErrors.members;
        }
        return nextErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Customer Selection
    if (!selectedCustomer) {
      newErrors.selectedCustomer = "Please search and select a customer";
    }

    // Policy Name
    if (!formData.policyName?.trim()) {
      newErrors.policyName = "Policy name is required";
    } else if (formData.policyName.trim().length < 3) {
      newErrors.policyName = "Policy name must be at least 3 characters long";
    }

    // Category
    if (!formData.category) {
      newErrors.category = "Policy category is required";
    }

    // Sub-Type
    if (formData.category && !formData.subType) {
      newErrors.subType = "Policy sub-type is required";
    }

    // Issue Date
    if (!formData.issueDate) {
      newErrors.issueDate = "Issue date is required";
    }

    // Expiry Date
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (formData.issueDate && new Date(formData.expiryDate) <= new Date(formData.issueDate)) {
      newErrors.expiryDate = "Expiry date must be after the issue date";
    }

    // Motor conditional fields
    if (isMotor) {
      if (!formData.vehicleOwner) {
        newErrors.vehicleOwner = "Vehicle type is required";
      }
      if (!formData.vehicleName?.trim()) {
        newErrors.vehicleName = "Vehicle name is required";
      }
      const vehicleNumberErr = validateVehicleNumber(formData.vehicleNumber);
      if (vehicleNumberErr) newErrors.vehicleNumber = vehicleNumberErr;

      if (isMiscVehicle) {
        if (!formData.gvw) {
          newErrors.gvw = "GVW is required";
        } else if (isNaN(formData.gvw) || Number(formData.gvw) <= 0) {
          newErrors.gvw = "GVW must be a positive number";
        }
      }

      if (!formData.rcFile) {
        newErrors.rcFile = "Registration Certificate (RC) is required";
      }
      if (!formData.dlFile) {
        newErrors.dlFile = "Driving License (DL) is required";
      }
      if (formData.vehicleOwner && !formData.previousPolicyFile) {
        newErrors.previousPolicyFile = "Previous Year Policy is required";
      }

      if (isCommercial) {
        if (!formData.gstFile) {
          newErrors.gstFile = "GST Certificate is required";
        }
        if (!formData.gumastaFile) {
          newErrors.gumastaFile = "Gumasta License is required";
        }
        if (!formData.udyamFile) {
          newErrors.udyamFile = "Udyam Registration is required";
        }
      }
    }

    // Health Family conditional fields
    if (isHealthFamily) {
      const members = formData.members || [];
      if (members.length === 0) {
        newErrors.membersGeneral = "Please add at least one family member";
      } else {
        const memberErrors = {};
        members.forEach((m) => {
          const mErrors = {};
          if (!m.name?.trim()) {
            mErrors.name = "Name is required";
          } else if (!/^[A-Za-z\s]+$/.test(m.name)) {
            mErrors.name = "Letters and spaces only";
          }

          if (!m.age) {
            mErrors.age = "Age is required";
          } else if (isNaN(m.age) || Number(m.age) < 0 || Number(m.age) > 120) {
            mErrors.age = "Age must be 0-120";
          }

          if (!m.relation) {
            mErrors.relation = "Relation is required";
          }

          if (Object.keys(mErrors).length > 0) {
            memberErrors[m.id] = mErrors;
          }
        });

        if (Object.keys(memberErrors).length > 0) {
          newErrors.members = memberErrors;
        }
      }
    }

    // Price
    if (!formData.price) {
      newErrors.price = "Policy price is required";
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Policy price must be a positive number";
    }

    // Tx Mode and Pay Status
    if (!formData.txMode) {
      newErrors.txMode = "Transaction mode is required";
    }
    if (!formData.payStatus) {
      newErrors.payStatus = "Payment status is required";
    }

    // Cheque primary details
    if (isCheque) {
      const chequeNumErr = validateChequeNumber(formData.chequeNum);
      if (chequeNumErr) newErrors.chequeNum = chequeNumErr;
      if (!formData.chequeStatus) {
        newErrors.chequeStatus = "Cheque status is required";
      }
    }

    // Tx Date & Time
    if (!formData.txDate) {
      newErrors.txDate = "Transaction date is required";
    }
    if (!formData.txTime) {
      newErrors.txTime = "Transaction time is required";
    }

    // Commission Details
    if (formData.showCommission) {
      if (!formData.CommissionAmount) {
        newErrors.CommissionAmount = "Commission amount is required";
      } else {
        const commissionVal = Number(formData.CommissionAmount);
        const priceVal = Number(formData.price || 0);
        if (isNaN(commissionVal) || commissionVal <= 0) {
          newErrors.CommissionAmount = "Commission must be a positive number";
        } else if (priceVal > 0 && commissionVal > priceVal) {
          newErrors.CommissionAmount = "Commission cannot exceed policy price";
        }
      }

      if (!formData.CommissionMode) {
        newErrors.CommissionMode = "Commission mode is required";
      }
      if (!formData.CommissionStatus) {
        newErrors.CommissionStatus = "Commission status is required";
      }
      if (!formData.CommissionDate) {
        newErrors.CommissionDate = "Commission date is required";
      }

      if (isCommissionCheque) {
        const commChequeNumErr = validateChequeNumber(formData.commissionChequeNum);
        if (commChequeNumErr) newErrors.commissionChequeNum = commChequeNumErr;
        if (!formData.commissionChequeStatus) {
          newErrors.commissionChequeStatus = "Cheque status is required";
        }
      }
    }

    // Policy Document
    if (!formData.policyDoc) {
      newErrors.policyDoc = "Policy document is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      {/* Back Button */}
      <div
        className="text-navy hover:text-blue-600 py-3 cursor-pointer text-sm font-semibold flex items-center gap-1 w-fit transition-colors mb-4"
        onClick={onClickBack}
      >
        ← Back to Directory
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
        className="space-y-6"
      >
        {/* ================= SECTION 1: Policy Details ================= */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="mb-4 text-base font-semibold text-gray-800">
            Policy Details
          </h2>

          {/* Selected Customer Details / Search Selector */}
          {selectedCustomer ? (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-0.5">
                  Selected Customer
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {selectedCustomer.fullName}
                </p>
                <p className="text-xs text-gray-500">
                  {selectedCustomer.mobileNumber} · {selectedCustomer.emailAddress}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectCustomer?.(null)}
                className="text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded px-2.5 py-1 transition-colors"
              >
                Change Customer
              </button>
            </div>
          ) : (
            <div className="mb-6 w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Search / Select Customer
              </label>
              <CustomSelect
                options={customerOptions}
                value={null}
                onChange={(opt) => {
                  if (opt) {
                    onSelectCustomer?.(opt.originalUser);
                  }
                }}
                placeholder="Search customer by name or mobile..."
                width="w-full"
                error={!!errors.selectedCustomer}
              />
              {errors.selectedCustomer && (
                <p className="mt-1.5 text-xs text-red-500">{errors.selectedCustomer}</p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Policy Name */}
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Policy Name
              </label>
              <CustomInput
                value={formData.policyName || ""}
                onChange={(val) => handleInputChange("policyName", val)}
                placeholder="e.g. Family Health Cover 2024"
                width="w-full"
                type="text"
                error={!!errors.policyName}
              />
              {errors.policyName && (
                <p className="mt-1.5 text-xs text-red-500">{errors.policyName}</p>
              )}
            </div>

            {/* Category */}
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Policy Category
              </label>
              <CustomSelect
                options={categoryOptions}
                value={
                  categoryOptions.find((o) => o.value === formData.category) ||
                  null
                }
                onChange={(opt) => {
                  handleInputChange("category", opt?.value || "");
                  handleInputChange("subType", ""); // Reset subtype
                }}
                placeholder="Select category"
                width="w-full"
                error={!!errors.category}
              />
              {errors.category && (
                <p className="mt-1.5 text-xs text-red-500">{errors.category}</p>
              )}
            </div>

            {/* Sub-Type (Conditional on category selection) */}
            {formData.category && (
              <div className="w-full">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Policy Sub-Type
                </label>
                <CustomSelect
                  options={(subTypes[formData.category] || []).map((s) => ({
                    value: s,
                    label: s,
                  }))}
                  value={
                    formData.subType
                      ? { value: formData.subType, label: formData.subType }
                      : null
                  }
                  onChange={(opt) => handleInputChange("subType", opt?.value || "")}
                  placeholder="Select sub-type"
                  width="w-full"
                  error={!!errors.subType}
                />
                {errors.subType && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.subType}</p>
                )}
              </div>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-4">
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Issue Date
              </label>
              <CustomDatePicker
                value={formData.issueDate || ""}
                onChange={(val) => handleInputChange("issueDate", val)}
                width="w-full"
                error={!!errors.issueDate}
              />
              {errors.issueDate && (
                <p className="mt-1.5 text-xs text-red-500">{errors.issueDate}</p>
              )}
            </div>
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <CustomDatePicker
                value={formData.expiryDate || ""}
                onChange={(val) => handleInputChange("expiryDate", val)}
                width="w-full"
                error={!!errors.expiryDate}
              />
              {errors.expiryDate && (
                <p className="mt-1.5 text-xs text-red-500">{errors.expiryDate}</p>
              )}
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: Conditional Details ================= */}
        {/* Motor Insurance */}
        {isMotor && (
          <div className="border-b border-gray-200 pb-6">
            <h2 className="mb-4 text-base font-semibold text-gray-800">
              Motor Vehicle Details
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Vehicle Type */}
              <div className="w-full">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Vehicle Type
                </label>
                <CustomSelect
                  options={vehicleOwnerOptions}
                  value={
                    vehicleOwnerOptions.find(
                      (o) => o.value === formData.vehicleOwner
                    ) || null
                  }
                  onChange={(opt) =>
                    handleInputChange("vehicleOwner", opt?.value || "")
                  }
                  placeholder="Select vehicle type"
                  width="w-full"
                  error={!!errors.vehicleOwner}
                />
                {errors.vehicleOwner && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.vehicleOwner}</p>
                )}
              </div>

              {/* Vehicle Name */}
              <div className="w-full">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Vehicle Name
                </label>
                <CustomInput
                  value={formData.vehicleName || ""}
                  onChange={(val) => handleInputChange("vehicleName", val)}
                  placeholder="e.g. Honda Activa 6G"
                  width="w-full"
                  type="text"
                  error={!!errors.vehicleName}
                />
                {errors.vehicleName && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.vehicleName}</p>
                )}
              </div>

              {/* Vehicle Number */}
              <div className="w-full">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Vehicle Number
                </label>
                <CustomInput
                  value={formData.vehicleNumber || ""}
                  onChange={(val) =>
                    handleInputChange("vehicleNumber", val.toUpperCase())
                  }
                  placeholder="e.g. MH 12 AB 1234"
                  width="w-full"
                  type="text"
                  error={!!errors.vehicleNumber}
                  maxLength={10}
                />
                {errors.vehicleNumber && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.vehicleNumber}</p>
                )}
              </div>

              {/* GVW (Only for Miscellaneous Vehicle) */}
              {isMiscVehicle && (
                <div className="w-full">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Gross Vehicle Weight (GVW) — kg
                  </label>
                  <CustomInput
                    value={formData.gvw || ""}
                    onChange={(val) => handleInputChange("gvw", val)}
                    placeholder="e.g. 7500"
                    width="w-full"
                    type="numeric"
                    error={!!errors.gvw}
                  />
                  {errors.gvw && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.gvw}</p>
                  )}
                </div>
              )}
            </div>

            {/* Document Uploads */}
            <div className={`grid grid-cols-1 gap-5 ${formData.vehicleOwner ? 'md:grid-cols-3' : 'md:grid-cols-2'} mt-4`}>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Registration Certificate (RC)
                </label>
                <DocumentUpload
                  accept={["jpg", "jpeg", "png", "pdf"]}
                  maxSize={10}
                  placeholder="Upload RC Document"
                  onChange={(file) => handleInputChange("rcFile", file)}
                  width="w-full"
                  error={errors.rcFile}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Driving License (DL)
                </label>
                <DocumentUpload
                  accept={["jpg", "jpeg", "png", "pdf"]}
                  maxSize={10}
                  placeholder="Upload DL Document"
                  onChange={(file) => handleInputChange("dlFile", file)}
                  width="w-full"
                  error={errors.dlFile}
                />
              </div>

              {formData.vehicleOwner && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Previous Year Policy
                  </label>
                  <DocumentUpload
                    accept={["jpg", "jpeg", "png", "pdf"]}
                    maxSize={10}
                    placeholder="Upload Previous Year Policy"
                    onChange={(file) => handleInputChange("previousPolicyFile", file)}
                    width="w-full"
                    error={errors.previousPolicyFile}
                  />
                </div>
              )}
            </div>

            {/* Commercial Uploads */}
            {isCommercial && (
              <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 mt-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                  Commercial Documents
                </h3>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-gray-600">
                      GST Certificate
                    </label>
                    <DocumentUpload
                      accept={["pdf", "jpg", "jpeg", "png"]}
                      maxSize={10}
                      placeholder="Upload GST"
                      onChange={(file) => handleInputChange("gstFile", file)}
                      width="w-full"
                      error={errors.gstFile}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-gray-600">
                      Gumasta License
                    </label>
                    <DocumentUpload
                      accept={["pdf", "jpg", "jpeg", "png"]}
                      maxSize={10}
                      placeholder="Upload Gumasta"
                      onChange={(file) => handleInputChange("gumastaFile", file)}
                      width="w-full"
                      error={errors.gumastaFile}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-gray-600">
                      Udyam Registration / Aadhaar
                    </label>
                    <DocumentUpload
                      accept={["pdf", "jpg", "jpeg", "png"]}
                      maxSize={10}
                      placeholder="Upload Udyam"
                      onChange={(file) => handleInputChange("udyamFile", file)}
                      width="w-full"
                      error={errors.udyamFile}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Health Family Members */}
        {isHealthFamily && (
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-gray-800">
                  Family Members
                </h2>
                {errors.membersGeneral && (
                  <p className="text-xs text-red-500 mt-1">{errors.membersGeneral}</p>
                )}
              </div>
              <button
                type="button"
                onClick={addMember}
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors border border-blue-200 bg-blue-50 px-3 py-1.5 rounded-lg"
              >
                + Add Member
              </button>
            </div>

            <div className="space-y-4">
              {(formData.members || []).map((m, idx) => (
                <div
                  key={m.id}
                  className="grid grid-cols-1 gap-4 items-end sm:grid-cols-[1fr_120px_180px_50px] p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                      Full Name
                    </label>
                    <CustomInput
                      value={m.name}
                      onChange={(val) => updateMember(m.id, "name", val)}
                      placeholder="Enter name"
                      width="w-full"
                      type="text"
                      error={!!(errors.members?.[m.id]?.name)}
                    />
                    {errors.members?.[m.id]?.name && (
                      <p className="mt-1 text-[10px] text-red-500">{errors.members[m.id].name}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                      Age
                    </label>
                    <CustomInput
                      value={m.age}
                      onChange={(val) => updateMember(m.id, "age", val)}
                      placeholder="Age"
                      width="w-full"
                      type="numeric"
                      error={!!(errors.members?.[m.id]?.age)}
                    />
                    {errors.members?.[m.id]?.age && (
                      <p className="mt-1 text-[10px] text-red-500">{errors.members[m.id].age}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                      Relation
                    </label>
                    <CustomSelect
                      options={relations}
                      value={relations.find((r) => r.value === m.relation) || null}
                      onChange={(opt) =>
                        updateMember(m.id, "relation", opt?.value || "")
                      }
                      placeholder="Select relation"
                      width="w-full"
                      error={!!(errors.members?.[m.id]?.relation)}
                    />
                    {errors.members?.[m.id]?.relation && (
                      <p className="mt-1 text-[10px] text-red-500">{errors.members[m.id].relation}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeMember(m.id)}
                    disabled={(formData.members || []).length <= 1}
                    className="h-10 w-full sm:w-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors border border-gray-200 sm:border-0"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {(formData.members || []).length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                  No members added yet. Click "Add Member" to get started.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ================= SECTION 3: Payment Details ================= */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="mb-4 text-base font-semibold text-gray-800">
            Payment Details
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Policy Price */}
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Policy Price (₹)
              </label>
              <CustomInput
                value={formData.price || ""}
                onChange={(val) => handleInputChange("price", val)}
                placeholder="0.00"
                width="w-full"
                type="numeric"
                error={!!errors.price}
              />
              {errors.price && (
                <p className="mt-1.5 text-xs text-red-500">{errors.price}</p>
              )}
            </div>

            {/* Transaction Mode */}
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Transaction Mode
              </label>
              <CustomSelect
                options={transactionModeOptions}
                value={
                  transactionModeOptions.find(
                    (o) => o.value === formData.txMode
                  ) || null
                }
                onChange={(opt) => handleInputChange("txMode", opt?.value || "")}
                placeholder="Select mode"
                width="w-full"
                error={!!errors.txMode}
              />
              {errors.txMode && (
                <p className="mt-1.5 text-xs text-red-500">{errors.txMode}</p>
              )}
            </div>

            {/* Payment Status */}
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Payment Status
              </label>
              <CustomSelect
                options={paymentStatusOptions}
                value={
                  paymentStatusOptions.find(
                    (o) => o.value === formData.payStatus
                  ) || null
                }
                onChange={(opt) =>
                  handleInputChange("payStatus", opt?.value || "pending")
                }
                placeholder="Select status"
                width="w-full"
                error={!!errors.payStatus}
              />
              {errors.payStatus && (
                <p className="mt-1.5 text-xs text-red-500">{errors.payStatus}</p>
              )}
            </div>
          </div>

          {/* Cheque details (Conditional) */}
          {isCheque && renderChequeDetails("rounded-xl bg-amber-50 border border-amber-200 p-4 mt-6", false)}

          {/* Tx Date and Time */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-4">
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Transaction Date
              </label>
              <CustomDatePicker
                value={formData.txDate || ""}
                onChange={(val) => handleInputChange("txDate", val)}
                width="w-full"
                error={!!errors.txDate}
              />
              {errors.txDate && (
                <p className="mt-1.5 text-xs text-red-500">{errors.txDate}</p>
              )}
            </div>
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Transaction Time
              </label>
              <CustomTimePicker
                value={formData.txTime || ""}
                onChange={(val) => handleInputChange("txTime", val)}
                width="w-full"
                error={!!errors.txTime}
              />
              {errors.txTime && (
                <p className="mt-1.5 text-xs text-red-500">{errors.txTime}</p>
              )}
            </div>
          </div>

          {/* Tx Notes */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Transaction Note <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              rows={3}
              value={formData.txNote || ""}
              onChange={(e) => handleInputChange("txNote", e.target.value)}
              placeholder="Add payment remarks or references..."
              className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 resize-none transition-all duration-150"
            />
          </div>
        </div>

        {/* ================= SECTION 4: Commission Details ================= */}
        <div className="border-b border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800">
              Commission Details
            </h2>
            <button
              type="button"
              onClick={() => handleInputChange("showCommission", !formData.showCommission)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                formData.showCommission
                  ? "bg-red-50 text-red-500 border-red-200 hover:bg-red-100"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {formData.showCommission ? "Remove Commission" : "+ Add Commission"}
            </button>
          </div>

          {formData.showCommission ? (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 bg-gray-50 border border-gray-100 rounded-lg p-4">
                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-700">
                    Commission Amount (₹)
                  </label>
                  <CustomInput
                    value={formData.CommissionAmount || ""}
                    onChange={(val) => handleInputChange("CommissionAmount", val)}
                    placeholder="0.00"
                    width="w-full"
                    type="numeric"
                    error={!!errors.CommissionAmount}
                  />
                  {errors.CommissionAmount && (
                    <p className="mt-1 text-xs text-red-500">{errors.CommissionAmount}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-700">
                    Commission Mode
                  </label>
                  <CustomSelect
                    options={transactionModeOptions}
                    value={
                      transactionModeOptions.find(
                        (o) => o.value === formData.CommissionMode
                      ) || null
                    }
                    onChange={(opt) =>
                      handleInputChange("CommissionMode", opt?.value || "")
                    }
                    placeholder="Select mode"
                    width="w-full"
                    error={!!errors.CommissionMode}
                  />
                  {errors.CommissionMode && (
                    <p className="mt-1 text-xs text-red-500">{errors.CommissionMode}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-700">
                    Commission Status
                  </label>
                  <CustomSelect
                    options={CommissionStatusOptions}
                    value={
                      CommissionStatusOptions.find(
                        (o) => o.value === formData.CommissionStatus
                      ) || null
                    }
                    onChange={(opt) =>
                      handleInputChange("CommissionStatus", opt?.value || "pending")
                    }
                    placeholder="Select status"
                    width="w-full"
                    error={!!errors.CommissionStatus}
                  />
                  {errors.CommissionStatus && (
                    <p className="mt-1 text-xs text-red-500">{errors.CommissionStatus}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-700">
                    Commission Date
                  </label>
                  <CustomDatePicker
                    value={formData.CommissionDate || ""}
                    onChange={(val) => handleInputChange("CommissionDate", val)}
                    width="w-full"
                    error={!!errors.CommissionDate}
                  />
                  {errors.CommissionDate && (
                    <p className="mt-1 text-xs text-red-500">{errors.CommissionDate}</p>
                  )}
                </div>

                {/* Commission Cheque details (Conditional) */}
                {isCommissionCheque && renderChequeDetails("md:col-span-2 rounded-xl bg-amber-50 border border-amber-200 p-4", true)}

                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-medium text-gray-700">
                    Commission Note
                  </label>
                  <textarea
                    rows={2}
                    value={formData.CommissionNote || ""}
                    onChange={(e) =>
                      handleInputChange("CommissionNote", e.target.value)
                    }
                    placeholder="Add Commission remarks..."
                    className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 resize-none transition-all duration-150"
                  />
                </div>
              </div>
            </>
          ) : (
            <p className="text-xs text-gray-400">
              Optional Commission tracking details. Click "+ Add Commission" to toggle.
            </p>
          )}
        </div>

        {/* ================= SECTION 5: Policy Document ================= */}
        <div className="pb-4">
          <h2 className="mb-4 text-base font-semibold text-gray-800">
            Upload Policy Document
          </h2>
          <DocumentUpload
            accept={["pdf", "jpg", "jpeg", "png"]}
            maxSize={25}
            placeholder="Drag and drop or browse to upload Policy PDF"
            onChange={(file) => handleInputChange("policyDoc", file)}
            width="w-full"
            error={errors.policyDoc}
          />
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
            className="w-full rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
          >
            Submit Policy
          </button>
        </div>
      </form>
    </div>
  );
};

export default PolicyRegistrationForm;
