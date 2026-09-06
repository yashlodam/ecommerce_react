import React from "react";

export default function NotificationSkeleton({ count = 4, compact = false }) {
  return (
    <div className="space-y-2.5 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`flex items-start gap-3 ${
            compact
              ? "p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/40"
              : "p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900"
          }`}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="flex-1 space-y-2 py-0.5">
            <div className="flex justify-between items-center">
              <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
              <div className="h-2.5 bg-slate-100 dark:bg-slate-800/80 rounded w-12" />
            </div>
            <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-5/6" />
            <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
