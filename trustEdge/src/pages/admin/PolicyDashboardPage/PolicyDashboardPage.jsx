import React, { useState, useEffect, useMemo } from "react";
import TableComponent from "../../../component/core_components/TableComponent/TableComponent";
import LogoSpinner from "../../../component/core_components/LogoSpinner/LogoSpinner";
import PolicyRegistrationForm from "../UserDashboardPage/helperComponent/PolicyRegistrationForm";
import { API_ENDPOINTS } from "../../../lib/constant/ApiEndpoints";
import { useAPI } from "../../../lib/hooks/useAPI";
import {
  rawPoliciesData,
  getCustomerCentricData,
  customerPolicyHeaders,
  getDynamicPolicyStatus,
} from "./constant";

const PolicyDashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenPolicyForm, setIsOpenPolicyForm] = useState(false);
  const [userList, setUserList] = useState([]);
  const [policiesList, setPoliciesList] = useState(rawPoliciesData);

  const { callApi: fetchUsers } = useAPI(API_ENDPOINTS?.ADMIN?.USERS_LIST, {
    method: "GET",
    onSuccess: (res) => {
      if (res && res.length > 0) setUserList(res);
    },
    onFailure: () => {
      setUserList([]);
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
      },
      onFailure: (err) => {
        console.error("Failed to fetch policies:", err);
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
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const normalizedPolicies = useMemo(() => {
    return (policiesList || []).map((p) => {
      const policyId = p.policy_id || p.policyId || p.id || "-";
      const customerId = p.customer_id || p.customerId || "";
      const userMatch = (userList || []).find(
        (u) => String(u.customer_id || u.id || u.value) === String(customerId)
      );
      const policyHolderName =
        p.customer_name ||
        p.policyHolderName ||
        userMatch?.name ||
        userMatch?.fullName ||
        userMatch?.label ||
        (customerId ? `Customer #${customerId}` : "Customer");
      const mobileNumber =
        p.customer_phone ||
        p.mobileNumber ||
        userMatch?.phone ||
        userMatch?.mobileNumber ||
        "-";
      const category = p.category || "General";
      const subType = p.sub_type || p.subType || "-";
      const issueDate = p.issue_date || p.issueDate || "-";
      const expiryDate = p.expiry_date || p.expiryDate || "-";
      const price = p.premium_amount || p.price || "0";
      const status = p.status || "Active";
      const policyName = p.policy_name || p.policyName || "";

      return {
        ...p,
        id: p.id || policyId,
        policyId,
        policy_id: policyId,
        policyHolderName,
        customer_name: policyHolderName,
        mobileNumber,
        customer_phone: mobileNumber,
        category,
        subType,
        sub_type: subType,
        issueDate,
        issue_date: issueDate,
        expiryDate,
        expiry_date: expiryDate,
        price,
        premium_amount: price,
        status,
        policyName,
        policy_name: policyName,
        customerId,
        customer_id: customerId,
        issuedBy: p.issuedBy || p.issued_by || "Chaitanya",
      };
    });
  }, [policiesList, userList]);

  const customerDataSource = useMemo(() => {
    const base = getCustomerCentricData(normalizedPolicies);
    return base.map((cust) => {
      const firstWithCustId = cust.policies?.find(
        (p) => p.customer_id || p.customerId
      );
      return {
        ...cust,
        customerId:
          firstWithCustId?.customer_id ||
          firstWithCustId?.customerId ||
          cust.id,
        customer_id:
          firstWithCustId?.customer_id ||
          firstWithCustId?.customerId ||
          cust.id,
      };
    });
  }, [normalizedPolicies]);

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

  const formattedHeaders = customerPolicyHeaders.map((header) => {
    if (header.accessor === "status") {
      return {
        ...header,
        type: "special",
        specialCellRowFunction: (row) => getStatusPill(row?.status),
      };
    }
    return header;
  });

  const renderExpandedCustomerPolicies = (customerRow) => {
    const customerPolicies = customerRow?.policies || [];

    return (
      <div className="bg-white rounded-xl border border-[#E5E9E7] p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E9E7]">
          <h4 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0B2545]"></span>
            Policies for {customerRow.policyHolderName} ({customerPolicies.length})
            {customerRow.customerId && (
              <span className="text-[11px] font-normal text-[#667085]">
                (Customer ID: {customerRow.customerId})
              </span>
            )}
          </h4>
          <span className="text-[11px] font-semibold text-[#667085]">
            Customer Mobile: {customerRow.mobileNumber}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAF9] text-[#667085] uppercase text-[10px] font-bold tracking-wider border-b border-[#E5E9E7]">
                <th className="py-2.5 px-3">Policy ID</th>
                <th className="py-2.5 px-3">Customer ID</th>
                <th className="py-2.5 px-3">Customer Name</th>
                <th className="py-2.5 px-3">Policy Name</th>
                <th className="py-2.5 px-3">Policy Type</th>
                <th className="py-2.5 px-3">Sub-Type</th>
                <th className="py-2.5 px-3">Premium Amount</th>
                <th className="py-2.5 px-3">Issue Date</th>
                <th className="py-2.5 px-3">Expiry Date</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Issued By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E9E7]">
              {customerPolicies.map((policy) => {
                const computedStatus = getDynamicPolicyStatus(policy);
                return (
                  <tr key={policy.id || policy.policy_id || policy.policyId} className="hover:bg-[#F0F4F8] transition-colors">
                    <td className="py-3 px-3 font-semibold text-[#0B2545] text-nowrap">
                      {policy.policy_id || policy.policyId}
                    </td>
                    <td className="py-3 px-3 text-[#344054] text-nowrap">
                      {policy.customer_id || policy.customerId || customerRow.customerId || "-"}
                    </td>
                    <td className="py-3 px-3 font-medium text-[#344054] text-nowrap">
                      {policy.customer_name || policy.policyHolderName || customerRow.policyHolderName || "-"}
                    </td>
                    <td className="py-3 px-3 font-medium text-[#344054]">
                      {policy.policy_name || policy.policyName || "-"}
                    </td>
                    <td className="py-3 px-3 font-medium text-[#475569]">
                      {policy.category}
                    </td>
                    <td className="py-3 px-3 text-[#475569]">{policy.sub_type || policy.subType || "-"}</td>
                    <td className="py-3 px-3 font-semibold text-[#0B2545] text-nowrap">
                      ₹{parseFloat(policy.premium_amount || policy.price || 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-[#475569] text-nowrap">
                      {policy.issue_date || policy.issueDate}
                    </td>
                    <td className="py-3 px-3 text-[#475569] text-nowrap">
                      {policy.expiry_date || policy.expiryDate}
                    </td>
                    <td className="py-3 px-3">{getStatusPill(policy.status || computedStatus)}</td>
                    <td className="py-3 px-3 font-medium text-[#0B2545] text-nowrap">
                      Issued By: <span className="font-bold">{policy.issuedBy || "Chaitanya"}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full bg-transparent">
      {isOpenPolicyForm ? (
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-1">
            <div>
              <h1 className="text-[26px] font-bold text-[#0B2545] font-sans tracking-tight">
                Policy Directory
              </h1>
              <p className="text-xs text-[#667085] mt-0.5">
                Customer-centric view listing policy holders and their active, pending, or expired policies.
              </p>
            </div>

            <div className="flex items-center gap-3">
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
                className="rounded-[9px] bg-[#0B2545] text-white hover:bg-[#0E2F52] px-4 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
              >
                + Register Policy
              </button>
            </div>
          </div>

          <div className="min-h-[30vh] h-full w-full">
            {isLoading ? (
              <div className="flex h-full min-h-[30vh] items-center justify-center bg-white rounded-xl border border-slate-100 shadow-sm">
                <LogoSpinner type="spin" size="md" />
              </div>
            ) : (
              <TableComponent
                theme="light"
                defaultHeaders={formattedHeaders}
                dataSource={customerDataSource}
                isSelection={false}
                collapsible
                renderExpandedRow={renderExpandedCustomerPolicies}
                pagination={true}
                pageSize={5}
                pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyDashboardPage;
