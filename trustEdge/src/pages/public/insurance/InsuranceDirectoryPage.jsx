import { Link } from "react-router-dom";
import {
  ArrowRight, ShieldCheck, Users, Building2,
  FileCheck, FileText, Headset, CheckCircle2
} from "lucide-react";
import { categoriesList } from "../../../data/insuranceContent";
import mainInsuranceHero from "../../../assets/main_insurance_hero.png";

export default function InsuranceDirectoryPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">

      {/* 1. HERO SECTION (Clean 2-Column Framed Photo Layout) */}
      <section className="relative pt-10 pb-14 lg:pt-14 lg:pb-16 overflow-hidden bg-navy">
        {/* Subtle Ambient Pattern & Glow */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-block px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold-light text-sm font-semibold tracking-wider backdrop-blur-md">
                TRUSTEDGE INSURANCE
              </span>

              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Insurance Solutions for Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">Stage of Life</span>
              </h1>

              {/* Mobile Hero Image Card (Visible on mobile, hidden on desktop) */}
              <div className="lg:hidden relative rounded-2xl p-1 bg-gradient-to-b from-white/20 to-transparent border border-white/20 shadow-xl overflow-hidden my-3">
                <div className="overflow-hidden rounded-xl relative aspect-[16/9]">
                  <img
                    src={mainInsuranceHero}
                    alt="TrustEdge Insurance"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <p className="text-sm sm:text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed">
                Protect your health, family, vehicle, business, and property with trusted insurance solutions. Explore our insurance categories and request a personalized quote from our advisors.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-navy font-bold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <a
                  href="#categories"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                >
                  Explore Categories
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-90" />
                </a>
              </div>
            </div>

            {/* Right Column: Framed High-Res Full-Color Image Card (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative rounded-3xl p-2.5 bg-gradient-to-b from-white/20 via-white/10 to-transparent border border-white/20 shadow-2xl group overflow-hidden">
                <div className="overflow-hidden rounded-2xl relative aspect-[4/3]">
                  <img
                    src={mainInsuranceHero}
                    alt="TrustEdge Insurance"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. INSURANCE CATEGORIES (Overview Grid) */}
      <section id="categories" className="py-10 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-2 sm:mb-4">Explore Insurance Categories</h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">Discover comprehensive protection tailored to your personal and business needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categoriesList.map((cat) => (
              <Link to={`/insurance/${cat.id}`} key={cat.id} className="group block h-full">
                <div className="h-full bg-slate-50 border border-slate-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-white hover:border-gold/30 hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.15)] transition-all duration-300 relative overflow-hidden flex flex-col">

                  {/* Glass highlight effect */}
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-colors"></div>

                  {/* Image Banner */}
                  <div className="w-full h-44 rounded-2xl overflow-hidden mb-6 relative border border-slate-100 shadow-sm">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center">
                      <cat.icon className="w-5 h-5 text-navy" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-navy-light transition-colors">{cat.name}</h3>
                  <p className="text-slate-600 mb-6 flex-grow">{cat.desc}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 mt-auto">
                    <span className="text-sm font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{cat.count} {cat.count === 1 ? 'Type' : 'Types'}</span>
                    <span className="text-gold font-semibold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Explore <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE TRUSTEDGE */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose TrustEdge</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">We prioritize your peace of mind through expert advice and seamless service.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Expert Insurance Advisors", desc: "Professional guidance to help you choose the right coverage." },
              { icon: Building2, title: "Multiple Partners", desc: "We work with top-rated insurance providers." },
              { icon: FileCheck, title: "Personalized Quote", desc: "Solutions tailored to your unique requirements." },
              { icon: FileText, title: "Fast Documentation", desc: "Hassle-free and digitized paperwork processing." },
              { icon: ShieldCheck, title: "Claim Assistance", desc: "End-to-end support during the entire claim process." },
              { icon: Headset, title: "Customer Support", desc: "Dedicated team available to resolve your queries." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <feature.icon className="w-10 h-10 text-gold mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INSURANCE PROCESS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">How It Works</h2>
            <p className="text-slate-500">A seamless process to get you insured securely.</p>
          </div>

          <div className="relative">
            {/* Horizontal Line for Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4 relative z-10">
              {[
                { step: "1", title: "Choose Category", icon: ShieldCheck },
                { step: "2", title: "Talk to Advisor", icon: Headset },
                { step: "3", title: "Receive Quote", icon: FileText },
                { step: "4", title: "Complete Docs", icon: FileCheck },
                { step: "5", title: "Purchase Policy", icon: CheckCircle2 },
                { step: "6", title: "Receive Policy", icon: FileText }
              ].map((process, idx) => (
                <div key={idx} className="flex flex-col items-center text-center bg-white lg:bg-transparent p-6 lg:p-0 rounded-2xl lg:rounded-none shadow-sm lg:shadow-none border border-slate-100 lg:border-none">
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-slate-50 shadow-md flex items-center justify-center mb-4 relative z-10 group hover:border-gold transition-colors">
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-gold text-navy text-xs font-bold rounded-full flex items-center justify-center">{process.step}</span>
                    <process.icon className="w-7 h-7 text-navy" />
                  </div>
                  <h4 className="font-bold text-navy text-sm">{process.title}</h4>

                  {/* Vertical line for mobile */}
                  {idx < 5 && (
                    <div className="h-8 w-px bg-slate-200 my-2 lg:hidden"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-8 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-navy to-navy-light rounded-2xl md:rounded-[2.5rem] p-6 sm:p-10 md:p-16 text-center text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

          <div className="relative z-10">
            <h2 className="text-xl sm:text-3xl md:text-5xl font-extrabold mb-3 sm:mb-6 leading-tight">Need help choosing the right insurance?</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed">
              Our expert advisors will understand your requirements and recommend the best insurance solutions from our trusted partner insurers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gold hover:bg-yellow-500 text-navy font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Get Free Quote
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
