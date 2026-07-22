import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Mail, Phone, ExternalLink } from "lucide-react";
import WhatsAppIcon from "../../assets/WhatsappIcon";

export default function HelpCenterPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "How do I get an insurance quote?",
      a: "Simply click 'Get Quote' on our homepage, enter your vehicle details (Make, Model, Year, Registration Number), and receive an instant estimated premium from India's leading insurers."
    },
    {
      q: "How can I renew my policy?",
      a: "You can renew your existing vehicle insurance online through our portal. Simply enter your policy number or vehicle registration number, review details, and make the payment to instantly download your renewed policy doc."
    },
    {
      q: "What documents are required?",
      a: "For instant quotes and standard policy issuance, you generally need:\n• Vehicle Registration Certificate (RC)\n• Driving License details\n• Previous Insurance Policy details (if applicable)\n• Identity Proof (Pan Card / Aadhaar Card)"
    },
    {
      q: "What is Third-Party Insurance?",
      a: "Third-Party Insurance covers legal liabilities for bodily injury, death, or property damage caused to another person or vehicle. It does not cover damage to your own vehicle. It is mandatory under Indian Motor Vehicles Act."
    },
    {
      q: "What is Comprehensive Insurance?",
      a: "Comprehensive Insurance provides third-party liability coverage along with 'Own Damage' protection, securing your vehicle against accidents, theft, fire, floods, cyclones, and other natural disasters."
    },
    {
      q: "How can I contact support?",
      a: "Our helpdesk is active 24/7. You can contact us instantly via WhatsApp support, call our compliance desk, or write to our support email address."
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
            Support Desk
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Help Center
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We're here to help you with your vehicle insurance questions. Browse our frequently asked questions or contact our support team for further assistance.
          </p>
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-navy">Frequently Asked Questions</h2>
          <div className="mx-auto mt-2.5 h-1 w-12 rounded-full bg-gold" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-navy hover:text-gold transition-colors gap-4"
                >
                  <span className="text-sm sm:text-base flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-gold shrink-0" />
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-navy shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-60 border-t border-slate-100 p-5 bg-slate-50/50" : "max-h-0 overflow-hidden"
                  }`}
                >
                  <p className="text-slate-650 text-sm leading-relaxed whitespace-pre-line">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── STILL NEED HELP SECTION ─── */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-navy rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl text-center">
          {/* Background Gradient */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
          
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Still Need Help?</h3>
            <p className="text-slate-300 text-xs sm:text-sm mb-8 max-w-lg mx-auto">
              Can't find the answers you're looking for? Reach out to our dedicated support executives directly.
            </p>

            <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
              {/* Email Card */}
              <a
                href="mailto:trustedgeimf@gmail.com"
                className="flex flex-col items-center p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 rounded-2xl transition-all"
              >
                <div className="h-10 w-10 bg-gold/10 text-gold rounded-xl flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Email Us</p>
                <p className="text-xs font-semibold text-white break-all">trustedgeimf@gmail.com</p>
              </a>

              {/* Phone Card */}
              <a
                href="tel:+919773548537"
                className="flex flex-col items-center p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 rounded-2xl transition-all"
              >
                <div className="h-10 w-10 bg-[#2F6F3E]/20 text-[#5FA968] rounded-xl flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5" />
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Call Us</p>
                <p className="text-xs font-semibold text-white">+91 97735 48537</p>
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
