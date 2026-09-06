import React, { useEffect, useState } from "react";
import ToastItem from "./ToastItem";
import {
  subscribeToToasts,
  pauseAllToasts,
  resumeAllToasts,
} from "./toastStore";

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToToasts((updatedToasts) => {
      setToasts(updatedToasts);
    });
    return unsubscribe;
  }, []);

  if (toasts.length === 0) {
    return null;
  }

  const handleMouseEnter = () => {
    setIsPaused(true);
    pauseAllToasts();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    resumeAllToasts();
  };

  const handleFocus = () => {
    setIsPaused(true);
    pauseAllToasts();
  };

  const handleBlur = (e) => {
    // Only resume if focus leaves the container entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsPaused(false);
      resumeAllToasts();
    }
  };

  return (
    <div
      aria-label="Notifications"
      tabIndex={-1}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="fixed top-4 inset-x-3 sm:inset-x-auto sm:right-6 z-[9999] pointer-events-none flex flex-col gap-2.5 items-center sm:items-end max-w-full pt-[env(safe-area-inset-top,0)] transition-all"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} isPaused={isPaused} />
      ))}
    </div>
  );
}
