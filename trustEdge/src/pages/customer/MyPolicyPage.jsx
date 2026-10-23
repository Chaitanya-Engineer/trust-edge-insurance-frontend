import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  Calendar,
  CreditCard,
  Download,
  ChevronRight,
  HeartPulse,
  Car,
  Shield,
  RefreshCw,
  AlertCircle,
  Headphones,
} from "lucide-react";
import { useCustomer } from "./CustomerContext";
import CustomerAuthGuard from "./CustomerAuthGuard";
import MyPolicyView from "./MyPolicyView";
import InsurancePromoBanner from "./InsurancePromoBanner";

function PolicyPageContent() {
  const { customerPolicies, isLoadingPolicies, policiesError, refreshPolicies } =
    useCustomer();

  const [filterTab, setFilterTab] = useState("ALL");
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const activeCount = customerPolicies.filter(
    (p) => p.status?.toLowerCase() === "active"
  ).length;

  const renewalCount = customerPolicies.filter(
    (p) => p.status?.toLowerCase().includes("renewal") || p.isRenewalUpcoming
  ).length;

  const filteredPolicies = customerPolicies.filter((policy) => {
    if (filterTab === "ACTIVE") return policy.status?.toLowerCase() === "active";
    if (filterTab === "RENEWAL")
      return (
        policy.status?.toLowerCase().includes("renewal") ||
        policy.isRenewalUpcoming
      );
    return true;
  });

  const getCategoryConfig = (category) => {
    const cat = String(category || "").toLowerCase();
    if (cat.includes("health")) {
      return {
        icon: HeartPulse,
        badgeStyle: "bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 border-rose-200/80",
        iconStyle: "bg-rose-100 text-rose-700",
      };
    }
    if (cat.includes("motor") || cat.includes("vehicle") || cat.includes("car")) {
      return {
        icon: Car,
        badgeStyle: "bg-gradient-to-r from-sky-50 to-cyan-50 text-sky-700 border-sky-200/80",
        iconStyle: "bg-sky-100 text-sky-700",
      };
    }
    return {
      icon: Shield,
      badgeStyle: "bg-gradient-to-r from-violet-50 to-purple-50 text-purple-700 border-purple-200/80",
      iconStyle: "bg-purple-100 text-purple-700",
    };
  };

  if (selectedPolicy) {
    return (
      <MyPolicyView
        policy={selectedPolicy}
        onBack={() => setSelectedPolicy(null)}
      />
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight">
            My Policies
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review your active insurance policies, coverage particulars, and payment records.
          </p>
        </div>

        {/* Filter Pills with Live Policy Counts */}
        <div className="inline-flex p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-slate-200/70 border border-slate-300/60 text-xs font-bold self-start sm:self-auto shadow-2xs overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setFilterTab("ALL")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer ${
              filterTab === "ALL"
                ? "bg-white text-[#0B2545] shadow-xs font-extrabold ring-1 ring-slate-200/60"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Policies ({customerPolicies.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("ACTIVE")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer ${
              filterTab === "ACTIVE"
                ? "bg-emerald-600 text-white shadow-xs font-extrabold"
                : "text-slate-600 hover:text-emerald-700"
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("RENEWAL")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer ${
              filterTab === "RENEWAL"
                ? "bg-amber-500 text-white shadow-xs font-extrabold"
                : "text-slate-600 hover:text-amber-800"
            }`}
          >
            Renewal Due ({renewalCount})
          </button>
        </div>
      </div>

      {/* ── Policy Fetch Error Alert ──────────────────────────────── */}
      {policiesError && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-amber-800 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{policiesError}</span>
          </div>
          <button
            type="button"
            onClick={refreshPolicies}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors cursor-pointer shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* ── Policy Cards List / Skeletons / Empty State ────────────── */}
      {isLoadingPolicies ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-36 rounded-3xl bg-slate-100 animate-pulse border border-slate-200/60"
            />
          ))}
        </div>
      ) : customerPolicies.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#0B2545] flex items-center justify-center mx-auto">
            <Shield className="w-6 h-6 text-slate-400" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#0B2545]">
            No Insurance Policies Linked Yet
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            There are currently no active or historical policy records associated with your account. If you recently purchased a policy, please allow up to 24 hours or contact your advisor.
          </p>
          <div className="pt-2">
            <Link
              to="/customer/support"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#0E2F52] transition-colors shadow-xs"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Contact Advisor Mr. Chaudhari</span>
            </Link>
          </div>
        </div>
      ) : filteredPolicies.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-3">
          <p className="text-sm font-bold text-slate-700">
            No policies found under the "{filterTab === "ACTIVE" ? "Active" : "Renewal Due"}" filter.
          </p>
          <button
            type="button"
            onClick={() => setFilterTab("ALL")}
            className="text-xs font-bold text-[#0B2545] hover:underline cursor-pointer"
          >
            View All Policies ({customerPolicies.length})
          </button>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          {filteredPolicies.map((policy) => {
            const config = getCategoryConfig(policy.category);
            const Icon = config.icon;
            const isActive = policy.status?.toLowerCase() === "active";

            return (
              <div
                key={policy.policy_id}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Basic Info */}
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-2xl ${config.iconStyle} shrink-0 mt-0.5 shadow-2xs`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${config.badgeStyle}`}>
                          {policy.category}
                        </span>

                        <span className="text-xs text-slate-500 font-semibold bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          {policy.sub_type}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                            isActive
                              ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/15 text-emerald-800 border border-emerald-300/60 shadow-2xs"
                              : "bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-800 border border-amber-300/80 shadow-2xs"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
                            }`}
                          />
                          {policy.status}
                        </span>

                        {policy.policy_tenure && (
                          <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/80">
                            {policy.policy_tenure}
                          </span>
                        )}
                      </div>

                      <h2 className="text-lg sm:text-xl font-extrabold text-[#0B2545]">
                        {policy.policy_name}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-500">
                        Insurer:{" "}
                        <span className="font-semibold text-slate-700">
                          {policy.policy_description?.insurer || "TrustEdge Partner"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Center / Right: Policy Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-8 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 text-xs sm:text-sm">
                    <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-xs font-medium">Issue Date</span>
                      <span className="font-bold text-slate-800 mt-0.5 block">
                        {policy.issue_date}
                      </span>
                    </div>

                    <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-xs font-medium">Expiry Date</span>
                      <span
                        className={`font-bold mt-0.5 block ${
                          isActive ? "text-slate-800" : "text-rose-600 font-extrabold"
                        }`}
                      >
                        {policy.expiry_date}
                      </span>
                    </div>

                    <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-indigo-50/60 to-white p-3 rounded-xl border border-indigo-100">
                      <span className="text-indigo-600 block text-xs font-semibold">Annual Premium</span>
                      <span className="text-base font-extrabold text-[#0B2545] mt-0.5 block">
                        {policy.formattedPremium || `₹${policy.price}`}
                      </span>
                    </div>
                  </div>

                  {/* Rightmost: Actions */}
                  <div className="flex items-center gap-2.5 w-full lg:w-auto shrink-0 pt-2 lg:pt-0">
                    <button
                      type="button"
                      onClick={() => setSelectedPolicy(policy)}
                      className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0B2545] to-[#123E68] hover:from-[#123E68] hover:to-[#0B2545] text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {policy.policy_pdf_url && (
                      <a
                        href={policy.policy_pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors shadow-2xs"
                        title="Download Policy Certificate"
                      >
                        <Download className="w-4 h-4 text-[#2F6F3E]" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── 3D Pop-Out Insurance Banner ─────────────────────────────── */}
      <InsurancePromoBanner />
    </div>
  );
}

export default function MyPolicyPage() {
  return (
    <CustomerAuthGuard>
      <PolicyPageContent />
    </CustomerAuthGuard>
  );
}
