import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PhoneCall,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { mockSupportInfo } from "./constant";
import { useCustomer } from "./CustomerContext";
import CustomerAuthGuard from "./CustomerAuthGuard";

function SupportContent() {
  const { customerProfile } = useCustomer();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* ── Page Header (Clean, Authentic, No AI Gimmicks) ───────── */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight">
          Help & Support
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Direct assistance for policy claims, renewals, and customer advisory.
        </p>
      </div>

      {/* ── Dedicated Advisor Card (Sleek Executive Presentation) ─── */}
      <div className="bg-[#0B2545] text-white rounded-2xl p-4 sm:p-7 shadow-sm border border-[#0E2F52]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          {/* Advisor Identity */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 text-white font-bold text-base flex items-center justify-center shrink-0 border border-white/20">
              MC
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  {mockSupportInfo.advisor.name}
                </h2>
                <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                  Active Advisor
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {mockSupportInfo.advisor.designation} • TrustEdge
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Mon - Sat, {mockSupportInfo.advisor.available_hours} IST
              </p>
            </div>
          </div>

          {/* Direct Actions */}
          <div className="flex items-center gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
            <a
              href={`tel:${mockSupportInfo.advisor.phone.replace(/[^0-9+]/g, "")}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B2545] font-bold text-xs sm:text-sm transition-colors shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-[#0B2545]" />
              <span>Call Advisor</span>
            </a>
            <a
              href={mockSupportInfo.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="mt-4 pt-3.5 border-t border-white/10 text-xs text-slate-300 leading-relaxed">
          Assigned to manage policy renewals, endorsements, claims coordination, and coverage questions for {customerProfile?.name || "your account"}.
        </div>
      </div>

      {/* ── Support Channels Grid ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Phone 1 */}
        <a
          href={`tel:${mockSupportInfo.phone1.replace(/[^0-9+]/g, "")}`}
          className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2 hover:border-[#0B2545] transition-colors block"
        >
          <div className="p-2.5 rounded-xl bg-slate-100 text-[#0B2545] w-fit group-hover:bg-[#0B2545] group-hover:text-white transition-colors">
            <PhoneCall className="w-4 h-4" />
          </div>
          <span className="text-xs text-slate-500 font-medium block">
            Phone 1
          </span>
          <p className="text-base font-bold text-[#0B2545] font-mono group-hover:text-[#2F6F3E] transition-colors">
            {mockSupportInfo.phone1}
          </p>
          <p className="text-xs text-slate-400">Direct Support & Inquiries</p>
        </a>

        {/* Phone 2 */}
        <a
          href={`tel:${mockSupportInfo.phone2.replace(/[^0-9+]/g, "")}`}
          className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2 hover:border-[#0B2545] transition-colors block"
        >
          <div className="p-2.5 rounded-xl bg-slate-100 text-[#0B2545] w-fit group-hover:bg-[#0B2545] group-hover:text-white transition-colors">
            <PhoneCall className="w-4 h-4" />
          </div>
          <span className="text-xs text-slate-500 font-medium block">
            Phone 2
          </span>
          <p className="text-base font-bold text-[#0B2545] font-mono group-hover:text-[#2F6F3E] transition-colors">
            {mockSupportInfo.phone2}
          </p>
          <p className="text-xs text-slate-400">Customer Helpline & Advisory</p>
        </a>

        {/* Customer Care & Claims Email */}
        <a
          href={`mailto:${mockSupportInfo.email}`}
          className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2 hover:border-[#0B2545] transition-colors block"
        >
          <div className="p-2.5 rounded-xl bg-slate-100 text-indigo-700 w-fit group-hover:bg-[#0B2545] group-hover:text-white transition-colors">
            <Mail className="w-4 h-4" />
          </div>
          <span className="text-xs text-slate-500 font-medium block">
            Official Email Support
          </span>
          <p className="text-xs sm:text-sm font-bold text-slate-900 break-all font-mono group-hover:text-[#0B2545] transition-colors">
            {mockSupportInfo.email}
          </p>
          <p className="text-xs text-slate-400">Claims, policies & helpdesk</p>
        </a>

        {/* Emergency WhatsApp */}
        <a
          href={mockSupportInfo.whatsapp_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2 hover:border-emerald-500 transition-colors block"
        >
          <div className="p-2.5 rounded-xl bg-slate-100 text-[#25D366] w-fit group-hover:bg-[#25D366] group-hover:text-white transition-colors">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span className="text-xs text-slate-500 font-medium block">
            WhatsApp Support
          </span>
          <p className="text-base font-bold text-slate-900 font-mono group-hover:text-[#2F6F3E] transition-colors">
            {mockSupportInfo.whatsapp_number}
          </p>
          <p className="text-xs text-slate-400">Direct chat support</p>
        </a>
      </div>

      {/* ── Claims Guidance Card ──────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-[#0B2545]">
            Claim Assistance Process
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Step-by-step guidance for cashless hospitalizations and vehicle accident claims
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1 text-xs">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-1.5">
            <span className="w-6 h-6 rounded-md bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs">
              1
            </span>
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
              Intimate Claim Early
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Inform TrustEdge within 24 hours of hospitalization or vehicle damage.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-1.5">
            <span className="w-6 h-6 rounded-md bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs">
              2
            </span>
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
              Present Policy ID
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Provide your Policy ID at the network hospital desk or authorized workshop.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-1.5">
            <span className="w-6 h-6 rounded-md bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs">
              3
            </span>
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
              Advisor Follow-up
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Your advisor coordinates directly with the insurer TPA for pre-authorization.
            </p>
          </div>
        </div>
      </div>

      {/* ── Frequently Asked Questions ────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-[#0B2545]">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Quick answers to common policy inquiries</p>
        </div>

        <div className="space-y-2.5 pt-1">
          {mockSupportInfo.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.question}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-4 py-3 bg-white hover:bg-slate-50 flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-800 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-3.5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Office Location & Hours ───────────────────────────────── */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[#0B2545]">
            <MapPin className="w-4 h-4 text-[#2F6F3E]" />
            <span>TrustEdge Insurance Advisory</span>
          </div>
          <p className="max-w-md text-slate-500">{mockSupportInfo.office_address}</p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-slate-500">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>{mockSupportInfo.office_hours}</span>
        </div>
      </div>
    </div>
  );
}

export default function CustomerSupportPage() {
  return (
    <CustomerAuthGuard>
      <SupportContent />
    </CustomerAuthGuard>
  );
}
