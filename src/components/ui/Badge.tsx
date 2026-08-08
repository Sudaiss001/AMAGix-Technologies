import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps {
  variant?: "cyan" | "emerald" | "purple" | "gray" | "outline";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "cyan",
  size = "sm",
  children,
  className
}) => {
  const variants = {
    cyan: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    purple: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    gray: "bg-gray-800/80 text-gray-300 border border-gray-700/60",
    outline: "bg-transparent text-gray-300 border border-gray-700"
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs font-medium rounded-full",
    md: "px-3 py-1 text-xs font-semibold rounded-lg"
  };

  return (
    <span className={twMerge(clsx("inline-flex items-center gap-1.5 shrink-0 select-none", variants[variant], sizes[size], className))}>
      {children}
    </span>
  );
};
