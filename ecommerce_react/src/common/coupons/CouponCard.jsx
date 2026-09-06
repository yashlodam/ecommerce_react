import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * CouponCard component
 * 
 * @param {Object} coupon - Coupon object { id, code, discountPercentage, minimumOrderValue, validityEndDate, active }
 * @param {number} orderValue - Current cart total or product price
 * @param {boolean} isApplied - Whether this coupon is currently applied to cart
 * @param {Function} onApply - Callback when apply button clicked (passes couponCode)
 * @param {boolean} mode - "cart" (shows Apply button & eligibility) or "pdp" (shows Copy Code)
 */
export default function CouponCard({
  coupon,
  orderValue = 0,
  isApplied = false,
  onApply,
  mode = "cart",
}) {
  const [copied, setCopied] = useState(false);

  const minOrder = coupon?.minimumOrderValue || 0;
  const isEligible = orderValue >= minOrder;
  const shortfall = Math.max(0, minOrder - orderValue);
  const progress = minOrder > 0 ? Math.min(100, Math.round((orderValue / minOrder) * 100)) : 100;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border transition-all duration-200 ${
        isApplied
          ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-md ring-2 ring-emerald-500/20"
          : isEligible
          ? "border-teal-200 dark:border-teal-900/60 bg-white dark:bg-slate-900 hover:border-teal-400 dark:hover:border-teal-700 hover:shadow-md"
          : "border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 opacity-90"
      }`}
    >
      {/* Decorative Circular Punch-outs for Ticket Perforation Effect */}
      <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 pointer-events-none" />
      <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 pointer-events-none" />

      <div className="p-4 sm:p-5 pl-6 sm:pl-7 pr-6 sm:pr-7 space-y-3">
        {/* Top Header: Discount Badge + Coupon Code */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-black tracking-wide px-2.5 py-1 rounded-lg bg-teal-600 text-white shadow-xs">
              <LocalOfferIcon sx={{ fontSize: 13 }} />
              {coupon.discountPercentage}% OFF
            </span>

            {isApplied && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md">
                <CheckCircleIcon sx={{ fontSize: 13 }} /> Applied
              </span>
            )}
          </div>

          {/* Coupon Code Pill with Copy Action */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/90 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1">
            <span className="font-mono font-black text-xs text-slate-800 dark:text-slate-100 tracking-wider select-all">
              {coupon.code}
            </span>
            <Tooltip title={copied ? "Copied!" : "Copy Code"} arrow placement="top">
              <button
                type="button"
                onClick={handleCopy}
                aria-label={`Copy coupon code ${coupon.code}`}
                className="text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors p-0.5"
              >
                {copied ? (
                  <CheckCircleIcon sx={{ fontSize: 14, color: "#10b981" }} />
                ) : (
                  <ContentCopyIcon sx={{ fontSize: 13 }} />
                )}
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Offer Description */}
        <div>
          <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
            Save {coupon.discountPercentage}% on your cart
            {minOrder > 0 ? ` on orders of ${formatINR(minOrder)} or more.` : "."}
          </p>
          {coupon.validityEndDate && (
            <p className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-1 font-medium">
              <AccessTimeIcon sx={{ fontSize: 12 }} />
              Valid till {formatDate(coupon.validityEndDate)}
            </p>
          )}
        </div>

        {/* Action / Eligibility Section */}
        {mode === "cart" ? (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
            {isEligible ? (
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  ✓ Eligible on your current cart value
                </p>
                {isApplied ? (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Currently Active
                  </span>
                ) : (
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => onApply && onApply(coupon.code)}
                    sx={{
                      bgcolor: "#0d9488",
                      "&:hover": { bgcolor: "#0f766e" },
                      fontWeight: 800,
                      fontSize: "11px",
                      borderRadius: "10px",
                      px: 2.5,
                      py: 0.5,
                      textTransform: "none",
                    }}
                  >
                    Apply Coupon
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">
                    Add <strong className="text-teal-600 dark:text-teal-400">{formatINR(shortfall)}</strong> more to unlock
                  </span>
                  <span className="font-bold text-slate-400">{progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-teal-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Mode is PDP: 1-click copy pill */
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Apply at checkout to claim discount
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className={`text-xs font-bold px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                copied
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                  : "text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/50"
              }`}
            >
              {copied ? "Copied to Clipboard!" : "Copy Code"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
