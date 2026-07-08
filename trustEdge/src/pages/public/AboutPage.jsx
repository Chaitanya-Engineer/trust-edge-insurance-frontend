import React from "react";
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
} from "lucide-react";

/**
 * TrustEdge Insurance Marketing LLP — About Us Page
 * Uses global theme colors defined in tailwind.config.js:
 * navy / navy-light / navy-dark, green-brand / green-light, gold / gold-light
 */

const stats = [
  { icon: Award, value: "22+", label: "Years of Experience" },
  { icon: Users, value: "10,000+", label: "Happy Clients" },
  { icon: ShieldCheck, value: "6+", label: "Insurance Partners" },
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
  { icon: Car, label: "Small Cars" },
  { icon: Truck, label: "Big Vehicles & Commercial" },
  { icon: Bike, label: "Two-Wheelers" },
];

const insurers = [
  "Bajaj General Insurance Ltd",
  "Magma General Insurance Ltd",
  "Tata AIG General Insurance Co Ltd",
  "Go Digit General Insurance Ltd",
  "Shriram General Insurance Co Ltd",
  "Royal Sundaram General Insurance Co Ltd",
];

const AboutPage = () => {
  return (
    <div className="bg-slate-50 text-slate-800">
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy-dark py-20 px-6 text-white">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full border-[3px] border-gold/30" />
        <div className="pointer-events-none absolute bottom-[-60px] left-[-60px] h-56 w-56 rounded-full border-[3px] border-gold/20" />

        <div className="relative mx-auto max-w-5xl text-center">
          <span className="inline-block rounded-full border border-gold/60 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-light">
            About TrustEdge
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
            Protecting Today.{" "}
            <span className="text-green-light">Securing Tomorrow.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg">
            TrustEdge Insurance Marketing LLP has spent{" "}
            <span className="font-semibold text-gold-light">22+ years</span>{" "}
            helping vehicle owners — from compact hatchbacks to heavy
            commercial fleets — find insurance cover they can rely on.
          </p>
        </div>
      </section>

      {/* ---------- STATS STRIP ---------- */}
      <section className="relative z-10 mx-auto -mt-10 max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 shadow-lg md:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 rounded-xl px-3 py-4 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-navy/5"
            >
              <Icon className="h-7 w-7 text-gold" strokeWidth={1.8} />
              <span className="text-2xl font-bold text-navy">{value}</span>
              <span className="text-xs font-medium text-slate-500">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- STORY ---------- */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-navy">Who We Are</h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
        <p className="mt-6 text-lg leading-relaxed text-slate-600">
          We are an independent insurance marketing firm specializing in
          motor insurance for every kind of vehicle — small cars, two
          wheelers, and large commercial vehicles. With over two decades of
          experience, we compare plans across India's leading insurers so you
          get the right cover at the right price, without the confusion.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          From policy selection to claim support, our team stays with you
          throughout — because real protection isn't just about paperwork,
          it's about trust.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {vehicleTypes?.map(({ icon: Icon, label }, i) => (
            <div
              key={i}
              className="group flex items-center gap-2 rounded-full border border-navy/15 bg-white px-5 py-2.5 shadow-sm transition-all duration-300 hover:border-green-brand hover:shadow-md hover:-translate-y-0.5"
            >
              <Icon className="h-5 w-5 text-green-brand transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm font-medium text-navy">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- VALUE CARDS ---------- */}
      <section className="bg-white py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy">
              Why Choose TrustEdge
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-transparent"
              >
                <span className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-gold to-green-brand transition-all duration-500 group-hover:w-full" />

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy/5 transition-all duration-300 group-hover:bg-navy group-hover:rotate-6">
                  <Icon
                    className="h-7 w-7 text-navy transition-colors duration-300 group-hover:text-gold-light"
                    strokeWidth={1.8}
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-navy">
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

      {/* ---------- INSURER PARTNERS ---------- */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-navy">
            Our Insurance Partners
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            We work with leading general insurance companies so you can
            compare and choose with confidence.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {insurers?.map((name, i) => (
              <div
                key={i}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 text-left shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md hover:-translate-y-1"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-brand transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm font-medium text-navy">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CONTACT / BUSINESS INFO ---------- */}
      <section className="bg-navy py-16 px-6 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Visit or Reach Us</h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 transition-all duration-300 group-hover:bg-gold group-hover:scale-110">
                  <Icon className="h-6 w-6 text-gold-light transition-colors duration-300 group-hover:text-navy" />
                </div>
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-gold-light">
                  {title}
                </h3>
                <div className="mt-2 space-y-0.5">
                  {lines?.map((line, j) => (
                    <p key={j} className="text-sm text-slate-200">
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