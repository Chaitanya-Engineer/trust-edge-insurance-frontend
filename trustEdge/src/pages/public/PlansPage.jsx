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
import WhatsAppIcon from "../../assets/WhatsappIcon";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const vehicleCategories = [
  { id: "car", label: "Private Car", shortLabel: "Car", icon: Car },
  { id: "commercial", label: "Commercial Vehicle", shortLabel: "Commercial", icon: Truck },
  { id: "bike", label: "Two-Wheeler", shortLabel: "Bike", icon: Bike },
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
const getTierIcon = (planId) => {
  if (planId.includes("third-party") || planId.includes("tp-")) {
    return Shield;
  }
  if (planId.includes("comprehensive") || planId.includes("comp-")) {
    return Flame;
  }
  return BadgeCheck; // Bundled / Super Cover / Fleet Cover
};

const PlanCard = ({ plan, categoryLabel }) => {
  const Icon = getTierIcon(plan.id);

  return (
    <div
      className={`group relative flex flex-col rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-white border ${plan.highlight
        ? "border-2 border-gold shadow-[0_8px_30px_rgba(201,162,39,0.08)]"
        : "border border-navy/30 shadow-md shadow-navy/5"
        }`}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1 rounded-full bg-gold/10 border border-gold/30 px-3 py-1 text-xs font-bold text-navy shadow-sm">
          {plan.badge === "Most Popular" && <Flame className="w-3 h-3 fill-navy" />}
          {plan.badge === "Best Value" && <Star className="w-3 h-3 fill-navy" />}
          {plan.badge === "Best for Business" && <BadgeCheck className="w-3 h-3" />}
          {plan.badge === "Full Protection" && <Shield className="w-3 h-3" />}
          {plan.badge}
        </div>
      )}

      {/* Header Banner - Google/Material Tonal Look */}
      <div className="p-6 pt-8 border-b border-slate-100 flex flex-col items-start bg-gradient-to-br from-slate-50/50 to-white">
        {/* Tier Icon Tonal Container */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${plan.id.includes("comprehensive") || plan.id.includes("comp-")
            ? "bg-gold/10 text-gold border border-gold/20"
            : plan.id.includes("third-party") || plan.id.includes("tp-")
              ? "bg-slate-100 text-slate-600 border border-slate-200/50"
              : "bg-green-brand/10 text-green-brand border border-green-brand/20"
            }`}
        >
          <Icon className="w-5 h-5" />
        </div>

        {/* Title & Tagline */}
        <div className="mt-4">
          {/* Category Tag (Google M3 Tonal label) */}
          <span className="inline-block rounded bg-navy/5 text-navy font-black px-2 py-0.5 text-[9px] uppercase tracking-wider mb-2 select-none">
            {categoryLabel}
          </span>
          <h3 className="text-xl font-extrabold text-navy group-hover:text-gold transition-colors duration-300">
            {plan.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {plan.tagline}
          </p>
        </div>

        {/* Price Tag */}
        <div className="mt-5 flex flex-col justify-start">
          <span className="text-[9px] font-bold uppercase tracking-wider mb-0.5 text-slate-400">
            Starting from
          </span>
          <div className="flex items-baseline">
            <span className="text-3xl font-black text-navy">
              {plan.price}
            </span>
            <span className="text-xs ml-1 font-semibold text-slate-400">
              {plan.period}
            </span>
          </div>
        </div>
      </div>

      {/* Body / Features List */}
      <div className="flex flex-col flex-1 p-6 bg-white">
        <ul className="space-y-3.5 flex-1 mb-6">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
              {f.included ? (
                <CheckCircle2 className="w-4.5 h-4.5 flex-shrink-0 mt-0.5 text-green-brand" />
              ) : (
                <XCircle className="w-4.5 h-4.5 flex-shrink-0 mt-0.5 text-slate-300" />
              )}
              <span
                className={`font-medium transition-colors duration-300 ${f.included ? "text-slate-700" : "text-slate-400"
                  }`}
              >
                {f.label}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA (Primary Filled for Comprehensive, Secondary Outline for others) */}
        <a
          href="tel:+919773548537"
          className={`flex items-center justify-center gap-1.5 w-full py-3.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-[1.01] ${plan.highlight
            ? "bg-gold hover:bg-gold-light text-navy shadow-lg shadow-gold/15"
            : "border-2 border-navy text-navy hover:bg-navy hover:text-white"
            }`}
        >
          {plan.cta}
          <ArrowRight className="w-4 h-4 flex-shrink-0" />
        </a>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   FAQ ITEM
───────────────────────────────────────────── */
const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="text-xs sm:text-sm font-bold text-navy">{q}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-gold flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-5 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4 animate-fadeInUp">
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

  const categoryMeta = {
    car: { label: "Private Car", icon: Car },
    commercial: { label: "Commercial Vehicle", icon: Truck },
    bike: { label: "Two-Wheeler", icon: Bike },
  };

  const currentMeta = categoryMeta[activeCategory];
  const ContextIcon = currentMeta.icon;

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* ── HERO ── */}
      <section className="relative min-h-[35vh] md:min-h-[45vh] flex items-center overflow-hidden bg-navy text-white py-16 md:py-24 px-6">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=1600&q=80"
            alt="Scenic winding highway"
            className="w-full h-full object-cover object-[65%_center] opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/60 to-navy/35 md:bg-gradient-to-r md:from-navy/95 md:via-navy/90 md:to-navy/40" />
        </div>

        {/* Gold decorative rings */}
        <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[400px] w-[400px] rounded-full border-[2px] border-gold/20 z-10" />
        <div className="pointer-events-none absolute right-[-50px] top-[-50px] h-[280px] w-[280px] rounded-full border-[2px] border-gold/15 z-10" />

        <div className="relative z-10 mx-auto max-w-5xl text-center md:text-left w-full">
          <span className="inline-block rounded-full border border-gold/50 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-light mb-4">
            Our Insurance Plans
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            The Right Cover for <span className="text-gold">Every Vehicle</span>
          </h1>
          <p className="mt-4 md:mt-5 text-sm sm:text-base leading-relaxed text-slate-200 md:text-lg max-w-2xl">
            Compare plans across 6 leading insurers. Transparent pricing, no hidden charges, and expert claim guidance at every single step.
          </p>
          <div className="mt-6 md:mt-8 flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 text-xs text-slate-300 font-medium">
            {["No Hidden Charges", "Instant Policy", "Claim Support Included"].map(
              (t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-light flex-shrink-0" />
                  {t}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-2">
        <div className="mx-auto max-w-2xl px-4">
          <div className="bg-slate-100 p-1 rounded-2xl flex w-full justify-between gap-1 shadow-inner">
            {vehicleCategories.map(({ id, label, shortLabel, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] xs:text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeCategory === id
                  ? "bg-white text-navy shadow-sm border border-slate-200/40"
                  : "text-slate-500 hover:text-navy hover:bg-white/40 border border-transparent"
                  }`}
              >
                <Icon className={`w-3.5 h-3.5 transition-colors duration-300 ${activeCategory === id ? "text-gold" : "text-slate-400"}`} />
                <span className="hidden sm:inline">{label}</span>
                <span className="inline sm:hidden">{shortLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLAN CARDS (WITH TAB-SWITCHING KEY ANIMATION) ── */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Dynamic Context Header (Google + TCS Indicator) */}
          <div key={`context-${activeCategory}`} className="flex items-center justify-center gap-2 mb-8 text-slate-500 text-xs sm:text-sm font-semibold select-none animate-fadeInUp">
            <ContextIcon className="w-4.5 h-4.5 text-gold flex-shrink-0" />
            <span>Showing plans for <strong className="text-navy">{currentMeta.label}</strong></span>
          </div>

          <div key={activeCategory} className="grid gap-8 grid-cols-1 md:grid-cols-3 animate-fadeInUp">
            {plans[activeCategory].map((plan) => (
              <PlanCard key={plan.id} plan={plan} categoryLabel={currentMeta.label} />
            ))}
          </div>

          {/* Disclaimer */}
          <p className="mt-10 text-center text-xs text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
            * Prices are indicative and vary based on vehicle age, model, IDV,
            and insurer. Contact us for an exact quote.
          </p>
        </div>
      </section>

      {/* ── ADD-ON COVERS (ELEVATED CARDS WITH ROTATING HOVER EFFECTS) ── */}
      <section className="bg-white py-16 md:py-24 px-6 border-t border-slate-100">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              Boost Your Cover
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-navy">
              Popular Add-On Covers
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
            <p className="mt-4 text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Enhance your base plan with these optional add-ons for complete
              peace of mind.
            </p>
          </div>

          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            {addOns.map(({ icon: Icon, title, desc, price, img }, i) => (
              <div
                key={i}
                className="group rounded-2xl overflow-hidden border border-slate-100 shadow-xl shadow-navy/5 bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-24 sm:h-36 overflow-hidden">
                    <img
                      src={img}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-navy/40" />
                    <div className="absolute top-2.5 left-2.5 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 group-hover:bg-navy group-hover:rotate-6">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                    </div>
                  </div>
                  <div className="p-3 sm:p-5">
                    <h3 className="text-xs sm:text-sm font-bold text-navy mb-1">{title}</h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
                <div className="px-3 pb-3 sm:px-5 sm:pb-5">
                  <span className="text-[10px] sm:text-xs font-bold text-green-brand">
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
      <section className="py-14 px-6 bg-slate-50 border-t border-b border-slate-200/50">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
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
                className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-4 text-center text-xs font-bold text-navy shadow-sm hover:border-gold hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO BUY (HOW IT WORKS ROW) ── */}
      <section className="py-16 md:py-24 bg-navy px-6 relative overflow-hidden">
        {/* Background rings */}
        <div className="pointer-events-none absolute right-[-40px] top-[-40px] h-[180px] w-[180px] rounded-full border border-gold/10" />
        <div className="pointer-events-none absolute left-[-40px] bottom-[-40px] h-[150px] w-[150px] rounded-full border border-gold/5" />

        <div className="mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-light">
              Simple & Fast
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              How to Buy a Plan
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
          </div>

          <div className="relative">
            {/* Desktop Connecting Timeline Line */}
            <div className="hidden lg:block absolute top-[54px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-gold/15 z-0 pointer-events-none" />
            {/* Mobile Vertical Connecting Timeline Line */}
            <div className="lg:hidden absolute left-[48px] top-[60px] bottom-[60px] w-[2px] border-l-2 border-dashed border-gold/15 z-0 pointer-events-none" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
              {[
                {
                  n: "1",
                  t: "Call or WhatsApp",
                  d: (
                    <>
                      Reach our advisor on{" "}
                      <a href="tel:+919773548537" className="text-gold hover:underline font-bold transition-all duration-300">
                        +91 97735 48537
                      </a>{" "}
                      or{" "}
                      <a href="https://wa.me/919773548537" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-bold transition-all duration-300">
                        WhatsApp us
                      </a>{" "}
                      anytime.
                    </>
                  ),
                },
                {
                  n: "2",
                  t: "Share Vehicle Info",
                  d: (
                    <>
                      Your registration number, current policy, and preferred cover type shared via{" "}
                      <a href="https://wa.me/919773548537" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-bold transition-all duration-300">
                        WhatsApp
                      </a>.
                    </>
                  ),
                },
                {
                  n: "3",
                  t: "Compare & Choose",
                  d: "We show you the best quotes from all 6 insurers — you pick what suits you best.",
                },
                {
                  n: "4",
                  t: "Pay & Get Policy",
                  d: (
                    <>
                      Pay securely online and receive your policy document instantly on{" "}
                      <a href="https://wa.me/919773548537" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-bold transition-all duration-300">
                        WhatsApp
                      </a>.
                    </>
                  ),
                },
              ].map(({ n, t, d }, i) => (
                <div
                  key={i}
                  className="group relative rounded-3xl border border-white/10 bg-navy-light p-6 sm:p-8 hover:bg-navy-light/80 hover:border-gold/40 hover:shadow-xl hover:shadow-navy/40 transition-all duration-305 flex flex-col items-start text-left"
                >
                  {/* Highlighted Step Number */}
                  <span className="text-4xl sm:text-5xl font-black text-gold block mb-4 select-none group-hover:scale-105 group-hover:text-gold-light transition-all duration-300 origin-left">
                    {n}
                  </span>

                  {/* Content */}
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-gold transition-colors">
                    {t}
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    {d}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              Got Questions?
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-navy">
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

      {/* ── CTA BOTTOM (RESPONSIVE ALIGNMENT & BUTTONS) ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy-dark py-20 px-6 text-white text-center">
        {/* Background Rings - Matches HomePage/AboutPage style */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full border border-gold/10" />
        <div className="pointer-events-none absolute bottom-[-40px] right-[-40px] h-48 w-48 rounded-full border border-green-brand/20" />

        <div className="relative z-10 mx-auto max-w-2xl">
          <span className="inline-block rounded-full border border-gold/40 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-light mb-5">
            Free Consultation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-5">
            Still Not Sure Which Plan to Pick?
          </h2>
          <p className="text-slate-200 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Our advisors help you find the right cover based on your vehicle,
            usage, and budget — at no extra cost.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href="tel:+919773548537"
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-300 hover:scale-105 shadow-lg w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" />
              Call +91 97735 48537
            </a>
            <a
              href="https://wa.me/919773548537"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/25 hover:bg-[#25D366] hover:border-[#25D366] text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 w-full sm:w-auto"
            >
              <WhatsAppIcon />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlansPage;