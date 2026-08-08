import React from "react";

export interface LoadingStateProps {
  rows?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ rows = 5 }) => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 bg-gray-900 rounded-xl border border-gray-800 w-full" />
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="h-14 bg-gray-900/60 rounded-xl border border-gray-800/80 w-full" />
      ))}
    </div>
  );
};
