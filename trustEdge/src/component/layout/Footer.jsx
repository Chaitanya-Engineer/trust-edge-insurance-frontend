import WhatsAppIcon from "../../assets/WhatsappIcon";
import { FooterValues, Title } from "../../lib/constant/AppLevelConstant";
import { footerLinks } from "../../lib/constant/routes";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import justLogo from "../../assets/just_logo.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-slate-300 border-t border-white/[0.03] relative overflow-hidden font-sans">
      {/* Premium Adobe-Style Radial Gradients for Background Depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-green-brand/5 to-transparent rounded-full pointer-events-none translate-x-1/4 -translate-y-1/4 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-gold/5 to-transparent rounded-full pointer-events-none -translate-x-1/4 translate-y-1/4 blur-3xl" />
      
      {/* Thin top accent border using brand gold */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 relative z-10">
        
        {/* TIER 1: The Main Brand & Symmetrical Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-20">
          
          {/* Brand Presentation Column (Takes up 2 spans for breathing room) */}
          <div className="md:col-span-2 space-y-6">
            <a href="/" className="flex items-center gap-4 group inline-flex">
              {/* Premium Squircle Logo Container with Double Glow Border */}
              <div className="bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-500 group-hover:scale-105 border border-gold/20 group-hover:border-gold/60 group-hover:shadow-[0_0_20px_rgba(201,162,39,0.15)]">
                <img
                  src={justLogo}
                  alt="TrustEdge Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white tracking-wide leading-none font-serif">
                  {Title?.TRUST}
                  <span className="text-gold font-sans ml-0.5">{Title?.EDGE}</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase mt-1.5">
                  Insurance Marketing LLP
                </span>
              </div>
            </a>
            
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Secure, simple, and affordable insurance for every Indian family — protecting today, securing tomorrow.
            </p>

            {/* Custom Premium WhatsApp Button with Reflective Gloss & Shadow Glow */}
            <div className="pt-2">
              <a
                href="https://wa.me/919773548537"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2.5 bg-gradient-to-r from-[#20ba5a] to-[#0ea647] hover:from-[#23c761] hover:to-[#10b84f] text-white text-sm font-semibold px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-[0_4px_20px_rgba(32,186,90,0.15)] hover:shadow-[0_6px_25px_rgba(32,186,90,0.3)] hover:-translate-y-1 hover:scale-[1.02] overflow-hidden group/btn"
              >
                {/* Button Gloss effect */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                <WhatsAppIcon />
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Quick Link Categories (Dynamic 4 columns) */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-6">
              <h3 className="text-white text-xs font-bold uppercase tracking-[0.15em] relative pb-2.5 border-b border-white/5 font-serif">
                {category}
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-gold" />
              </h3>
              <ul className="space-y-3.5">
                {links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  const LinkComponent = isExternal ? "a" : Link;
                  const linkProps = isExternal
                    ? { href: link.href, target: "_blank", rel: "noopener noreferrer" }
                    : { to: link.href };

                  return (
                    <li key={link.label}>
                      <LinkComponent
                        {...linkProps}
                        className="text-sm text-slate-400 hover:text-gold-light transition-all duration-300 hover:translate-x-1.5 inline-flex items-center gap-1.5 group/link"
                      >
                        {/* Interactive dot indicator that fades in on hover */}
                        <span className="w-1.5 h-1.5 rounded-full bg-gold opacity-0 group-hover/link:opacity-100 transition-all duration-300 -ml-2 group-hover/link:ml-0" />
                        <span>{link.label}</span>
                      </LinkComponent>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* TIER 2: Glassmorphic Contact Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Address Card */}
          <div className="flex gap-4 items-start p-5 rounded-3xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.03] hover:border-gold/20 transition-all duration-500 group/card">
            <div className="p-3 rounded-2xl bg-white/5 text-gold flex-shrink-0 group-hover/card:bg-gold/10 transition-all">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Office Address</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                D-121, Steel Chamber, Steel Market, Kalamboli, Navi Mumbai 410218
              </p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="flex gap-4 items-start p-5 rounded-3xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.03] hover:border-gold/20 transition-all duration-500 group/card">
            <div className="p-3 rounded-2xl bg-white/5 text-gold flex-shrink-0 group-hover/card:bg-gold/10 transition-all">
              <Phone className="w-5 h-5" />
            </div>
            <div className="space-y-2 w-full">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Call Advisor</h4>
              <div className="flex flex-col gap-1.5">
                <a href="tel:+919773548537" className="flex items-center justify-between text-xs text-slate-400 hover:text-white font-semibold bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl border border-white/5 transition-all">
                  <span>+91 97735 48537</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
                </a>
                <a href="tel:+919922554066" className="flex items-center justify-between text-xs text-slate-400 hover:text-white font-semibold bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl border border-white/5 transition-all">
                  <span>+91 99225 54066</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
                </a>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="flex gap-4 items-start p-5 rounded-3xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.03] hover:border-gold/20 transition-all duration-500 group/card">
            <div className="p-3 rounded-2xl bg-white/5 text-gold flex-shrink-0 group-hover/card:bg-gold/10 transition-all">
              <Mail className="w-5 h-5" />
            </div>
            <div className="space-y-2 w-full">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Email Support</h4>
              <a href="mailto:trustedgeimf@gmail.com" className="flex items-center justify-between text-xs text-slate-400 hover:text-white font-semibold bg-white/5 hover:bg-white/10 px-3 py-2.5 rounded-xl border border-white/5 transition-all">
                <span>trustedgeimf@gmail.com</span>
                <Mail className="w-3.5 h-3.5 opacity-40" />
              </a>
            </div>
          </div>

          {/* Hours Card */}
          <div className="flex gap-4 items-start p-5 rounded-3xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.03] hover:border-gold/20 transition-all duration-500 group/card">
            <div className="p-3 rounded-2xl bg-white/5 text-gold flex-shrink-0 group-hover/card:bg-gold/10 transition-all">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Working Hours</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Mon – Sat, 10:00 AM – 7:00 PM
              </p>
              <div className="inline-block bg-[#0e3b1c]/30 text-green-light text-[10px] font-bold px-2 py-0.5 rounded-md border border-green-light/20 mt-1">
                Open Now
              </div>
            </div>
          </div>
        </div>

        {/* TIER 3: Premium Copyright & Systems Operational Capsule */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium tracking-wide">
            © {currentYear} {FooterValues?.ALL_RIHT_RESERVED}
          </p>
          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-400 bg-white/5 px-4 py-2 rounded-full border border-white/5 shadow-inner">
            {/* Pulsing indicator with radial outer shadow */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-light opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-light"></span>
            </span>
            <span>{FooterValues?.ALL_SYSTEM_OPERATIONAL}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
