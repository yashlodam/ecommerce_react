import React, { useState, useEffect } from "react";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

/**
 * Reusable DealCountdown Component
 * Renders an accurate, real-time countdown to a deal's expiry (`dealEndsAt` / `endAt`).
 *
 * Requirements:
 * - Authoritative validity remains on the backend.
 * - When countdown reaches 0, invokes `onExpire()` so parent can re-fetch or re-evaluate.
 * - If no `dealEndsAt` is provided, returns null (no fake countdowns).
 *
 * @param {string|Date} dealEndsAt - ISO string or Date object from backend
 * @param {Function} onExpire - Callback executed when the countdown reaches 0
 * @param {boolean} compact - Compact pill display vs standard banner
 * @param {string} className - Additional CSS classes
 */
export default function DealCountdown({
  dealEndsAt,
  onExpire,
  compact = false,
  className = "",
}) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [hasExpired, setHasExpired] = useState(false);

  useEffect(() => {
    if (!dealEndsAt) {
      setTimeLeft(null);
      return;
    }

    const targetTime = new Date(dealEndsAt).getTime();
    if (isNaN(targetTime)) {
      setTimeLeft(null);
      return;
    }

    const calculateTime = () => {
      const now = Date.now();
      const diffMs = targetTime - now;

      if (diffMs <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!hasExpired) {
          setHasExpired(true);
          if (typeof onExpire === "function") {
            onExpire();
          }
        }
        return false;
      }

      const totalSec = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSec / 86400);
      const hours = Math.floor((totalSec % 86400) / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;

      setTimeLeft({ days, hours, minutes, seconds });
      return true;
    };

    // Initial calculation
    const isOngoing = calculateTime();
    if (!isOngoing) return;

    const interval = setInterval(() => {
      const ongoing = calculateTime();
      if (!ongoing) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dealEndsAt, hasExpired, onExpire]);

  if (!dealEndsAt || !timeLeft) return null;

  if (hasExpired) {
    return (
      <span
        className={`inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 dark:text-slate-500 ${className}`}
      >
        <AccessTimeRoundedIcon sx={{ fontSize: 13 }} />
        Deal Ended
      </span>
    );
  }

  const { days, hours, minutes, seconds } = timeLeft;
  const pad = (num) => String(num).padStart(2, "0");

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 font-mono text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border border-rose-200/80 dark:border-rose-900/60 px-2 py-0.5 rounded-full ${className}`}
        aria-label={`Deal ends in ${days > 0 ? `${days} days ` : ""}${hours} hours ${minutes} minutes ${seconds} seconds`}
      >
        <AccessTimeRoundedIcon sx={{ fontSize: 12 }} />
        {days > 0 ? `${days}d ` : ""}
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </span>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 dark:bg-rose-950/40 px-3 py-1.5 text-xs text-rose-800 dark:text-rose-200 ${className}`}
      aria-label={`Deal ends in ${days > 0 ? `${days} days ` : ""}${hours} hours ${minutes} minutes ${seconds} seconds`}
    >
      <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-rose-700 dark:text-rose-300">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
        </span>
        Ends in:
      </div>

      <div className="flex items-center gap-1 font-mono font-black text-slate-900 dark:text-white text-xs">
        {days > 0 && (
          <>
            <span className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 px-1.5 py-0.5 rounded shadow-2xs">
              {days}d
            </span>
            <span>:</span>
          </>
        )}
        <span className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 px-1.5 py-0.5 rounded shadow-2xs">
          {pad(hours)}h
        </span>
        <span>:</span>
        <span className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 px-1.5 py-0.5 rounded shadow-2xs">
          {pad(minutes)}m
        </span>
        <span>:</span>
        <span className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 px-1.5 py-0.5 rounded shadow-2xs">
          {pad(seconds)}s
        </span>
      </div>
    </div>
  );
}
