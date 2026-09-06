import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCheck, Bell, ChevronRight, Inbox } from "lucide-react";
import NotificationItem, { normalizeActionUrl } from "./NotificationItem";
import NotificationSkeleton from "./NotificationSkeleton";

export default function NotificationDropdown({
  isOpen,
  onClose,
  notifications = [],
  unreadCount = 0,
  loading = false,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  allNotificationsUrl = "/notifications",
}) {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleViewAll = () => {
    onClose();
    navigate(allNotificationsUrl);
  };

  const handleItemNavigate = (url) => {
    onClose();
    if (url) {
      navigate(normalizeActionUrl(url));
    }
  };

  const displayList = notifications.slice(0, 7);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-[340px] sm:w-[400px] max-w-[calc(100vw-24px)] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-900/15 dark:shadow-black/40 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-800/40">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Notifications
          </span>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              {unreadCount > 99 ? "99+" : unreadCount} new
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="flex items-center gap-1 text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* List content */}
      <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 p-1.5">
        {loading && notifications.length === 0 ? (
          <div className="p-3">
            <NotificationSkeleton count={4} compact />
          </div>
        ) : displayList.length > 0 ? (
          displayList.map((item) => (
            <NotificationItem
              key={item.id}
              notification={item}
              compact
              onMarkAsRead={onMarkAsRead}
              onDelete={onDelete}
              onNavigate={handleItemNavigate}
            />
          ))
        ) : (
          <div className="py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400 dark:text-slate-500">
              <Inbox className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-0.5">
              All caught up!
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              No new notifications right now.
            </p>
          </div>
        )}
      </div>

      {/* Footer: View all */}
      <div className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 p-2">
        <button
          type="button"
          onClick={handleViewAll}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-colors cursor-pointer"
        >
          <span>View all notifications</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
