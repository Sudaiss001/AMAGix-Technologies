import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  GraduationCap, 
  Mail, 
  BookOpen, 
  Briefcase, 
  Star, 
  Award, 
  Sliders, 
  User, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  X
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

export interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileClose
}) => {
  const location = useLocation();
  const { logout } = useAdminAuth();

  const navigationGroups = [
    {
      group: "Overview",
      items: [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard }
      ]
    },
    {
      group: "Management",
      items: [
        { name: "Enrollments", path: "/admin/enrollments", icon: GraduationCap },
        { name: "Messages", path: "/admin/messages", icon: Mail },
        { name: "Courses", path: "/admin/courses", icon: BookOpen },
        { name: "Projects", path: "/admin/projects", icon: Briefcase },
        { name: "Testimonials", path: "/admin/testimonials", icon: Star },
        { name: "Certifications", path: "/admin/certifications", icon: Award }
      ]
    },
    {
      group: "Website",
      items: [
        { name: "Site Settings", path: "/admin/settings", icon: Sliders }
      ]
    },
    {
      group: "Account",
      items: [
        { name: "Profile", path: "/admin/profile", icon: User }
      ]
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-gray-950 border-r border-gray-800/80 text-gray-400 select-none">
      
      {/* Brand Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-800/80 h-16 shrink-0">
        <Link to="/admin" className="flex items-center space-x-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-cyan-500/30 bg-gray-900 shadow-md shrink-0">
            <img src="/logo.jpeg" alt="AMAGix Admin Logo" className="w-full h-full object-cover" />
          </div>
          {(!isCollapsed || mobileOpen) && (
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-white leading-none">
                AMAGix<span className="text-cyan-400">.</span>
              </span>
              <span className="text-[9px] uppercase font-mono tracking-widest text-cyan-400/80 font-bold leading-tight mt-0.5">
                Admin Control
              </span>
            </div>
          )}
        </Link>

        {/* Mobile Close Button */}
        {mobileOpen && (
          <button
            onClick={onMobileClose}
            className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-white bg-gray-900 border border-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {navigationGroups.map((group) => (
          <div key={group.group} className="space-y-1">
            {(!isCollapsed || mobileOpen) && (
              <h4 className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-1">
                {group.group}
              </h4>
            )}

            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== "/admin" && location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onMobileClose}
                  title={isCollapsed ? item.name : undefined}
                  className={`flex items-center px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold shadow-md shadow-cyan-500/5"
                      : "text-gray-400 hover:text-gray-200 hover:bg-gray-900/80"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-cyan-400" : "text-gray-500"}`} />
                  {(!isCollapsed || mobileOpen) && (
                    <span className="ml-3 truncate">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer / Collapse Toggle & Logout */}
      <div className="p-3 border-t border-gray-800/80 space-y-2 shrink-0 bg-gray-950">
        <button
          onClick={logout}
          className={`w-full flex items-center px-3 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all ${
            isCollapsed && !mobileOpen ? "justify-center" : ""
          }`}
          title="Logout of Admin Panel"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {(!isCollapsed || mobileOpen) && <span className="ml-3 font-semibold">Logout</span>}
        </button>

        {/* Desktop Sidebar Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex w-full items-center justify-between px-3 py-2 rounded-lg text-xs text-gray-500 hover:text-gray-300 hover:bg-gray-900 transition-colors"
          aria-label="Toggle Sidebar Collapse"
        >
          {(!isCollapsed || mobileOpen) && <span className="font-mono text-[10px]">COLLAPSE</span>}
          {isCollapsed ? <ChevronRight className="w-4 h-4 mx-auto" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block fixed top-0 left-0 bottom-0 z-40 transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Animated Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 z-10"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
