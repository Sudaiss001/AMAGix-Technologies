import React from "react";

export interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "sm" }) => {
  const getColors = () => {
    switch (status) {
      case "New":
      case "Unread":
      case "Pending":
      case "In Development":
        return "bg-cyan-500/15 text-cyan-400 border-cyan-500/30";
      case "Enrolled":
      case "Published":
      case "Replied":
      case "Approved":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "Reviewing":
      case "Read":
      case "Contacted":
        return "bg-purple-500/15 text-purple-400 border-purple-500/30";
      case "Rejected":
      case "Archived":
        return "bg-red-500/15 text-red-400 border-red-500/30";
      case "Draft":
        return "bg-gray-500/15 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-800 text-gray-300 border-gray-700";
    }
  };

  const sizeClasses = size === "sm" ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs";

  return (
    <span className={`inline-flex items-center font-mono font-semibold rounded-full border ${getColors()} ${sizeClasses}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {status}
    </span>
  );
};
