import React from "react";

/**
 * Reusable DealBadge Component
 * Displays a clean, premium discount tag or promotion label.
 *
 * @param {number|string} discountValue - e.g. 20, 300
 * @param {string} discountType - "PERCENTAGE" | "FIXED_AMOUNT"
 * @param {string} label - Optional custom text (e.g. "FLASH DEAL", "LIMITED OFFER")
 * @param {"xs"|"sm"|"md"|"lg"} size - Sizing variant
 * @param {boolean} urgent - Shows urgency style
 * @param {string} className - Additional CSS classes
 */
export default function DealBadge({
  discountValue,
  discountType = "PERCENTAGE",
  label,
  size = "sm",
  urgent = false,
  className = "",
}) {
  const sizeClasses = {
    xs: "text-[10px] px-1.5 py-0.5",
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
    lg: "text-sm px-3.5 py-1.5 font-black",
  };

  // Determine badge text
  let badgeText = label;
  if (!badgeText && discountValue != null) {
    if (discountType === "FIXED_AMOUNT") {
      badgeText = `₹${Number(discountValue).toLocaleString("en-IN")} OFF`;
    } else {
      badgeText = `${discountValue}% OFF`;
    }
  }

  if (!badgeText) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 font-extrabold uppercase tracking-wider rounded-full shadow-xs select-none transition-colors ${
        urgent
          ? "bg-rose-600 text-white dark:bg-rose-500 shadow-rose-500/20"
          : "bg-teal-600 text-white dark:bg-teal-500 shadow-teal-600/20"
      } ${sizeClasses[size] || sizeClasses.sm} ${className}`}
    >
      {badgeText}
    </span>
  );
}
