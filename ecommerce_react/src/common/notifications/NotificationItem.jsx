import React from "react";
import {
  ShoppingBag,
  Truck,
  CheckCircle,
  XCircle,
  CreditCard,
  AlertCircle,
  AlertTriangle,
  Store,
  Tag,
  Bell,
  Check,
  Trash2,
  ExternalLink,
} from "lucide-react";

// Format relative time helper
function formatTimeAgo(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 45) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay === 1) return "Yesterday";
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

// Config mapping for notification types
function getNotificationConfig(type) {
  switch (type) {
    case "ORDER_PLACED":
    case "ORDER_CONFIRMED":
    case "NEW_ORDER":
    case "NEW_ORDER_ADMIN":
      return {
        icon: ShoppingBag,
        bgLight: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-900/60",
        badgeColor: "bg-blue-500",
      };
    case "ORDER_SHIPPED":
      return {
        icon: Truck,
        bgLight: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400 border-cyan-200 dark:border-cyan-900/60",
        badgeColor: "bg-cyan-500",
      };
    case "ORDER_DELIVERED":
    case "PAYMENT_SUCCESS":
      return {
        icon: CheckCircle,
        bgLight: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/60",
        badgeColor: "bg-emerald-500",
      };
    case "ORDER_CANCELLED":
    case "ORDER_CANCELLED_SELLER":
    case "PAYMENT_FAILED":
      return {
        icon: XCircle,
        bgLight: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-900/60",
        badgeColor: "bg-rose-500",
      };
    case "LOW_STOCK":
    case "PAYMENT_ISSUE":
      return {
        icon: AlertTriangle,
        bgLight: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-900/60",
        badgeColor: "bg-amber-500",
      };
    case "NEW_SELLER":
    case "SELLER_APPROVAL_REQUIRED":
    case "SELLER_ACCOUNT_UPDATE":
      return {
        icon: Store,
        bgLight: "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200 dark:border-purple-900/60",
        badgeColor: "bg-purple-500",
      };
    case "DEAL_STARTED":
    case "DEAL_CREATED_SELLER":
      return {
        icon: Tag,
        bgLight: "bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400 border-teal-200 dark:border-teal-900/60",
        badgeColor: "bg-teal-500",
      };
    default:
      return {
        icon: Bell,
        bgLight: "bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700",
        badgeColor: "bg-slate-400",
      };
  }
}

export default function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
  onNavigate,
  compact = false,
}) {
  const { id, type, title, message, read, createdAt, actionUrl } = notification;
  const config = getNotificationConfig(type);
  const IconComponent = config.icon;

  const handleClick = () => {
    if (!read && onMarkAsRead) {
      onMarkAsRead(id);
    }
    if (actionUrl && onNavigate) {
      onNavigate(actionUrl);
    }
  };

  const handleMarkReadBtn = (e) => {
    e.stopPropagation();
    if (onMarkAsRead) {
      onMarkAsRead(id);
    }
  };

  const handleDeleteBtn = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`group relative flex items-start gap-3 transition-all duration-150 cursor-pointer text-left select-none ${
        compact ? "p-3 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-800/60" : "p-4 sm:p-5 rounded-2xl border mb-3 hover:shadow-md transition-all"
      } ${
        !read
          ? compact
            ? "bg-teal-50/40 dark:bg-teal-950/20"
            : "bg-white dark:bg-slate-900 border-teal-200/80 dark:border-teal-900/50 shadow-sm"
          : compact
          ? ""
          : "bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-90"
      }`}
    >
      {/* Icon */}
      <div
        className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${config.bgLight}`}
      >
        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4
            className={`text-xs sm:text-sm font-semibold truncate ${
              !read ? "text-slate-900 dark:text-slate-100 font-bold" : "text-slate-700 dark:text-slate-300"
            }`}
          >
            {title}
          </h4>
          <span className="shrink-0 text-[11px] text-slate-400 dark:text-slate-500 whitespace-nowrap">
            {formatTimeAgo(createdAt)}
          </span>
        </div>

        <p
          className={`text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed ${
            compact ? "text-[11.5px]" : ""
          }`}
        >
          {message}
        </p>

        {/* Action Link Indicator */}
        {actionUrl && (
          <div className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-teal-600 dark:text-teal-400 group-hover:underline">
            <span>View details</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        )}
      </div>

      {/* Unread Status Dot */}
      {!read && (
        <span
          className="absolute top-3.5 right-3 w-2 h-2 rounded-full bg-teal-500 ring-2 ring-white dark:ring-slate-900 shrink-0"
          title="Unread"
        />
      )}

      {/* Hover Action Buttons */}
      <div
        className={`shrink-0 flex items-center gap-1 transition-opacity duration-150 ${
          compact
            ? "opacity-0 group-hover:opacity-100 absolute bottom-2 right-2 bg-white/90 dark:bg-slate-800/90 rounded-lg p-0.5 shadow-sm"
            : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {!read && (
          <button
            type="button"
            onClick={handleMarkReadBtn}
            title="Mark as read"
            className="p-1 rounded-md text-slate-400 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          type="button"
          onClick={handleDeleteBtn}
          title="Delete notification"
          className="p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
