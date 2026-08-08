import React from "react";
import { Badge } from "./Badge";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SectionHeadingProps {
  badgeText?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badgeText,
  title,
  subtitle,
  centered = true,
  className
}) => {
  return (
    <div className={twMerge(clsx("space-y-3 mb-12", centered ? "text-center mx-auto max-w-3xl" : "max-w-2xl", className))}>
      {badgeText && (
        <Badge variant="cyan" size="md">
          {badgeText}
        </Badge>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
