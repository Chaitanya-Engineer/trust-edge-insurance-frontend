import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import logoWithName from "../../assets/logo_wiith_namee.svg";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Plans", href: "/plans" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-semibold transition-colors relative py-1 ${isActive
                    ? "text-navy font-bold"
                    : "text-slate-600 hover:text-navy"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full" />
                  )}
                </Link>
              );
            })}
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
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${isActive
                  ? "bg-navy/5 text-navy font-bold border-l-4 border-gold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-navy"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
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

