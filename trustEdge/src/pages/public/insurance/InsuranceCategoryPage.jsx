import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  ChevronDown, ChevronUp, ArrowRight, ShieldCheck, CheckCircle2,
  Users, Headset, FileText, ChevronRight
} from "lucide-react";
import { insuranceContent } from "../../../data/insuranceContent";

function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
      >
        <h3 className="font-bold text-navy pr-4">{faq.q}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gold shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
        )}
      </button>
      <div
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
      </div>
    </div>
  );
}

export default function InsuranceCategoryPage() {
  const { categoryId } = useParams();
  const category = insuranceContent[categoryId] || Object.values(insuranceContent).find(c => c.slug === categoryId || c.slug.toLowerCase() === categoryId?.toLowerCase());

  // Simple SEO updates
  useEffect(() => {
    if (category) {
      document.title = category.seoTitle || `${category.title} | TrustEdge Insurance`;
      // Optionally find and update meta description if it exists
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", category.seoDescription);
      }
    }
  }, [category]);

  // Handle 404 gracefully
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
        <h1 className="text-4xl font-extrabold text-navy mb-4">Category Not Found</h1>
        <p className="text-slate-600 mb-8">The insurance category you are looking for does not exist.</p>
        <Link to="/insurance" className="px-6 py-3 bg-navy text-white font-bold rounded-xl hover:bg-navy-light transition-colors">
          Return to Insurance Directory
        </Link>
      </div>
    );
  }

  const IconComp = category.icon;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">

      {/* 1. HERO SECTION (Clean 2-Column Framed Photo Layout) */}
      <section className="relative pt-10 pb-14 lg:pt-14 lg:pb-16 overflow-hidden bg-navy">
        {/* Subtle Ambient Pattern & Glow */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex text-sm text-slate-300 font-medium mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <Link to="/insurance" className="hover:text-gold transition-colors">Insurance</Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1 text-slate-400" />
                  <span className="text-white font-bold">{category.title}</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold-light text-sm font-semibold backdrop-blur-md">
                <IconComp className="w-4 h-4 text-gold" />
                <span>{category.hero.badgeText || `TRUSTEDGE ${category.title.toUpperCase()}`}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                {category.title}
              </h1>

              {/* Mobile Hero Image Card (Visible on mobile, hidden on desktop) */}
              <div className="lg:hidden relative rounded-2xl p-1.5 bg-gradient-to-b from-white/20 to-transparent border border-white/20 shadow-xl overflow-hidden my-4">
                <div className="overflow-hidden rounded-xl relative aspect-[16/9]">
                  <img
                    src={category.hero.bgImage}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed">
                {category.hero.subtitle}
              </p>

              {/* Feature Badges */}
              {category.hero.highlights && category.hero.highlights.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
                  {category.hero.highlights.map((highlight, hIdx) => (
                    <span key={hIdx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md text-xs font-semibold text-slate-100 border border-white/15 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold" /> {highlight}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-navy font-bold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Request a Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Framed High-Res Full-Color Image Card (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative rounded-3xl p-2.5 bg-gradient-to-b from-white/20 via-white/10 to-transparent border border-white/20 shadow-2xl group overflow-hidden">
                <div className="overflow-hidden rounded-2xl relative aspect-[4/3]">
                  <img
                    src={category.hero.bgImage}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OVERVIEW, BENEFITS & WHO SHOULD BUY */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left Content */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-gold" /> Overview
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">{category.overview}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-gold" /> Who Should Buy It?
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">{category.whoShouldBuy}</p>
              </div>
            </div>

            {/* Right Content: Benefits Card */}
            <div className="bg-navy rounded-2xl p-8 text-white shadow-xl relative overflow-hidden h-fit">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px] pointer-events-none"></div>
              <h3 className="text-xl font-bold text-gold-light mb-6 border-b border-white/10 pb-4">Key Benefits</h3>
              <ul className="space-y-4">
                {category.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-gold shrink-0 mt-0.5" />
                    <span className="text-slate-200 leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 3. INSURANCE TYPES (Dynamic Centered Grid Alignment) */}
      {category.insuranceTypes.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-navy mb-10 text-center">Types of {category.title}</h2>
            
            <div className={
              category.insuranceTypes.length === 1
                ? "max-w-2xl mx-auto"
                : category.insuranceTypes.length === 2 || category.insuranceTypes.length === 4
                ? "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                : "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
            }>
              {category.insuranceTypes.map((type, idx) => (
                <div key={idx} className="bg-white border border-slate-200 hover:border-gold/50 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-colors"></div>

                  <h3 className="text-2xl font-bold text-navy mb-3">{type.name}</h3>
                  <p className="text-slate-500 mb-6 flex-grow">{type.shortDescription}</p>

                  <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-100">
                    <p className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-4">Key Features</p>
                    <ul className="space-y-3">
                      {type.keyBenefits.map((ben, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                          <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                          {ben}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/contact"
                    className="mt-auto w-full py-4 bg-navy hover:bg-navy-light text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Get Free Quote <ArrowRight className="w-5 h-5 text-gold" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. DOCUMENTS & CLAIM PROCESS */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Documents */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-gold" /> Required Documents
              </h2>
              <ul className="space-y-4">
                {category.requiredDocuments.map((doc, i) => (
                  <li key={i} className="flex items-center gap-3 bg-slate-50 px-5 py-4 rounded-xl border border-slate-100">
                    <div className="w-2 h-2 rounded-full bg-gold shrink-0"></div>
                    <span className="text-slate-700 font-medium">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Claim Process */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-gold" /> Claim Process
              </h2>
              <div className="space-y-6 relative border-l-2 border-gold/30 ml-4 pl-8">
                {category.claimProcess.map((step, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-white border-2 border-gold flex items-center justify-center text-xs font-bold text-navy">
                      {i + 1}
                    </div>
                    <p className="text-slate-700 font-medium pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FAQS */}
      {category.faqs && category.faqs.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-navy mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {category.faqs.map((faq, idx) => (
                <FAQItem key={idx} faq={faq} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. RELATED CATEGORIES */}
      {category.relatedCategories && category.relatedCategories.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy mb-8">Related Insurance</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {category.relatedCategories.map(relatedId => {
                const relatedCat = insuranceContent[relatedId] || Object.values(insuranceContent).find(c => c.slug === relatedId);
                if (!relatedCat) return null;
                const RelIcon = relatedCat.icon;
                return (
                  <Link to={`/insurance/${relatedCat.slug}`} key={relatedId} className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200 hover:border-gold hover:shadow-md transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                      <RelIcon className="w-6 h-6 text-navy group-hover:text-gold" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy group-hover:text-gold transition-colors">{relatedCat.title}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">Explore <ArrowRight className="w-3 h-3" /></p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 7. FINAL CTA */}
      <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-navy to-navy-light rounded-2xl md:rounded-[2.5rem] p-6 sm:p-10 md:p-14 text-center text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

          <div className="relative z-10">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold mb-2.5 sm:mb-4 leading-tight">Ready to secure your future?</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-6">
              Get a personalized {category.title.toLowerCase()} quote tailored to your exact needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-gold hover:bg-yellow-500 text-navy font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Get Free Quote
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
              >
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
