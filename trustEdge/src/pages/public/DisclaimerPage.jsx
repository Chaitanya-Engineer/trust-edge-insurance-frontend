import React, { useState, useEffect } from "react";
import { ShieldCheck, Calendar, ArrowRight, Info, AlertOctagon, Scale, ExternalLink } from "lucide-react";

export default function DisclaimerPage() {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "general", label: "1. General Information" },
    { id: "services", label: "2. Insurance Services" },
    { id: "quotes", label: "3. Quotes & Premiums" },
    { id: "advice", label: "4. No Advice Disclaimer" },
    { id: "third-party", label: "5. Third-Party Links" },
    { id: "liability", label: "6. Limitation of Liability" },
    { id: "intellectual-property", label: "7. Intellectual Property" },
    { id: "changes", label: "8. Changes to Disclaimer" },
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
            Legal Disclaimer
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Disclaimer Notice
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-350 text-xs sm:text-sm">
            <Calendar className="w-4 h-4 text-gold" />
            <span>Last Updated: July 2026</span>
            <span className="text-slate-500">•</span>
            <span className="text-green-light font-semibold">Important Information</span>
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
            
            {/* Opening Welcome Card */}
            <div className="flex gap-4 bg-slate-50 border border-slate-200/60 p-6 rounded-2xl">
              <Info className="w-6 h-6 text-gold shrink-0 mt-0.5" />
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Welcome to TrustEdge Insurance. By using this website, you acknowledge and agree to the following disclaimer.
              </p>
            </div>

            {/* 1. General Information */}
            <article id="general" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                1. General Information
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                The information provided on this website is for general informational purposes only. While we strive to keep the information accurate and up to date, we make no guarantees or warranties of any kind, express or implied, regarding its completeness, accuracy, suitability, or reliability.
              </p>
            </article>

            {/* 2. Insurance Services */}
            <article id="services" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                2. Insurance Services & Relationship
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
                TrustEdge Insurance provides professional assistance with vehicle insurance information, policy comparison, renewability, claim processing, and consultation support.
              </p>
              <div className="p-4.5 rounded-2xl bg-amber-50/40 border border-amber-200/50 text-[#C9A227] text-sm leading-relaxed font-semibold">
                ⚠️ Insurer Relationship Notice: The actual insurance policy contract is issued directly by the respective insurance provider. All policy terms, coverage details, exceptions, premiums, and claim settlement decisions are determined solely by the underwriting insurer, and not by TrustEdge.
              </div>
            </article>

            {/* 3. Quotes */}
            <article id="quotes" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                3. Premium Quotes & Estimates
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
                Any insurance premium, quotes, or quotation parameters displayed on this web portal are indicative estimates, subject to verification and modifications by the insurance providers.
              </p>
              <p className="text-slate-650 text-sm leading-normal mb-3">
                The final policy premium is calculated dynamically based on:
              </p>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {[
                  "Vehicle registration details",
                  "Customer demographics & age",
                  "Claims history & NCB status",
                  "Insurer inspection requirements",
                  "Carrier underwriting guidelines",
                  "Taxation and RTO factors"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-3 rounded-xl text-slate-700 font-semibold text-xs sm:text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </article>

            {/* 4. No Advice */}
            <article id="advice" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                4. No Financial or Legal Advice
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                The content and tools available on this website do not constitute formal financial, legal, or investment advice. Users are strongly encouraged to review the official policy documents, inclusions, exclusions, and booklets carefully before making any policy purchases.
              </p>
            </article>

            {/* 5. Third-Party Links */}
            <article id="third-party" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                5. Third-Party Websites & Integrations
              </h2>
              <div className="flex gap-4 border border-slate-100 p-5 rounded-2xl bg-slate-50/50">
                <ExternalLink className="w-6 h-6 text-[#2F6F3E] shrink-0 mt-0.5" />
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Our website may feature links connecting you to third-party domains, insurance company API routes, payment gateway screens, or external web tools. TrustEdge Insurance is not responsible for the content, privacy practices, terms, or services offered by these third parties.
                </p>
              </div>
            </article>

            {/* 6. Limitation of Liability */}
            <article id="liability" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
                To the maximum extent permitted by law, TrustEdge Insurance LLP shall not be liable for any direct, indirect, incidental, or consequential losses arising from the use of this website, including but not limited to:
              </p>
              <div className="space-y-3">
                {[
                  { title: "Insurer Claim Decisions", detail: "Claim rejections, delay in disbursements, or settlement deductions." },
                  { title: "Policy Issuance Delays", detail: "Delays in document generation caused by host server issues of carriers." },
                  { title: "Incorrect Information", detail: "Typos or incorrect vehicle details submitted in forms by users." },
                  { title: "Technical Interruptions", detail: "Unforeseen hosting down-time or payment gateway network disruptions." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 bg-red-50/40 border border-red-100/50 p-4 rounded-xl">
                    <AlertOctagon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-navy uppercase tracking-wide">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* 7. Intellectual Property */}
            <article id="intellectual-property" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                7. Intellectual Property
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                All website files, layout aesthetics, corporate logos, vector graphs, content paragraphs, and code structures are the property of TrustEdge Insurance LLP unless otherwise indicated, and unauthorized reproduction or distribution is strictly prohibited.
              </p>
            </article>

            {/* 8. Changes */}
            <article id="changes" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-b border-slate-100 pb-3 mb-4">
                8. Changes to This Disclaimer
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                TrustEdge Insurance reserves the right to revise or update this Disclaimer at any time without prior notifications. Users are encouraged to review this page periodically to remain informed about our legal and consultative boundaries.
              </p>
            </article>

          </div>

        </div>
      </section>
    </div>
  );
}
