import React, { useState, useEffect, useMemo } from "react";
import TableComponent from "../../../component/core_components/TableComponent/TableComponent";
import LogoSpinner from "../../../component/core_components/LogoSpinner/LogoSpinner";
import PolicyRegistrationForm from "../UserDashboardPage/helperComponent/PolicyRegistrationForm";
import {
  rawPoliciesData,
  getCustomerCentricData,
  customerPolicyHeaders,
  getDynamicPolicyStatus,
} from "./constant";

const PolicyDashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenPolicyForm, setIsOpenPolicyForm] = useState(false);
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
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const customerDataSource = useMemo(() => {
    return getCustomerCentricData(rawPoliciesData);
  }, []);

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
                <th className="py-2.5 px-3">Policy Type</th>
                <th className="py-2.5 px-3">Sub-Type</th>
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
                  <tr key={policy.id} className="hover:bg-[#F0F4F8] transition-colors">
                    <td className="py-3 px-3 font-semibold text-[#0B2545] text-nowrap">
                      {policy.policyId}
                    </td>
                    <td className="py-3 px-3 font-medium text-[#344054]">
                      {policy.category}
                    </td>
                    <td className="py-3 px-3 text-[#475569]">{policy.subType}</td>
                    <td className="py-3 px-3 text-[#475569] text-nowrap">
                      {policy.issueDate}
                    </td>
                    <td className="py-3 px-3 text-[#475569] text-nowrap">
                      {policy.expiryDate}
                    </td>
                    <td className="py-3 px-3">{getStatusPill(computedStatus)}</td>
                    <td className="py-3 px-3 font-medium text-[#0B2545]">
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
          formData={policyFormData}
          onChange={setPolicyFormData}
          onClickBack={() => setIsOpenPolicyForm(false)}
          onCancel={() => setIsOpenPolicyForm(false)}
          onSubmit={(data) => {
            console.log("Submitted Policy Data:", data);
            setIsOpenPolicyForm(false);
          }}
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
