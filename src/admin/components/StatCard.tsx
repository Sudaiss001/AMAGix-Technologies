import React from "react";
import { Card } from "../../components/ui/Card";

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  variant?: "cyan" | "emerald" | "purple" | "amber";
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  variant = "cyan"
}) => {
  const getIconContainerStyle = () => {
    switch (variant) {
      case "emerald":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "purple":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "amber":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    }
  };

  return (
    <Card hoverable={false} className="p-5 bg-gray-900/80 border-gray-800/80">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-mono font-medium uppercase tracking-wider text-gray-400">{title}</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{value}</p>
          {change && (
            <p className="text-[11px] font-mono text-cyan-400/90 font-medium">{change}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl border ${getIconContainerStyle()}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};
