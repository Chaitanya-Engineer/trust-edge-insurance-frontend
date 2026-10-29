import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Shield,
  HeartPulse,
  Car,
  Building2,
  Anchor,
  Users,
} from "lucide-react";

// 3D Cutout asset imports from customer_portal
import healthCutout from "../../assets/customer_portal/Family_Healthcare.png";
import motorCutout from "../../assets/customer_portal/motor.png";
import personalCutout from "../../assets/customer_portal/personal_Shielded.png";
import propertyCutout from "../../assets/customer_portal/Property.png";
import marineCutout from "../../assets/customer_portal/Marine.png";
import workmenCutout from "../../assets/customer_portal/Workmen.png";

const BANNER_SLIDES = [
  {
    id: "health",
    title: "Health Insurance",
    subtitle: "Comprehensive health coverage for you and your family.",
    icon: HeartPulse,
    image: healthCutout,
    ctaLink: "/insurance/health",
    bgGradient: "from-[#F0F6FC] via-white to-[#E8F1FB]",
    badgeBg: "bg-blue-50 text-blue-800 border-blue-200/80",
    glowColor: "bg-blue-400/15",
  },
  {
    id: "personal",
    title: "Personal Insurance",
    subtitle: "Financial protection against personal accidents.",
    icon: Shield,
    image: personalCutout,
    ctaLink: "/insurance/personal",
    bgGradient: "from-[#FAF6EF] via-white to-[#F5ECE0]",
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200/80",
    glowColor: "bg-amber-400/15",
  },
  {
    id: "motor",
    title: "Motor Insurance",
    subtitle: "Coverage for private and commercial vehicles.",
    icon: Car,
    image: motorCutout,
    ctaLink: "/insurance/motor",
    bgGradient: "from-[#EFF6FC] via-white to-[#E5EFF8]",
    badgeBg: "bg-sky-50 text-sky-800 border-sky-200/80",
    glowColor: "bg-sky-400/15",
  },
  {
    id: "property",
    title: "Property Insurance",
    subtitle: "Safeguard your property against fire and damages.",
    icon: Building2,
    image: propertyCutout,
    ctaLink: "/insurance/property",
    bgGradient: "from-[#FAF6F0] via-white to-[#F6EDE2]",
    badgeBg: "bg-orange-50 text-orange-800 border-orange-200/80",
    glowColor: "bg-orange-400/15",
  },
  {
    id: "marine",
    title: "Marine Insurance",
    subtitle: "Protect your cargo and maritime assets.",
    icon: Anchor,
    image: marineCutout,
    ctaLink: "/insurance/marine",
    bgGradient: "from-[#F0F7FB] via-white to-[#E5F1F8]",
    badgeBg: "bg-cyan-50 text-cyan-800 border-cyan-200/80",
    glowColor: "bg-cyan-400/15",
  },
  {
    id: "workmen",
    title: "Workmen Compensation",
    subtitle: "Financial security for your workforce.",
    icon: Users,
    image: workmenCutout,
    ctaLink: "/insurance/workmen-compensation",
    bgGradient: "from-[#FAF5F0] via-white to-[#F6EDE4]",
    badgeBg: "bg-rose-50 text-rose-800 border-rose-200/80",
    glowColor: "bg-rose-400/15",
  },
];

const AUTOPLAY_DURATION = 5000; // 5 seconds per slide

export default function InsurancePromoBanner({ className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Moving progress bar per 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const intervalStep = 50; // update progress every 50ms
    const stepIncrement = (intervalStep / AUTOPLAY_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((curr) => (curr + 1) % BANNER_SLIDES.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = (e) => {
    e.preventDefault();
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  const handleSelect = (index) => {
    setProgress(0);
    setCurrentIndex(index);
  };

  return (
    <div
      className={`relative pt-7 sm:pt-12 md:pt-14 overflow-visible select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Main Banner Box Frame ─────────────────────────────────── */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm px-3.5 py-4 sm:p-5 md:p-6 pb-9 sm:pb-5 min-h-[155px] sm:min-h-[175px] md:min-h-[185px] flex items-center overflow-visible">
        {/* Dynamic tinted gradient */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${BANNER_SLIDES[currentIndex].bgGradient} transition-all duration-700 ease-in-out`}
        />

        {/* Ambient backlight glow behind 3D cutout */}
        <div
          className={`pointer-events-none absolute right-4 sm:right-16 top-1/2 -translate-y-1/2 w-40 sm:w-56 h-40 sm:h-56 rounded-full ${BANNER_SLIDES[currentIndex].glowColor} blur-2xl sm:blur-3xl transition-all duration-700 ease-in-out`}
        />

        {/* Slides Viewport with smooth cross-fade */}
        <div className="relative z-10 w-full min-h-[110px] sm:min-h-[140px] md:min-h-[150px] flex items-center overflow-visible">
          {BANNER_SLIDES.map((slide, index) => {
            const isActive = index === currentIndex;
            const Icon = slide.icon;

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full flex items-center transition-all duration-700 ease-in-out overflow-visible ${
                  isActive
                    ? "opacity-100 scale-100 pointer-events-auto z-10"
                    : "opacity-0 scale-98 pointer-events-none z-0"
                }`}
              >
                {/* 2-Column Responsive Layout (Side-by-side on Mobile & Desktop) */}
                <div className="grid grid-cols-12 gap-2 sm:gap-4 md:gap-6 items-center w-full overflow-visible">
                  {/* Left Column: 60% Width for Minimal Data */}
                  <div className="col-span-7 sm:col-span-7 space-y-1.5 sm:space-y-2.5 text-left pr-1 sm:pr-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-[#0B2545] shrink-0">
                        <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0B2545]" />
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold border ${slide.badgeBg} truncate`}>
                        {slide.title}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-xl md:text-2xl font-extrabold text-[#0B2545] tracking-tight leading-tight truncate sm:whitespace-normal">
                      {slide.title}
                    </h3>

                    <p className="text-[10px] sm:text-xs md:text-sm text-slate-600 font-medium leading-snug line-clamp-2">
                      {slide.subtitle}
                    </p>

                    <div className="pt-0.5 sm:pt-1">
                      <Link
                        to={slide.ctaLink}
                        className="inline-flex items-center gap-1 h-6 sm:h-8 md:h-9 px-2 sm:px-3.5 rounded-lg sm:rounded-xl bg-[#0B2545] hover:bg-[#0E2F52] text-white font-bold text-[10px] sm:text-xs shadow-xs transition-transform hover:scale-[1.02]"
                      >
                        <span>Explore Plans</span>
                        <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#E4C765]" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: 40% Width for 3D Pop-Out Cutout */}
                  <div className="col-span-5 sm:col-span-5 relative flex items-end justify-end overflow-visible">
                    <div className="relative -mt-9 sm:-mt-16 md:-mt-22 -mb-4 sm:-mb-5 md:-mb-6 overflow-visible transition-transform duration-500 hover:scale-105">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-28 sm:h-44 md:h-56 max-h-[110px] sm:max-h-[175px] md:max-h-[220px] w-auto max-w-full object-contain object-bottom drop-shadow-[0_10px_20px_rgba(0,0,0,0.28)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Controls: Animated Moving Button Indicators (5s Progress) & Chevrons ── */}
        <div className="absolute bottom-2 left-3.5 sm:left-auto sm:right-4 z-20 flex items-center gap-2">
          {/* Moving 5s Animated Indicators */}
          <div className="flex items-center gap-1.5">
            {BANNER_SLIDES.map((slide, i) => {
              const isActive = i === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => handleSelect(i)}
                  className={`h-1.5 rounded-full overflow-hidden transition-all duration-300 relative ${
                    isActive ? "w-6 sm:w-8 bg-slate-300/80" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to ${slide.title}`}
                  title={`${slide.title} (switches every 5s)`}
                >
                  {isActive && (
                    <div
                      className="absolute inset-y-0 left-0 bg-[#0B2545] rounded-full transition-all"
                      style={{
                        width: `${progress}%`,
                        transition: isPaused ? "none" : "width 50ms linear",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Micro Arrows */}
          <div className="flex items-center gap-0.5 text-slate-400">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1 hover:text-[#0B2545] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-1 hover:text-[#0B2545] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
