import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { AdminHeader } from "./AdminHeader";
import { useAdminAuth } from "../context/AdminAuthContext";

export interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title = "Admin Dashboard" }) => {
  const { isAuthenticated } = useAdminAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Guard: Redirect unauthenticated requests to /admin/login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-gray-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Sidebar Navigation */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main Content Area (Offset by sidebar width on desktop) */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isCollapsed ? "md:ml-16" : "md:ml-64"
        }`}
      >
        {/* Top Header Bar */}
        <AdminHeader
          title={title}
          onMobileMenuToggle={() => setMobileOpen(!mobileOpen)}
        />

        {/* Dynamic Page Body Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>

        {/* Footer Bar */}
        <footer className="py-4 px-6 border-t border-gray-800/60 bg-gray-950/60 text-center text-xs text-gray-500 font-mono">
          © {new Date().getFullYear()} AMAGix Technologies Admin Portal • Minna, Niger State, Nigeria
        </footer>
      </div>

    </div>
  );
};
