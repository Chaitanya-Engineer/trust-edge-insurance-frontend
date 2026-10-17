import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  FileText,
  Download,
  ExternalLink,
  Calendar,
  CreditCard,
  HeartPulse,
  Car,
  Shield,
  CheckCircle2,
  Clock,
  PhoneCall,
  MessageCircle,
  User,
  Users,
  Building2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { mockSupportInfo } from "./constant";

export default function MyPolicyView({ policy, onBack }) {
  if (!policy) return null;

  const isActive = policy.status === "Active";

  const getCategoryConfig = (category) => {
    const cat = String(category || "").toLowerCase();
    if (cat.includes("health")) {
      return {
        icon: HeartPulse,
        badgeStyle: "bg-rose-50 text-rose-700 border-rose-200",
        iconStyle: "bg-rose-100 text-rose-700",
      };
    }
    if (cat.includes("motor") || cat.includes("vehicle") || cat.includes("car")) {
      return {
        icon: Car,
        badgeStyle: "bg-sky-50 text-sky-700 border-sky-200",
        iconStyle: "bg-sky-100 text-sky-700",
      };
    }
    return {
      icon: Shield,
      badgeStyle: "bg-purple-50 text-purple-700 border-purple-200",
      iconStyle: "bg-purple-100 text-purple-700",
    };
  };

  const config = getCategoryConfig(policy.category);
  const Icon = config.icon;
  const desc = policy.policy_description || {};
  const payment = policy.payment_details || {};

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* ── Top Navigation Bar ─────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#0B2545] font-semibold text-xs sm:text-sm border border-slate-200 shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Policies</span>
        </button>

        {policy.policy_pdf_url && (
          <a
            href={policy.policy_pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B2545] hover:bg-[#0E2F52] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Download Certificate</span>
          </a>
        )}
      </div>

      {/* ── Policy Hero Card ───────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className={`p-3.5 sm:p-4 rounded-2xl ${config.iconStyle} shrink-0 mt-0.5 shadow-2xs`}>
              <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border ${config.badgeStyle}`}>
                  {policy.category}
                </span>
                <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded">
                  {policy.sub_type}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-amber-50 text-amber-800 border border-amber-200"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
                    }`}
                  />
                  {policy.status}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-[#0B2545]">
                {policy.policy_name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>Insurer Partner: <strong className="text-slate-800">{desc.insurer || "TrustEdge Insurance"}</strong></span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 gap-1 shrink-0">
            <span className="text-xs text-slate-400 font-medium">Annual Premium</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0B2545]">
              ₹{policy.price}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium">Active Coverage Schedule</span>
          </div>
        </div>
      </div>

      {/* ── Section 1: Key Policy Schedule (Readable Card Grid) ────── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0B2545]" />
            <h2 className="text-base font-bold text-[#0B2545]">
              Policy Schedule & Validity
            </h2>
          </div>
          <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md font-medium">
            Registered Schedule
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm">
          {/* Issue Date */}
          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block font-medium">Effective Date</span>
            <span className="font-bold text-slate-800 mt-1 block font-mono">
              {policy.issue_date}
            </span>
          </div>

          {/* Expiry Date */}
          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block font-medium">Expiry Date</span>
            <span
              className={`font-bold mt-1 block font-mono ${
                isActive ? "text-slate-800" : "text-rose-600 font-extrabold"
              }`}
            >
              {policy.expiry_date}
            </span>
          </div>

          {/* Policy Tenure */}
          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block font-medium">Policy Tenure</span>
            <span className="font-semibold text-slate-800 mt-1 block">
              {desc.policy_tenure || desc.policy_term || "1 Year"}
            </span>
          </div>

          {/* Policy Holder */}
          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block font-medium">Policy Holder</span>
            <span className="font-semibold text-slate-800 mt-1 block truncate">
              {policy.customer_name}
            </span>
          </div>
        </div>
      </div>

      {/* ── Section 2: Coverage Particulars (Contextual by Insurance Type) ── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2F6F3E]" />
            <h2 className="text-base font-bold text-[#0B2545]">
              Coverage Particulars & Scope
            </h2>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            Verified Coverage
          </span>
        </div>

        {/* Health Insurance Specifics */}
        {desc.members && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
                <span className="text-xs text-emerald-800 font-semibold block">Total Sum Insured</span>
                <span className="text-base font-extrabold text-[#0B2545] mt-1 block">
                  {desc.coverage}
                </span>
              </div>
              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-500 font-medium block">Room Rent Limit</span>
                <span className="font-semibold text-slate-800 mt-1 block">
                  {desc.room_rent_limit}
                </span>
              </div>
              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-500 font-medium block">Copay Terms</span>
                <span className="font-semibold text-slate-800 mt-1 block">
                  {desc.copay}
                </span>
              </div>
            </div>

            {/* Covered Members List */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
                Covered Family Members ({desc.members.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {desc.members.map((member) => (
                  <div
                    key={member.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-[#0B2545] flex items-center justify-center font-bold text-xs shrink-0">
                      {member.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{member.name}</p>
                      <p className="text-[11px] text-slate-500">
                        {member.relation} • {member.age} yrs
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Motor Insurance Specifics */}
        {desc.vehicle_name && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 sm:col-span-2">
              <span className="text-xs text-slate-500 font-medium block">Vehicle Make & Model</span>
              <span className="font-bold text-slate-900 mt-1 block">
                {desc.vehicle_name}
              </span>
            </div>
            <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 font-medium block">Registration Number</span>
              <span className="font-mono font-bold text-slate-900 mt-1 block">
                {desc.vehicle_number}
              </span>
            </div>
            <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 font-medium block">Insured Declared Value (IDV)</span>
              <span className="font-bold text-[#0B2545] mt-1 block">
                {desc.idv}
              </span>
            </div>
            <div className="bg-sky-50/60 p-3 rounded-xl border border-sky-100 sm:col-span-2">
              <span className="text-xs text-sky-800 font-semibold block">Add-on Coverage</span>
              <span className="text-xs text-slate-800 mt-0.5 block">
                {desc.zero_dep} • {desc.roadside_assistance}
              </span>
            </div>
          </div>
        )}

        {/* Term Life Specifics */}
        {desc.sum_assured && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="bg-purple-50/60 p-3.5 rounded-xl border border-purple-100">
              <span className="text-xs text-purple-800 font-semibold block">Life Sum Assured</span>
              <span className="text-base font-extrabold text-[#0B2545] mt-1 block">
                {desc.sum_assured}
              </span>
            </div>
            <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 font-medium block">Nominee Details</span>
              <span className="font-bold text-slate-800 mt-1 block">
                {desc.nominee_name} ({desc.nominee_relation})
              </span>
            </div>
            <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 font-medium block">Policy Term</span>
              <span className="font-semibold text-slate-800 mt-1 block">
                {desc.policy_term}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── Section 3: Premium & Payment Receipt Details ────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#0B2545]" />
            <h2 className="text-base font-bold text-[#0B2545]">
              Payment & Transaction Receipt
            </h2>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            Payment Completed
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block font-medium">Payment Mode</span>
            <span className="font-bold text-slate-800 mt-1 block">
              {payment.payment_mode || "Online"}
            </span>
          </div>

          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block font-medium">Payment Status</span>
            <span className="font-bold text-emerald-700 mt-1 block">
              {payment.payment_status || "PAID"}
            </span>
          </div>

          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block font-medium">Transaction Date</span>
            <span className="font-mono text-slate-800 mt-1 block">
              {payment.transaction_date || policy.issue_date}
            </span>
          </div>

          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block font-medium">Transaction Reference</span>
            <span className="font-mono text-xs font-bold text-slate-700 mt-1 block truncate">
              {payment.transaction_id || "TXN-CONFIRMED"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Section 4: Advisor Assistance Banner ──────────────────── */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-[#0B2545] text-white shrink-0 mt-0.5">
            <PhoneCall className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0B2545]">
              Questions regarding this policy schedule?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5 max-w-xl leading-relaxed">
              Connect directly with your dedicated advisor Mr. Chaudhari for endorsements, tax certificates, or claims guidance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-center shrink-0 w-full sm:w-auto">
          <a
            href={`tel:${mockSupportInfo.phone1.replace(/[^0-9+]/g, "")}`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-[#0B2545] hover:bg-[#0E2F52] text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Advisor</span>
          </a>
          <a
            href={mockSupportInfo.whatsapp_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
