import React from "react";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

/**
 * Reusable DealPrice Component
 * Renders an accessible, commerce-focused price presentation.
 * Highlights the effective discounted price while strikethrough-formatting the base/mrp price.
 *
 * @param {number} effectivePrice - The final authoritative price to charge
 * @param {number} basePrice - The seller base price before promotional deal
 * @param {number} mrpPrice - The maximum retail price
 * @param {number} discountPercentage - Discount percentage
 * @param {number} discountAmount - Exact currency discount savings
 * @param {boolean} dealActive - Whether a promotional deal is actively applied
 * @param {"sm"|"md"|"lg"|"xl"} size - Sizing tier
 * @param {string} className - Additional CSS classes
 */
export default function DealPrice({
  effectivePrice,
  basePrice,
  mrpPrice,
  discountPercentage,
  discountAmount,
  dealActive = false,
  size = "md",
  className = "",
}) {
  const currentPrice = effectivePrice != null ? effectivePrice : basePrice || mrpPrice || 0;
  const originalPrice = dealActive
    ? basePrice || mrpPrice
    : mrpPrice && mrpPrice > currentPrice
    ? mrpPrice
    : null;

  const hasDiscount = originalPrice != null && originalPrice > currentPrice;

  const sizeConfig = {
    sm: {
      price: "text-sm font-black",
      strike: "text-xs",
      badge: "text-[10px] px-1.5 py-0.2",
    },
    md: {
      price: "text-base sm:text-lg font-extrabold",
      strike: "text-xs sm:text-sm",
      badge: "text-xs px-2 py-0.5",
    },
    lg: {
      price: "text-xl sm:text-2xl font-black",
      strike: "text-sm sm:text-base",
      badge: "text-xs px-2.5 py-0.5",
    },
    xl: {
      price: "text-3xl sm:text-4xl font-black",
      strike: "text-base sm:text-lg",
      badge: "text-xs sm:text-sm px-3 py-1 font-bold",
    },
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;

  return (
    <div
      className={`flex items-baseline gap-2 sm:gap-2.5 flex-wrap ${className}`}
      aria-label={`Price: ${formatINR(currentPrice)}${
        hasDiscount ? `, original price ${formatINR(originalPrice)}` : ""
      }`}
    >
      {/* Effective Dominant Price */}
      <span
        className={`${currentSize.price} text-slate-900 dark:text-slate-100 tracking-tight`}
      >
        {formatINR(currentPrice)}
      </span>

      {/* Secondary Strikethrough Original Price */}
      {hasDiscount && (
        <span
          className={`${currentSize.strike} line-through text-slate-400 dark:text-slate-500 font-semibold`}
        >
          {formatINR(originalPrice)}
        </span>
      )}

      {/* Deal Savings Pill */}
      {hasDiscount && (discountPercentage > 0 || discountAmount > 0) && (
        <span
          className={`${currentSize.badge} font-bold rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 border border-teal-200/80 dark:border-teal-800/80`}
        >
          {discountPercentage ? `${discountPercentage}% OFF` : `Save ${formatINR(discountAmount)}`}
        </span>
      )}
    </div>
  );
}
