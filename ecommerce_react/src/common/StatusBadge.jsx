import React from "react";
import { Chip } from "@mui/material";

const statusConfig = {
  PLACED: { label: "Placed", color: "info", bg: "bg-blue-50 text-blue-700 border-blue-200" },
  CONFIRMED: { label: "Confirmed", color: "primary", bg: "bg-teal-50 text-teal-700 border-teal-200" },
  SHIPPED: { label: "Shipped", color: "secondary", bg: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  DELIVERED: { label: "Delivered", color: "success", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  CANCELLED: { label: "Cancelled", color: "error", bg: "bg-red-50 text-red-700 border-red-200" },
  PENDING: { label: "Pending", color: "warning", bg: "bg-amber-50 text-amber-700 border-amber-200" },
  ACTIVE: { label: "Active", color: "success", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  SUSPENDED: { label: "Suspended", color: "warning", bg: "bg-amber-50 text-amber-700 border-amber-200" },
  BANNED: { label: "Banned", color: "error", bg: "bg-red-50 text-red-700 border-red-200" },
  CLOSED: { label: "Closed", color: "default", bg: "bg-slate-100 text-slate-700 border-slate-200" },
  DEACTIVATED: { label: "Deactivated", color: "default", bg: "bg-slate-100 text-slate-700 border-slate-200" },
};

export default function StatusBadge({ status, size = "small" }) {
  const normalized = status?.toUpperCase() || "PENDING";
  const conf = statusConfig[normalized] || {
    label: status || "Unknown",
    bg: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center font-semibold border rounded-full text-xs px-2.5 py-0.5 ${conf.bg}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current" />
      {conf.label}
    </span>
  );
}
