import React from "react";
import PartnersMarquee from "../../component/core_components/PartnersMarquee/PartnersMarquee";
import {
  Globe2,
  ShieldCheck,
  TrendingUp,
  Users,
  Car,
  Truck,
  Bike,
  Mail,
  Phone,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  BadgeCheck,
} from "lucide-react";

/**
 * TrustEdge Insurance Marketing LLP — About Us Page
 * Uses global theme colors defined in tailwind.config.js:
 * navy / navy-light / navy-dark, green-brand / green-light, gold / gold-light
 */

const stats = [
  { icon: Award, value: "22+", label: "Years of Experience" },
  { icon: Users, value: "10,000+", label: "Happy Clients" },
  { icon: ShieldCheck, value: "10+", label: "Insurance Partners" },
  { icon: Car, value: "All Vehicles", label: "Cars, Bikes & Commercial" },
];

const values = [
  {
    icon: Globe2,
    title: "Global Reach",
    desc: "Wide network of trusted insurers giving you access to the best policies, wherever you are.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Partnership",
    desc: "22 years of credibility built on transparency, honesty, and putting clients first.",
  },
  {
    icon: TrendingUp,
    title: "Smart Solutions",
    desc: "Tailored insurance plans designed to fit your vehicle, budget, and risk profile.",
  },
  {
    icon: Users,
    title: "Lasting Protection",
    desc: "We don't just sell policies — we build long-term relationships and stand by you at claim time.",
  },
];

const vehicleTypes = [
  { icon: Car, label: "Health Insurance" },
  { icon: Truck, label: "Personal Insurance" },
  { icon: Bike, label: "Motor Insurance" },
  { icon: Car, label: "Property Insurance" },
  { icon: Truck, label: "Marine Insurance" },
  { icon: Bike, label: "Workmen Compensation Insurance" },
];


const AboutPage = () => {
  return (
    <div className="bg-slate-50 text-slate-800 overflow-x-hidden">
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-[35vh] md:min-h-[45vh] flex items-center overflow-hidden bg-navy text-white py-14 md:py-20 px-6">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
            alt="Modern skyscraper"
            className="w-full h-full object-cover object-[65%_center] opacity-70 md:opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/60 to-navy/35 md:bg-gradient-to-r md:from-navy/95 md:via-navy/85 md:to-navy/40" />
        </div>

        {/* Gold decorative rings */}
        <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[400px] w-[400px] rounded-full border-[2px] border-gold/20 z-10" />
        <div className="pointer-events-none absolute right-[-50px] top-[-50px] h-[280px] w-[280px] rounded-full border-[2px] border-gold/15 z-10" />

        <div className="relative z-20 mx-auto max-w-5xl text-center md:text-left w-full">
          <span className="inline-block rounded-full border border-gold/60 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-light mb-4">
            About TrustEdge
          </span>

          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl text-white">
            Protecting Today. <span className="text-green-light block md:inline">Securing Tomorrow.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg">
            TrustEdge Insurance Marketing LLP has spent{" "}
            <span className="font-bold text-gold-light">22+ years</span> helping vehicle owners — from compact hatchbacks to heavy commercial fleets — find insurance cover they can rely on.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════ */}
      <section className="relative z-20 mx-auto -mt-10 max-w-5xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 rounded-2xl overflow-hidden shadow-xl">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div
              key={i}
              className="bg-white flex flex-col items-center gap-2 py-5 px-3 md:py-7 md:px-4 text-center group md:hover:bg-navy transition-colors duration-300"
            >
              <Icon
                className="h-6 w-6 text-gold transition-colors"
                strokeWidth={1.8}
              />
              <span className="text-2xl sm:text-3xl font-extrabold text-navy md:group-hover:text-white transition-colors">
                {value}
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-slate-500 md:group-hover:text-slate-300 transition-colors leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHO WE ARE (STORY - 2 COLUMN LAYOUT)
      ══════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-12 items-center">

          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              Our Journey
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy md:text-4xl">
              Who We Are
            </h2>
            <div className="mt-3 h-1 w-16 rounded-full bg-gold" />

            <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-600 text-justify">
              TrustEdge Insurance Marketing LLP is committed to helping individuals, families, and businesses protect what matters most through informed insurance decisions. With over 22 years of experience in the insurance industry, we focus on simplifying complex insurance choices through transparent guidance, personalized assistance, and customer-focused service.            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-600 text-justify">
              We understand that every customer has different needs, priorities, and financial considerations. That is why we help customers explore suitable insurance options across multiple categories, including Health, Personal, Motor, Property, Marine, and Workmen Compensation insurance.</p>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-600 text-justify">Our approach goes beyond policy selection. We believe in helping customers understand their coverage, make informed decisions, and navigate their insurance journey with greater confidence. From initial inquiries and policy documentation to policy-related assistance and claims support, our team strives to provide reliable guidance at every step.</p>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-600 text-justify">At TrustEdge, we believe that insurance is more than financial protection, it is about peace of mind, accountability, and lasting relationships. Through transparency, responsible guidance, and a commitment to customer satisfaction, we aim to build trust that extends well beyond the purchase of a policy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {vehicleTypes?.map(({ icon: Icon, label }, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md hover:-translate-y-0.5"
                >
                  <Icon className="h-5 w-5 text-navy group-hover:text-gold transition-colors duration-300" />
                  <span className="text-sm font-semibold text-navy">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Core Promise Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl border border-slate-100 bg-white p-8 shadow-xl">
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-gold/5 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-green-light/5 blur-2xl pointer-events-none" />

              <h3 className="text-xl font-bold text-navy">Our Core Promise</h3>
              <div className="mt-2 h-0.5 w-12 bg-gold" />

              <ul className="mt-6 space-y-5">
                <li className="flex items-start gap-3.5">
                  <CheckCircle2 className="h-5 w-5 text-green-brand flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy block text-sm">100% Transparency</span>
                    <span className="text-xs text-slate-500 mt-0.5 block leading-relaxed">We clearly explain policy benefits, exclusions, and premiums so customers can make informed decisions without confusion.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <CheckCircle2 className="h-5 w-5 text-green-brand flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy block text-sm">Unbiased Advice</span>
                    <span className="text-xs text-slate-500 mt-0.5 block leading-relaxed">We help customers compare suitable options from our partner insurers, focusing on coverage relevance and individual needs.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <CheckCircle2 className="h-5 w-5 text-green-brand flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy block text-sm">Dedicated Claims Support</span>
                    <span className="text-xs text-slate-500 mt-0.5 block leading-relaxed">We assist with claim queries, documentation, and insurer coordination even after the policy is issued.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <CheckCircle2 className="h-5 w-5 text-green-brand flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy block text-sm">Customer-First Approach</span>
                    <span className="text-xs text-slate-500 mt-0.5 block leading-relaxed">We understand each customer's unique needs and offer guidance tailored to their priorities — not a one-size-fits-all solution.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <CheckCircle2 className="h-5 w-5 text-green-brand flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy block text-sm">Long-Term Relationships</span>
                    <span className="text-xs text-slate-500 mt-0.5 block leading-relaxed">We aim to be a reliable partner throughout your insurance journey, offering ongoing support and accessibility.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          VALUES CARDS
      ══════════════════════════════════════ */}
      <section className="bg-white py-24 px-6 border-y border-slate-100">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              Core Principles
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy md:text-4xl">
              Why Choose TrustEdge
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-transparent"
              >
                <span className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-gold to-green-brand transition-all duration-500 group-hover:w-full" />

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 transition-all duration-300 group-hover:bg-navy group-hover:rotate-6 mb-5">
                  <Icon
                    className="h-6 w-6 text-navy transition-colors duration-300 group-hover:text-gold"
                    strokeWidth={1.8}
                  />
                </div>

                <h3 className="text-lg font-bold text-navy">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INSURER PARTNERS MARQUEE
      ══════════════════════════════════════ */}
      <PartnersMarquee />

      {/* ══════════════════════════════════════
          CONTACT / BUSINESS INFO
      ══════════════════════════════════════ */}
      <section className="bg-navy py-20 px-6 text-white relative overflow-hidden">
        {/* Background rings */}
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full border border-gold/10 translate-x-1/2 -translate-y-1/2" />
        <div className="pointer-events-none absolute left-0 bottom-0 h-56 w-56 rounded-full border border-gold/5 -translate-x-1/2 translate-y-1/2" />

        <div className="mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-light">
              Connect With Us
            </span>
            <h2 className="mt-2 text-3xl font-extrabold">Visit or Reach Us</h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: MapPin,
                title: "Office Address",
                lines: [
                  "D-121, Steel Chamber, Steel Market,",
                  "Kalamboli, Navi Mumbai 410218",
                ],
              },
              {
                icon: Mail,
                title: "Email Us",
                lines: ["trustedgeimf@gmail.com"],
              },
              {
                icon: Phone,
                title: "Call Us",
                lines: ["+91 97735 48537", "+91 99225 54066"],
              },
              {
                icon: Clock,
                title: "Business Hours",
                lines: ["Mon – Sat", "10:00 AM – 7:00 PM"],
              },
            ].map(({ icon: Icon, title, lines }, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:border-gold/40 hover:bg-white/10 hover:-translate-y-1.5"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gold-light transition-all duration-300 group-hover:bg-gold group-hover:text-navy group-hover:rotate-6 mb-4">
                  <Icon className="h-5 w-5 transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-light">
                  {title}
                </h3>
                <div className="mt-3 space-y-1">
                  {lines?.map((line, j) => (
                    <p key={j} className="text-xs text-slate-300 group-hover:text-white transition-colors leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;