import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import logoWithName from "../../assets/nav_trustedge.png";
import { categoriesList } from "../../data/insuranceContent";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileInsuranceOpen, setMobileInsuranceOpen] = useState(false);
  const location = useLocation();

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMenuOpen(false);
    setMobileInsuranceOpen(false);
  }, [location.pathname]);

  return (
    <header className="bg-white w-full shadow-sm sticky top-0 z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Name */}
          <Link to="/" className="flex items-center gap-2 group overflow-visible">
            <img
              src={logoWithName}
              alt="TrustEdge Insurance"
              className="h-16 md:h-[74px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors relative py-1 ${
                location.pathname === "/" ? "text-navy font-bold" : "text-slate-600 hover:text-navy"
              }`}
            >
              Home
              {location.pathname === "/" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full" />
              )}
            </Link>

            <Link
              to="/about"
              className={`text-sm font-semibold transition-colors relative py-1 ${
                location.pathname === "/about" ? "text-navy font-bold" : "text-slate-600 hover:text-navy"
              }`}
            >
              About Us
              {location.pathname === "/about" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full" />
              )}
            </Link>

            {/* Insurance Mega-Dropdown (Desktop) */}
            <div 
              className="relative py-4"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="flex items-center gap-1 cursor-pointer">
                <Link
                  to="/insurance"
                  className={`text-sm font-semibold transition-colors ${
                    location.pathname.startsWith("/insurance") ? "text-navy font-bold" : "text-slate-600 hover:text-navy"
                  }`}
                >
                  Insurance
                </Link>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180 text-navy" : ""}`} />
              </div>
              
              {location.pathname.startsWith("/insurance") && (
                <span className="absolute bottom-3 left-0 w-full h-0.5 bg-gold rounded-full" />
              )}

              {/* Desktop Dropdown Panel */}
              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Insurance Solutions</span>
                    <Link 
                      to="/insurance" 
                      className="text-xs font-bold text-gold hover:text-navy flex items-center gap-1 transition-colors"
                    >
                      Explore All Insurance <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {categoriesList.map((cat) => {
                      const IconComponent = cat.icon;
                      return (
                        <Link
                          key={cat.id}
                          to={`/insurance/${cat.id}`}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center shrink-0 group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                            <IconComponent className="w-5 h-5 text-navy group-hover:text-gold transition-colors" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-navy group-hover:text-gold transition-colors">{cat.name}</p>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{cat.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className={`text-sm font-semibold transition-colors relative py-1 ${
                location.pathname === "/contact" ? "text-navy font-bold" : "text-slate-600 hover:text-navy"
              }`}
            >
              Contact Us
              {location.pathname === "/contact" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full" />
              )}
            </Link>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="block text-center px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Login
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-700 hover:text-navy hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg max-h-[85vh] overflow-y-auto">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              location.pathname === "/" ? "bg-navy/5 text-navy font-bold border-l-4 border-gold" : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              location.pathname === "/about" ? "bg-navy/5 text-navy font-bold border-l-4 border-gold" : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            About Us
          </Link>

          {/* Mobile Collapsible Insurance Accordion */}
          <div>
            <div 
              onClick={() => setMobileInsuranceOpen(!mobileInsuranceOpen)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-colors ${
                location.pathname.startsWith("/insurance") ? "bg-navy/5 text-navy font-bold border-l-4 border-gold" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>Insurance</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileInsuranceOpen ? "rotate-180 text-navy" : ""}`} />
            </div>

            {/* Mobile Sub-menu Items */}
            {mobileInsuranceOpen && (
              <div className="mt-1 ml-4 pl-3 border-l-2 border-slate-200 space-y-1 py-1">
                <Link
                  to="/insurance"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-bold text-gold hover:bg-slate-50"
                >
                  Explore All Insurance →
                </Link>
                {categoriesList.map((cat) => {
                  const IconComp = cat.icon;
                  return (
                    <Link
                      key={cat.id}
                      to={`/insurance/${cat.id}`}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        location.pathname === `/insurance/${cat.id}` ? "text-navy font-bold bg-slate-100" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <IconComp className="w-4 h-4 text-navy shrink-0" />
                      <span>{cat.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              location.pathname === "/contact" ? "bg-navy/5 text-navy font-bold border-l-4 border-gold" : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            Contact Us
          </Link>

          <div className="pt-3">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-center px-4 py-3 rounded-xl bg-navy hover:bg-navy-light text-white text-sm font-bold shadow-md transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
