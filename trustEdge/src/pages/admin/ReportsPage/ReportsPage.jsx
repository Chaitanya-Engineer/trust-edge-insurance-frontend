import React, { useState, useMemo, useEffect } from "react";
import ReportHeader from "./helperComponents/ReportHeader";
import ReportFilters from "./helperComponents/ReportFilters";
import FinancialOverviewTab from "./helperComponents/FinancialOverviewTab";
import PolicyPerformanceTab from "./helperComponents/PolicyPerformanceTab";
import RenewalsPaymentsTab from "./helperComponents/RenewalsPaymentsTab";
import ClaimsPartnersTab from "./helperComponents/ClaimsPartnersTab";
import ExportReportModal from "./helperComponents/ExportReportModal";
import NoDataFound from "../../../component/core_components/NoDataFound/NoDataFound";

import {
  REPORT_TABS,
  MASTER_POLICIES_REPORT_DATA,
  MASTER_CLAIMS_REPORT_DATA,
  calculateExecutiveReportsData,
} from "./constant";
import { API_ENDPOINTS } from "../../../lib/constant/ApiEndpoints";
import { useAPI } from "../../../lib/hooks/useAPI";
import { DollarSign, Shield, RefreshCw, FileText } from "lucide-react";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("financials"); // "financials" | "policies" | "renewals" | "claims"
  const [selectedDateRange, setSelectedDateRange] = useState("this_month");
  const [showFilters, setShowFilters] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Global Filter State aligned with database columns
  const [filters, setFilters] = useState({
    category: "ALL",
    partner: "ALL",
    policyStatus: "ALL",
    claimStatus: "ALL",
    paymentStatus: "ALL",
  });

  const [isLoading, setIsLoading] = useState(true);

  // Optional live API hook - ingests live policies from backend if accessible
  const { data: apiPoliciesData, callApi: fetchPolicies } = useAPI(
    API_ENDPOINTS?.ADMIN?.POLICIES_LIST || "/api/policies/",
    {
      method: "GET",
      onSuccess: () => {},
      onFailure: () => {},
    }
  );

  useEffect(() => {
    fetchPolicies();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Normalize policies: if backend returns array of policies, merge or use them, otherwise fallback to MASTER
  const activeMasterPolicies = useMemo(() => {
    const rawList = apiPoliciesData?.data || apiPoliciesData?.results || apiPoliciesData;
    if (Array.isArray(rawList) && rawList.length > 0) {
      return rawList.map((p) => ({
        policy_id: p.policy_id || `POL-${p.id}`,
        customer_id: p.customer_id || (p.customer && p.customer.customer_id) || "CUST-101",
        customer_name: p.customer_name || (p.customer && p.customer.user && p.customer.user.name) || "Customer",
        customer_phone: p.customer_phone || (p.customer && p.customer.user && p.customer.user.phone) || "-",
        policy_name: p.policy_name || p.name || "Insurance Policy",
        category: p.category || "General Insurance",
        sub_type: p.sub_type || "-",
        partner: p.partner || p.provider || "Direct Agency",
        premium_amount: Number(p.premium_amount || p.premium || 0),
        status: p.status || "Active",
        issue_date: p.issue_date || p.start_date || "2026-01-01",
        expiry_date: p.expiry_date || p.end_date || "2027-01-01",
        payment_status: p.payment_status || "PAID",
        payment_mode: p.payment_mode || "Online",
        created_at: p.created_at || "2026-01-01T00:00:00Z",
      }));
    }
    return MASTER_POLICIES_REPORT_DATA;
  }, [apiPoliciesData]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: "ALL",
      partner: "ALL",
      policyStatus: "ALL",
      claimStatus: "ALL",
      paymentStatus: "ALL",
    });
    setSelectedDateRange("this_month");
  };

  const isFiltered = useMemo(() => {
    return (
      filters.category !== "ALL" ||
      filters.partner !== "ALL" ||
      filters.policyStatus !== "ALL" ||
      filters.claimStatus !== "ALL" ||
      filters.paymentStatus !== "ALL" ||
      selectedDateRange !== "this_month"
    );
  }, [filters, selectedDateRange]);

  // Reactive calculation engine using schema-exact data
  const {
    filteredPolicies,
    filteredClaims,
    financials,
    policyCounters,
    categoryDistribution,
    upcomingRenewals,
    partnerPerformance,
  } = useMemo(() => {
    return calculateExecutiveReportsData(
      activeMasterPolicies,
      MASTER_CLAIMS_REPORT_DATA,
      filters
    );
  }, [activeMasterPolicies, filters]);

  // Tab dynamic counts
  const tabCounts = {
    financials: `₹${(financials.totalCollected / 1000).toFixed(0)}k`,
    policies: `${filteredPolicies.length}`,
    renewals: `${upcomingRenewals.length}`,
    claims: `${filteredClaims.length}`,
  };

  const tabIcons = {
    financials: <DollarSign className="w-3.5 h-3.5" />,
    policies: <Shield className="w-3.5 h-3.5" />,
    renewals: <RefreshCw className="w-3.5 h-3.5" />,
    claims: <FileText className="w-3.5 h-3.5" />,
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* ── 1. Page Header ─────────────────────────────────────── */}
      <ReportHeader
        selectedDateRange={selectedDateRange}
        onDateRangeChange={setSelectedDateRange}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters((prev) => !prev)}
        onOpenExport={() => setIsExportOpen(true)}
        isFiltered={isFiltered}
        onResetFilters={handleResetFilters}
      />

      {/* ── 2. Global Filter Bar ───────────────────────────────── */}
      <ReportFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        isOpen={showFilters}
      />

      {/* ── 3. Executive Tabs Navigation ───────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#E5E9E7] p-2 flex items-center justify-between shadow-xs overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {REPORT_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer select-none ${
                  isActive
                    ? "bg-[#0B2545] text-white shadow-xs"
                    : "text-[#667085] hover:bg-[#F8FAFC] hover:text-[#0B2545]"
                }`}
              >
                {tabIcons[tab.id]}
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#F1F5F9] text-[#667085]"
                  }`}
                >
                  {tabCounts[tab.id]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Quick Clear Chip when filtered */}
        {isFiltered && (
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[#E5E9E7] text-xs">
            <span className="text-[11px] text-[#667085]">Filtered View</span>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[11px] font-semibold text-[#0B2545] hover:underline cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* ── 4. Tab Content Panel ────────────────────────────────── */}
      {activeTab === "financials" && (
        <>
          {filteredPolicies.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E5E9E7] p-8 shadow-xs">
              <NoDataFound
                title="No Financial Records Found"
                description="No underwritten policies or collections match your active filter scope."
                onClearFilters={handleResetFilters}
              />
            </div>
          ) : (
            <FinancialOverviewTab financials={financials} />
          )}
        </>
      )}

      {activeTab === "policies" && (
        <PolicyPerformanceTab
          policies={filteredPolicies}
          policyCounters={policyCounters}
          categoryDistribution={categoryDistribution}
          onResetFilters={handleResetFilters}
        />
      )}

      {activeTab === "renewals" && (
        <RenewalsPaymentsTab
          upcomingRenewals={upcomingRenewals}
          policies={filteredPolicies}
          onResetFilters={handleResetFilters}
        />
      )}

      {activeTab === "claims" && (
        <ClaimsPartnersTab
          claims={filteredClaims}
          partnerPerformance={partnerPerformance}
          onResetFilters={handleResetFilters}
        />
      )}

      {/* ── 5. Institutional Export Report Modal ────────────────── */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        policies={filteredPolicies}
        filteredTransactions={filteredPolicies}
        filters={filters}
        financials={financials}
      />
    </div>
  );
}
