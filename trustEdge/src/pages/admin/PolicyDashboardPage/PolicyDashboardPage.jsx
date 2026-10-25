import { useState, useEffect } from "react";

import { FileText, PencilIcon } from "lucide-react";
import TableComponent from "../../../component/core_components/TableComponent/TableComponent";
import LogoSpinner from "../../../component/core_components/LogoSpinner/LogoSpinner";
import PolicyRegistrationForm from "../UserDashboardPage/helperComponent/PolicyRegistrationForm";
import CustomDateRangePicker from "../../../component/core_components/DatePicker/CustomDateRangePicker";
import CustomerPolicyDetailsView from "../../../component/shared/CustomerPolicyDetailsView/CustomerPolicyDetailsView";
import { API_ENDPOINTS } from "../../../lib/constant/ApiEndpoints";
import { useAPI } from "../../../lib/hooks/useAPI";
import { showToast } from "../../../component/core_components/CustomToast/CustomToast";
import { rawPoliciesData, policyTableHeaders } from "./constant";
import { getStatusPill } from "../UserDashboardPage/constant";

const PolicyDashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenPolicyForm, setIsOpenPolicyForm] = useState(false);
  const [userList, setUserList] = useState([]);
  const [policiesList, setPoliciesList] = useState(rawPoliciesData);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditPolicyMode, setIsEditPolicyMode] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const isEditMode = isEditPolicyMode;
  const [customerOptions, setCustomerOptions] = useState([]);
  const [policyFormData, setPolicyFormData] = useState({
    policyName: "",
    category: "",
    subType: "",
    issueDate: "",
    expiryDate: "",
    vehicleOwner: "",
    vehicleName: "",
    vehicleNumber: "",
    gvw: "",
    rcFile: null,
    dlFile: null,
    gstFile: null,
    gumastaFile: null,
    udyamFile: null,
    previousPolicyFile: null,
    members: [{ id: 1, name: "", age: "", relation: "" }],
    price: "",
    txMode: "",
    payStatus: "pending",
    chequeNum: "",
    chequeStatus: "pending_clearance",
    txDate: "",
    txTime: "",
    txNote: "",
    showCommission: false,
    CommissionAmount: "",
    CommissionMode: "",
    CommissionStatus: "pending",
    CommissionDate: "",
    CommissionNote: "",
    policyDoc: null,
  });

  const { callApi: fetchUserList } = useAPI(
    API_ENDPOINTS?.ADMIN?.USERS_LIST_DROPDOWN,
    {
      method: "GET",
      onSuccess: (res) => {
        if (res && res.length > 0) setUserList(res);
        setIsLoading(false);
      },
      onFailure: () => {
        setUserList([]);
        setIsLoading(false);
      },
    }
  );

  const { callApi: fetchPolicies } = useAPI(
    API_ENDPOINTS?.ADMIN?.SHOW_POLICY_BY_CUSTOMER_ID,
    {
      method: "POST",
      onSuccess: (res) => {
        setPoliciesList(res);
        setIsLoading(false);
      },
      onFailure: (err) => {
        // Graceful fallback to default policies
        console.warn(err, "Using default policies dataset");
        setIsLoading(false);
      },
    }
  );

  const { callApi: fetchCustomerDropdown } = useAPI(
    API_ENDPOINTS?.ADMIN?.CUSTOMER_DROPDOWN,
    {
      method: "GET",
      onSuccess: (data) => {
        const list = Array.isArray(data) ? data : data?.results || [];
        if (list.length > 0) {
          setCustomerOptions(list);
          setUserList(list);
        } else {
          fetchAllUsers();
        }
      },
      onFailure: () => {
        fetchAllUsers();
      },
    }
  );

  const { callApi: fetchAllUsers } = useAPI(API_ENDPOINTS?.ADMIN?.USERS_LIST, {
    method: "GET",
    onSuccess: (data) => {
      const list = Array.isArray(data) ? data : data?.results || [];
      setCustomerOptions(list);
      setUserList(list);
    },
    onFailure: () => {
      setCustomerOptions([]);
      setUserList([]);
    },
  });

  const { callApi: viewAndUpdatePolicy } = useAPI(
    API_ENDPOINTS?.ADMIN?.VIEW_AND_UPDATE_POLICY,
    {
      method: "POST",
      onSuccess: (res) => {
        const policy = res;
        setSelectedPolicy(policy);

        const description = policy?.policy_description || {};
        const payment = policy?.payment_details || {};
        const commission = policy?.commission_details || {};

        setPolicyFormData({
          policyName: description?.insurer || policy?.policy_name || "",

          // Match these values to the actual values in categoryOptions.
          category:
            policy?.category === "VEHICLE"
              ? "motor"
              : policy?.category === "LIFE"
              ? "personal"
              : (policy?.category || "").toLowerCase(),

          subType: policy?.sub_type || "",
          issueDate: policy?.issue_date || "",
          expiryDate: policy?.expiry_date || "",

          vehicleOwner: description?.vehicle_owner || "",
          vehicleName: description?.vehicle_name || "",
          vehicleNumber: description?.vehicle_number || "",
          gvw: description?.gvw || "",

          rcFile: null,
          dlFile: null,
          gstFile: null,
          gumastaFile: null,
          udyamFile: null,
          previousPolicyFile: null,
          policyDoc: policy.policy_pdf_url || null,

          members: (description?.members || []).map((member, index) => ({
            id: member?.id || index + 1,
            name: member?.name || "",
            age: member?.age ?? "",
            relation: member?.relation || "",
          })),

          price: policy?.premium_amount || "",
          txMode: (payment?.payment_mode || "").toLowerCase(),
          payStatus:
            payment?.payment_status === "PAID"
              ? "done"
              : (payment?.payment_status || "pending").toLowerCase(),

          chequeNum: payment?.transaction_id || "",
          chequeStatus: payment?.cheque_status || "pending_clearance",
          txDate: payment?.transaction_date || "",
          txTime: payment?.transaction_time || "",
          txNote: payment?.transaction_note || "",

          showCommission: Object.keys(commission).length > 0,
          CommissionAmount: commission?.commission_amount ?? "",
          CommissionMode: (commission?.commission_mode || "").toLowerCase(),
          CommissionStatus: (
            commission?.commission_status || "pending"
          ).toLowerCase(),
          CommissionDate: commission?.commission_date || "",
          CommissionNote: commission?.commission_note || "",
        });
      },
    }
  );

  const { callApi: createPolicyApi } = useAPI(
    API_ENDPOINTS?.ADMIN?.CREATE_POLICY,
    {
      method: "POST",
      onSuccess: (res) => {
        showToast.success(
          "Policy Registered Successfully!",
          "New policy has been added to the registry."
        );
        handlePolicyCreated(res);
      },
      onFailure: (err) => {
        console.warn("Policy create API notice:", err);
        const errData = err?.response?.data;
        let errMsg = "Could not register policy. Please verify details.";
        if (errData && typeof errData === "object") {
          const fieldErrors = Object.entries(errData)
            .map(
              ([field, msgs]) =>
                `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`
            )
            .join(" | ");
          if (fieldErrors) errMsg = fieldErrors;
        } else if (err?.message) {
          errMsg = err.message;
        }
        showToast.error("Registration Failed", errMsg);
      },
    }
  );

  useEffect(() => {
    setIsLoading(true);
    fetchPolicies({
      customer_id: null,
    });
    fetchCustomerDropdown();
  }, []);

  const handlePolicyCreated = (newPolicy) => {
    if (newPolicy) {
      setPoliciesList((prev) => [
        newPolicy,
        ...(Array.isArray(prev) ? prev : []),
      ]);
    }
    fetchPolicies();
    setIsOpenPolicyForm(false);
  };

  const { callApiRaw: uploadPDFRaw } = useAPI("", {
    method: "POST",
  });

  const { callApiRaw: uploadDocRaw } = useAPI("", {
    method: "POST",
  });

  const buildPolicyPayload = (rawData, targetCustomerId, pdfUrl) => {
    const formatDate = (val) => {
      if (!val) return "";
      try {
        const d = dayjs(val);
        return d.isValid() ? d.format("YYYY-MM-DD") : String(val);
      } catch {
        return String(val);
      }
    };

    const mapCategory = (cat) => {
      if (!cat) return "OTHER";
      const val = String(cat).toUpperCase().trim();
      if (val === "MOTOR" || val === "VEHICLE") return "VEHICLE";
      if (val === "HEALTH") return "HEALTH";
      if (val === "PERSONAL" || val === "LIFE") return "LIFE";
      return "OTHER";
    };

    const policy_description = {
      insurer: rawData.policyName || "",
      coverage: rawData.subType || "",
      ...(rawData.vehicleNumber
        ? { vehicle_number: rawData.vehicleNumber }
        : {}),
      ...(rawData.vehicleName ? { vehicle_name: rawData.vehicleName } : {}),
      ...(rawData.vehicleOwner ? { vehicle_owner: rawData.vehicleOwner } : {}),
      ...(rawData.gvw ? { gvw: rawData.gvw } : {}),
      ...(rawData.members?.length > 0 ? { members: rawData.members } : {}),
    };

    const payment_details = {
      payment_mode: (rawData.txMode || "ONLINE").toUpperCase(),
      payment_status: (rawData.payStatus === "done"
        ? "PAID"
        : rawData.payStatus || "PAID"
      ).toUpperCase(),
      ...(rawData.chequeNum
        ? {
            transaction_id: rawData.chequeNum,
            cheque_status: rawData.chequeStatus,
          }
        : {}),
      ...(rawData.txDate
        ? { transaction_date: formatDate(rawData.txDate) }
        : {}),
      ...(rawData.txTime ? { transaction_time: rawData.txTime } : {}),
      ...(rawData.txNote ? { transaction_note: rawData.txNote } : {}),
    };

    const commAmount = parseFloat(rawData.CommissionAmount) || 0;
    const priceVal = parseFloat(rawData.price) || 0;
    const commPercent =
      priceVal > 0 && commAmount > 0
        ? Math.round((commAmount / priceVal) * 100)
        : 0;

    const commission_details = rawData.showCommission
      ? {
          commission_percentage: commPercent,
          commission_amount: commAmount,
          ...(rawData.CommissionMode
            ? { commission_mode: rawData.CommissionMode.toUpperCase() }
            : {}),
          ...(rawData.CommissionStatus
            ? { commission_status: rawData.CommissionStatus.toUpperCase() }
            : {}),
          ...(rawData.CommissionDate
            ? { commission_date: formatDate(rawData.CommissionDate) }
            : {}),
          ...(rawData.CommissionNote
            ? { commission_note: rawData.CommissionNote }
            : {}),
        }
      : {};

    return {
      customer_id: targetCustomerId,
      policy_name: rawData.policyName,
      category: mapCategory(rawData.category),
      sub_type: rawData.subType || "",
      issue_date: formatDate(rawData.issueDate),
      expiry_date: formatDate(rawData.expiryDate),
      premium_amount: (parseFloat(rawData.price) || 0).toFixed(2),
      policy_pdf_url: pdfUrl,
      policy_description,
      payment_details,
      commission_details,
    };
  };

  const uploadCustomerDocuments = async (rawData, customerId) => {
    if (!customerId) {
      throw new Error("Customer ID is required for document upload.");
    }

    const documents = [
      ["rcFile", "RC"],
      ["dlFile", "DRIVING_LICENCE"],
      ["previousPolicyFile", "PREVIOUS_POLICY"],
      ["gstFile", "GST"],
      ["gumastaFile", "GUMASTA"],
      ["udyamFile", "UDYAM_AADHAR"],
    ];

    for (const [field, documentType] of documents) {
      const file = rawData?.[field];

      // Skip fields without a newly selected file.
      if (!(file instanceof File)) continue;

      const documentFormData = new FormData();
      documentFormData.append("file", file);
      documentFormData.append("document_type", documentType);

      await uploadDocRaw(
        documentFormData,
        API_ENDPOINTS.CUSTOMERS.DOCUMENT_UPLOAD(customerId)
      );
    }
  };

  const uploadPolicyPDF = async (file, policyId) => {
    // An existing URL does not need another upload.
    if (!(file instanceof File)) {
      return typeof file === "string" ? file : null;
    }

    if (!policyId) {
      throw new Error("Policy ID is required for PDF upload.");
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await uploadPDFRaw(
      formData,
      API_ENDPOINTS.POLICIES.UPLOAD_PDF(policyId)
    );

    // Adjust this property if your backend uses a different response shape.
    return response?.policy_pdf_url || response?.result?.policy_pdf_url || null;
  };

  const handlePolicySubmit = async (submissionData) => {
    setIsSubmitting(true);

    try {
      const rawData = submissionData?.formData || policyFormData;

      const targetCustomerId = String(
        submissionData?.customerId ||
          selectedCustomer?.value ||
          selectedCustomer?.customer_id ||
          (typeof selectedCustomer === "string" ? selectedCustomer : "")
      );

      const policyId =
        submissionData?.policyId ||
        selectedPolicy?.policy_id ||
        selectedPolicy?.id;

      const editing = Boolean(submissionData?.isEditMode && policyId);

      if (!targetCustomerId) {
        throw new Error("Please select a customer.");
      }

      // 1. Upload customer documents.
      await uploadCustomerDocuments(rawData, targetCustomerId);

      // 2. Build the policy payload.
      const payload = buildPolicyPayload(
        rawData,
        targetCustomerId,
        typeof rawData.policyDoc === "string" ? rawData.policyDoc : null
      );

      let result;

      if (editing) {
        // 3A. Update existing policy.
        result = await viewAndUpdatePolicy({
          ...payload,
          policy_id: policyId,
          action: "update",
        });

        // Upload the replacement PDF only when a new file was selected.
        if (rawData.policyDoc instanceof File) {
          await uploadPolicyPDF(rawData.policyDoc, policyId);
        }

        showToast.success("Policy Updated", "Policy updated successfully.");
      } else {
        // 3B. Create the policy first.
        result = await createPolicyApi(payload);

        const createdPolicyId = result?.policy_id || result?.result?.policy_id;

        if (!createdPolicyId && rawData.policyDoc instanceof File) {
          throw new Error(
            "Policy was created, but the response did not contain a policy ID for PDF upload."
          );
        }

        // Upload the PDF once the policy ID exists.
        if (rawData.policyDoc instanceof File) {
          await uploadPolicyPDF(rawData.policyDoc, createdPolicyId);
        }

        showToast.success(
          "Policy Registered Successfully!",
          createdPolicyId
            ? `Policy #${createdPolicyId} registered.`
            : "Policy has been registered."
        );
      }

      handlePolicyCreated(result);
    } catch (err) {
      console.error("Policy submission error:", err);

      const responseData = err?.response?.data;

      const message =
        typeof responseData === "object" && responseData !== null
          ? Object.entries(responseData)
              .map(
                ([key, value]) =>
                  `${key}: ${
                    Array.isArray(value) ? value.join(", ") : String(value)
                  }`
              )
              .join(" | ")
          : err?.message || "Failed to submit policy.";

      showToast.error("Policy Submission Failed", message);

      // Preserve the error so the child form knows submission failed.
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async (submissionData) => {
    setIsSubmitting(true);

    try {
      const rawData = submissionData?.formData || policyFormData;
      const targetCustomerId = String(
        submissionData?.customerId ||
          selectedCustomer?.value ||
          selectedCustomer?.customer_id ||
          (typeof selectedCustomer === "string" ? selectedCustomer : "")
      );
      const policyId = selectedPolicy?.policy_id || submissionData?.policyId;

      // ── Step 1: Customer Documents Upload ──────────────────
      await uploadCustomerDocuments(rawData, targetCustomerId);

      // ── Step 2: Build Payload (PDF nahi — draft mein pending)
      const payload = buildPolicyPayload(rawData, targetCustomerId, null);

      if (isEditMode && policyId) {
        viewAndUpdatePolicy({
          ...payload,
          policy_id: policyId,
          action: "update",
        });
      } else {
        createPolicyApi(payload);
      }

      showToast.info("Draft Saved", "Policy saved as Pending.");
      handlePolicyCreated();
    } catch (err) {
      console.error("Save draft error:", err);
      showToast.error(
        "Save Draft Error",
        err?.message || "Failed to save draft."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderDocumentBadge = (row) => {
    const pdfUrl = row?.policyPdfUrl || row?.policy_pdf_url;
    if (pdfUrl) {
      return (
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] text-xs font-semibold bg-[#EAF0F6] text-[#0B2545] hover:bg-[#D4E3F2] transition-colors border border-[#0B2545]/20 no-underline cursor-pointer"
          title="View Policy PDF Document"
        >
          <FileText className="w-3.5 h-3.5 text-[#0B2545] shrink-0" />
          <span>PDF: Attached</span>
        </a>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[6px] text-[11px] font-medium text-slate-400 bg-slate-50 border border-slate-200 select-none">
        <span>—</span>
        <span>No PDF</span>
      </span>
    );
  };

  const handleEditPolicy = (policy) => {
    setIsEditPolicyMode(true);
    fetchCustomerDropdown();
    viewAndUpdatePolicy({
      action: "get",
      policy_id: policy?.policy_id,
      customer_id: policy?.customer_id,
    });
    setIsOpenPolicyForm(true);
  };

  const handleDateChange = (startDate, endDate) => {
    fetchPolicies({
      customer_id: null,
      start_date: startDate,
      end_date: endDate,
    });
  };
  const formattedHeaders = policyTableHeaders.map((header) => {
    if (header.accessor === "status") {
      return {
        ...header,
        type: "special",
        specialCellRowFunction: (row) => getStatusPill(row?.status),
      };
    } else if (header.accessor === "documents") {
      return {
        ...header,
        type: "special",
        specialCellRowFunction: (row) => renderDocumentBadge(row),
      };
    } else if (header?.accessor === "edit") {
      return {
        ...header,
        type: "special",
        specialCellRowFunction: (row) => {
          return (
            <div className="flex h-full flex-row gap-2 items-center justify-center">
              <div
                className="h-full p-2 bg-slate-200 rounded-md shadow-md cursor-pointer"
                onClick={() => handleEditPolicy(row)}
              >
                <PencilIcon size={18} />
              </div>
            </div>
          );
        },
      };
    }
    return header;
  });

  return (
    <div className="h-full w-full bg-transparent">
      {isOpenPolicyForm ? (
        <PolicyRegistrationForm
          customerList={userList}
          customerOptions={customerOptions}
          formData={policyFormData}
          onChange={setPolicyFormData}
          selectedCustomer={selectedCustomer}
          onSelectCustomer={setSelectedCustomer}
          selectedPolicy={selectedPolicy}
          isEditMode={isEditMode}
          isSubmitting={isSubmitting}
          onClickBack={() => setIsOpenPolicyForm(false)}
          onCancel={() => setIsOpenPolicyForm(false)}
          onSubmitPolicy={handlePolicySubmit}
          onSaveDraft={handleSaveDraft}
        />
      ) : (
        <div className="flex h-full w-full flex-col gap-4">
          {/* Header Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-1">
            <div>
              <h1 className="text-[26px] font-bold text-[#0B2545] font-sans tracking-tight">
                Policy Directory
              </h1>
              <p className="text-xs text-[#667085] mt-0.5">
                Complete directory of registered insurance policies, coverage
                details, and status.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  fetchCustomerDropdown();
                  setSelectedCustomer(null);
                  setPolicyFormData({
                    policyName: "",
                    category: "",
                    subType: "",
                    issueDate: "",
                    expiryDate: "",
                    vehicleOwner: "",
                    vehicleName: "",
                    vehicleNumber: "",
                    gvw: "",
                    rcFile: null,
                    dlFile: null,
                    gstFile: null,
                    gumastaFile: null,
                    udyamFile: null,
                    previousPolicyFile: null,
                    members: [{ id: 1, name: "", age: "", relation: "" }],
                    price: "",
                    txMode: "",
                    payStatus: "pending",
                    chequeNum: "",
                    chequeStatus: "pending_clearance",
                    txDate: "",
                    txTime: "",
                    txNote: "",
                    showCommission: false,
                    CommissionAmount: "",
                    CommissionMode: "",
                    CommissionStatus: "pending",
                    CommissionDate: "",
                    CommissionNote: "",
                    policyDoc: null,
                  });
                  setIsOpenPolicyForm(true);
                }}
                className="h-[38px] flex items-center justify-center rounded-[8px] bg-[#0B2545] text-white hover:bg-[#0E2F52] px-4 text-[13px] font-semibold transition-colors cursor-pointer shrink-0"
              >
                + Register Policy
              </button>

              <div className="w-48 sm:w-56 shrink-0">
                <CustomDateRangePicker
                  startDate={dateRange.startDate}
                  endDate={dateRange.endDate}
                  onChange={({ startDate, endDate }) => {
                    handleDateChange(startDate, endDate);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Main Direct Policies Table */}
          <div className="min-h-[30vh] h-full w-full">
            {isLoading ? (
              <div className="flex h-full min-h-[30vh] items-center justify-center bg-white rounded-xl border border-slate-100 shadow-sm">
                <LogoSpinner type="spin" size="md" />
              </div>
            ) : (
              <TableComponent
                theme="light"
                defaultHeaders={formattedHeaders}
                dataSource={policiesList}
                isSelection={false}
                collapsible={false}
                pagination={false}
                emptyTitle="No Policies Found"
                emptyDescription="No policies recorded yet. Register a policy to view it here."
                onRetry={fetchPolicies}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyDashboardPage;
