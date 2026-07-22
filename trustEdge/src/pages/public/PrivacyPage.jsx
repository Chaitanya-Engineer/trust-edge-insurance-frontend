import React, { useState, useEffect } from "react";
import { ShieldCheck, Calendar, ArrowRight } from "lucide-react";

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "introduction", label: "1. Introduction" },
    { id: "information-collect", label: "2. Information We Collect" },
    { id: "use-information", label: "3. How We Use" },
    { id: "sharing-information", label: "4. Sharing of Info" },
    { id: "data-security", label: "5. Data Security" },
    { id: "cookies", label: "6. Cookies" },
    { id: "user-rights", label: "7. User Rights" },
    { id: "contact", label: "8. Contact Us" },
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
            Legal Policy
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-350 text-xs sm:text-sm">
            <Calendar className="w-4 h-4 text-gold" />
            <span>Last Updated: July 2026</span>
            <span className="text-slate-500">•</span>
            <span className="text-green-light font-semibold">Official Document</span>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT CONTAINER ─── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sticky Sidebar Navigation (Desktop) */}
          <aside className="w-full md:w-64 shrink-0 hidden md:block sticky top-24 self-start bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
            <h3 className="text-xs font-bold text-navy uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold" />
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
            
            {/* 1. Introduction */}
            <article id="introduction" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                1. Introduction
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Welcome to TrustEdge Insurance. We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, share, and protect your information when you visit our website or use our services.
              </p>
            </article>

            {/* 2. Information We Collect */}
            <article id="information-collect" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                2. Information We Collect
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
                We collect personal information necessary to offer, issue, and manage vehicle insurance coverages. This includes:
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Full Name",
                  "Mobile Number",
                  "Email Address",
                  "Vehicle Registration Number",
                  "Vehicle Details (Make, Model, Year)",
                  "Address",
                  "Policy Details",
                  "Payment Information (securely via 3rd party providers)"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-slate-700 font-semibold text-xs sm:text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </article>

            {/* 3. How We Use Your Information */}
            <article id="use-information" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
                Your personal details are processed strictly for business purposes and service fulfillment:
              </p>
              <ul className="space-y-3.5">
                {[
                  "Generate accurate insurance quotations from our panel of carriers",
                  "Process policy purchases, endorsements, and renewals securely",
                  "Contact you regarding policy expirations, alerts, and customer services",
                  "Provide claims support and act as your intermediary with insurers",
                  "Improve and optimize our web applications and advisory services",
                  "Comply with legal, regulatory, and IRDAI compliance guidelines"
                ].map((use, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-navy/5 text-navy font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    {use}
                  </li>
                ))}
              </ul>
            </article>

            {/* 4. Sharing of Information */}
            <article id="sharing-information" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                4. Sharing of Information
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
                To issue and maintain policies, we share necessary user information with:
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Insurers and Underwriting companies",
                  "Direct Insurance Partners",
                  "Payment gateway API providers",
                  "Government authorities when legally required"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-slate-700 font-semibold text-xs sm:text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F6F3E] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-[#2F6F3E] text-xs sm:text-sm font-bold bg-[#2F6F3E]/5 border border-[#2F6F3E]/10 p-4 rounded-xl mt-4">
                🛡️ Zero-Spam Policy: We do not sell, rent, or trade your personal information to third parties.
              </p>
            </article>

            {/* 5. Data Security */}
            <article id="data-security" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                5. Data Security
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                We deploy industry-standard technical, physical, and administrative protocols (including HTTPS encryption, access controls, and audited cloud storage) to guard all client data against unauthorized access, alterations, or disclosures.
              </p>
            </article>

            {/* 6. Cookies */}
            <article id="cookies" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                6. Cookies
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
                Our web assets utilize cookies to enhance user experience, remember selected search parameters, and analyze general site traffic:
              </p>
              <ul className="space-y-3 pl-1">
                {[
                  "Improve web performance and page loads",
                  "Remember your search filters and active insurance category",
                  "Track anonymous analytics for traffic improvements"
                ].map((c, i) => (
                  <li key={i} className="text-slate-600 text-sm leading-relaxed flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </article>

            {/* 7. User Rights */}
            <article id="user-rights" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                7. User Rights
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
                You retain complete rights over your shared insurance information, subject to regulatory storage requirements:
              </p>
              <ul className="space-y-3.5">
                {[
                  "Request access to your personal files and active quotations",
                  "Request correction of outdated or inaccurate data records",
                  "Request deletion of inactive quote queries where applicable"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-slate-600 text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F6F3E] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            {/* 8. Contact */}
            <article id="contact" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                8. Contact Information
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                For questions regarding this policy or to request data corrections, contact our compliance desk:
              </p>
              <div className="text-slate-700 font-semibold mt-4 space-y-2">
                <p className="text-xs sm:text-base">
                  Email: <a href="mailto:trustedgeimf@gmail.com" className="text-navy hover:text-gold font-bold transition-colors text-xs sm:text-base">trustedgeimf@gmail.com</a>
                </p>
                <p className="text-xs sm:text-base">
                  Phone: <a href="tel:+919773548537" className="text-navy hover:text-gold font-bold transition-colors text-xs sm:text-base">+91 97735 48537</a>
                </p>
              </div>
            </article>

          </div>

        </div>
      </section>
    </div>
  );
}
