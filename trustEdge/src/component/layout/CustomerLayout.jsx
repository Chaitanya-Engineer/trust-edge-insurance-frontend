import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials, selectUser } from "../../store/slices/authSlice";
import {
  Home,
  ShieldCheck,
  User,
  Headphones,
  PhoneCall,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  LogOut,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import logoWithName from "../../assets/nav_trustedge.png";
import { mockCustomerProfile } from "../../pages/customer/constant";

export default function CustomerLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const user = useSelector(selectUser);
  const displayName = user?.name || mockCustomerProfile.name;
  const displayEmail = user?.email || mockCustomerProfile.email;
  const displayId = user?.customer_id || mockCustomerProfile.customerId;

  const getInitials = (name) => {
    if (!name) return "PM";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  const customerInitials = getInitials(displayName);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isInsideDesktop =
        desktopDropdownRef.current &&
        desktopDropdownRef.current.contains(event.target);
      const isInsideMobile =
        mobileDropdownRef.current &&
        mobileDropdownRef.current.contains(event.target);
      if (!isInsideDesktop && !isInsideMobile) {
        setDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(clearCredentials());
    navigate("/login");
  };

  // Exact 3 primary buttons for Mobile Bottom Bar as per strict requirement
  const mobileNavItems = [
    {
      name: "Home",
      path: "/customer",
      icon: Home,
      exact: true,
    },
    {
      name: "My Policy",
      path: "/customer/policies",
      icon: ShieldCheck,
      exact: false,
    },
    {
      name: "Profile",
      path: "/customer/profile",
      icon: User,
      exact: false,
    },
  ];

  // 4 items for Desktop Navigation (Home, My Policy, Profile, Support)
  const desktopNavItems = [
    {
      name: "Home",
      path: "/customer",
      icon: Home,
      exact: true,
    },
    {
      name: "My Policy",
      path: "/customer/policies",
      icon: ShieldCheck,
      exact: false,
    },
    {
      name: "Profile",
      path: "/customer/profile",
      icon: User,
      exact: false,
    },
    {
      name: "Support",
      path: "/customer/support",
      icon: Headphones,
      exact: false,
    },
  ];

  const isRouteActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  const renderDropdownMenu = (alignClass = "right-0") => (
    <div
      className={`absolute ${alignClass} top-full mt-2 w-64 sm:w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150`}
      role="menu"
      aria-orientation="vertical"
    >
      {/* Header Info */}
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/60 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0B2545] to-[#123E68] text-white flex items-center justify-center font-bold text-sm ring-2 ring-slate-100 shadow-xs flex-shrink-0">
            {customerInitials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#0B2545] truncate">
              {displayName}
            </p>
            <p className="text-xs text-slate-500 truncate font-mono">
              {displayId}
            </p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 border border-emerald-100 rounded-md w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wide">
            Verified Customer
          </span>
        </div>
      </div>

      {/* Menu Actions */}
      <div className="p-1.5 space-y-0.5">
        <button
          type="button"
          onClick={() => {
            setDropdownOpen(false);
            navigate("/customer/profile");
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium text-slate-700 hover:text-[#0B2545] hover:bg-[#EAF0F6]/70 transition-all cursor-pointer group"
          role="menuitem"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-white text-slate-600 group-hover:text-[#0B2545] flex items-center justify-center transition-colors shadow-2xs">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-800 group-hover:text-[#0B2545]">
              My Profile
            </p>
            <p className="text-[11px] text-slate-500">
              Personal details & KYC status
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setDropdownOpen(false);
            navigate("/customer/policies");
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium text-slate-700 hover:text-[#0B2545] hover:bg-[#EAF0F6]/70 transition-all cursor-pointer group"
          role="menuitem"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-white text-slate-600 group-hover:text-[#0B2545] flex items-center justify-center transition-colors shadow-2xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-800 group-hover:text-[#0B2545]">
              My Policies
            </p>
            <p className="text-[11px] text-slate-500">
              Active insurance & documents
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setDropdownOpen(false);
            navigate("/customer/support");
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium text-slate-700 hover:text-[#0B2545] hover:bg-[#EAF0F6]/70 transition-all cursor-pointer group"
          role="menuitem"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-white text-slate-600 group-hover:text-[#0B2545] flex items-center justify-center transition-colors shadow-2xs">
            <Headphones className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-800 group-hover:text-[#0B2545]">
              Help & Support
            </p>
            <p className="text-[11px] text-slate-500">
              24/7 dedicated helpline
            </p>
          </div>
        </button>
      </div>

      {/* Logout Action */}
      <div className="p-1.5 pt-1 border-t border-slate-100">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer group"
          role="menuitem"
        >
          <div className="w-8 h-8 rounded-lg bg-rose-50 group-hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors">
            <LogOut className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-rose-600">Log Out</p>
            <p className="text-[11px] text-rose-400">
              End your customer session
            </p>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col antialiased">
      {/* ── Solid Opaque Header (Zero bleed-through on scroll) ─────── */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link
                to="/customer"
                className="flex items-center gap-2 transition-opacity hover:opacity-90 py-1"
              >
                <img
                  src={logoWithName}
                  alt="TrustEdge Insurance"
                  className="h-12 md:h-[62px] w-auto object-contain transition-opacity hover:opacity-95"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {desktopNavItems.map((item) => {
                const active = isRouteActive(item);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "text-[#0B2545] bg-[#EAF0F6] font-bold"
                        : "text-slate-600 hover:text-[#0B2545] hover:bg-slate-50"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        active ? "text-[#0B2545]" : "text-slate-400"
                      }`}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side: Customer Info / Profile Dropdown (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
              <div className="relative" ref={desktopDropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 pl-4 border-l border-slate-200 hover:opacity-95 transition-opacity cursor-pointer group focus:outline-none"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  title="Account Menu"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0B2545] to-[#123E68] text-white flex items-center justify-center font-bold text-xs ring-2 ring-slate-100 shadow-2xs group-hover:ring-[#0B2545]/20 transition-all">
                    {customerInitials}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#0B2545] leading-tight flex items-center gap-1">
                      <span>{displayName}</span>
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono font-medium">
                      {displayId}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform duration-200 ml-1 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && renderDropdownMenu("right-0")}
              </div>
            </div>

            {/* Mobile Top Header Actions */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                to="/customer/support"
                className="p-2 text-slate-600 hover:text-[#0B2545] rounded-lg transition-colors"
                title="Customer Support"
                aria-label="Customer Support"
              >
                <Headphones className="w-5 h-5 text-slate-600" />
              </Link>

              <div className="relative" ref={mobileDropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0B2545] to-[#123E68] text-white flex items-center justify-center font-bold text-xs ring-2 ring-slate-100 cursor-pointer focus:outline-none active:scale-95 transition-transform"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  aria-label="Customer Profile Menu"
                  title="Profile & Settings"
                >
                  {customerInitials}
                </button>

                {dropdownOpen && renderDropdownMenu("right-0")}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content Area ────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 md:py-8 pb-24 md:pb-12">
        {children}
      </main>

      {/* ── Desktop Minimal Footer ───────────────────────────────── */}
      <footer className="hidden md:block bg-white border-t border-slate-200 py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} TrustEdge Insurance. All rights reserved.</p>
          <div className="flex items-center gap-6 font-medium">
            <Link to="/customer/support" className="hover:text-[#0B2545] transition-colors">
              Help & Support
            </Link>
            <Link to="/privacy" className="hover:text-[#0B2545] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#0B2545] transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>

      {/* ── Mobile Fixed Bottom Navigation (Strictly 3 Buttons) ─── */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 shadow-lg px-2 py-1.5 safe-area-pb"
      >
        <div className="grid grid-cols-3 gap-1 max-w-md mx-auto">
          {mobileNavItems.map((item) => {
            const active = isRouteActive(item);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-colors ${
                  active
                    ? "text-[#0B2545] font-bold"
                    : "text-slate-500 hover:text-slate-800 font-medium"
                }`}
              >
                <div
                  className={`relative p-1 rounded-md transition-colors ${
                    active ? "bg-[#EAF0F6]" : ""
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      active ? "text-[#0B2545]" : "text-slate-500"
                    }`}
                  />
                </div>
                <span className="text-[11px] mt-0.5 tracking-tight">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
