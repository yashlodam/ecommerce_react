import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CheckCheck,
  Trash2,
  Filter,
  ChevronLeft,
  ChevronRight,
  Inbox,
  ArrowLeft,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchNotifications,
  fetchUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  deleteAllReadNotifications,
} from "../../../State/customer/notificationSlice";
import NotificationItem, { normalizeActionUrl } from "../../../common/notifications/NotificationItem";
import NotificationSkeleton from "../../../common/notifications/NotificationSkeleton";

export default function NotificationsPage({ role = null }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { notifications, unreadCount, loading, page, totalPages, totalElements } =
    useAppSelector((store) => store.notifications);
  const auth = useAppSelector((store) => store.auth);

  const [activeTab, setActiveTab] = useState("ALL"); // "ALL" | "UNREAD"
  const [currentPage, setCurrentPage] = useState(0);

  const targetRole = role || auth?.role;

  useEffect(() => {
    dispatch(fetchUnreadCount({ role: targetRole }));
    dispatch(
      fetchNotifications({
        page: currentPage,
        size: 15,
        unreadOnly: activeTab === "UNREAD",
        role: targetRole,
      })
    );
  }, [dispatch, currentPage, activeTab, targetRole]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(0);
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

  const handleDeleteAllRead = () => {
    if (window.confirm("Are you sure you want to clear all read notifications?")) {
      dispatch(deleteAllReadNotifications({ role: targetRole }));
    }
  };

  const handleNavigate = (url) => {
    if (url) {
      navigate(normalizeActionUrl(url));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Top bar with back button */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Page Title & Actions Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/50 border border-teal-100 dark:border-teal-900/60 flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-sm">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  Notifications
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Stay updated with order updates, account alerts, and promotions.
                </p>
              </div>
            </div>

            {/* Quick Bulk Actions */}
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllAsRead}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-50 text-teal-700 hover:bg-teal-100 dark:bg-teal-950/60 dark:text-teal-300 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800 transition-colors cursor-pointer"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark all read</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleDeleteAllRead}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 dark:text-slate-400 dark:hover:text-rose-400 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
                title="Delete all read notifications"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear read</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => handleTabChange("ALL")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "ALL"
                  ? "bg-slate-900 text-white dark:bg-teal-600 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              All Notifications {totalElements > 0 && `(${totalElements})`}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("UNREAD")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "UNREAD"
                  ? "bg-slate-900 text-white dark:bg-teal-600 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <span>Unread</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-500 text-white font-extrabold">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Notifications List Card */}
        <div className="space-y-3">
          {loading && notifications.length === 0 ? (
            <NotificationSkeleton count={5} />
          ) : notifications.length > 0 ? (
            notifications.map((item) => (
              <NotificationItem
                key={item.id}
                notification={item}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
                onNavigate={handleNavigate}
              />
            ))
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400 dark:text-slate-500">
                <Inbox className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
                {activeTab === "UNREAD"
                  ? "No unread notifications"
                  : "You don't have any notifications yet"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 max-w-sm mx-auto">
                {activeTab === "UNREAD"
                  ? "You are completely up to date. Check the 'All' tab to review previous updates."
                  : "When you place orders, receive status changes, or account alerts, they'll show up here."}
              </p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 px-2">
            <button
              type="button"
              disabled={currentPage <= 0 || loading}
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Page {currentPage + 1} of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages - 1 || loading}
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
