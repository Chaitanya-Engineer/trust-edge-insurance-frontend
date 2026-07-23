import React, { useState, useEffect } from "react";
import { ShieldCheck, Calendar, ArrowRight, Gavel, Scale, AlertTriangle, ExternalLink } from "lucide-react";

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "acceptance", label: "1. Acceptance" },
    { id: "services", label: "2. Our Services" },
    { id: "responsibilities", label: "3. User Responsibilities" },
    { id: "policies", label: "4. Insurance Policies" },
    { id: "quotes", label: "5. Quotes & Estimates" },
    { id: "intellectual-property", label: "6. Intellectual Property" },
    { id: "liability", label: "7. Limitation of Liability" },
    { id: "third-party", label: "8. Third-Party Links" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      {/* ─── HERO HEADER ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-[#0A2540] to-navy-dark py-16 px-6 text-white text-center">
        {/* Background Rings */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full border border-gold/10" />
        <div className="pointer-events-none absolute bottom-[-40px] right-[-40px] h-48 w-48 rounded-full border border-green-brand/20" />
        
        <div className="relative z-10 mx-auto max-w-4xl">
          <span className="inline-block rounded-full border border-gold/40 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-light mb-4">
            Legal Terms
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Terms & Conditions
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-350 text-xs sm:text-sm">
            <Calendar className="w-4 h-4 text-gold" />
            <span>Last Updated: July 2026</span>
            <span className="text-slate-500">•</span>
            <span className="text-green-light font-semibold">User Agreement</span>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT CONTAINER ─── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sticky Sidebar Navigation (Desktop) */}
          <aside className="w-full md:w-64 shrink-0 hidden md:block sticky top-24 self-start bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
            <h3 className="text-xs font-bold text-navy uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Scale className="w-4 h-4 text-gold" />
              Document Sections
            </h3>
            <nav className="space-y-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-between ${
                    activeSection === sec.id
                      ? "bg-navy text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-navy"
                  }`}
                >
                  <span>{sec.label}</span>
                  <ArrowRight className={`w-3.5 h-3.5 opacity-0 transition-opacity ${activeSection === sec.id ? "opacity-100 text-gold" : ""}`} />
                </button>
              ))}
            </nav>
          </aside>

          {/* Document Content */}
          <div className="flex-1 bg-white border border-slate-200/80 p-8 sm:p-12 rounded-3xl shadow-sm space-y-12">
            
            {/* 1. Acceptance */}
            <article id="acceptance" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                1. Acceptance of Terms
              </h2>
              <div className="flex gap-4 bg-slate-50 border border-slate-200/60 p-5 rounded-2xl">
                <Gavel className="w-6 h-6 text-gold shrink-0 mt-0.5" />
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  By accessing, browsing, or using this website, you explicitly agree to comply with and be bound by these Terms & Conditions. If you do not agree to all terms specified herein, you must immediately cease usage of this site.
                </p>
              </div>
            </article>

            {/* 2. Our Services */}
            <article id="services" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                2. Services Provided
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
                TrustEdge Insurance serves as an insurance intermediary assisting users in:
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Vehicle Insurance Quotes comparison",
                  "New Policy Purchase generation",
                  "Hassle-free Policy Renewals",
                  "Claims Assistance representation",
                  "Expert Insurance Consultation & support"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-slate-700 font-semibold text-xs sm:text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </article>

            {/* 3. User Responsibilities */}
            <article id="responsibilities" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                3. User Responsibilities
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
                Users accessing our forms or advisory tools must adhere to the following:
              </p>
              <ul className="space-y-3.5">
                {[
                  "Provide completely accurate and truthful vehicle and registration information.",
                  "Use the website and consultation channels strictly in compliance with applicable law.",
                  "Maintain confidential credentials if accessing user dashboards or portal links."
                ].map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-navy/5 text-navy font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    {resp}
                  </li>
                ))}
              </ul>
            </article>

            {/* 4. Insurance Policies */}
            <article id="policies" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                4. Insurance Policies & Premiums
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F6F3E] shrink-0 mt-2" />
                  <span>Premiums displayed on the site are calculated and determined strictly by the respective underwriting insurance companies, not by TrustEdge.</span>
                </li>
                <li className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F6F3E] shrink-0 mt-2" />
                  <span>Actual coverage benefits, inclusions, and exclusions depend entirely on the insurer's policy wording documents.</span>
                </li>
                <li className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F6F3E] shrink-0 mt-2" />
                  <span>Policy approval, instant issuance, active renewal, and eventual claims settlement are subject exclusively to the terms of the underwriting insurer.</span>
                </li>
              </ul>
            </article>

            {/* 5. Quotes & Estimates */}
            <article id="quotes" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                5. Quotes & Estimates Disclaimer
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
                Quotations displayed on this portal:
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { title: "Are Estimates", desc: "Based on user inputs, subject to insurer verification." },
                  { title: "Subject to Change", desc: "Quotes can change after document reviews or inspections." },
                  { title: "No Guarantee", desc: "Receiving a quote does not guarantee final policy issuance." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-150 p-4.5 rounded-xl">
                    <p className="text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">{item.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* 6. Intellectual Property */}
            <article id="intellectual-property" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                6. Intellectual Property
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                All website text, logos, icons, vector graphics, code bases, layouts, and brand designs are the exclusive property of TrustEdge Insurance LLP unless otherwise explicitly specified, and are protected by applicable intellectual property statutes.
              </p>
            </article>

            {/* 7. Limitation of Liability */}
            <article id="liability" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
                To the maximum extent permitted by law, TrustEdge Insurance LLP shall not be held liable for:
              </p>
              <div className="space-y-3">
                {[
                  { type: "Insurer Delays", detail: "Delays or administrative backlogs caused by underwriting insurance companies." },
                  { type: "Claim Decisions", detail: "Claim rejections, deductions, or disputes governed by the insurer." },
                  { type: "User Errors", detail: "Inaccurate, fraudulent, or typo-ridden information provided by users." },
                  { type: "Service Outages", detail: "Temporary technical interruptions, host server down times, or connection losses." }
                ].map((liab, idx) => (
                  <div key={idx} className="flex gap-3 bg-red-50/40 border border-red-100/50 p-4 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-navy uppercase tracking-wide">{liab.type}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{liab.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* 8. Third-Party Links */}
            <article id="third-party" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                8. Third-Party Links
              </h2>
              <div className="flex gap-4 border border-slate-100 p-5 rounded-2xl bg-slate-50/50">
                <ExternalLink className="w-6 h-6 text-[#2F6F3E] shrink-0 mt-0.5" />
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Our website may contain hyperlinks directing you to third-party web portals or payment gateway checkouts. We maintain no authority over, and assume no responsibility for, the content, privacy structures, or terms of service of third-party domains.
                </p>
              </div>
            </article>

          </div>

        </div>
      </section>
    </div>
  );
}
