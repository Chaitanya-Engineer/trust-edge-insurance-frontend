import React, { useState } from "react";
import {
  Car,
  Truck,
  Bike,
  Shield,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Phone,
  Zap,
  Star,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  Flame,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const vehicleCategories = [
  { id: "car", label: "Private Car", icon: Car },
  { id: "commercial", label: "Commercial Vehicle", icon: Truck },
  { id: "bike", label: "Two-Wheeler", icon: Bike },
];

const plans = {
  car: [
    {
      id: "third-party-car",
      name: "Third Party",
      badge: null,
      tagline: "Mandatory by law. Basic protection.",
      img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
      price: "₹2,094",
      period: "/ year onwards",
      highlight: false,
      features: [
        { label: "Third-party bodily injury cover", included: true },
        { label: "Third-party property damage up to ₹7.5L", included: true },
        { label: "Personal accident cover (owner-driver)", included: true },
        { label: "Own damage cover", included: false },
        { label: "Theft / total loss cover", included: false },
        { label: "Zero depreciation add-on", included: false },
        { label: "Engine protection", included: false },
        { label: "Roadside assistance", included: false },
      ],
      cta: "Get Third Party Quote",
    },
    {
      id: "comprehensive-car",
      name: "Comprehensive",
      badge: "Most Popular",
      tagline: "Complete protection — own damage + third party.",
      img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
      price: "₹6,500",
      period: "/ year onwards",
      highlight: true,
      features: [
        { label: "Third-party bodily injury cover", included: true },
        { label: "Third-party property damage up to ₹7.5L", included: true },
        { label: "Personal accident cover (owner-driver)", included: true },
        { label: "Own damage cover", included: true },
        { label: "Theft / total loss cover", included: true },
        { label: "Zero depreciation add-on", included: true },
        { label: "Engine protection", included: false },
        { label: "Roadside assistance", included: false },
      ],
      cta: "Get Comprehensive Quote",
    },
    {
      id: "bundled-car",
      name: "Bundled Cover",
      badge: "Best Value",
      tagline: "Max cover with all premium add-ons included.",
      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
      price: "₹9,800",
      period: "/ year onwards",
      highlight: false,
      features: [
        { label: "Third-party bodily injury cover", included: true },
        { label: "Third-party property damage up to ₹7.5L", included: true },
        { label: "Personal accident cover (owner-driver)", included: true },
        { label: "Own damage cover", included: true },
        { label: "Theft / total loss cover", included: true },
        { label: "Zero depreciation add-on", included: true },
        { label: "Engine protection", included: true },
        { label: "Roadside assistance", included: true },
      ],
      cta: "Get Bundled Quote",
    },
  ],
  commercial: [
    {
      id: "tp-commercial",
      name: "Third Party",
      badge: null,
      tagline: "Legally required cover for all commercial vehicles.",
      img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80",
      price: "₹5,500",
      period: "/ year onwards",
      highlight: false,
      features: [
        { label: "Third-party liability cover", included: true },
        { label: "Public liability cover", included: true },
        { label: "Personal accident (owner-driver)", included: true },
        { label: "Own damage cover", included: false },
        { label: "Goods in transit cover", included: false },
        { label: "Driver & conductor PA cover", included: false },
        { label: "Fleet discount", included: false },
        { label: "Breakdown assistance", included: false },
      ],
      cta: "Get TP Quote",
    },
    {
      id: "comp-commercial",
      name: "Comprehensive",
      badge: "Most Popular",
      tagline: "Full protection for trucks, tempos & buses.",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
      price: "₹14,000",
      period: "/ year onwards",
      highlight: true,
      features: [
        { label: "Third-party liability cover", included: true },
        { label: "Public liability cover", included: true },
        { label: "Personal accident (owner-driver)", included: true },
        { label: "Own damage cover", included: true },
        { label: "Goods in transit cover", included: true },
        { label: "Driver & conductor PA cover", included: true },
        { label: "Fleet discount", included: false },
        { label: "Breakdown assistance", included: false },
      ],
      cta: "Get Comprehensive Quote",
    },
    {
      id: "fleet-commercial",
      name: "Fleet Cover",
      badge: "Best for Business",
      tagline: "Manage multiple vehicles under one policy.",
      img: "https://images.unsplash.com/photo-1519003300449-424ad0405076?w=600&q=80",
      price: "Custom",
      period: "based on fleet size",
      highlight: false,
      features: [
        { label: "Third-party liability cover", included: true },
        { label: "Public liability cover", included: true },
        { label: "Personal accident (owner-driver)", included: true },
        { label: "Own damage cover", included: true },
        { label: "Goods in transit cover", included: true },
        { label: "Driver & conductor PA cover", included: true },
        { label: "Fleet discount up to 35%", included: true },
        { label: "Breakdown assistance", included: true },
      ],
      cta: "Talk to an Advisor",
    },
  ],
  bike: [
    {
      id: "tp-bike",
      name: "Third Party",
      badge: null,
      tagline: "Minimum legal cover for two-wheelers.",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      price: "₹714",
      period: "/ year onwards",
      highlight: false,
      features: [
        { label: "Third-party injury cover", included: true },
        { label: "Third-party property damage", included: true },
        { label: "Personal accident (rider)", included: true },
        { label: "Own damage cover", included: false },
        { label: "Theft protection", included: false },
        { label: "Zero depreciation", included: false },
        { label: "Pillion rider PA cover", included: false },
        { label: "Roadside assistance", included: false },
      ],
      cta: "Get TP Quote",
    },
    {
      id: "comp-bike",
      name: "Comprehensive",
      badge: "Most Popular",
      tagline: "Best all-round protection for your bike.",
      img: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80",
      price: "₹2,500",
      period: "/ year onwards",
      highlight: true,
      features: [
        { label: "Third-party injury cover", included: true },
        { label: "Third-party property damage", included: true },
        { label: "Personal accident (rider)", included: true },
        { label: "Own damage cover", included: true },
        { label: "Theft protection", included: true },
        { label: "Zero depreciation", included: true },
        { label: "Pillion rider PA cover", included: false },
        { label: "Roadside assistance", included: false },
      ],
      cta: "Get Comprehensive Quote",
    },
    {
      id: "super-bike",
      name: "Super Cover",
      badge: "Full Protection",
      tagline: "Everything included — zero worries on the road.",
      img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80",
      price: "₹4,200",
      period: "/ year onwards",
      highlight: false,
      features: [
        { label: "Third-party injury cover", included: true },
        { label: "Third-party property damage", included: true },
        { label: "Personal accident (rider)", included: true },
        { label: "Own damage cover", included: true },
        { label: "Theft protection", included: true },
        { label: "Zero depreciation", included: true },
        { label: "Pillion rider PA cover", included: true },
        { label: "Roadside assistance", included: true },
      ],
      cta: "Get Super Cover Quote",
    },
  ],
};

const addOns = [
  {
    icon: Shield,
    title: "Zero Depreciation",
    desc: "Get full claim amount without any depreciation deduction on parts.",
    price: "₹800 onwards",
    img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&q=80",
  },
  {
    icon: Zap,
    title: "Engine Protection",
    desc: "Covers engine and gearbox damage due to water ingression or lubricant leakage.",
    price: "₹600 onwards",
    img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80",
  },
  {
    icon: HeartHandshake,
    title: "Roadside Assistance",
    desc: "24/7 help for breakdowns, flat tyres, fuel delivery, and towing anywhere in India.",
    price: "₹400 onwards",
    img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80",
  },
  {
    icon: BadgeCheck,
    title: "Return to Invoice",
    desc: "In case of total loss or theft, get the full original invoice value of your vehicle.",
    price: "₹1,000 onwards",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
  },
];

const faqs = [
  {
    q: "What is the difference between Third Party and Comprehensive insurance?",
    a: "Third Party covers damage or injury you cause to others — it is mandatory by law. Comprehensive additionally covers damage to your own vehicle due to accidents, theft, natural disasters, and more.",
  },
  {
    q: "How do I renew my existing insurance through TrustEdge?",
    a: "Simply call us on +91 97735 48537 or WhatsApp us with your existing policy number. We will compare renewal quotes from all our 6 partner insurers and get you the best price within minutes.",
  },
  {
    q: "Is zero depreciation worth it?",
    a: "Yes — especially for newer vehicles (under 5 years). Without zero-dep, you get only 50–70% of the claim amount due to depreciation deductions. With zero-dep, you get 100% of repair costs paid.",
  },
  {
    q: "How long does it take to get a policy?",
    a: "For renewals and standard cases, the policy is issued within minutes after payment. For new vehicles or commercial vehicles, it typically takes 2–4 hours.",
  },
  {
    q: "Do you assist with claims?",
    a: "Yes — this is one of our key services. We coordinate with the insurer, surveyor, and garage on your behalf so you don't have to deal with paperwork or follow-ups alone.",
  },
];

/* ─────────────────────────────────────────────
   PLAN CARD
───────────────────────────────────────────── */
const PlanCard = ({ plan }) => (
  <div
    className={`group relative flex flex-col rounded-3xl overflow-hidden shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
      plan.highlight
        ? "border-2 border-gold"
        : "border border-slate-200"
    }`}
  >
    {/* Badge */}
    {plan.badge && (
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy shadow">
        {plan.badge === "Most Popular" && <Flame className="w-3 h-3" />}
        {plan.badge === "Best Value" && <Star className="w-3 h-3" />}
        {plan.badge === "Best for Business" && <BadgeCheck className="w-3 h-3" />}
        {plan.badge === "Full Protection" && <Shield className="w-3 h-3" />}
        {plan.badge}
      </div>
    )}

    {/* Image */}
    <div className="relative h-44 overflow-hidden">
      <img
        src={plan.img}
        alt={plan.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div
        className={`absolute inset-0 ${
          plan.highlight
            ? "bg-gradient-to-t from-navy/90 to-navy/20"
            : "bg-gradient-to-t from-navy/80 to-navy/10"
        }`}
      />
      <div className="absolute bottom-4 left-5">
        <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
        <p className="text-xs text-slate-300 mt-0.5">{plan.tagline}</p>
      </div>
    </div>

    {/* Body */}
    <div
      className={`flex flex-col flex-1 p-6 ${
        plan.highlight ? "bg-navy text-white" : "bg-white"
      }`}
    >
      {/* Price */}
      <div className="mb-5 pb-5 border-b border-white/10">
        <span
          className={`text-3xl font-extrabold ${
            plan.highlight ? "text-gold" : "text-navy"
          }`}
        >
          {plan.price}
        </span>
        <span
          className={`text-sm ml-1 ${
            plan.highlight ? "text-slate-300" : "text-slate-400"
          }`}
        >
          {plan.period}
        </span>
      </div>

      {/* Features */}
      <ul className="space-y-2.5 flex-1 mb-6">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            {f.included ? (
              <CheckCircle2
                className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                  plan.highlight ? "text-green-light" : "text-green-brand"
                }`}
              />
            ) : (
              <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-300" />
            )}
            <span
              className={
                f.included
                  ? plan.highlight
                    ? "text-slate-200"
                    : "text-slate-700"
                  : "text-slate-300 line-through"
              }
            >
              {f.label}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="tel:+919773548537"
        className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
          plan.highlight
            ? "bg-gold hover:bg-gold-light text-navy"
            : "bg-navy hover:bg-navy-light text-white"
        }`}
      >
        {plan.cta}
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   FAQ ITEM
───────────────────────────────────────────── */
const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="text-sm font-semibold text-navy">{q}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-gold flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
          {a}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const PlansPage = () => {
  const [activeCategory, setActiveCategory] = useState("car");

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy-dark py-20 px-6 text-white text-center">
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full border border-gold/15" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-52 w-52 rounded-full border border-green-brand/20" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-gold/50 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-light mb-5">
            Our Insurance Plans
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
            The Right Cover for{" "}
            <span className="text-gold">Every Vehicle</span>
          </h1>
          <p className="text-lg text-slate-200 leading-relaxed max-w-xl mx-auto mb-8">
            Compare plans across 6 leading insurers. Transparent pricing, no
            hidden charges, and expert guidance at every step.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300">
            {["No Hidden Charges", "Instant Policy", "Claim Support Included"].map(
              (t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-light" />
                  {t}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── CATEGORY TABS ── */}
      <section className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex overflow-x-auto">
            {vehicleCategories.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-all duration-300 whitespace-nowrap ${
                  activeCategory === id
                    ? "border-gold text-navy"
                    : "border-transparent text-slate-400 hover:text-navy"
                }`}
              >
                <Icon className={`w-4 h-4 ${activeCategory === id ? "text-gold" : ""}`} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLAN CARDS ── */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            {plans[activeCategory].map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          {/* Disclaimer */}
          <p className="mt-8 text-center text-xs text-slate-400">
            * Prices are indicative and vary based on vehicle age, model, IDV,
            and insurer. Contact us for an exact quote.
          </p>
        </div>
      </section>

      {/* ── ADD-ON COVERS ── */}
      <section className="bg-white py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              Boost Your Cover
            </span>
            <h2 className="mt-2 text-3xl font-bold text-navy">
              Popular Add-On Covers
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
            <p className="mt-4 text-slate-500 text-sm max-w-xl mx-auto">
              Enhance your base plan with these optional add-ons for complete
              peace of mind.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {addOns.map(({ icon: Icon, title, desc, price, img }, i) => (
              <div
                key={i}
                className="group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-2"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-navy/50" />
                  <div className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                </div>
                <div className="p-5 bg-white">
                  <h3 className="text-sm font-bold text-navy mb-1">{title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">{desc}</p>
                  <span className="text-xs font-semibold text-green-brand">
                    {price}
                  </span>
                </div>
                <div className="h-0.5 w-0 bg-gradient-to-r from-gold to-green-brand group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER BANNER ── */}
      <section className="py-14 px-6 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
            Plans available from these trusted insurers
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              "Bajaj General",
              "Magma General",
              "Tata AIG",
              "Go Digit",
              "Shriram General",
              "Royal Sundaram",
            ].map((name, i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-4 text-center text-xs font-semibold text-navy shadow-sm hover:border-gold hover:shadow-md transition-all duration-300"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO BUY ── */}
      <section className="py-20 px-6 bg-navy relative overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full border border-gold/10 translate-x-1/2 -translate-y-1/2" />
        <div className="mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-light">
              Simple & Fast
            </span>
            <h2 className="mt-2 text-3xl font-bold text-white">
              How to Buy a Plan
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Call or WhatsApp", d: "Reach our advisor on +91 97735 48537 or WhatsApp us anytime." },
              { n: "02", t: "Share Vehicle Info", d: "Your registration number, current policy (if any), and preferred cover type." },
              { n: "03", t: "Compare & Choose", d: "We show you the best quotes from all 6 insurers — you pick what suits you." },
              { n: "04", t: "Pay & Get Policy", d: "Pay securely online and receive your policy document instantly on WhatsApp." },
            ].map(({ n, t, d }, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-5xl font-extrabold text-white/5 group-hover:text-gold/10 transition-colors select-none block mb-3 leading-none">
                  {n}
                </span>
                <h3 className="text-sm font-bold text-white mb-2">{t}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              Got Questions?
            </span>
            <h2 className="mt-2 text-3xl font-bold text-navy">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section className="py-16 px-6 bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white text-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto max-w-xl">
          <h2 className="text-3xl font-extrabold mb-4">
            Still Not Sure Which Plan to Pick?
          </h2>
          <p className="text-slate-300 text-sm mb-8 leading-relaxed">
            Our advisors help you find the right cover based on your vehicle,
            usage, and budget — at no extra cost.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+919773548537"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold px-7 py-3.5 rounded-xl text-sm transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              Call +91 97735 48537
            </a>
            <a
              href="https://wa.me/919773548537"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/25 hover:border-gold text-white hover:text-gold px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300"
            >
              WhatsApp Us
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlansPage;