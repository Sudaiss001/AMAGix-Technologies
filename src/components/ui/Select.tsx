import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<string | SelectOption>;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder = "Select an option", className, id, required, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
            {label} {required && <span className="text-cyan-400">*</span>}
          </label>
        )}
        <div className="relative rounded-xl">
          <select
            ref={ref}
            id={selectId}
            required={required}
            className={twMerge(
              clsx(
                "w-full appearance-none rounded-xl bg-gray-900/90 border text-gray-100 px-4 py-3 pr-10 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed",
                error ? "border-red-500/80 focus:ring-red-500/50 focus:border-red-500" : "border-gray-800 hover:border-gray-700",
                className
              )
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="bg-gray-900 text-gray-500">
                {placeholder}
              </option>
            )}
            {options.map((option) => {
              const val = typeof option === "string" ? option : option.value;
              const lbl = typeof option === "string" ? option : option.label;
              return (
                <option key={val} value={val} className="bg-gray-900 text-gray-200">
                  {lbl}
                </option>
              );
            })}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
