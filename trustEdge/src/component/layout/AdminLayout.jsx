import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({ children }) {
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setSidebarMobileOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarMobileOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setSidebarMobileOpen(false)}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      {/* Main Content — Right Side */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#FFFFFF]">
        {/* Topbar */}
        <Topbar
          onToggleSidebar={handleToggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-[#F4F7F6] transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
