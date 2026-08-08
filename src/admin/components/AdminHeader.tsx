import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, User, Settings, LogOut, ChevronDown, ExternalLink } from "lucide-react";
import { NotificationDropdown } from "./NotificationDropdown";
import { useAdminAuth } from "../context/AdminAuthContext";

export interface AdminHeaderProps {
  onMobileMenuToggle: () => void;
  title?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onMobileMenuToggle,
  title = "Admin Dashboard"
}) => {
  const { adminUser, logout } = useAdminAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/admin/enrollments?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="h-16 bg-gray-950/90 border-b border-gray-800/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white"
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-base sm:text-lg font-bold text-white tracking-tight truncate max-w-xs sm:max-w-md">
          {title}
        </h1>
      </div>

      {/* Center/Right Actions */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        
        {/* Global Quick Search Form */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:block relative w-64">
          <InputSearch
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* View Public Website Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-800 text-xs font-semibold text-gray-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
          title="Open Public Website in New Tab"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {/* Notifications Dropdown */}
        <NotificationDropdown />

        {/* Admin Avatar & Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center space-x-2.5 p-1.5 rounded-xl hover:bg-gray-900 border border-transparent hover:border-gray-800 transition-colors focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-500/30 bg-gray-900 shrink-0">
              <img
                src={adminUser?.avatarUrl || "/logo.jpeg"}
                alt="Admin Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-gray-200 leading-none">{adminUser?.name || "Admin"}</span>
              <span className="text-[10px] font-mono text-gray-400 leading-tight mt-0.5">{adminUser?.role || "Administrator"}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl z-30 overflow-hidden py-1">
                <div className="px-4 py-3 border-b border-gray-800 bg-gray-950/60">
                  <p className="text-xs font-bold text-white">{adminUser?.name}</p>
                  <p className="text-[11px] text-gray-400 font-mono truncate">{adminUser?.email}</p>
                </div>

                <Link
                  to="/admin/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center space-x-2.5 px-4 py-2.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-800/80 transition-colors"
                >
                  <User className="w-4 h-4 text-cyan-400" />
                  <span>Admin Profile</span>
                </Link>

                <Link
                  to="/admin/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center space-x-2.5 px-4 py-2.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-800/80 transition-colors"
                >
                  <Settings className="w-4 h-4 text-purple-400" />
                  <span>Site Settings</span>
                </Link>

                <div className="border-t border-gray-800 my-1" />

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center space-x-2.5 px-4 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>

      </div>

    </header>
  );
};

const InputSearch: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ value, onChange }) => (
  <div className="relative">
    <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
    <input
      type="text"
      placeholder="Search admin data..."
      value={value}
      onChange={onChange}
      className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono transition-colors"
    />
  </div>
);
