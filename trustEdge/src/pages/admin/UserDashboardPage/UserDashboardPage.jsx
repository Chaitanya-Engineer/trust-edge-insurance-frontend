import { useState, useEffect } from "react";
import { ArrowUpRight, Eye, Pencil } from "lucide-react";
import TableComponent from "../../../component/core_components/TableComponent/TableComponent";
import LogoSpinner from "../../../component/core_components/LogoSpinner/LogoSpinner";
import UserRegistrationForm from "./helperComponent/UserRegistrationForm";
import PolicyRegistrationForm from "./helperComponent/PolicyRegistrationForm";
import ConfirmationModal from "../../../component/core_components/ConfirmationModal/ConfirmationModal";
import { API_ENDPOINTS } from "../../../lib/constant/ApiEndpoints";
import { useAPI } from "../../../lib/hooks/useAPI";
import { showToast } from "../../../component/core_components/CustomToast/CustomToast";
import ModalComponent from "../../../component/core_components/ModalComponent/ModalCommponent";
import { getStatusPill, headers, ModalHeader, users } from "./constant";
import dayjs from "dayjs";

const UserDashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  // Policy states
  const [isOpenPolicyForm, setIsOpenPolicyForm] = useState(false);
  const [selectedUserForPolicy, setSelectedUserForPolicy] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data states
  const [userList, setUserList] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [openPolicyModal, setOpenPolicyModal] = useState(false);
  const [modalDataSource, setModalDataSource] = useState([]);

  const initialFormData = {
    name: "",
    date_of_birth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    pan_no: "",
    aadhar_no: "",
    gst_no: "",
    panCard: null,
    aadhaarCard: null,
    documents: [],
  };

  const [formData, setFormData] = useState(initialFormData);

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

  // ─── API Hooks ────────────────────────────────────────────────

  // Raw hooks for file uploads + direct API calls
  const { callApiRaw: uploadDocRaw } = useAPI("", { method: "POST" });
  const { callApiRaw: uploadPDFRaw } = useAPI("", { method: "POST" });
  const { callApiRaw: registerCustomerRaw } = useAPI(
    API_ENDPOINTS?.ADMIN?.USER_REGISTRATION,
    { method: "POST" }
  );
  const { callApiRaw: createPolicyRaw } = useAPI(
    API_ENDPOINTS?.ADMIN?.CREATE_POLICY,
    { method: "POST" }
  );

  const { callApi: AllUsersList } = useAPI(API_ENDPOINTS?.ADMIN?.USERS_LIST, {
    method: "GET",
    onSuccess: (response) => {
      const list = Array.isArray(response) ? response : response?.results || [];
      setUserList(list);
      setCustomerOptions((prev) => (prev.length > 0 ? prev : list));
      setIsLoading(false);
    },
    onFailure: () => {
      setUserList([]);
      setIsLoading(false);
    },
  });

  const { callApi: fetchCustomerDropdown } = useAPI(
    API_ENDPOINTS?.ADMIN?.CUSTOMER_DROPDOWN,
    {
      method: "GET",
      onSuccess: (data) => {
        const list = Array.isArray(data) ? data : data?.results || [];
        if (list.length > 0) {
          setCustomerOptions(list);
        } else {
          AllUsersList();
        }
      },
      onFailure: () => {
        AllUsersList();
      },
    }
  );

  const { callApi: viewPolicies } = useAPI(
    API_ENDPOINTS?.ADMIN?.SHOW_POLICY_BY_CUSTOMER_ID,
    {
      method: "POST",
      onSuccess: (response) => {
        setModalDataSource(response);
      },
      onFailure: () => {
        setModalDataSource([]);
      },
    }
  );

  const { callApi: showCustomerDetails } = useAPI(
    API_ENDPOINTS?.ADMIN?.UPDATE_OR_VIEW_CUSTOMER_BY_ID,
    {
      method: "POST",
      onSuccess: (response) => {
        setFormData({
          name: response?.name ?? "",
          date_of_birth: response?.date_of_birth ?? "",
          gender: response?.gender ?? "",
          phone: response?.phone ?? "",
          email: response?.email ?? "",
          address: response?.address ?? "",
          city: response?.city ?? "",
          state: response?.state ?? "",
          pincode: response?.pincode ?? "",
          pan_no: response?.pan_no ?? "",
          aadhar_no: response?.aadhar_no ?? "",
          gst_no: response?.gst_no ?? "",
          panCard: null,
          aadhaarCard: null,
          documents: response?.documents ?? [],
        });
      },
      onFailure: (error) => {
        console.error("Customer fetch error:", error);
        showToast.error("Fetch Failed", "Could not load customer details.");
      },
    }
  );

  // ─── Helpers ──────────────────────────────────────────────────

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

  const buildPolicyPayload = (rawData, targetCustomerId, pdfUrl) => {
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
        : rawData.payStatus === "submitted"
        ? "SUBMITTED"
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

  const uploadCustomerDocuments = async (rawData, targetCustomerId) => {
    const docFields = {
      rcFile: "RC",
      dlFile: "DRIVING_LICENCE",
      previousPolicyFile: "PREVIOUS_POLICY",
      gstFile: "GST",
      gumastaFile: "GUMASTA",
      udyamFile: "UDYAM_AADHAR",
    };

    for (const [field, docType] of Object.entries(docFields)) {
      const file = rawData[field];
      if (file instanceof File) {
        const docForm = new FormData();
        docForm.append("file", file);
        docForm.append("document_type", docType);
        try {
          await uploadDocRaw(
            docForm,
            API_ENDPOINTS.CUSTOMERS.DOCUMENT_UPLOAD(targetCustomerId)
          );
        } catch (err) {
          console.warn(`Doc upload warning (${docType}):`, err?.message);
        }
      }
    }
  };

  // ─── Customer Registration / Update ───────────────────────────

  const handleSubmitRegistration = async (data) => {
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        // ── Edit Mode ────────────────────────────────────
        await showCustomerDetails({
          action: "update",
          customer_id: String(data.customer_id || selectedCustomerId),
          name: data.name,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          gst_no: data.gst_no || "",
        });

        // Naye documents upload karo agar select kiye
        for (const [field, docType] of Object.entries({
          panCard: "PAN_CARD",
          aadhaarCard: "AADHAR",
        })) {
          if (data[field] instanceof File) {
            const f = new FormData();
            f.append("file", data[field]);
            f.append("document_type", docType);
            try {
              await uploadDocRaw(
                f,
                API_ENDPOINTS.CUSTOMERS.DOCUMENT_UPLOAD(
                  data.customer_id || selectedCustomerId
                )
              );
            } catch (err) {
              console.warn(`Doc upload warning (${docType}):`, err?.message);
            }
          }
        }

        showToast.success(
          "Customer Updated",
          "Customer details updated successfully."
        );
        setIsEditMode(false);
        setIsViewMode(false);
        setIsOpenForm(false);
        AllUsersList();
      } else {
        // ── Create Mode ──────────────────────────────────

        // Step 1: Customer register karo (JSON only)
        const createRes = await registerCustomerRaw({
          name: data.name,
          email: data.email,
          phone: data.phone,
          date_of_birth: data.date_of_birth,
          gender: data.gender,
          address: data.address,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          pan_no: data.pan_no,
          aadhar_no: data.aadhar_no,
          gst_no: data.gst_no || "",
        });

        const newCustomerId = createRes?.customer?.customer_id;

        // Step 2: PAN + Aadhaar upload R2 pe
        if (newCustomerId) {
          for (const [field, docType] of Object.entries({
            panCard: "PAN_CARD",
            aadhaarCard: "AADHAR",
          })) {
            if (data[field] instanceof File) {
              const f = new FormData();
              f.append("file", data[field]);
              f.append("document_type", docType);
              try {
                await uploadDocRaw(
                  f,
                  API_ENDPOINTS.CUSTOMERS.DOCUMENT_UPLOAD(newCustomerId)
                );
              } catch (err) {
                console.warn(`Doc upload warning (${docType}):`, err?.message);
              }
            }
          }
        }

        showToast.success(
          "Customer Registered!",
          createRes?.login_credentials
            ? `Password: ${createRes.login_credentials.password}`
            : "Member account and documents saved."
        );
        setIsOpenForm(false);
        AllUsersList();
      }
    } catch (error) {
      console.error("Customer submission failed:", error);
      showToast.error(
        "Submission Failed",
        error?.response?.data?.message ||
          error?.message ||
          "Could not save customer details."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Policy Submit ────────────────────────────────────────────

  const handlePolicySubmit = async (submissionData) => {
    setIsSubmitting(true);
    try {
      const rawData = submissionData?.formData || policyFormData;
      const targetCustomerId = String(
        submissionData?.customerId ||
          selectedUserForPolicy?.value ||
          selectedUserForPolicy?.customer_id ||
          selectedUserForPolicy?.id ||
          (typeof selectedUserForPolicy === "string"
            ? selectedUserForPolicy
            : "")
      );

      if (!targetCustomerId) {
        showToast.error("Missing Customer", "Please select a customer.");
        return;
      }

      // Step 1: Customer documents upload
      await uploadCustomerDocuments(rawData, targetCustomerId);

      // Step 2: PDF URL decide karo
      let pdfUrl = null;
      if (typeof rawData.policyDoc === "string") {
        pdfUrl = rawData.policyDoc;
      }
      // File hoga toh policy create hone ke baad upload karenge

      // Step 3: Policy create karo
      const payload = buildPolicyPayload(rawData, targetCustomerId, pdfUrl);
      const createRes = await createPolicyRaw(payload);

      // Step 4: PDF upload (create ke baad — policy_id milega)
      if (rawData.policyDoc instanceof File && createRes?.policy_id) {
        const pdfForm = new FormData();
        pdfForm.append("file", rawData.policyDoc);
        try {
          await uploadPDFRaw(
            pdfForm,
            API_ENDPOINTS.POLICIES.UPLOAD_PDF(createRes.policy_id)
          );
        } catch (err) {
          console.warn("PDF upload warning:", err?.message);
        }
      }

      showToast.success(
        "Policy Registered!",
        createRes?.policy_id
          ? `Policy #${createRes.policy_id} registered.`
          : "Policy has been registered."
      );
      setIsOpenPolicyForm(false);
      setSelectedUserForPolicy(null);
      AllUsersList();
    } catch (err) {
      console.error("Policy submit error:", err);
      const errData = err?.response?.data;
      let errMsg = "Failed to submit policy.";
      if (errData && typeof errData === "object") {
        errMsg = Object.entries(errData)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
          .join(" | ");
      } else if (err?.message) {
        errMsg = err.message;
      }
      showToast.error("Policy Failed", errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Draft = same as submit but no PDF
  const handleSaveDraft = async (submissionData) => {
    setIsSubmitting(true);
    try {
      const rawData = submissionData?.formData || policyFormData;
      const targetCustomerId = String(
        submissionData?.customerId ||
          selectedUserForPolicy?.value ||
          selectedUserForPolicy?.customer_id ||
          selectedUserForPolicy?.id ||
          ""
      );

      // Documents upload
      await uploadCustomerDocuments(rawData, targetCustomerId);

      // Policy create (no PDF — draft = PENDING)
      const payload = buildPolicyPayload(rawData, targetCustomerId, null);
      await createPolicyRaw(payload);

      showToast.info("Draft Saved", "Policy saved as Pending.");
      setIsOpenPolicyForm(false);
      setSelectedUserForPolicy(null);
      AllUsersList();
    } catch (err) {
      showToast.error("Draft Failed", err?.message || "Could not save draft.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Event Handlers ───────────────────────────────────────────

  const handleEditCustomer = (customer) => {
    setIsEditMode(false);
    setIsViewMode(true);
    setIsOpenForm(true);
    setSelectedCustomerId(customer?.customer_id);
    showCustomerDetails({
      customer_id: customer?.customer_id,
      action: "get",
    });
  };

  const handleClickBack = () => {
    setIsOpenForm(false);
    setIsEditMode(false);
    setIsViewMode(false);
    setFormData(initialFormData);
    AllUsersList();
  };

  const handleCancelRegistration = () => {
    setIsOpenForm(false);
    setIsEditMode(false);
    setIsViewMode(false);
    setFormData(initialFormData);
  };

  const handleEditButtonClick = (row) => {
    fetchCustomerDropdown();
    setSelectedUserForPolicy(row);
    setPolicyFormData((prev) => ({
      ...prev,
      members: [
        {
          id: 1,
          name: row.name || row.fullName || "",
          age: "",
          relation: "Self",
        },
      ],
    }));
    setIsOpenPolicyForm(true);
  };

  const handleCancelPolicyRegistration = () => {
    setIsOpenPolicyForm(false);
    setSelectedUserForPolicy(null);
  };

  const onPolicyCountClick = (row) => {
    setOpenPolicyModal(true);
    viewPolicies({ customer_id: row?.customer_id });
  };

  const handleCloseModal = () => {
    setOpenPolicyModal(false);
  };

  // ─── Table Headers ────────────────────────────────────────────

  const tableHeaders = headers.map((header) => {
    if (header.accessor === "action") {
      return {
        ...header,
        specialCellRowFunction: (row) => (
          <button
            type="button"
            className="flex items-center justify-center bg-[#EAF0F6] border border-[#D0DCEB] text-[#0B2545] hover:bg-[#0B2545] hover:text-white hover:border-[#0B2545] text-xs font-semibold rounded-[8px] px-3 py-1.5 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleEditButtonClick(row);
            }}
          >
            Add Policy
          </button>
        ),
      };
    } else if (header.accessor === "policy_count") {
      return {
        ...header,
        type: "special",
        specialCellRowFunction: (row) => (
          <div className="flex flex-row gap-2 items-center justify-center">
            <span>{row?.policy_count}</span>
            {row?.policy_count > 0 && (
              <span
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => onPolicyCountClick(row)}
              >
                <ArrowUpRight size={18} />
              </span>
            )}
          </div>
        ),
      };
    } else if (header?.accessor === "edit") {
      return {
        ...header,
        title: "View / Update",
        type: "special",
        specialCellRowFunction: (row) => (
          <div className="flex h-full flex-row gap-2 items-center justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#0B2545] text-[#0B2545] hover:text-white border border-[#CBD5E1] shadow-2xs transition-all cursor-pointer group"
              onClick={(e) => {
                e.stopPropagation();
                handleEditCustomer(row);
              }}
              title="View / Update Member"
            >
              <Eye size={15} className="shrink-0 group-hover:scale-105 transition-transform" />
              <Pencil size={13} className="shrink-0 text-slate-400 group-hover:text-white transition-colors" />
            </button>
          </div>
        ),
      };
    }
    return header;
  });

  // ─── Effects ──────────────────────────────────────────────────

  useEffect(() => {
    AllUsersList();
    fetchCustomerDropdown();
  }, []);

  // ─── Render ───────────────────────────────────────────────────

  return (
    <div className="h-full w-full bg-transparent">
      {isOpenForm ? (
        <UserRegistrationForm
          formData={formData}
          onChange={setFormData}
          onClickBack={handleClickBack}
          onCancel={handleCancelRegistration}
          onSubmit={handleSubmitRegistration}
          isEditMode={isEditMode}
          isViewMode={isViewMode}
          onEnableEdit={() => setIsConfirmModalOpen(true)}
          customerId={selectedCustomerId}
          isSubmitting={isSubmitting}
        />
      ) : isOpenPolicyForm ? (
        <PolicyRegistrationForm
          customerList={userList}
          customerOptions={
            customerOptions.length > 0 ? customerOptions : userList
          }
          selectedCustomer={selectedUserForPolicy}
          formData={policyFormData}
          onChange={setPolicyFormData}
          onClickBack={handleCancelPolicyRegistration}
          onCancel={handleCancelPolicyRegistration}
          onSubmitPolicy={handlePolicySubmit}
          onSaveDraft={handleSaveDraft}
          isSubmitting={isSubmitting}
          onSelectCustomer={(cust) => {
            setSelectedUserForPolicy(cust);
            if (cust) {
              setPolicyFormData((prev) => ({
                ...prev,
                members: [
                  {
                    id: 1,
                    name: cust.name || cust.fullName || cust.label || "",
                    age: "",
                    relation: "Self",
                  },
                ],
              }));
            } else {
              setPolicyFormData((prev) => ({
                ...prev,
                members: [{ id: 1, name: "", age: "", relation: "" }],
              }));
            }
          }}
        />
      ) : (
        <div className="flex h-full w-full flex-col gap-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-1">
            <h1 className="text-[26px] font-bold text-[#0B2545] font-sans tracking-tight">
              Register Member Directory
            </h1>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  fetchCustomerDropdown();
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
                  setSelectedUserForPolicy(null);
                  setIsOpenPolicyForm(true);
                }}
                className="rounded-[9px] bg-white border border-[#0B2545] text-[#0B2545] hover:bg-[#EAF0F6] px-4 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
              >
                Add New Policy
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditMode(false);
                  setIsViewMode(false);
                  setFormData(initialFormData);
                  setIsOpenForm(true);
                }}
                className="rounded-[9px] bg-[#0B2545] text-white hover:bg-[#0E2F52] px-4 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
              >
                New Registration
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="min-h-[460px] h-[calc(100vh-230px)] w-full flex-1">
            {isLoading ? (
              <div className="flex h-full min-h-[30vh] items-center justify-center bg-white rounded-xl border border-slate-100 shadow-sm">
                <LogoSpinner type="spin" size="md" />
              </div>
            ) : (
              <TableComponent
                theme="light"
                defaultHeaders={tableHeaders}
                dataSource={userList}
                isSelection={false}
                pagination={false}
                pageSize={5}
                pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
              />
            )}
          </div>

          {/* Policy Modal */}
          {openPolicyModal && (
            <ModalComponent
              title="Policy Details"
              header={ModalHeader}
              data={modalDataSource}
              countName="Policy Count"
              handleClose={handleCloseModal}
            />
          )}
        </div>
      )}

      {/* Confirmation Modal to Enable Editing */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => {
          setIsConfirmModalOpen(false);
          setIsViewMode(false);
          setIsEditMode(true);
        }}
        title="Enable Editing?"
        description="Are you sure you want to update this record?"
        confirmText="Confirm Update"
        cancelText="Cancel"
        variant="primary"
      />
    </div>
  );
};

export default UserDashboardPage;
