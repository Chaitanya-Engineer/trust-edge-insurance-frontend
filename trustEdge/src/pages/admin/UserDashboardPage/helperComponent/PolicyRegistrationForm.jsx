import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import CustomInput from "../../../../component/core_components/CustomInput/CustomeInput";
import CustomDatePicker from "../../../../component/core_components/DatePicker/CustomDatePicker";
import CustomDateTimePicker from "../../../../component/core_components/DatePicker/CustomDateTimePicker";
import CustomSelect from "../../../../component/core_components/CustomSelect/CustomSelect";
import DocumentUpload from "../../../../component/core_components/DocumentUpload/DocumentUpload";
import ConfirmationModal from "../../../../component/core_components/ConfirmationModal/ConfirmationModal";
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
  CommissionStatusOptions,
  insuranceCompanyOptions,
} from "../constant";
import { showToast } from "../../../../component/core_components/CustomToast/CustomToast";
import { API_ENDPOINTS } from "../../../../lib/constant/ApiEndpoints";
import { useAPI } from "../../../../lib/hooks/useAPI";

const chequeStatusOptions = [
  { value: "cleared", label: "Cleared" },
  { value: "pending_clearance", label: "Pending Clearance" },
  { value: "bounced", label: "Bounced" },
];

const PolicyRegistrationForm = ({
  customerList = [],
  customerOptions: suppliedCustomerOptions = [],
  formData,
  onChange,
  onClickBack,
  onSubmitPolicy,
  onSaveDraft,
  onCancel,
  selectedCustomer = null,
  onSelectCustomer,
  selectedPolicy = null,
  isEditMode = false,
  isSubmitting = false,
}) => {
  const [internalCustomer, setInternalCustomer] = useState(null);
  const [internalDropdownOptions, setInternalDropdownOptions] = useState([]);

  const { callApi: fetchDropdownFallback } = useAPI(
    API_ENDPOINTS?.ADMIN?.CUSTOMER_DROPDOWN,
    {
      method: "GET",
      onSuccess: (data) => {
        const list = Array.isArray(data) ? data : data?.results || [];
        if (list.length > 0) {
          setInternalDropdownOptions(list);
        } else {
          fetchUsersFallback();
        }
      },
      onFailure: () => {
        fetchUsersFallback();
      },
    }
  );

  const { callApi: fetchUsersFallback } = useAPI(
    API_ENDPOINTS?.ADMIN?.USERS_LIST,
    {
      method: "GET",
      onSuccess: (data) => {
        const list = Array.isArray(data) ? data : data?.results || [];
        setInternalDropdownOptions(list);
      },
    }
  );

  useEffect(() => {
    const hasProps =
      (Array.isArray(suppliedCustomerOptions) &&
        suppliedCustomerOptions.length > 0) ||
      (Array.isArray(customerList) && customerList.length > 0);
    if (!hasProps) {
      fetchDropdownFallback();
    }
  }, [suppliedCustomerOptions, customerList]);

  const activeCustomer = useMemo(
    () =>
      selectedCustomer !== undefined && selectedCustomer !== null
        ? selectedCustomer
        : internalCustomer ||
          (selectedPolicy?.customer_id != null
            ? {
                label:
                  selectedPolicy.customer_name ||
                  selectedPolicy.customer?.name ||
                  `Customer #${selectedPolicy.customer_id}`,
                value: String(selectedPolicy.customer_id),
              }
            : null),
    [selectedCustomer, internalCustomer, selectedPolicy]
  );

  const activeCustomerId = useMemo(() => {
    if (!activeCustomer) return "";
    if (
      typeof activeCustomer === "string" ||
      typeof activeCustomer === "number"
    ) {
      return String(activeCustomer);
    }
    return String(
      activeCustomer.value ||
        activeCustomer.customer_id ||
        activeCustomer.id ||
        ""
    );
  }, [activeCustomer]);

  const handleCustomerSelect = (cust) => {
    if (onSelectCustomer) {
      onSelectCustomer(cust);
    } else {
      setInternalCustomer(cust);
    }
  };

  // Robust customer options loaded from props or direct fallback API
  const customerOptions = useMemo(() => {
    const rawList =
      Array.isArray(suppliedCustomerOptions) &&
      suppliedCustomerOptions.length > 0
        ? suppliedCustomerOptions
        : suppliedCustomerOptions?.results ||
          (Array.isArray(customerList) && customerList.length > 0
            ? customerList
            : customerList?.results ||
              (Array.isArray(internalDropdownOptions) &&
              internalDropdownOptions.length > 0
                ? internalDropdownOptions
                : internalDropdownOptions?.results || []));

    const source = Array.isArray(rawList) ? rawList : [];

    return source
      .map((item) => {
        const id = item.value ?? item.customer_id ?? item.id ?? "";
        const name =
          item.label ||
          item.name ||
          item.full_name ||
          item.fullName ||
          item.customer_name ||
          (id ? `Customer #${id}` : "Customer");
        const extra = item.phone ? ` (${item.phone})` : "";
        return {
          label: item.label ? item.label : `${name}${extra}`,
          value: String(id),
        };
      })
      .filter((item) => item.value !== "");
  }, [suppliedCustomerOptions, customerList, internalDropdownOptions]);

  const [errors, setErrors] = useState({});
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    description: "",
    confirmText: "",
    cancelText: "Cancel",
    variant: "primary",
    onConfirm: null,
    isLoading: false,
  });

  useEffect(() => {
    if (activeCustomerId && errors.selectedCustomer) {
      setErrors((prev) => ({ ...prev, selectedCustomer: null }));
    }
  }, [activeCustomerId, errors.selectedCustomer]);

  const handleInputChange = (field, value) => {
    onChange?.((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => {
      let nextErrors = { ...prev };
      if (nextErrors[field]) {
        nextErrors[field] = null;
      }

      // Dynamic field error clearing logic
      if (field === "category") {
        nextErrors = {
          ...nextErrors,
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
        };
      }

      if (field === "txMode" && value !== "cheque") {
        nextErrors.chequeNum = null;
        nextErrors.chequeStatus = null;
      }

      if (field === "CommissionMode" && value !== "cheque") {
        nextErrors.commissionChequeNum = null;
        nextErrors.commissionChequeStatus = null;
      }

      if (field === "CommissionStatus" && value === "pending") {
        nextErrors.CommissionAmount = null;
        nextErrors.CommissionMode = null;
        nextErrors.CommissionDate = null;
        nextErrors.commissionChequeNum = null;
        nextErrors.commissionChequeStatus = null;
      }

      if (field === "showCommission" && !value) {
        nextErrors.CommissionAmount = null;
        nextErrors.CommissionMode = null;
        nextErrors.CommissionStatus = null;
        nextErrors.CommissionDate = null;
        nextErrors.commissionChequeNum = null;
        nextErrors.commissionChequeStatus = null;
      }

      return nextErrors;
    });
  };

  // Dynamic conditions
  const isMotor = formData.category === "motor";
  const isHealthFamily =
    formData.category === "health" &&
    (formData.subType === "Family Floater" ||
      formData.subType === "Group Health");
  const isMiscVehicle = formData.subType === "Miscellaneous Vehicle";
  const isCommercial = formData.vehicleOwner === "commercial";
  const isCheque = formData.txMode === "cheque";
  const isCommissionCheque = formData.CommissionMode === "cheque";

  const renderChequeDetails = (className, isCommission = false) => {
    const numKey = isCommission ? "commissionChequeNum" : "chequeNum";
    const statusKey = isCommission ? "commissionChequeStatus" : "chequeStatus";
    const numError = isCommission
      ? errors.commissionChequeNum
      : errors.chequeNum;
    const statusError = isCommission
      ? errors.commissionChequeStatus
      : errors.chequeStatus;

    return (
      <div className={className}>
        <h3 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-4">
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
    showToast.info("Family Member Added", "New member coverage row created.");
  };

  const removeMember = (id) => {
    const currentMembers = formData.members || [];
    handleInputChange(
      "members",
      currentMembers.filter((m) => m.id !== id)
    );
    showToast.warning("Family Member Removed");
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

  const validateForm = (isFinalSubmission = false, silent = false) => {
    const newErrors = {};

    // Customer Selection
    if (!activeCustomerId) {
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
    } else if (
      formData.issueDate &&
      new Date(formData.expiryDate) <= new Date(formData.issueDate)
    ) {
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
    } else if (
      new Date(formData.txDate) > new Date(new Date().setHours(23, 59, 59, 999))
    ) {
      newErrors.txDate = "Transaction date cannot be in the future";
    }
    if (!formData.txTime) {
      newErrors.txTime = "Transaction time is required";
    }

    // Commission Details
    if (formData.showCommission) {
      const isReceived = formData.CommissionStatus === "received";

      if (isReceived) {
        if (!formData.CommissionAmount) {
          newErrors.CommissionAmount = "Commission amount is required";
        } else {
          const commissionVal = Number(formData.CommissionAmount);
          const priceVal = Number(formData.price || 0);
          if (isNaN(commissionVal) || commissionVal <= 0) {
            newErrors.CommissionAmount = "Commission must be a positive number";
          } else if (priceVal > 0 && commissionVal > priceVal) {
            newErrors.CommissionAmount =
              "Commission cannot exceed policy price";
          }
        }

        if (!formData.CommissionMode) {
          newErrors.CommissionMode = "Commission mode is required";
        }

        if (!formData.CommissionDate) {
          newErrors.CommissionDate = "Commission date is required";
        }

        if (isCommissionCheque) {
          const commChequeNumErr = validateChequeNumber(
            formData.commissionChequeNum
          );
          if (commChequeNumErr)
            newErrors.commissionChequeNum = commChequeNumErr;
          if (!formData.commissionChequeStatus) {
            newErrors.commissionChequeStatus = "Cheque status is required";
          }
        }
      } else {
        if (formData.CommissionAmount) {
          const commissionVal = Number(formData.CommissionAmount);
          const priceVal = Number(formData.price || 0);
          if (isNaN(commissionVal) || commissionVal <= 0) {
            newErrors.CommissionAmount = "Commission must be a positive number";
          } else if (priceVal > 0 && commissionVal > priceVal) {
            newErrors.CommissionAmount =
              "Commission cannot exceed policy price";
          }
        }
      }
    }

    // Policy Document (Required ONLY for final submission to activate policy)
    if (isFinalSubmission && !formData.policyDoc) {
      newErrors.policyDoc =
        "Policy document is required for final submission to activate policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isCanSubmit = !!formData.policyDoc;

  // Pass raw form data to the parent; payload mapping and API requests live there.
  const getSubmissionData = (submissionType) => ({
    customerId: activeCustomerId,
    formData,
    policyId: selectedPolicy?.policy_id ?? selectedPolicy?.id ?? null,
    isEditMode,
    submissionType,
  });

  const handleSaveDraftClick = () => {
    if (!activeCustomerId) {
      showToast.error(
        "Missing Customer",
        "Please select a customer before creating a draft policy."
      );
      setErrors((prev) => ({
        ...prev,
        selectedCustomer: "Customer is required",
      }));
      return;
    }

    if (!validateForm(false)) {
      showToast.error(
        "Incomplete Details",
        "Please resolve highlighted errors before saving draft."
      );
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: "Save Policy as Draft?",
      description:
        "This policy will be created and added to the policy registry.",
      confirmText: "Yes, Save Draft",
      cancelText: "Cancel",
      variant: "warning",
      onConfirm: async () => {
        if (isSubmitting) return;
        setConfirmModal((prev) => ({ ...prev, isLoading: true }));
        try {
          await onSaveDraft?.(getSubmissionData("draft"));
          setConfirmModal((prev) => ({
            ...prev,
            isOpen: false,
            isLoading: false,
          }));
        } catch (error) {
          setConfirmModal((prev) => ({ ...prev, isLoading: false }));
          showToast.error(
            "Save Failed",
            error?.message || "Unable to save the policy draft."
          );
        }
      },
      isLoading: isSubmitting,
    });
  };

  const handleFinalSubmitClick = (e) => {
    if (e) e.preventDefault();

    if (!activeCustomerId) {
      showToast.error(
        "Missing Customer",
        "Please select a customer before submitting the policy."
      );
      setErrors((prev) => ({
        ...prev,
        selectedCustomer: "Customer is required",
      }));
      return;
    }

    if (!validateForm(true)) {
      showToast.error(
        "Incomplete Details",
        "Please resolve highlighted errors and upload the Policy Document."
      );
      setTimeout(() => {
        const firstErrorField = document.querySelector(".text-red-500");
        if (firstErrorField) {
          firstErrorField.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: "Confirm Policy Submission",
      description:
        "Are you sure you want to submit this policy? Once submitted, the policy will be registered.",
      confirmText: "Yes, Submit Policy",
      cancelText: "Cancel",
      variant: "success",
      onConfirm: async () => {
        if (isSubmitting) return;
        setConfirmModal((prev) => ({ ...prev, isLoading: true }));
        try {
          await onSubmitPolicy?.(getSubmissionData("final"));
          setConfirmModal((prev) => ({
            ...prev,
            isOpen: false,
            isLoading: false,
          }));
        } catch (error) {
          setConfirmModal((prev) => ({ ...prev, isLoading: false }));
          showToast.error(
            isEditMode ? "Update Failed" : "Submission Failed",
            error?.message || "Unable to submit the policy."
          );
        }
      },
      isLoading: isSubmitting,
    });
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

      {/* Header */}
      <div className="border-b border-[#E5E9E7] pb-4 mb-8">
        <h1 className="text-2xl font-bold text-[#0B2545]">
          {isEditMode ? "Update Policy Details" : "Policy Details"}
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Fill in the policy information and payment details below.
        </p>
      </div>

      <form onSubmit={handleFinalSubmitClick} className="w-full">
        {/* ================= SECTION 1: Policy Details ================= */}
        <div className="mb-8">
          <h2 className="mb-6 text-lg font-bold text-[#0B2545] border-b border-[#E5E9E7] pb-2 sm:text-xl">
            Basic Details
          </h2>

          {/* Customer Selection Dropdown - strictly { label, value } */}
          <div className="mb-6 w-full">
            <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
              Select Customer <span className="text-[#B42318] ml-0.5">*</span>
            </label>
            <CustomSelect
              options={customerOptions}
              value={
                activeCustomerId
                  ? customerOptions.find(
                      (opt) => String(opt.value) === String(activeCustomerId)
                    ) || {
                      label:
                        activeCustomer?.label ||
                        activeCustomer?.fullName ||
                        activeCustomer?.name ||
                        `Customer #${activeCustomerId}`,
                      value: activeCustomerId,
                    }
                  : null
              }
              onChange={(opt) => {
                handleCustomerSelect(
                  opt ? { label: opt.label, value: String(opt.value) } : null
                );
              }}
              placeholder="Select customer..."
              width="w-full"
              isClearable={true}
              isSearchable={true}
              error={!!errors.selectedCustomer}
            />
            {errors.selectedCustomer && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.selectedCustomer}
              </p>
            )}
          </div>

          {/* Policy Name & Category (2-column grid) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
            {/* Policy Name / Insurance Company Dropdown */}
            <div className="w-full">
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                Insurance Company / Policy Name{" "}
                <span className="text-[#B42318] ml-0.5">*</span>
              </label>
              <CustomSelect
                options={insuranceCompanyOptions}
                value={
                  insuranceCompanyOptions.find(
                    (o) =>
                      o.value === formData.policyName ||
                      o.label === formData.policyName
                  ) || null
                }
                onChange={(opt) =>
                  handleInputChange("policyName", opt?.value || "")
                }
                placeholder="Select Insurance Company"
                width="w-full"
                error={!!errors.policyName}
              />
              {errors.policyName && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.policyName}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="w-full">
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                Policy Category <span className="text-[#B42318] ml-0.5">*</span>
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
          </div>

          {/* Sub-Type, Issue Date, Expiry Date (3-column grid) */}
          <div
            className={`grid grid-cols-1 gap-6 ${
              formData.category ? "md:grid-cols-3" : "md:grid-cols-2"
            }`}
          >
            {/* Sub-Type (Conditional on category selection) */}
            {formData.category && (
              <div className="w-full">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  Policy Sub-Type{" "}
                  <span className="text-[#B42318] ml-0.5">*</span>
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
                  onChange={(opt) =>
                    handleInputChange("subType", opt?.value || "")
                  }
                  placeholder="Select sub-type"
                  width="w-full"
                  error={!!errors.subType}
                />
                {errors.subType && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.subType}
                  </p>
                )}
              </div>
            )}

            {/* Issue Date */}
            <div className="w-full">
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                Issue Date <span className="text-[#B42318] ml-0.5">*</span>
              </label>
              <CustomDatePicker
                value={formData.issueDate || ""}
                onChange={(val) => handleInputChange("issueDate", val)}
                width="w-full"
                error={!!errors.issueDate}
              />
              {errors.issueDate && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.issueDate}
                </p>
              )}
            </div>

            {/* Expiry Date */}
            <div className="w-full">
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                Expiry Date <span className="text-[#B42318] ml-0.5">*</span>
              </label>
              <CustomDatePicker
                value={formData.expiryDate || ""}
                onChange={(val) => handleInputChange("expiryDate", val)}
                min={formData.issueDate || ""}
                width="w-full"
                error={!!errors.expiryDate}
              />
              {errors.expiryDate && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.expiryDate}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: Conditional Details ================= */}
        {/* Motor Insurance */}
        {isMotor && (
          <div className="mb-8">
            <h2 className="mb-6 text-lg font-bold text-[#0B2545] font-sans border-b border-[#E5E9E7] pb-2 sm:text-xl">
              Motor Vehicle Details
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Vehicle Type */}
              <div className="w-full">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
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
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.vehicleOwner}
                  </p>
                )}
              </div>

              {/* Vehicle Name */}
              <div className="w-full">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
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
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.vehicleName}
                  </p>
                )}
              </div>

              {/* Vehicle Number */}
              <div className="w-full">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
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
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.vehicleNumber}
                  </p>
                )}
              </div>

              {/* GVW (Only for Miscellaneous Vehicle) */}
              {isMiscVehicle && (
                <div className="w-full">
                  <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
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
            <div
              className={`grid grid-cols-1 gap-5 ${
                formData.vehicleOwner ? "md:grid-cols-3" : "md:grid-cols-2"
              } mt-4`}
            >
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  Registration Certificate (RC)
                </label>
                <DocumentUpload
                  accept={["jpg", "jpeg", "png", "pdf"]}
                  maxSizeKB={1024}
                  documentCategory="Policy Document"
                  placeholder="Upload RC Document (Max 1 MB)"
                  onChange={(file) => handleInputChange("rcFile", file)}
                  value={formData.rcFile}
                  width="w-full"
                  error={errors.rcFile}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  Driving License (DL)
                </label>
                <DocumentUpload
                  accept={["jpg", "jpeg", "png", "pdf"]}
                  maxSizeKB={1024}
                  documentCategory="Policy Document"
                  placeholder="Upload DL Document (Max 1 MB)"
                  onChange={(file) => handleInputChange("dlFile", file)}
                  value={formData.dlFile}
                  width="w-full"
                  error={errors.dlFile}
                />
              </div>

              {formData.vehicleOwner && (
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                    Previous Year Policy
                  </label>
                  <DocumentUpload
                    accept={["jpg", "jpeg", "png", "pdf"]}
                    maxSizeKB={1024}
                    documentCategory="Policy Document"
                    placeholder="Upload Previous Year Policy (Max 1 MB)"
                    onChange={(file) =>
                      handleInputChange("previousPolicyFile", file)
                    }
                    value={formData.previousPolicyFile}
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
                      maxSizeKB={1024}
                      documentCategory="Policy Document"
                      placeholder="Upload GST (Max 1 MB)"
                      onChange={(file) => handleInputChange("gstFile", file)}
                      value={formData.gstFile}
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
                      maxSizeKB={1024}
                      documentCategory="Policy Document"
                      placeholder="Upload Gumasta (Max 1 MB)"
                      onChange={(file) =>
                        handleInputChange("gumastaFile", file)
                      }
                      value={formData.gumastaFile}
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
                      maxSizeKB={1024}
                      documentCategory="Policy Document"
                      placeholder="Upload Udyam (Max 1 MB)"
                      onChange={(file) => handleInputChange("udyamFile", file)}
                      value={formData.udyamFile}
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
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-[#E5E9E7] pb-2">
              <div>
                <h2 className="text-lg font-bold text-[#0B2545] font-sans sm:text-xl">
                  Family Members
                </h2>
                {errors.membersGeneral && (
                  <p className="text-xs text-[#B42318] mt-1">
                    {errors.membersGeneral}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={addMember}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0B2545] hover:text-[#0E2F52] transition-colors border border-[#E5E9E7] bg-[#EAF0F6] px-3 py-1.5 rounded-[9px]"
              >
                + Add Member
              </button>
            </div>

            <div className="space-y-4">
              {(formData.members || []).map((m) => (
                <div
                  key={m.id}
                  className="grid grid-cols-1 gap-4 items-end sm:grid-cols-[1fr_120px_180px_50px] p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-[#344054]">
                      Full Name
                    </label>
                    <CustomInput
                      value={m.name}
                      onChange={(val) => updateMember(m.id, "name", val)}
                      placeholder="Enter name"
                      width="w-full"
                      type="text"
                      error={!!errors.members?.[m.id]?.name}
                    />
                    {errors.members?.[m.id]?.name && (
                      <p className="mt-1 text-[10px] text-red-500">
                        {errors.members[m.id].name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-[#344054]">
                      Age
                    </label>
                    <CustomInput
                      value={m.age}
                      onChange={(val) => updateMember(m.id, "age", val)}
                      placeholder="Age"
                      width="w-full"
                      type="numeric"
                      error={!!errors.members?.[m.id]?.age}
                    />
                    {errors.members?.[m.id]?.age && (
                      <p className="mt-1 text-[10px] text-red-500">
                        {errors.members[m.id].age}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-[#344054]">
                      Relation
                    </label>
                    <CustomSelect
                      options={relations}
                      value={
                        relations.find((r) => r.value === m.relation) || null
                      }
                      onChange={(opt) =>
                        updateMember(m.id, "relation", opt?.value || "")
                      }
                      placeholder="Select relation"
                      width="w-full"
                      error={!!errors.members?.[m.id]?.relation}
                    />
                    {errors.members?.[m.id]?.relation && (
                      <p className="mt-1 text-[10px] text-red-500">
                        {errors.members[m.id].relation}
                      </p>
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

        {/* ================= SECTION 2: Payment & Transaction ================= */}
        <div className="mb-8 mt-8">
          <h2 className="mb-6 text-lg font-bold text-[#0B2545] border-b border-[#E5E9E7] pb-2 sm:text-xl">
            Payment & Transaction
          </h2>

          {/* Price, Tx Mode, Pay Status (3-column grid) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Policy Price */}
            <div className="w-full">
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                Policy Price (₹){" "}
                <span className="text-[#B42318] ml-0.5">*</span>
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
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                Transaction Mode{" "}
                <span className="text-[#B42318] ml-0.5">*</span>
              </label>
              <CustomSelect
                options={transactionModeOptions}
                value={
                  transactionModeOptions.find(
                    (o) => o.value === formData.txMode
                  ) || null
                }
                onChange={(opt) =>
                  handleInputChange("txMode", opt?.value || "")
                }
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
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                Payment Status <span className="text-[#B42318] ml-0.5">*</span>
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
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.payStatus}
                </p>
              )}
            </div>
          </div>

          {/* Cheque details (Conditional) */}
          {isCheque &&
            renderChequeDetails(
              "rounded-xl bg-gray-50 border border-gray-200 p-5 mt-6",
              false
            )}

          {/* Transaction Date & Time and Transaction Note (2-column grid) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-6 items-start">
            <div className="w-full">
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                Transaction Date & Time{" "}
                <span className="text-[#B42318] ml-0.5">*</span>
              </label>
              <CustomDateTimePicker
                dateValue={formData.txDate || ""}
                timeValue={formData.txTime || ""}
                onChange={({ date, time }) => {
                  handleInputChange("txDate", date);
                  handleInputChange("txTime", time);
                }}
                disableFuture={true}
                maxDate={dayjs()}
                width="w-full"
                error={!!errors.txDate || !!errors.txTime}
                errorMessage={errors.txDate || errors.txTime || ""}
              />
            </div>

            <div className="w-full">
              <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                Transaction Note{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={2}
                value={formData.txNote || ""}
                onChange={(e) => handleInputChange("txNote", e.target.value)}
                placeholder="Add payment remarks or references..."
                className="w-full px-3.5 py-2.5 text-sm text-[#17212B] bg-white border border-[#E5E9E7] rounded-lg outline-none focus:border-[#0B2545] focus:ring-2 focus:ring-[rgba(11,37,69,0.08)] resize-none transition-all h-[56px]"
              />
            </div>
          </div>
        </div>

        {/* ================= SECTION 3: Commission & Uploads ================= */}
        <div className="mb-8 mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-[#E5E9E7] pb-2">
            <h2 className="text-lg font-bold text-[#0B2545] sm:text-xl">
              Commission Details
            </h2>
            <button
              type="button"
              onClick={() =>
                handleInputChange("showCommission", !formData.showCommission)
              }
              className={`text-xs font-semibold px-3 py-1.5 rounded-[9px] border transition-colors cursor-pointer ${
                formData.showCommission
                  ? "bg-[#FDECEC] text-[#B42318] border-[#FCD2D2] hover:bg-[#FCE0E0]"
                  : "bg-[#EAF0F6] text-[#0B2545] border-[#E5E9E7] hover:bg-[#DCE6F1]"
              }`}
            >
              {formData.showCommission
                ? "Remove Commission"
                : "+ Add Commission"}
            </button>
          </div>

          {formData.showCommission ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 bg-gray-50 border border-gray-200 rounded-xl p-6">
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  Commission Amount (₹){" "}
                  {formData.CommissionStatus === "received" && (
                    <span className="text-[#B42318] ml-0.5">*</span>
                  )}
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
                  <p className="mt-1 text-xs text-red-500">
                    {errors.CommissionAmount}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  Commission Mode{" "}
                  {formData.CommissionStatus === "received" && (
                    <span className="text-[#B42318] ml-0.5">*</span>
                  )}
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
                  <p className="mt-1 text-xs text-red-500">
                    {errors.CommissionMode}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
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
                    handleInputChange(
                      "CommissionStatus",
                      opt?.value || "pending"
                    )
                  }
                  placeholder="Select status"
                  width="w-full"
                  error={!!errors.CommissionStatus}
                />
                {errors.CommissionStatus && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.CommissionStatus}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  Commission Date{" "}
                  {formData.CommissionStatus === "received" && (
                    <span className="text-[#B42318] ml-0.5">*</span>
                  )}
                </label>
                <CustomDatePicker
                  value={formData.CommissionDate || ""}
                  onChange={(val) => handleInputChange("CommissionDate", val)}
                  width="w-full"
                  error={!!errors.CommissionDate}
                />
                {errors.CommissionDate && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.CommissionDate}
                  </p>
                )}
              </div>

              {/* Commission Cheque details (Conditional) */}
              {isCommissionCheque &&
                renderChequeDetails(
                  "md:col-span-2 rounded-xl bg-white border border-gray-200 p-5",
                  true
                )}

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
                  Commission Note
                </label>
                <textarea
                  rows={2}
                  value={formData.CommissionNote || ""}
                  onChange={(e) =>
                    handleInputChange("CommissionNote", e.target.value)
                  }
                  placeholder="Add Commission remarks..."
                  className="w-full px-3.5 py-2.5 text-sm text-[#17212B] bg-white border border-[#E5E9E7] rounded-lg outline-none focus:border-[#0B2545] focus:ring-2 focus:ring-[rgba(11,37,69,0.08)] resize-none transition-all"
                />
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-400">
              Optional Commission tracking details. Click "+ Add Commission" to
              toggle.
            </p>
          )}
        </div>

        {/* ================= Upload Policy Document ================= */}
        {formData.policyDoc ? (
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold text-[#344054]">
              Existing Documents
            </h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-lg border border-[#E5E9E7] p-3">
                <span className="text-sm text-[#344054]">
                  {"Policy Document PDF"}
                </span>
                <a
                  href={formData.policyDoc} // ← direct public URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  View Document
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8 mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#E5E9E7] pb-2 mb-3">
              <h2 className="text-lg font-bold text-[#0B2545] sm:text-xl">
                Upload Policy Document{" "}
                {formData.policyDoc && (
                  <span className="text-[#2F6F3E] text-xs font-semibold ml-2">
                    ✓ Attached
                  </span>
                )}
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF0F6] text-[#0B2545]">
                Final Activation Requirement
              </span>
            </div>

            {/* Submission Guidance Callout */}
            <div className="mb-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-2.5 flex items-center gap-2 text-xs text-[#475569]">
              <span className="text-sm">💡</span>
              <span>
                <strong className="text-[#0B2545]">Save Draft</strong> keeps
                policy <strong>Pending</strong>. Upload policy document to
                unlock <strong>Submit Policy</strong> for{" "}
                <strong>Active</strong> status.
              </span>
            </div>

            <DocumentUpload
              accept={["pdf", "jpg", "jpeg", "png"]}
              maxSizeKB={1024}
              documentCategory="Policy Document"
              placeholder="Drag and drop or browse to upload Policy PDF (Max 1 MB)"
              onChange={(file) => {
                handleInputChange("policyDoc", file);
                if (!file && errors.policyDoc) {
                  setErrors((prev) => ({ ...prev, policyDoc: null }));
                }
              }}
              value={formData.policyDoc}
              width="w-full"
              error={errors.policyDoc}
            />
          </div>
        )}

        {/* ================= Action Buttons ================= */}
        <div className="flex flex-col-reverse gap-3 border-t border-[#E5E9E7] pt-6 mt-8 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-[9px] border border-[#E5E9E7] bg-white px-5 py-2.5 text-sm font-semibold text-[#0B2545] transition-all duration-200 hover:bg-[#F4F7F6] active:scale-[0.98] sm:w-auto cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSaveDraftClick}
            className={`w-full rounded-[9px] border border-[#0B2545] bg-[#F8FAFC] px-5 py-2.5 text-sm font-semibold text-[#0B2545] transition-all duration-200 hover:bg-[#0B2545] hover:text-white hover:shadow-md active:bg-[#061527] active:scale-[0.98] sm:w-auto flex items-center justify-center gap-2 group ${
              isSubmitting ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#C9A227] group-hover:bg-[#FCD34D] transition-colors"></span>
            {isEditMode ? "Save Changes as Draft" : "Save Draft"}
          </button>

          {(isCanSubmit || isEditMode) && (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-[9px] bg-[#2F6F3E] hover:bg-[#235630] active:bg-[#1A4224] active:scale-[0.98] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 shadow-sm hover:shadow-md sm:w-auto flex items-center justify-center gap-2 animate-fadeIn ${
                isSubmitting
                  ? "opacity-60 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <span>✓</span>
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Submitting..."
                : isEditMode
                ? "Update Policy"
                : "Submit Policy"}
            </button>
          )}
        </div>
      </form>

      {/* Reusable Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() =>
          !isSubmitting &&
          setConfirmModal((prev) => ({ ...prev, isOpen: false }))
        }
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        description={confirmModal.description}
        confirmText={confirmModal.confirmText}
        cancelText={confirmModal.cancelText}
        variant={confirmModal.variant}
        isLoading={confirmModal.isLoading || isSubmitting}
      />
    </div>
  );
};

export default PolicyRegistrationForm;
