import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EmptyState } from "./EmptyState";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyTitle = "No data found",
  emptyDescription = "There are no records matching your criteria.",
  onRowClick
}: DataTableProps<T>) {
  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="w-full space-y-4">
      {/* Table Container */}
      <div className="w-full overflow-x-auto rounded-2xl border border-gray-800 bg-gray-950/60 shadow-xl">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-800/80 bg-gray-900/80">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-4 py-3.5 text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 ${
                    col.className || ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60 text-xs">
            {data.map((item) => (
              <tr
                key={keyExtractor(item)}
                onClick={() => onRowClick && onRowClick(item)}
                className={`transition-colors ${
                  onRowClick
                    ? "hover:bg-gray-900/60 cursor-pointer"
                    : "hover:bg-gray-900/30"
                }`}
              >
                {columns.map((col, cIdx) => (
                  <td key={cIdx} className={`px-4 py-3.5 text-gray-300 ${col.className || ""}`}>
                    {typeof col.accessor === "function"
                      ? col.accessor(item)
                      : (item[col.accessor] as unknown as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2 px-2">
        <p className="font-mono">Showing {data.length} records</p>
        <div className="flex items-center space-x-2">
          <button
            disabled
            className="p-1.5 rounded-lg border border-gray-800 bg-gray-900 text-gray-600 cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono font-bold text-[11px]">
            Page 1 of 1
          </span>
          <button
            disabled
            className="p-1.5 rounded-lg border border-gray-800 bg-gray-900 text-gray-600 cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
