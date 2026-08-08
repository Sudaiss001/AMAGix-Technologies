import React, { useState } from "react";
import { Bell, Check, UserPlus, Mail, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: "n1",
      title: "New Student Enrollment",
      desc: "Amina Mohammed submitted application for Full-Stack Web Development.",
      time: "10 mins ago",
      read: false,
      link: "/admin/enrollments",
      icon: <UserPlus className="w-4 h-4 text-cyan-400" />
    },
    {
      id: "n2",
      title: "New Message Received",
      desc: "Inquiry regarding custom POS solution from Zenith Retail.",
      time: "1 hour ago",
      read: false,
      link: "/admin/messages",
      icon: <Mail className="w-4 h-4 text-emerald-400" />
    },
    {
      id: "n3",
      title: "Security Header Audit",
      desc: "CyberShield Security Suite completed automated endpoint check.",
      time: "3 hours ago",
      read: true,
      link: "/admin/projects",
      icon: <ShieldAlert className="w-4 h-4 text-purple-400" />
    }
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-cyan-500/40 transition-colors focus:outline-none"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-gray-900 animate-pulse" />
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl z-30 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-950/80">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    {unreadCount} New
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" /> Mark read
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-gray-800/60">
              {notifications.map((n) => (
                <Link
                  key={n.id}
                  to={n.link}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-start gap-3 p-3.5 hover:bg-gray-800/50 transition-colors ${
                    !n.read ? "bg-cyan-500/5" : ""
                  }`}
                >
                  <div className="p-2 rounded-xl bg-gray-950 border border-gray-800 shrink-0">
                    {n.icon}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-gray-200">{n.title}</h5>
                      <span className="text-[10px] font-mono text-gray-500">{n.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{n.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="p-2 text-center border-t border-gray-800 bg-gray-950/60">
              <span className="text-[10px] font-mono text-gray-500">Demo Administrative Notifications</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
