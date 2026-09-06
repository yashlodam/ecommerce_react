import React, { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../State/Store";
import {
  fetchNotifications,
  fetchUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../../State/customer/notificationSlice";
import NotificationDropdown from "./NotificationDropdown";

export default function NotificationBell({ role = null, allNotificationsUrl }) {
  const dispatch = useAppDispatch();
  const { notifications, unreadCount, loading } = useAppSelector(
    (store) => store.notifications
  );
  const auth = useAppSelector((store) => store.auth);

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Determine portal notifications URL if not provided
  const resolvedUrl =
    allNotificationsUrl ||
    (role === "ROLE_SELLER"
      ? "/seller/notifications"
      : role === "ROLE_ADMIN"
      ? "/admin/notifications"
      : "/notifications");

  // Determine active role parameter
  const targetRole = role || auth?.role;

  // Poll unread count on mount and periodically
  useEffect(() => {
    if (!auth?.isLoggedIn && !localStorage.getItem("jwt") && !localStorage.getItem("seller_jwt")) {
      return;
    }

    dispatch(fetchUnreadCount({ role: targetRole }));

    // Poll every 45 seconds
    const interval = setInterval(() => {
      dispatch(fetchUnreadCount({ role: targetRole }));
    }, 45000);

    return () => clearInterval(interval);
  }, [dispatch, targetRole, auth?.isLoggedIn]);

  // When dropdown opens, fetch latest notifications
  const handleToggle = () => {
    if (!isOpen) {
      dispatch(fetchNotifications({ page: 0, size: 10, role: targetRole }));
    }
    setIsOpen((prev) => !prev);
  };

  const handleMarkAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsRead({ role: targetRole }));
  };

  const handleDelete = (id) => {
    dispatch(deleteNotification(id));
  };

  const badgeDisplay =
    unreadCount > 99 ? "99+" : unreadCount > 0 ? unreadCount : null;

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={handleToggle}
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={isOpen}
        className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
      >
        <Bell className="w-5 h-5 transition-transform group-hover:scale-105" />

        {badgeDisplay && (
          <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-extrabold text-white bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900 shadow-sm animate-in zoom-in-50 duration-150">
            {badgeDisplay}
          </span>
        )}
      </button>

      <NotificationDropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        notifications={notifications}
        unreadCount={unreadCount}
        loading={loading}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDelete={handleDelete}
        allNotificationsUrl={resolvedUrl}
      />
    </div>
  );
}
