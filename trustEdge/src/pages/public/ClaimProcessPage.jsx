import React from "react";
import { Calendar, Phone, Mail, FileText, CheckCircle2, ArrowDown, ChevronDown, Check } from "lucide-react";
import WhatsAppIcon from "../../assets/WhatsappIcon";

export default function ClaimProcessPage() {
  const steps = [
    {
      step: 1,
      title: "Report Accident",
      desc: "Inform us immediately after the accident, collision, theft, or vehicle damage occurs.",
      detail: "Prompt notification helps speed up insurance coordinate lines with partner networks."
    },
    {
      step: 2,
      title: "Register Claim",
      desc: "Call our customer support team or fill out our instant online claim registration form.",
      detail: "Our claims advisors will generate a unique claim tracking reference number for you."
    },
    {
      step: 3,
      title: "Submit Documents",
      desc: "Submit digital copies of necessary documentation to initiate surveyor assignment:",
      docs: [
        "Policy copy / certificate",
        "Registration Certificate (RC Book)",
        "Driver's License copy",
        "FIR copy (in case of theft or third-party injury)",
        "Clear photographs of vehicle damage"
      ]
    },
    {
      step: 4,
      title: "Vehicle Inspection",
      desc: "An authorized surveyor from the insurance provider will inspect the vehicle damage.",
      detail: "Inspection takes place at a garage or the accident spot, depending on towing conditions."
    },
    {
      step: 5,
      title: "Claim Approval",
      desc: "After verification, your claim status is reviewed and approved based on policy conditions.",
      detail: "The surveyor's final assessment report is sent directly to the insurer for approval."
    },
    {
      step: 6,
      title: "Repair & Settlement",
      desc: "Repairs are completed at an authorized cashless garage network, or settled via reimbursement.",
      detail: "For cashless repairs, the insurer settles payments directly with the garage, minus deductibles."
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      {/* ─── HERO HEADER ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-[#0A2540] to-navy-dark py-16 px-6 text-white text-center">
        {/* Background Rings */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full border border-gold/10" />
        <div className="pointer-events-none absolute bottom-[-40px] right-[-40px] h-48 w-48 rounded-full border border-green-brand/20" />
        
        <div className="relative z-10 mx-auto max-w-4xl">
          <span className="inline-block rounded-full border border-gold/40 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-light mb-4">
            Assistance Guide
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Claim Process
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We make the claim process simple and hassle-free. Follow these steps to register your claim and get back on the road.
          </p>
        </div>
      </section>

      {/* ─── TIMELINE SECTION ─── */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <h2 className="text-2xl font-bold text-navy">Step-by-Step Claim Flow</h2>
          <div className="mx-auto mt-2.5 h-1 w-12 rounded-full bg-gold" />
        </div>

        {/* Timeline Path container */}
        <div className="relative border-l-2 border-slate-200/80 ml-4 md:ml-8 space-y-12 pb-4">
          {steps.map((step) => (
            <div key={step.step} className="relative pl-8 md:pl-10 group">
              
              {/* Chronological Circle Indicator with Dual Glow */}
              <div className="absolute left-[-17px] top-1.5 h-8 w-8 rounded-full bg-navy text-gold border-2 border-white flex items-center justify-center font-bold text-xs shadow-md transition-all group-hover:scale-110 group-hover:border-gold">
                {step.step}
              </div>

              {/* Step Card */}
              <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-gold uppercase tracking-wider">Step 0{step.step}</span>
                  <span className="text-xs font-semibold text-slate-400">Claim Flow</span>
                </div>
                
                <h3 className="text-lg font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-sm text-slate-650 leading-relaxed mb-3">{step.desc}</p>
                
                {step.detail && (
                  <p className="text-xs text-slate-400 italic font-medium">{step.detail}</p>
                )}

                {step.docs && (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {step.docs.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-2.5 rounded-lg text-xs text-slate-700 font-semibold">
                        <Check className="w-3.5 h-3.5 text-[#2F6F3E] shrink-0" />
                        {doc}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Connecting Downwards Arrow (Hidden on last step) */}
              {step.step < steps.length && (
                <div className="absolute left-[-9px] bottom-[-32px] text-slate-300">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── CONTACT SECTION ─── */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-navy rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl text-center">
          {/* Background Gradient */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
          
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Need Immediate Claims Help?</h3>
            <p className="text-slate-300 text-xs sm:text-sm mb-8 max-w-lg mx-auto">
              Our support desk coordinates directly with surveyors and garages to expedite approvals.
            </p>

            <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
              {/* Phone Card */}
              <a
                href="tel:+919773548537"
                className="flex flex-col items-center p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 rounded-2xl transition-all"
              >
                <div className="h-10 w-10 bg-gold/10 text-gold rounded-xl flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5" />
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Call Claims</p>
                <p className="text-xs font-semibold text-white">+91 97735 48537</p>
              </a>

              {/* Email Card */}
              <a
                href="mailto:trustedgeimf@gmail.com"
                className="flex flex-col items-center p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 rounded-2xl transition-all"
              >
                <div className="h-10 w-10 bg-[#2F6F3E]/20 text-[#5FA968] rounded-xl flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Email Desk</p>
                <p className="text-xs font-semibold text-white break-all">trustedgeimf@gmail.com</p>
              </a>

              {/* WhatsApp Card */}
              <a
                href="https://wa.me/919773548537"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 rounded-2xl transition-all"
              >
                <div className="h-10 w-10 bg-[#20ba5a]/10 text-[#20ba5a] rounded-xl flex items-center justify-center mb-3">
                  <WhatsAppIcon />
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">WhatsApp</p>
                <p className="text-xs font-semibold text-white">Live Support</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
