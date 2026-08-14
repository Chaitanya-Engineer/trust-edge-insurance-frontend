import React from "react";
import CustomInput from "../../../../component/core_components/CustomInput/CustomeInput";
import CustomDatePicker from "../../../../component/core_components/DatePicker/CustomDatePicker";
import CustomSelect from "../../../../component/core_components/CustomSelect/CustomSelect";
import DocumentUpload from "../../../../component/core_components/DocumentUpload/DocumentUpload";
import {
  subTypes,
  relations,
  categoryOptions,
  transactionModeOptions,
  vehicleOwnerOptions,
  paymentStatusOptions,
  users,
} from "../constant";

const chequeStatusOptions = [
  { value: "cleared", label: "Cleared" },
  { value: "pending_clearance", label: "Pending Clearance" },
  { value: "bounced", label: "Bounced" },
];

const refundStatusOptions = [
  { value: "done", label: "Done" },
  { value: "pending", label: "Pending" },
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
  const handleInputChange = (field, value) => {
    onChange?.((prev) => ({
      ...prev,
      [field]: value,
    }));
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
  const isBusiness = formData.vehicleOwner === "business";
  const isCheque = formData.txMode === "cheque";

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
  };

  const updateMember = (id, field, value) => {
    const currentMembers = formData.members || [];
    handleInputChange(
      "members",
      currentMembers.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
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
          onSubmit?.(formData);
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
              />
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
              />
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
              />
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
                />
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
              />
            </div>
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <CustomDatePicker
                value={formData.expiryDate || ""}
                onChange={(val) => handleInputChange("expiryDate", val)}
                width="w-full"
              />
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
              {/* Owner Type */}
              <div className="w-full">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Vehicle Owner Type
                </label>
                <CustomSelect
                  options={vehicleOwnerOptions}
                  value={
                    vehicleOwnerOptions.find(
                      (o) => o.value === formData.vehicleOwner
                    ) || null
                  }
                  onChange={(opt) =>
                    handleInputChange("vehicleOwner", opt?.value || "personal")
                  }
                  placeholder="Select owner type"
                  width="w-full"
                />
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
                />
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
                />
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
                  />
                </div>
              )}
            </div>

            {/* Document Uploads */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-4">
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
                />
              </div>
            </div>

            {/* Business Uploads */}
            {isBusiness && (
              <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 mt-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                  Business Documents
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
              <h2 className="text-base font-semibold text-gray-800">
                Family Members
              </h2>
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
                    />
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
                    />
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
                    />
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
              />
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
              />
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
              />
            </div>
          </div>

          {/* Cheque details (Conditional) */}
          {isCheque && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 mt-6">
              <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-4">
                Cheque Details
              </h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-700">
                    Cheque Number
                  </label>
                  <CustomInput
                    value={formData.chequeNum || ""}
                    onChange={(val) => handleInputChange("chequeNum", val)}
                    placeholder="e.g. 000123"
                    width="w-full"
                    type="numeric"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-700">
                    Cheque Status
                  </label>
                  <CustomSelect
                    options={chequeStatusOptions}
                    value={
                      chequeStatusOptions.find(
                        (o) => o.value === formData.chequeStatus
                      ) || null
                    }
                    onChange={(opt) =>
                      handleInputChange("chequeStatus", opt?.value || "pending_clearance")
                    }
                    placeholder="Select status"
                    width="w-full"
                  />
                </div>
              </div>
            </div>
          )}

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
              />
            </div>
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Transaction Time
              </label>
              <CustomInput
                value={formData.txTime || ""}
                onChange={(val) => handleInputChange("txTime", val)}
                placeholder="e.g. 14:30"
                width="w-full"
                type="text"
              />
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

        {/* ================= SECTION 4: Refund Details ================= */}
        <div className="border-b border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800">
              Return / Refund Details
            </h2>
            <button
              type="button"
              onClick={() => handleInputChange("showRefund", !formData.showRefund)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                formData.showRefund
                  ? "bg-red-50 text-red-500 border-red-200 hover:bg-red-100"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {formData.showRefund ? "Remove Refund" : "+ Add Refund"}
            </button>
          </div>

          {formData.showRefund ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 bg-gray-50 border border-gray-100 rounded-lg p-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700">
                  Return Amount (₹)
                </label>
                <CustomInput
                  value={formData.refundAmount || ""}
                  onChange={(val) => handleInputChange("refundAmount", val)}
                  placeholder="0.00"
                  width="w-full"
                  type="numeric"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700">
                  Refund Mode
                </label>
                <CustomSelect
                  options={transactionModeOptions}
                  value={
                    transactionModeOptions.find(
                      (o) => o.value === formData.refundMode
                    ) || null
                  }
                  onChange={(opt) =>
                    handleInputChange("refundMode", opt?.value || "")
                  }
                  placeholder="Select mode"
                  width="w-full"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700">
                  Refund Status
                </label>
                <CustomSelect
                  options={refundStatusOptions}
                  value={
                    refundStatusOptions.find(
                      (o) => o.value === formData.refundStatus
                    ) || null
                  }
                  onChange={(opt) =>
                    handleInputChange("refundStatus", opt?.value || "pending")
                  }
                  placeholder="Select status"
                  width="w-full"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700">
                  Refund Date
                </label>
                <CustomDatePicker
                  value={formData.refundDate || ""}
                  onChange={(val) => handleInputChange("refundDate", val)}
                  width="w-full"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-medium text-gray-700">
                  Refund Note
                </label>
                <textarea
                  rows={2}
                  value={formData.refundNote || ""}
                  onChange={(e) =>
                    handleInputChange("refundNote", e.target.value)
                  }
                  placeholder="Add refund remarks..."
                  className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 resize-none transition-all duration-150"
                />
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-400">
              Optional refund tracking details. Click "+ Add Refund" to toggle.
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
