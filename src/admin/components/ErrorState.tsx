import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../../components/ui/Button";

export interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Unable to load administrative data.",
  onRetry
}) => {
  return (
    <div className="p-8 text-center rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 space-y-4 max-w-lg mx-auto">
      <div className="p-3 rounded-full bg-red-500/20 text-red-400 w-fit mx-auto">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h4 className="text-base font-bold text-white">Administrative Fetch Error</h4>
        <p className="text-xs text-red-200">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
          Try Again
        </Button>
      )}
    </div>
  );
};
