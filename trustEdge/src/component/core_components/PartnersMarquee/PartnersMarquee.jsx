import React from "react";
import bajajLogo from "../../../assets/Insurances Companies/bajaj_general.png";
import magmaLogo from "../../../assets/Insurances Companies/Magma_General.png";
import tataAigLogo from "../../../assets/Insurances Companies/Tata_AIG_General.png";
import goDigitLogo from "../../../assets/Insurances Companies/Go_Digit_General.png";
import shriramLogo from "../../../assets/Insurances Companies/Shriram_General.png";
import royalSundaramLogo from "../../../assets/Insurances Companies/Royal_Sundaram_General.png";
import cholaMsLogo from "../../../assets/Insurances Companies/Cholamandalam_MS_General.png";
import iffcoTokioLogo from "../../../assets/Insurances Companies/IFFCO_Tokio_General.png";
import newIndiaLogo from "../../../assets/Insurances Companies/The_New_India_Assurance.png";
import universalSompoLogo from "../../../assets/Insurances Companies/Universal_Sompo_General.png";
const row1Partners = [
  { name: "Bajaj Allianz General Insurance", short: "Bajaj", logo: bajajLogo },
  { name: "Tata AIG General Insurance", short: "Tata AIG", logo: tataAigLogo },
  { name: "Go Digit General Insurance", short: "Go Digit", logo: goDigitLogo },
  { name: "Magma HDI General Insurance", short: "Magma", logo: magmaLogo },
  { name: "Shriram General Insurance", short: "Shriram", logo: shriramLogo },
];
const row2Partners = [
  { name: "Royal Sundaram General Insurance", short: "Royal Sundaram", logo: royalSundaramLogo },
  { name: "Cholamandalam MS General Insurance", short: "Chola MS", logo: cholaMsLogo },
  { name: "IFFCO-Tokio General Insurance", short: "IFFCO-Tokio", logo: iffcoTokioLogo },
  { name: "The New India Assurance Co. Ltd.", short: "New India Assurance", logo: newIndiaLogo },
  { name: "Universal Sompo General Insurance", short: "Universal Sompo", logo: universalSompoLogo },
];
const track1 = [...row1Partners, ...row1Partners, ...row1Partners, ...row1Partners];
const track2 = [...row2Partners, ...row2Partners, ...row2Partners, ...row2Partners];

const LogoCard = ({ partner }) => {
  return (
    <div
      className="group relative flex items-center justify-center bg-white rounded-xl sm:rounded-2xl px-3 py-2 sm:px-6 sm:py-4 md:px-8 md:py-5 min-w-[135px] sm:min-w-[190px] md:min-w-[240px] lg:min-w-[260px] h-14 sm:h-18 md:h-22 lg:h-24 shadow-sm sm:shadow-md hover:shadow-xl border border-slate-100 hover:border-gold/50 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none"
      title={partner.name}
    >
      <span className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 w-1.5 h-1.5 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <img
        src={partner.logo}
        alt={partner.name}
        loading="lazy"
        className="max-h-7 sm:max-h-10 md:max-h-12 max-w-[100px] sm:max-w-[140px] md:max-w-[170px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
};

export default function PartnersMarquee({
  badge = "OUR PARTNERS",
  title = "Backed by India's Best Insurers",
  subtitle = "We collaborate with India's leading insurance companies so you get the best coverage, transparent pricing, and effortless claims.",
  theme = "dark",
}) {
  const isDark = theme === "dark";
  return (
    <section className={`py-10 sm:py-16 md:py-24 overflow-hidden relative ${isDark ? "bg-navy text-white" : "bg-slate-50 text-slate-800"}`}>
      {isDark && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-green-brand/10 rounded-full blur-3xl" />
        </>
      )}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-6 sm:mb-10 md:mb-14 text-center">
        <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-widest ${isDark ? "text-gold-light" : "text-gold"}`}>
          {badge}
        </span>
        <h2 className={`mt-1 sm:mt-2 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold px-2 ${isDark ? "text-white" : "text-navy"}`}>
          {title}
        </h2>
        <div className="mx-auto mt-2 sm:mt-3 h-1 w-10 sm:w-16 rounded-full bg-gold" />
        {subtitle && (
          <p className={`mx-auto mt-2.5 sm:mt-4 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed px-2 ${isDark ? "text-slate-300" : "text-slate-500"}`}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="relative w-full overflow-hidden marquee-container space-y-2.5 sm:space-y-4 md:space-y-6 touch-pan-y">
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 md:w-36 lg:w-48 z-20 bg-gradient-to-r ${isDark ? "from-navy via-navy/70 to-transparent" : "from-slate-50 via-slate-50/70 to-transparent"
            }`}
        />
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 md:w-36 lg:w-48 z-20 bg-gradient-to-l ${isDark ? "from-navy via-navy/70 to-transparent" : "from-slate-50 via-slate-50/70 to-transparent"
            }`}
        />
        <div className="flex w-max animate-marquee-left gap-2.5 sm:gap-4 md:gap-6">
          {track1.map((partner, index) => (
            <LogoCard key={`row1-${index}`} partner={partner} />
          ))}
        </div>
        <div className="flex w-max animate-marquee-right gap-2.5 sm:gap-4 md:gap-6">
          {track2.map((partner, index) => (
            <LogoCard key={`row2-${index}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
