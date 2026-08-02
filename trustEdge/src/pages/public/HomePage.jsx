import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import familyHero from "../../assets/family_hero.jpg";
import videoAd from "../../assets/video_ad.mp4";
import {
  Shield,
  CheckCircle2,
  ArrowRight,
  Phone,
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  Volume2,
  VolumeX,
  Award,
  Users,
  TrendingUp,
  Globe2,
  ShieldCheck,
  MapPin,
  Mail,
  Clock,
  Zap,
  HeartHandshake,
  BadgeCheck,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const stats = [
  { icon: Award, value: "22+", label: "Years of Experience" },
  { icon: Users, value: "10,000+", label: "Happy Clients" },
  { icon: ShieldCheck, value: "6+", label: "Insurance Partners" },
  { icon: TrendingUp, value: "98%", label: "Claim Success Rate" },
];



const whyUs = [
  {
    icon: Zap,
    title: "Instant Quotes",
    desc: "Compare plans across all our insurer partners in minutes — no paperwork, no waiting.",
  },
  {
    icon: HeartHandshake,
    title: "Claim Support",
    desc: "We stand beside you during claims, not just at purchase. Our team handles the hard part.",
  },
  {
    icon: BadgeCheck,
    title: "Best Premium",
    desc: "We negotiate the best price across 6 leading insurers so you never overpay.",
  },
  {
    icon: Globe2,
    title: "Pan-India Service",
    desc: "Cashless garage network and service centers across every major city in India.",
  },
  {
    icon: Shield,
    title: "22 Years of Trust",
    desc: "Two decades of experience means we know every loophole, exclusion, and shortcut.",
  },
  {
    icon: Phone,
    title: "Dedicated Advisor",
    desc: "A real person answers your call — not a bot. Reach us 6 days a week, 10 AM–7 PM.",
  },
];

const insurers = [
  { name: "Bajaj General Insurance", short: "Bajaj" },
  { name: "Magma General Insurance", short: "Magma" },
  { name: "Tata AIG General Insurance", short: "Tata AIG" },
  { name: "Go Digit General Insurance", short: "Go Digit" },
  { name: "Shriram General Insurance", short: "Shriram" },
  { name: "Royal Sundaram General Insurance", short: "Royal Sundaram" },
];

const testimonials = [
  {
    name: "Ramesh Kulkarni",
    city: "Navi Mumbai",
    rating: 5,
    vehicle: "Car Insurance",
    text: "TrustEdge saved me ₹4,000 on my premium compared to what I was paying before. The claim process for my car damage was handled in 3 days — absolutely smooth!",
  },
  {
    name: "Priya Desai",
    city: "Thane",
    rating: 5,
    vehicle: "Two-Wheeler Insurance",
    text: "I was confused about which policy to choose. Their advisor explained everything patiently and I got the right cover at the lowest price. Highly recommend!",
  },
  {
    name: "Suresh Patil",
    city: "Panvel",
    rating: 5,
    vehicle: "Commercial Vehicle",
    text: "Running a small fleet of tempos, I needed reliable cover. TrustEdge handles all 5 of my vehicles and renewal reminders are always on time. Great service.",
  },
  {
    name: "Anita Sharma",
    city: "Kalamboli",
    rating: 5,
    vehicle: "Car Insurance",
    text: "After my accident, I was worried about the claim. The team at TrustEdge followed up with the insurer on my behalf. Got my car repaired cashless. Total trust!",
  },
];

const steps = [
  {
    n: "01",
    title: "Share Vehicle Details",
    desc: "Tell us your vehicle type, year, and current insurance status.",
  },
  {
    n: "02",
    title: "Get Instant Quotes",
    desc: "We compare plans from 6+ insurers and show the best options.",
  },
  {
    n: "03",
    title: "Choose Your Plan",
    desc: "Pick the cover that fits your needs and budget — we explain every clause.",
  },
  {
    n: "04",
    title: "Policy Issued Instantly",
    desc: "Pay online and receive your policy document in minutes.",
  },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const HomePage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const videoRef = useRef(null);
  const [videoMuted, setVideoMuted] = useState(true);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  // Auto-slide testimonials every 5 seconds, resetting the timer on manual navigation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((p) => (p === testimonials.length - 1 ? 0 : p + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [activeTestimonial]);

  const prevTestimonial = () =>
    setActiveTestimonial((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  const nextTestimonial = () =>
    setActiveTestimonial((p) => (p === testimonials.length - 1 ? 0 : p + 1));

  return (
    <div className="bg-slate-50 text-slate-800 overflow-x-hidden">
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-[75vh] md:min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={familyHero}
            alt="Family with car"
            className="w-full h-full object-cover object-[70%_top] sm:object-[right_15%] opacity-65 md:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/60 to-navy/35 md:bg-gradient-to-r md:from-navy/95 md:via-navy/90 md:to-navy/40" />
        </div>

        {/* Gold decorative ring */}
        <div className="pointer-events-none absolute right-[-120px] top-[-120px] h-[500px] w-[500px] rounded-full border-[2px] border-gold/20 z-10" />
        <div className="pointer-events-none absolute right-[-60px] top-[-60px] h-[360px] w-[360px] rounded-full border-[2px] border-gold/15 z-10" />

        <div className="relative z-20 mx-auto max-w-7xl w-full px-6 py-16 md:py-32">
          <div
            className={`max-w-2xl transition-all duration-1000 ${heroVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
              }`}
          >
            <span className="inline-block rounded-full border border-gold/60 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-light mb-6">
              22 Years of Trusted Insurance
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Drive Safe.
              <br />
              <span className="text-gold">Stay Covered.</span>
            </h1>

            <p className="text-lg text-slate-200 leading-relaxed mb-8 max-w-xl">
              TrustEdge Insurance Marketing LLP — Navi Mumbai's most trusted
              vehicle insurance advisor. Cars, bikes, trucks. Best premiums.
              Fastest claims.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="tel:+919773548537"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Phone className="w-4 h-4" />
                Get Free Quote
              </a>
              <a
                href="https://wa.me/919773548537"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-gold text-white hover:text-gold font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-300"
              >
                WhatsApp Us
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Quick trust row */}
            <div className="flex flex-wrap gap-5">
              {["Instant Policy", "Cashless Claims", "6 Insurer Partners"].map(
                (t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-light flex-shrink-0" />
                    {t}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════ */}
      <section className="relative z-10 mx-auto -mt-12 max-w-5xl px-6">
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
          EXPLORE SOLUTIONS — DIRECTIONAL STRIP
      ══════════════════════════════════════ */}
      <section className="relative py-10 sm:py-14 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full border border-gold/10" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full border border-green-brand/10" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Shield icon */}
          <div className="mx-auto mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-navy/5 border border-navy/10">
            <Shield className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-navy" strokeWidth={1.5} />
          </div>

          {/* Headline */}
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-navy leading-tight px-2">
            From Health to Motor to Business, {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
              we've got you covered
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-relaxed px-4 sm:px-0">
            Explore our complete range of insurance solutions, tailored for individuals, families, and businesses across India.
          </p>

          {/* CTA Button */}
          <div className="mt-5 sm:mt-7 md:mt-8">
            <Link
              to="/insurance"
              className="group inline-flex items-center gap-2 bg-navy hover:bg-navy-dark text-white font-semibold px-5 sm:px-7 md:px-8 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore All Insurance Solutions
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Trust micro-badges */}
          <div className="mt-5 sm:mt-7 md:mt-8 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 md:gap-x-6 gap-y-2 text-[11px] sm:text-xs md:text-sm text-slate-400">
            {[
              "Motor & Vehicle",
              "Health & Family",
              "Business & Property",
              "Workmen & Liability",
            ].map((label, i) => (
              <span key={i} className="flex items-center gap-1 sm:gap-1.5">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-brand flex-shrink-0" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          VIDEO SECTION
      ══════════════════════════════════════ */}
      <section className="bg-navy py-20 px-6 relative overflow-hidden">
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full border border-gold/10" />
        <div className="pointer-events-none absolute right-10 top-10 h-40 w-40 rounded-full border border-green-brand/20" />

        <div className="mx-auto max-w-6xl flex flex-col lg:flex-row items-center gap-14">
          {/* Text */}
          <div className="flex-1 text-white">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-light">
              Why TrustEdge
            </span>
            <h2 className="mt-3 text-4xl font-bold leading-tight">
              We're Not Just a Policy Seller.
              <br />
              <span className="text-gold">We're Your Insurance Partner.</span>
            </h2>
            <p className="mt-5 text-slate-300 leading-relaxed max-w-lg">
              For 22 years, we've helped thousands of vehicle owners across Navi
              Mumbai find the right cover — not the most expensive one. We
              compare, advise, and stand by you even at claim time.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Compare 6+ insurers in one place",
                "Dedicated advisor — not a call center",
                "Claim assistance from start to finish",
                "Renewal reminders & policy tracking",
              ].map((p, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm text-slate-200"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-light flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href="tel:+919773548537"
              className="mt-8 inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              Call Now — It's Free
            </a>
          </div>

          {/* Video embed */}
          <div className="flex-1 w-full">
            <div
              className="group/video relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-navy-light cursor-pointer transform hover:scale-[1.02] transition-all duration-500 border border-white/10"
              onMouseEnter={() => {
                if (videoRef.current) {
                  videoRef.current.play().catch((err) => console.log("Video play interrupted:", err));
                }
              }}
              onMouseLeave={() => {
                if (videoRef.current) {
                  videoRef.current.pause();
                }
              }}
            >
              <video
                ref={videoRef}
                src={videoAd}
                muted={videoMuted}
                loop
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Overlay shadow gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 group-hover/video:from-black/30 transition-all duration-500 pointer-events-none" />

              {/* Central Play Button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white shadow-lg transition-all duration-500 transform group-hover/video:scale-75 group-hover/video:opacity-0">
                  <Play className="h-7 w-7 text-white fill-white ml-1" />
                </div>
              </div>

              {/* Hover to Preview Badge */}
              <div className="absolute top-4 left-4 bg-navy/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 transition-all duration-500 group-hover/video:opacity-0 group-hover/video:translate-y-[-10px]">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Hover to Play
              </div>

              {/* Volume Controller (speaker icon) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setVideoMuted(!videoMuted);
                }}
                className="absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-navy/90 hover:bg-navy backdrop-blur-sm border border-white/15 text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
                title={videoMuted ? "Unmute" : "Mute"}
              >
                {videoMuted ? (
                  <VolumeX className="h-5 w-5 text-gold-light" />
                ) : (
                  <Volume2 className="h-5 w-5 text-gold-light" />
                )}
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-400 text-center">
              Understanding vehicle insurance — hover to play, click speaker to unmute
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              Simple Process
            </span>
            <h2 className="mt-2 text-4xl font-bold text-navy">
              Get Insured in 4 Easy Steps
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ n, title, desc }, i) => (
              <div
                key={i}
                className="group relative flex flex-col items-start gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-5xl font-extrabold text-navy/8 group-hover:text-gold/50 transition-colors select-none">
                  {n}
                </span>
                <h3 className="text-base font-bold text-navy relative z-10">
                  {title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed relative z-10">
                  {desc}
                </p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                    <ArrowRight className="w-5 h-5 text-gold" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY US — 6 CARDS
      ══════════════════════════════════════ */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              Our Edge
            </span>
            <h2 className="mt-2 text-4xl font-bold text-navy">
              Why 10,000+ Clients Trust Us
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-md p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                <span className="absolute left-0 top-0 h-0.5 w-0 bg-gradient-to-r from-gold to-green-brand transition-all duration-500 group-hover:w-full" />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 mb-4 group-hover:bg-navy transition-all duration-300 group-hover:rotate-6">
                  <Icon
                    className="h-6 w-6 text-navy group-hover:text-gold transition-colors duration-300"
                    strokeWidth={1.8}
                  />
                </div>
                <h3 className="text-base font-bold text-navy mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INSURER PARTNERS
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-navy overflow-hidden relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-brand/10 via-transparent to-transparent" />
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-light">
              Our Partners
            </span>
            <h2 className="mt-2 text-4xl font-bold text-white">
              Backed by India's Best Insurers
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {insurers.map(({ name, short }, i) => (
              <div
                key={i}
                className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-md px-5 py-4 hover:bg-white/10 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-light group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm font-semibold text-white">{short}</p>
                  <p className="text-xs text-slate-400">{name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              Client Stories
            </span>
            <h2 className="mt-2 text-4xl font-bold text-navy">
              What Our Clients Say
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
          </div>

          {/* Active card (Stabilized Height to prevent layout jumping on mobile) */}
          <div className="relative bg-navy rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl mb-8 min-h-[320px] sm:min-h-[250px] md:min-h-0 flex flex-col justify-between">
            <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-bl-3xl border-b border-l border-gold/20" />

            <div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[activeTestimonial].rating)].map(
                  (_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                  )
                )}
              </div>
              <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed mb-6 italic">
                "{testimonials[activeTestimonial].text}"
              </p>
            </div>

            <div className="flex items-center gap-4 mt-auto">
              <div className="h-11 w-11 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-lg font-bold text-gold">
                  {testimonials[activeTestimonial].name[0]}
                </span>
              </div>
              <div>
                <p className="font-bold text-white">
                  {testimonials[activeTestimonial].name}
                </p>
                <p className="text-sm text-slate-400">
                  {testimonials[activeTestimonial].city} ·{" "}
                  {testimonials[activeTestimonial].vehicle}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevTestimonial}
              className="flex h-11 w-11 md:h-10 md:w-10 items-center justify-center rounded-full border border-navy/20 hover:bg-navy hover:text-white text-navy transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? "w-8 bg-gold" : "w-2 bg-slate-300"
                    }`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/20 hover:bg-navy hover:text-white text-navy transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Strip removed - Handled dynamically by premium footer contacts below */}

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy-dark py-20 px-6 text-white text-center">
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full border border-gold/10" />
        <div className="pointer-events-none absolute bottom-[-40px] right-[-40px] h-48 w-48 rounded-full border border-green-brand/20" />

        <div className="relative z-10 mx-auto max-w-2xl">
          <span className="inline-block rounded-full border border-gold/40 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-light mb-5">
            Free Consultation
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
            Ready to Get the <span className="text-gold">Right Cover?</span>
          </h2>
          <p className="text-slate-200 text-lg mb-8">
            Talk to our advisor today — no pressure, no spam. Just honest advice
            and the best price for your vehicle.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+919773548537"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              Call +91 97735 48537
            </a>
            <a
              href="https://wa.me/919773548537"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/25 hover:border-gold text-white hover:text-gold px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300"
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

export default HomePage;
