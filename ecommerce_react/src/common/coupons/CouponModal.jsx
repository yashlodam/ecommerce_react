import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import CouponCard from "./CouponCard";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

/**
 * CouponModal component
 *
 * @param {boolean} open - Dialog open state
 * @param {Function} onClose - Dialog close handler
 * @param {Array} coupons - Array of available active coupons
 * @param {number} orderValue - Current cart order value
 * @param {string} appliedCouponCode - Currently applied coupon code
 * @param {Function} onApply - Apply coupon callback (code) => Promise
 * @param {boolean} loading - Loading state for coupons
 */
export default function CouponModal({
  open,
  onClose,
  coupons = [],
  orderValue = 0,
  appliedCouponCode = "",
  onApply,
  loading = false,
}) {
  const [manualCode, setManualCode] = useState("");
  const [manualError, setManualError] = useState("");
  const [applyingCode, setApplyingCode] = useState("");

  const handleManualApply = async () => {
    if (!manualCode.trim()) return;
    setManualError("");
    setApplyingCode(manualCode.trim());
    try {
      if (onApply) {
        await onApply(manualCode.trim());
        setManualCode("");
        onClose();
      }
    } catch (err) {
      setManualError(typeof err === "string" ? err : "Failed to apply coupon.");
    } finally {
      setApplyingCode("");
    }
  };

  const handleCardApply = async (code) => {
    setManualError("");
    setApplyingCode(code);
    try {
      if (onApply) {
        await onApply(code);
        onClose();
      }
    } catch (err) {
      setManualError(typeof err === "string" ? err : "Failed to apply coupon.");
    } finally {
      setApplyingCode("");
    }
  };

  // Sort coupons: Eligible first, then by discount percentage descending
  const sortedCoupons = [...coupons].sort((a, b) => {
    const aEligible = orderValue >= (a.minimumOrderValue || 0);
    const bEligible = orderValue >= (b.minimumOrderValue || 0);
    if (aEligible && !bEligible) return -1;
    if (!aEligible && bEligible) return 1;
    return (b.discountPercentage || 0) - (a.discountPercentage || 0);
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: "20px 20px 0 0", sm: "24px" },
          bgcolor: "background.paper",
          backgroundImage: "none",
          m: { xs: 0, sm: 2 },
          position: { xs: "fixed", sm: "relative" },
          bottom: { xs: 0, sm: "auto" },
          maxHeight: { xs: "85vh", sm: "80vh" },
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          p: { xs: 2.5, sm: 3 },
          pb: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <LocalOfferIcon fontSize="small" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100">
              Coupons & Offers
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Current Bag Value: <strong className="text-teal-700 dark:text-teal-400">{formatINR(orderValue)}</strong>
            </p>
          </div>
        </div>

        <IconButton
          onClick={onClose}
          size="small"
          aria-label="Close coupon modal"
          className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: { xs: 2.5, sm: 3 }, pt: "20px !important" }}>
        {/* Manual coupon input inside modal */}
        <div className="mb-5 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={manualCode}
              onChange={(e) => {
                setManualCode(e.target.value.toUpperCase());
                setManualError("");
              }}
              className="flex-1 uppercase font-mono text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 focus:border-teal-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all"
            />
            <Button
              variant="contained"
              disabled={!manualCode.trim() || applyingCode === manualCode.trim()}
              onClick={handleManualApply}
              sx={{
                bgcolor: "#0d9488",
                "&:hover": { bgcolor: "#0f766e" },
                fontWeight: 700,
                borderRadius: "12px",
                px: 3,
                fontSize: "12px",
                textTransform: "none",
              }}
            >
              {applyingCode === manualCode.trim() ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                "Apply"
              )}
            </Button>
          </div>

          {manualError && (
            <Alert severity="error" className="text-xs rounded-xl py-0.5">
              {manualError}
            </Alert>
          )}
        </div>

        {/* Coupons List Header */}
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Available Offers ({sortedCoupons.length})
          </h4>
        </div>

        {/* Loading indicator */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <CircularProgress size={28} sx={{ color: "#0d9488" }} />
            <p className="text-xs text-slate-400">Fetching best offers for you...</p>
          </div>
        ) : sortedCoupons.length === 0 ? (
          <div className="text-center py-10 px-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            <LocalOfferIcon className="text-slate-300 dark:text-slate-600 mb-2" sx={{ fontSize: 36 }} />
            <p className="font-bold text-sm text-slate-700 dark:text-slate-300">
              No Coupons Available Right Now
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Check back soon for seasonal promotions and promotional discount codes!
            </p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {sortedCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id || coupon.code}
                coupon={coupon}
                orderValue={orderValue}
                isApplied={appliedCouponCode?.toUpperCase() === coupon.code?.toUpperCase()}
                onApply={handleCardApply}
                mode="cart"
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
