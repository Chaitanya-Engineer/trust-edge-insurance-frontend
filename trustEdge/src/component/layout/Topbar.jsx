import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials, selectUser } from "../../store/slices/authSlice";

export default function Topbar({ onToggleSidebar, isSidebarCollapsed }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector(selectUser);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="h-[72px] bg-white border-b border-[#E5E9E7] flex items-center justify-between px-4 lg:px-6 z-20">
      {/* Left — Unified Universal Hamburger Toggle + Greeting */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Universal Toggle Button (Google / Microsoft Standard ☰) */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-[#0B2545] hover:bg-[#EAF0F6] transition-colors cursor-pointer focus:outline-none"
          title={
            isSidebarCollapsed ? "Expand Navigation" : "Collapse Navigation"
          }
        >
          <svg
            className="w-5 h-5"
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
        </button>

        {/* Greeting + Date */}
        <div className="flex items-center gap-2">
          <span className="text-[14px] sm:text-[15px] font-bold text-[#0B2545] tracking-tight">
            {getGreeting()}, {user?.name?.split(" ")[0] || "Admin"} 👋
          </span>
          <span className="hidden sm:inline text-xs text-[#667085] font-normal">
            •
          </span>
          <span className="hidden sm:inline text-[12px] text-[#667085] font-normal">
            {today}
          </span>
        </div>
      </div>

      {/* Right — Notifications + Profile Dropdown */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        {/* <button
          type="button"
          className="relative p-2.5 rounded-lg text-[#718096] hover:bg-[#F4F7F6] transition-colors"
        >
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#B42318] rounded-full"></span>
        </button> */}

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 px-2.5 py-1.5 rounded-lg hover:bg-[#F4F7F6] transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 bg-[#0B2545] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">
                {getInitials(user?.name)}
              </span>
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-[14px] font-semibold text-[#0B2545] leading-tight">
                {user?.name || "Admin"}
              </p>
              <p className="text-[11px] text-[#667085] mt-0.5">Administrator</p>
            </div>

            <svg
              className={`w-4 h-4 text-[#667085] transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-[#E5E9E7] py-1 z-50">
              <div className="px-4 py-2 border-b border-[#E5E9E7]">
                <p className="text-sm font-semibold text-[#0B2545]">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-[#667085] truncate">
                  {user?.email || "admin@trustedge.com"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/admin/settings");
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[#0B2545] hover:bg-[#F4F7F6] transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-[#667085]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[#B42318] hover:bg-[#FDECEC] transition-colors font-medium cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
