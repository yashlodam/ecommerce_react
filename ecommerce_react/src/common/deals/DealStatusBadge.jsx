import React from "react";
import Chip from "@mui/material/Chip";

/**
 * Reusable DealStatusBadge Component
 * Renders consistent status chips across Seller and Admin tables and dashboards.
 *
 * @param {string} status - "ACTIVE" | "SCHEDULED" | "EXPIRED" | "DEPLETED" | "DISABLED"
 * @param {boolean} active - Fallback boolean active flag
 * @param {string} className - Additional CSS classes
 */
export default function DealStatusBadge({
  status,
  active = true,
  className = "",
}) {
  const normalizedStatus = status || (active ? "ACTIVE" : "DISABLED");

  const statusConfig = {
    ACTIVE: {
      label: "Active",
      bg: "bg-emerald-50 dark:bg-emerald-950/60",
      text: "text-emerald-700 dark:text-emerald-300",
      border: "border-emerald-200 dark:border-emerald-800",
      dot: "bg-emerald-500",
    },
    SCHEDULED: {
      label: "Scheduled",
      bg: "bg-sky-50 dark:bg-sky-950/60",
      text: "text-sky-700 dark:text-sky-300",
      border: "border-sky-200 dark:border-sky-800",
      dot: "bg-sky-500",
    },
    EXPIRED: {
      label: "Expired",
      bg: "bg-slate-100 dark:bg-slate-800/60",
      text: "text-slate-600 dark:text-slate-400",
      border: "border-slate-200 dark:border-slate-700",
      dot: "bg-slate-400",
    },
    DEPLETED: {
      label: "Limit Reached",
      bg: "bg-amber-50 dark:bg-amber-950/60",
      text: "text-amber-700 dark:text-amber-300",
      border: "border-amber-200 dark:border-amber-800",
      dot: "bg-amber-500",
    },
    DISABLED: {
      label: "Disabled",
      bg: "bg-rose-50 dark:bg-rose-950/60",
      text: "text-rose-700 dark:text-rose-300",
      border: "border-rose-200 dark:border-rose-800",
      dot: "bg-rose-500",
    },
  };

  const config = statusConfig[normalizedStatus] || statusConfig.DISABLED;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
