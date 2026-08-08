import React from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "../../components/ui/Button";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No records found",
  description = "There are currently no items to display in this list.",
  actionText,
  onAction,
  icon
}) => {
  return (
    <div className="py-16 px-6 text-center rounded-2xl bg-gray-900/40 border border-dashed border-gray-800 flex flex-col items-center justify-center space-y-4">
      <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 text-gray-500">
        {icon || <FolderOpen className="w-8 h-8 text-cyan-400/80" />}
      </div>
      <div className="space-y-1 max-w-sm">
        <h4 className="text-base font-bold text-gray-200">{title}</h4>
        <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
      </div>
      {actionText && onAction && (
        <Button size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
