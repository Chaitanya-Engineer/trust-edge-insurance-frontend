import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  CreditCard,
  UserCheck,
  PhoneCall,
  FileText,
  Clock,
  HeartPulse,
  Car,
  Shield,
  Headphones,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useCustomer } from "./CustomerContext";
import CustomerAuthGuard from "./CustomerAuthGuard";
import familyCutout from "../../assets/customer_portal/FamilyPortraitCutout.png";

function DashboardContent() {
  const {
    customerProfile,
    customerPolicies,
    isLoadingPolicies,
    policiesError,
    refreshPolicies,
  } = useCustomer();

  // Dynamic statistics calculated strictly from real customer policies
  const totalPolicies = customerPolicies.length;
  const activePolicies = customerPolicies.filter(
    (p) => p.status?.toLowerCase() === "active"
  ).length;
  const renewalDuePolicies = customerPolicies.filter(
    (p) => p.status?.toLowerCase().includes("expired") || p.isRenewalUpcoming
  );

  const totalPremiumInvested = customerPolicies.reduce(
    (acc, curr) => acc + (parseFloat(curr.premium_amount || curr.price) || 0),
    0
  );

  const getCategoryConfig = (category) => {
    const cat = String(category || "").toLowerCase();
    if (cat.includes("health")) {
      return {
        icon: HeartPulse,
        badgeStyle:
          "bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 border-rose-200/80",
        iconStyle: "bg-rose-100/70 text-rose-700",
      };
    }
    if (
      cat.includes("motor") ||
      cat.includes("vehicle") ||
      cat.includes("car")
    ) {
      return {
        icon: Car,
        badgeStyle:
          "bg-gradient-to-r from-sky-50 to-cyan-50 text-sky-700 border-sky-200/80",
        iconStyle: "bg-sky-100/70 text-sky-700",
      };
    }
    return {
      icon: Shield,
      badgeStyle:
        "bg-gradient-to-r from-violet-50 to-purple-50 text-purple-700 border-purple-200/80",
      iconStyle: "bg-purple-100/70 text-purple-700",
    };
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* ── Welcome Banner (Dynamic Customer Info) ──────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0B2545] text-white p-5 sm:p-8 lg:p-9 shadow-sm border border-[#0E2F52]">
        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-300 tracking-wide uppercase">
            Member Portal • ID:{" "}
            {customerProfile?.customerId || customerProfile?.customer_id || "—"}
          </span>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Welcome back, {customerProfile?.name || "Valued Customer"}! 👋
          </h1>
          <p className="mt-2 text-xs sm:text-base text-slate-300 leading-relaxed">
            Manage your active insurance policies, track upcoming renewals, and
            connect with your dedicated TrustEdge advisor.
          </p>

          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <Link
              to="/customer/policies"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-11 px-5 rounded-xl bg-white hover:bg-slate-100 text-[#0B2545] font-bold text-sm transition-all shadow-xs"
            >
              <FileText className="w-4 h-4 text-[#0B2545] shrink-0" />
              <span>View My Policies</span>
            </Link>
            <Link
              to="/customer/support"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-11 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/30 backdrop-blur-xs"
            >
              <Headphones className="w-4 h-4 text-white shrink-0" />
              <span>Contact Advisor</span>
            </Link>
          </div>
        </div>

        {/* Subtle decorative background outline */}
        <div className="absolute right-8 bottom-4 hidden lg:block opacity-5 pointer-events-none">
          <ShieldCheck className="w-48 h-48 text-white" />
        </div>
      </div>

      {/* ── KPI Summary Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Card 1: Total Policies */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-500">
              Total Policies
            </span>
            <div className="p-1.5 sm:p-2 rounded-lg bg-slate-100 text-[#0B2545]">
              <FileText className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
          </div>
          <p className="mt-2 text-xl sm:text-3xl font-bold text-[#0B2545]">
            {totalPolicies}
          </p>
          <p className="mt-0.5 text-[11px] sm:text-xs text-slate-400">
            In your portfolio
          </p>
        </div>

        {/* Card 2: Active Policies */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-500">
              Active Policies
            </span>
            <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
          </div>
          <p className="mt-2 text-xl sm:text-3xl font-bold text-[#2F6F3E]">
            {activePolicies}
          </p>
          <p className="mt-0.5 text-[11px] sm:text-xs text-emerald-600 font-medium">
            Currently protected
          </p>
        </div>

        {/* Card 3: Upcoming Renewals */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-500">
              Renewals
            </span>
            <div className="p-1.5 sm:p-2 rounded-lg bg-amber-50 text-amber-700">
              <AlertTriangle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
          </div>
          <p className="mt-2 text-xl sm:text-3xl font-bold text-amber-600">
            {renewalDuePolicies.length}
          </p>
          <p className="mt-0.5 text-[11px] sm:text-xs text-amber-700 font-medium">
            Action recommended
          </p>
        </div>

        {/* Card 4: Total Premium */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-500">
              Annual Premium
            </span>
            <div className="p-1.5 sm:p-2 rounded-lg bg-slate-100 text-[#0B2545]">
              <CreditCard className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
          </div>
          <p className="mt-2 text-xl sm:text-3xl font-bold text-[#0B2545] truncate">
            ₹{totalPremiumInvested.toLocaleString("en-IN")}
          </p>
          <p className="mt-0.5 text-[11px] sm:text-xs text-slate-400">
            Total yearly protection
          </p>
        </div>
      </div>

      {/* ── Upcoming Renewals Section ─────────────────────────────── */}
      {renewalDuePolicies.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-300/80 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xs">
          <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 flex-col sm:flex-row mb-4 sm:mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20 shrink-0">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h2 className="text-sm sm:text-lg font-bold text-amber-950">
                  Upcoming Policy Renewal Alert
                </h2>
                <p className="text-xs sm:text-sm text-amber-800">
                  Renew before expiry date to maintain continuous insurance
                  coverage.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-extrabold bg-amber-200/90 text-amber-950 border border-amber-300 shadow-2xs self-start sm:self-auto">
              Renewal Due Soon
            </span>
          </div>

          <div className="space-y-3">
            {renewalDuePolicies.map((pol) => (
              <div
                key={pol.policy_id}
                className="bg-white/95 backdrop-blur-xs rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-amber-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-200">
                      {pol.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      • {pol.sub_type}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0B2545]">
                    {pol.policy_name}
                  </h3>
                  <p className="text-xs text-slate-600 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>
                      Expiry Date:{" "}
                      <span className="font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                        {pol.expiry_date}
                      </span>
                    </span>
                    <span className="hidden sm:inline text-slate-300">•</span>
                    <span>
                      Premium Amount:{" "}
                      <span className="font-extrabold text-slate-900">
                        {pol.formattedPremium || `₹${pol.price}`}
                      </span>
                    </span>
                  </p>
                </div>

                <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 pt-1 md:pt-0">
                  <Link
                    to="/customer/policies"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#0B2545] to-[#123E68] hover:from-[#123E68] hover:to-[#0B2545] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <span>Review Policy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/customer/support"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#2F6F3E]" />
                    <span>Advisor Assistance</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Policy Fetch Error (Non-blocking: Profile remains visible) ── */}
      {policiesError && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-amber-800 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{policiesError}</span>
          </div>
          <button
            type="button"
            onClick={refreshPolicies}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors cursor-pointer shrink-0"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* ── Active Purchased Policies Overview ───────────────────── */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
          <div>
            <h2 className="text-base sm:text-xl font-extrabold text-[#0B2545]">
              My Insurance Policies
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Purchased coverage schedules linked to your account
            </p>
          </div>
          {totalPolicies > 0 && (
            <Link
              to="/customer/policies"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B2545] hover:text-[#2F6F3E] bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition-colors shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {isLoadingPolicies ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-48 rounded-2xl bg-slate-100 animate-pulse border border-slate-200/60"
              />
            ))}
          </div>
        ) : totalPolicies === 0 ? (
          <div className="p-8 text-center bg-slate-50/70 rounded-2xl border border-dashed border-slate-200">
            <Shield className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-[#0B2545]">
              No Active Policies Found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              You do not have any registered policies yet. Contact your advisor
              Mr. Chaudhari to add your policy records.
            </p>
            <div className="mt-4">
              <Link
                to="/customer/support"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#0E2F52] transition-colors"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Contact Advisor</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {customerPolicies.slice(0, 3).map((policy) => {
              const config = getCategoryConfig(policy.category);
              const Icon = config.icon;
              const isActive = policy.status?.toLowerCase() === "active";

              return (
                <div
                  key={policy.policy_id}
                  className="group relative rounded-xl sm:rounded-2xl border border-slate-200/90 p-4 sm:p-5 hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between bg-white"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div
                        className={`p-2.5 sm:p-3 rounded-xl ${config.iconStyle} shadow-2xs`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold ${
                          isActive
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs"
                            : "bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive
                              ? "bg-emerald-500"
                              : "bg-amber-500 animate-pulse"
                          }`}
                        />
                        {policy.status}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-[#0B2545] line-clamp-1 group-hover:text-[#2F6F3E] transition-colors mt-0.5">
                      {policy.policy_name}
                    </h3>

                    <div
                      className={`inline-flex mt-2 px-2.5 py-0.5 rounded-md text-[11px] sm:text-xs font-semibold border ${config.badgeStyle}`}
                    >
                      {policy.category} • {policy.sub_type}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                      {policy.policy_tenure && (
                        <div className="flex items-center justify-between text-slate-500">
                          <span>Tenure:</span>
                          <span className="font-semibold text-slate-700">
                            {policy.policy_tenure}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-slate-500">
                        <span>Expires On:</span>
                        <span className="font-bold text-slate-800">
                          {policy.expiry_date}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-500">
                        <span>Annual Premium:</span>
                        <span className="font-bold text-[#0B2545] text-sm">
                          {policy.formattedPremium || `₹${policy.price}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <Link
                      to="/customer/policies"
                      className="inline-flex items-center justify-between w-full text-xs font-bold text-[#0B2545] group-hover:text-[#2F6F3E] transition-colors"
                    >
                      <span>View Policy Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Quick Navigation Section (3 Action Cards) ─────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
        {/* Card 1: My Policy */}
        <Link
          to="/customer/policies"
          className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex items-start gap-3.5 sm:gap-4"
        >
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-100 text-[#0B2545] shrink-0">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#0B2545] group-hover:text-[#2F6F3E] transition-colors">
              My Policy
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 sm:mt-1 leading-relaxed">
              Access policy schedules, covered members, and payment receipts.
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2545] mt-2 sm:mt-3">
              Open Policies <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>

        {/* Card 2: Profile */}
        <Link
          to="/customer/profile"
          className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex items-start gap-3.5 sm:gap-4"
        >
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-100 text-[#0B2545] shrink-0">
            <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#0B2545] group-hover:text-[#2F6F3E] transition-colors">
              Profile
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 sm:mt-1 leading-relaxed">
              Review personal information, address records, and KYC status.
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2F6F3E] mt-2 sm:mt-3">
              View Profile <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>

        {/* Card 3: Support */}
        <Link
          to="/customer/support"
          className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex items-start gap-3.5 sm:gap-4"
        >
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-100 text-[#0B2545] shrink-0">
            <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-[#0B2545]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#0B2545] group-hover:text-[#2F6F3E] transition-colors">
              Help & Support
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 sm:mt-1 leading-relaxed">
              Connect with your dedicated advisor Mr. Chaudhari or our helpdesk.
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2545] mt-2 sm:mt-3">
              Get Assistance <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>
      </div>

      {/* ── Family Health Insurance Banner ──────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B2545] via-[#0E2F52] to-[#15416E] text-white p-5 sm:p-7 md:p-8 shadow-sm border border-slate-200/20">
        <div className="pointer-events-none absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute top-0 right-1/3 w-60 h-60 rounded-full bg-[#C9A227]/10 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 lg:col-span-8 space-y-3 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Health Insurance</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug">
              Shield Your Family’s Health with{" "}
              <span className="text-[#E4C765]">TrustEdge</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-normal max-w-xl">
              Quality healthcare shouldn't come with financial stress. Get
              comprehensive hospital and medical coverage designed to safeguard
              your family’s savings from unexpected health emergencies.
            </p>

            <div className="pt-1.5">
              <Link
                to="/insurance/health"
                className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#E4C765] hover:opacity-95 text-[#0B2545] font-bold text-xs sm:text-sm shadow-xs transition-all hover:scale-[1.01]"
              >
                <span>Get Health Coverage</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-4 flex items-end justify-center md:justify-end md:self-end -mb-5 sm:-mb-7 md:-mb-8 pt-3 md:pt-0">
            <img
              src={familyCutout}
              alt="Shield Your Family's Health - TrustEdge Insurance"
              className="w-auto h-auto max-h-[190px] sm:max-h-[220px] md:max-h-[250px] object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomerDashboardPage() {
  return (
    <CustomerAuthGuard>
      <DashboardContent />
    </CustomerAuthGuard>
  );
}
