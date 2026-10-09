import React, { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { FileText } from "lucide-react";
import TableComponent from "../../../component/core_components/TableComponent/TableComponent";
import LogoSpinner from "../../../component/core_components/LogoSpinner/LogoSpinner";
import PolicyRegistrationForm from "../UserDashboardPage/helperComponent/PolicyRegistrationForm";
import CustomDateRangePicker from "../../../component/core_components/DatePicker/CustomDateRangePicker";
import CustomerPolicyDetailsView from "../../../component/shared/CustomerPolicyDetailsView/CustomerPolicyDetailsView";
import { API_ENDPOINTS } from "../../../lib/constant/ApiEndpoints";
import { useAPI } from "../../../lib/hooks/useAPI";
import {
  rawPoliciesData,
  policyTableHeaders,
  getDynamicPolicyStatus,
} from "./constant";

const PolicyDashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenPolicyForm, setIsOpenPolicyForm] = useState(false);
  const [selectedPolicyForView, setSelectedPolicyForView] = useState(null);
  const [userList, setUserList] = useState([]);
  const [policiesList, setPoliciesList] = useState(rawPoliciesData);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const { callApi: fetchUsers } = useAPI(API_ENDPOINTS?.ADMIN?.USERS_LIST, {
    method: "GET",
    onSuccess: (res) => {
      if (res && res.length > 0) setUserList(res);
      setIsLoading(false);
    },
    onFailure: () => {
      setUserList([]);
      setIsLoading(false);
    },
  });

  const { callApi: fetchPolicies } = useAPI(
    API_ENDPOINTS?.ADMIN?.POLICIES_LIST || "/api/policies/",
    {
      method: "GET",
      onSuccess: (res) => {
        const list = Array.isArray(res) ? res : res?.results;
        if (Array.isArray(list) && list.length > 0) {
          setPoliciesList(list);
        }
        setIsLoading(false);
      },
      onFailure: (err) => {
        // Graceful fallback to default policies
        console.warn("Using default policies dataset");
        setIsLoading(false);
      },
    }
  );

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

  useEffect(() => {
    fetchUsers();
    fetchPolicies();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const normalizedPolicies = useMemo(() => {
    return (policiesList || []).map((p) => {
      const policyId = p.policy_id || p.policyId || p.id || "-";
      const customerId = p.customer_id || p.customerId || "";
      const userMatch = (userList || []).find(
        (u) =>
          String(u.customer_id || u.id || u.value) === String(customerId) ||
          String(u.name || "").toLowerCase() ===
            String(p.customer_name || p.policyHolderName || "").toLowerCase()
      );

      const customerName =
        p.customer_name ||
        p.customerName ||
        p.policyHolderName ||
        userMatch?.name ||
        userMatch?.fullName ||
        userMatch?.label ||
        (customerId ? `Customer #${customerId}` : "-");

      const policyName = p.policy_name || p.policyName || "-";
      const category = p.category || "General";
      const subType = p.sub_type || p.subType || "-";
      const issueDate = p.issue_date || p.issueDate || "-";
      const expiryDate = p.expiry_date || p.expiryDate || "-";

      const rawPrice =
        parseFloat(String(p.premium_amount || p.price || 0).replace(/,/g, "")) || 0;
      const formattedPremium = `₹${rawPrice.toLocaleString("en-IN")}`;

      const computedStatus = getDynamicPolicyStatus(p);
      const status = p.status || computedStatus;
      const issuedBy = p.issued_by || p.issuedBy || "Mr. Chaudhari";
      const policyPdfUrl = p.policy_pdf_url || p.policyPdfUrl || null;

      return {
        ...p,
        id: p.id || policyId,
        policyId,
        policy_id: policyId,
        customerId: customerId || userMatch?.customer_id || "-",
        customer_id: customerId || userMatch?.customer_id || "-",
        customerName,
        customer_name: customerName,
        policyHolderName: customerName,
        policyName,
        policy_name: policyName,
        category,
        subType,
        sub_type: subType,
        premiumAmount: rawPrice,
        premium_amount: rawPrice,
        formattedPremium,
        issueDate,
        issue_date: issueDate,
        expiryDate,
        expiry_date: expiryDate,
        status,
        issuedBy,
        issued_by: issuedBy,
        policyPdfUrl,
        policy_pdf_url: policyPdfUrl,
      };
    });
  }, [policiesList, userList]);

  // Date Range filtered policies
  const filteredPolicies = useMemo(() => {
    let list = normalizedPolicies;
    if (dateRange.startDate || dateRange.endDate) {
      list = list.filter((item) => {
        const itemDate = item.issueDate !== "-" ? item.issueDate : item.expiryDate;
        if (!itemDate || itemDate === "-") return false;
        const d = dayjs(itemDate);
        if (!d.isValid()) return true;
        if (dateRange.startDate && d.isBefore(dayjs(dateRange.startDate), "day")) {
          return false;
        }
        if (dateRange.endDate && d.isAfter(dayjs(dateRange.endDate), "day")) {
          return false;
        }
        return true;
      });
    }
    return list;
  }, [normalizedPolicies, dateRange]);

  const handlePolicyCreated = (newPolicy) => {
    if (newPolicy) {
      setPoliciesList((prev) => [newPolicy, ...(Array.isArray(prev) ? prev : [])]);
    }
    fetchPolicies();
    setIsOpenPolicyForm(false);
  };

  const getStatusPill = (statusVal) => {
    if (!statusVal) return null;
    const lower = statusVal.toLowerCase().trim();

    // 🟡 Review Required (Yellow/Gold)
    if (lower.includes("review") || lower === "pending" || lower === "new") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FBF5DF] text-[#C9A227]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]"></span>
          Review Required
        </span>
      );
    }

    // 🔵 Active (Navy/Blue)
    if (lower === "active" || lower === "verified") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EAF0F6] text-[#0B2545]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0B2545]"></span>
          Active
        </span>
      );
    }

    // 🟠 Expired (Orange/Red)
    if (
      lower === "expired" ||
      lower === "error" ||
      lower === "rejected" ||
      lower === "failed" ||
      lower === "inactive"
    ) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFF4ED] text-[#B44C18]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F76B15]"></span>
          Expired
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F2F4F7] text-[#344054]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#667085]"></span>
        {statusVal}
      </span>
    );
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

  const formattedHeaders = policyTableHeaders.map((header) => {
    if (header.accessor === "policyId" || header.accessor === "policy_id") {
      return {
        ...header,
        type: "special",
        specialCellRowFunction: (row) => (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const custId = row.customerId || row.customer_id;
              const polId = row.policyId || row.policy_id;
              setSelectedPolicyForView({
                customerId: custId,
                policyId: polId,
                initialTab: "policies",
              });
            }}
            className="font-bold text-[#0B2545] hover:text-[#2F6F3E] hover:underline underline-offset-2 transition-colors cursor-pointer border-none bg-transparent p-0 text-xs text-left"
            title="View Policy & Customer Details"
          >
            {row.policyId || row.policy_id || "-"}
          </button>
        ),
      };
    }
    if (header.accessor === "customerId" || header.accessor === "customer_id") {
      return {
        ...header,
        type: "special",
        specialCellRowFunction: (row) => (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const custId = row.customerId || row.customer_id;
              const polId = row.policyId || row.policy_id;
              setSelectedPolicyForView({
                customerId: custId,
                policyId: polId,
                initialTab: "personal",
              });
            }}
            className="font-bold text-[#0B2545] hover:text-[#2F6F3E] hover:underline underline-offset-2 transition-colors cursor-pointer border-none bg-transparent p-0 text-xs text-left"
            title="View Customer Profile"
          >
            {row.customerId || row.customer_id || "-"}
          </button>
        ),
      };
    }
    if (header.accessor === "status") {
      return {
        ...header,
        type: "special",
        specialCellRowFunction: (row) => getStatusPill(row?.status),
      };
    }
    if (header.accessor === "documents") {
      return {
        ...header,
        type: "special",
        specialCellRowFunction: (row) => renderDocumentBadge(row),
      };
    }
    return header;
  });

  return (
    <div className="h-full w-full bg-transparent">
      {selectedPolicyForView ? (
        <CustomerPolicyDetailsView
          customerId={selectedPolicyForView.customerId}
          initialTab={selectedPolicyForView.initialTab || "policies"}
          highlightPolicyId={selectedPolicyForView.policyId}
          onBack={() => setSelectedPolicyForView(null)}
          originatingDirectory="policies"
        />
      ) : isOpenPolicyForm ? (
        <PolicyRegistrationForm
          customerList={userList}
          formData={policyFormData}
          onChange={setPolicyFormData}
          onClickBack={() => setIsOpenPolicyForm(false)}
          onCancel={() => setIsOpenPolicyForm(false)}
          onSubmit={handlePolicyCreated}
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
                Complete directory of registered insurance policies, coverage details, and status.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
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
                    setDateRange({ startDate, endDate });
                  }}
                  onApply={({ startDate, endDate }) => {
                    setDateRange({ startDate, endDate });
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
                dataSource={filteredPolicies}
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
