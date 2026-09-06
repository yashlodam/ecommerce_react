import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Loader2,
  X,
} from "lucide-react";
import { dismissToast } from "./toastStore";

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  loading: Loader2,
};

const COLOR_STYLES = {
  success: {
    iconBg: "bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border-teal-200/80 dark:border-teal-800/80",
    progress: "bg-teal-500 dark:bg-teal-400",
    borderGlow: "hover:border-teal-500/40 dark:hover:border-teal-500/40",
  },
  error: {
    iconBg: "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200/80 dark:border-rose-800/80",
    progress: "bg-rose-500 dark:bg-rose-400",
    borderGlow: "hover:border-rose-500/40 dark:hover:border-rose-500/40",
  },
  warning: {
    iconBg: "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200/80 dark:border-amber-800/80",
    progress: "bg-amber-500 dark:bg-amber-400",
    borderGlow: "hover:border-amber-500/40 dark:hover:border-amber-500/40",
  },
  info: {
    iconBg: "bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border-sky-200/80 dark:border-sky-800/80",
    progress: "bg-sky-500 dark:bg-sky-400",
    borderGlow: "hover:border-sky-500/40 dark:hover:border-sky-500/40",
  },
  loading: {
    iconBg: "bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400 border-slate-200 dark:border-slate-700",
    progress: "bg-teal-500 dark:bg-teal-400",
    borderGlow: "hover:border-teal-500/40 dark:hover:border-teal-500/40",
  },
};

export default function ToastItem({ toast, isPaused }) {
  const {
    id,
    type = "info",
    title,
    message,
    duration,
    action,
    duplicateCount = 1,
  } = toast;

  const IconComponent = ICONS[type] || Info;
  const colors = COLOR_STYLES[type] || COLOR_STYLES.info;

  // Track progress bar animation percentage
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!duration || duration === Infinity || duration <= 0) return;

    let startTime = Date.now();
    let initialProgress = progress;
    let animationFrame;

    const updateProgress = () => {
      if (isPaused) {
        startTime = Date.now();
        initialProgress = progress;
        animationFrame = requestAnimationFrame(updateProgress);
        return;
      }

      const elapsed = Date.now() - startTime;
      const pctLeft = Math.max(0, initialProgress - (elapsed / duration) * 100);
      setProgress(pctLeft);

      if (pctLeft > 0) {
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [duration, isPaused, toast.updatedAt]);

  const handleDismiss = () => {
    dismissToast(id);
  };

  const handleAction = () => {
    if (action?.onClick) {
      try {
        action.onClick();
      } catch (err) {
        console.error("[ToastAction] Error executing action:", err);
      }
    }
    dismissToast(id);
  };

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
      className={`group relative overflow-hidden pointer-events-auto w-full max-w-[390px] rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-950/10 dark:shadow-black/60 p-3.5 transition-all duration-200 ease-out ${colors.borderGlow}`}
    >
      <div className="flex items-start gap-3">
        {/* Status Icon */}
        <div
          className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border ${colors.iconBg}`}
        >
          <IconComponent
            className={`w-4 h-4 ${type === "loading" ? "animate-spin" : ""}`}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pt-0.5 space-y-0.5">
          {title && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {title}
              </h4>
              {duplicateCount > 1 && (
                <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-black bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  ×{duplicateCount}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center gap-1.5 flex-wrap">
            <p
              className={`text-xs text-slate-700 dark:text-slate-300 leading-relaxed break-words ${
                !title ? "font-semibold text-slate-900 dark:text-slate-100" : ""
              }`}
            >
              {message}
            </p>
            {!title && duplicateCount > 1 && (
              <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-black bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                ×{duplicateCount}
              </span>
            )}
          </div>

          {/* Action button (e.g. Undo, Retry, View) */}
          {action && (
            <div className="pt-1.5">
              <button
                type="button"
                onClick={handleAction}
                className="cursor-pointer inline-flex items-center text-xs font-extrabold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 underline underline-offset-2 transition-colors"
              >
                {action.label || "Undo"}
              </button>
            </div>
          )}
        </div>

        {/* Close Button */}
        {type !== "loading" && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss notification"
            className="shrink-0 -mr-1 -mt-1 p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Subtle Progress Bar (Pause on hover, hidden when loading or reduced motion) */}
      {duration && duration !== Infinity && duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-100 dark:bg-slate-800/60 overflow-hidden motion-reduce:hidden">
          <div
            className={`h-full transition-all duration-75 ease-linear ${colors.progress}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
