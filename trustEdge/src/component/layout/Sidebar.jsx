import { Link, useLocation } from "react-router-dom";
import justLogo from "../../assets/just_logo.svg";

const navItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    label: "User Dashboard",
    path: "/admin/user-dashboard",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    label: "Policies",
    path: "/admin/policies",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

export default function Sidebar({ isOpen, isCollapsed, onClose }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Drawer Backdrop (Google/Microsoft Standard) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white z-40 border-r border-[#E5E9E7]
          transform transition-all duration-300 ease-in-out flex flex-col justify-between
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
          ${isCollapsed ? "lg:w-20 w-64" : "lg:w-64 w-64"}
        `}
      >
        <div>
          {/* Logo Header */}
          <div className="flex items-center gap-3 px-5 h-[72px] border-b border-[#E5E9E7] bg-white">
            <img
              src={justLogo}
              alt="TrustEdge Logo"
              className="w-9 h-9 object-contain flex-shrink-0"
            />
            {!isCollapsed && (
              <div className="transition-opacity duration-200">
                <p className="font-extrabold text-[16px] tracking-tight leading-none font-sans text-nowrap">
                  <span className="text-[#0B2545]">Trust</span>
                  <span className="text-[#2F6F3E]">Edge</span>
                </p>
                <p className="text-[#667085] text-[10px] tracking-wide uppercase font-semibold mt-1 text-nowrap">
                  Admin Panel
                </p>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-4 flex flex-col gap-1 bg-white">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  title={isCollapsed ? item.label : undefined}
                  className={`
                    relative flex items-center gap-3 px-3.5 py-3 rounded-[9px] text-[14px] font-medium
                    transition-colors duration-150 overflow-hidden group
                    ${
                      active
                        ? "bg-[#EAF0F6] text-[#0B2545]"
                        : "text-[#52627A] hover:bg-[#F4F7F6] hover:text-[#0B2545]"
                    }
                    ${isCollapsed ? "lg:justify-center" : ""}
                  `}
                >
                  {/* Left Active Indicator Bar (Microsoft Standard) */}
                  {active && (
                    <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#2F6F3E]" />
                  )}
                  <span
                    className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      active
                        ? "text-[#0B2545]"
                        : "text-[#718096] group-hover:text-[#0B2545]"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span className="text-nowrap">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Version */}
        <div className="px-4 py-4 border-t border-[#E5E9E7] bg-white text-center">
          <p className="text-[#667085] text-xs font-medium">
            {isCollapsed ? "v1.0" : "Version 1.0.0"}
          </p>
        </div>
      </aside>
    </>
  );
}
