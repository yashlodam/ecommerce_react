import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

import CartItem from "./CartItem";
import PricingCrd from "./PricingCrd";
import EmptyState from "../../../common/EmptyState";
import CouponModal from "../../../common/coupons/CouponModal";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchUserCart } from "../../../State/customer/CartSlice";
import {
  applyCoupon,
  removeCoupon,
  fetchActiveCoupons,
} from "../../../State/customer/CouponSlice";
import { toast } from "../../../common/toast";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

function Cart() {
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [couponModalOpen, setCouponModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((store) => store.cart);
  const couponState = useAppSelector((store) => store.coupon);

  const cartItems = cart.cart?.cartItems || [];
  const activeCoupons = couponState?.activeCoupons || [];
  const activeCouponCode = cart.cart?.couponCode || "";
  const couponDiscountAmount = cart.cart?.discount || 0;

  const outOfStockItems = cartItems.filter((item) => {
    const stock = item?.productVariant?.quantity ?? item?.product?.quantity ?? 0;
    return item?.product?.inStock === false || stock <= 0;
  });
  const hasOutOfStockItems = outOfStockItems.length > 0;

  useEffect(() => {
    dispatch(fetchUserCart());
    dispatch(fetchActiveCoupons());
  }, [dispatch]);

  // Base cart order value before coupon discount
  const baseOrderValue =
    (cart.cart?.totalSellingPrice || 0) + (activeCouponCode ? couponDiscountAmount : 0);

  const handleApplyCoupon = async (codeToApply) => {
    const code = (typeof codeToApply === "string" ? codeToApply : couponCode).trim();
    if (!code) return;
    setCouponError("");
    setIsApplying(true);
    try {
      await dispatch(
        applyCoupon({
          apply: "true",
          code: code,
          orderValue: baseOrderValue,
        })
      ).unwrap();
      toast.success(`Coupon "${code}" applied successfully!`);
      setCouponCode("");
    } catch (err) {
      const msg =
        typeof err === "string" ? err : "Invalid coupon code. Please try again.";
      setCouponError(msg);
      toast.error(msg);
      throw msg;
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemoveCoupon = async () => {
    if (!activeCouponCode) return;
    setCouponError("");
    setIsRemoving(true);
    try {
      await dispatch(removeCoupon(activeCouponCode)).unwrap();
      toast.info(`Coupon "${activeCouponCode}" removed.`);
      setCouponCode("");
    } catch (err) {
      const msg =
        typeof err === "string" ? err : "Failed to remove coupon. Please try again.";
      setCouponError(msg);
      toast.error(msg);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-12 py-4 sm:py-8 min-h-[80vh] pb-28 md:pb-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Shopping Cart ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Review your selected items before proceeding to secure checkout.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
          <EmptyState
            icon={ShoppingBagOutlinedIcon}
            title="Your Cart is Empty"
            description="Looks like you haven't added anything to your cart yet. Explore our top categories and discover trending collections!"
            actionText="Start Shopping"
            onAction={() => navigate("/")}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {hasOutOfStockItems && (
              <Alert
                severity="error"
                className="rounded-2xl font-medium border border-red-200 dark:border-red-900"
              >
                <strong>Attention:</strong> {outOfStockItems.length}{" "}
                {outOfStockItems.length === 1 ? "item" : "items"} in your cart{" "}
                {outOfStockItems.length === 1 ? "is" : "are"} currently out of
                stock. Please remove {outOfStockItems.length === 1 ? "it" : "them"}{" "}
                before proceeding to checkout.
              </Alert>
            )}

            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Checkout & Coupon Sidebar */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            {/* Real E-Commerce Coupon Hub */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LocalOfferIcon className="text-teal-600 dark:text-teal-400" fontSize="small" />
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    Coupons & Offers
                  </h3>
                </div>

                {activeCoupons.length > 0 && !activeCouponCode && (
                  <button
                    type="button"
                    onClick={() => setCouponModalOpen(true)}
                    className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                  >
                    View All ({activeCoupons.length}) →
                  </button>
                )}
              </div>

              {/* ── APPLIED COUPON STATE ── */}
              {activeCouponCode ? (
                <div className="relative overflow-hidden rounded-xl border border-emerald-500/80 bg-emerald-50/50 dark:bg-emerald-950/30 p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon sx={{ fontSize: 18, color: "#10b981" }} />
                      <div>
                        <span className="font-mono font-black text-xs text-emerald-800 dark:text-emerald-200 tracking-wider bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-300/50">
                          {activeCouponCode}
                        </span>
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 ml-1.5">
                          Applied
                        </span>
                      </div>
                    </div>

                    <Button
                      size="small"
                      variant="text"
                      color="error"
                      disabled={isRemoving}
                      onClick={handleRemoveCoupon}
                      startIcon={
                        isRemoving ? (
                          <CircularProgress size={12} color="inherit" />
                        ) : (
                          <DeleteIcon sx={{ fontSize: 15 }} />
                        )
                      }
                      sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: "11px",
                        p: "2px 8px",
                      }}
                    >
                      {isRemoving ? "Removing..." : "Remove"}
                    </Button>
                  </div>

                  <p className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
                    🎉 You saved <strong>{formatINR(couponDiscountAmount)}</strong> with this promo code!
                  </p>
                </div>
              ) : (
                /* ── NOT APPLIED: INPUT & QUICK DISCOVERY ── */
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase());
                        setCouponError("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleApplyCoupon();
                      }}
                      className="flex-1 border uppercase font-mono rounded-xl px-3.5 py-2 text-sm outline-none transition-all border-slate-200 dark:border-slate-700 focus:border-teal-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                    <Button
                      variant="contained"
                      onClick={() => handleApplyCoupon()}
                      disabled={!couponCode.trim() || isApplying}
                      sx={{
                        bgcolor: "#0d9488",
                        "&:hover": { bgcolor: "#0f766e" },
                        fontWeight: 700,
                        fontSize: "12px",
                        borderRadius: "12px",
                        px: 3,
                        textTransform: "none",
                      }}
                    >
                      {isApplying ? (
                        <CircularProgress size={14} color="inherit" />
                      ) : (
                        "Apply"
                      )}
                    </Button>
                  </div>

                  {couponError && (
                    <Alert severity="error" className="text-xs rounded-xl py-0.5">
                      {couponError}
                    </Alert>
                  )}

                  {/* Quick-apply active coupon pills */}
                  {activeCoupons.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Recommended For You:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeCoupons.slice(0, 3).map((cpn) => {
                          const isEligible = baseOrderValue >= (cpn.minimumOrderValue || 0);
                          return (
                            <button
                              key={cpn.code}
                              type="button"
                              onClick={() => {
                                setCouponCode(cpn.code);
                                handleApplyCoupon(cpn.code);
                              }}
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
                                isEligible
                                  ? "border-teal-300 dark:border-teal-800 bg-teal-50/60 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/60"
                                  : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-500 hover:border-slate-300"
                              }`}
                            >
                              <ConfirmationNumberOutlinedIcon sx={{ fontSize: 13 }} />
                              <span>{cpn.code}</span>
                              <span className="opacity-75">({cpn.discountPercentage}% off)</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* View All Coupons Button Trigger */}
                  {activeCoupons.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setCouponModalOpen(true)}
                      className="w-full text-center py-2 px-3 rounded-xl border border-dashed border-teal-300 dark:border-teal-800/80 bg-teal-50/40 dark:bg-teal-950/20 text-teal-700 dark:text-teal-300 text-xs font-bold hover:bg-teal-100/50 dark:hover:bg-teal-900/30 transition-all flex items-center justify-center gap-1.5"
                    >
                      <ConfirmationNumberOutlinedIcon sx={{ fontSize: 15 }} />
                      View All Available Coupons ({activeCoupons.length})
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Pricing Breakdown Card */}
            <PricingCrd />

            {/* Checkout Button */}
            <Button
              fullWidth
              size="large"
              variant="contained"
              color={hasOutOfStockItems ? "inherit" : "primary"}
              disabled={hasOutOfStockItems}
              onClick={() => navigate("/checkout")}
              endIcon={!hasOutOfStockItems ? <ArrowForwardIcon /> : null}
              sx={{
                py: 1.6,
                fontWeight: 700,
                borderRadius: "14px",
                fontSize: "15px",
                textTransform: "none",
                bgcolor: "#0d9488",
                "&:hover": { bgcolor: "#0f766e" },
                ...(hasOutOfStockItems && {
                  bgcolor: "action.disabledBackground",
                  color: "text.disabled",
                }),
              }}
            >
              {hasOutOfStockItems
                ? "Remove Out of Stock Items to Checkout"
                : "Proceed to Checkout"}
            </Button>
          </div>
        </div>
      )}

      {/* Sticky Bottom Checkout Bar on Mobile (< md) */}
      {cartItems.length > 0 && (
        <div
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3"
          style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
        >
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
              {activeCouponCode && (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">
                  • {activeCouponCode}
                </span>
              )}
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-teal-700 dark:text-teal-400">
                {formatINR(cart.cart?.totalSellingPrice)}
              </span>
              {cart.cart?.totalMrpPrice > cart.cart?.totalSellingPrice && (
                <span className="text-[11px] line-through text-slate-400">
                  {formatINR(cart.cart?.totalMrpPrice)}
                </span>
              )}
            </div>
          </div>

          <Button
            variant="contained"
            disabled={hasOutOfStockItems}
            onClick={() => navigate("/checkout")}
            endIcon={!hasOutOfStockItems ? <ArrowForwardIcon sx={{ fontSize: 16 }} /> : null}
            sx={{
              py: 1.2,
              px: 3,
              fontWeight: 800,
              borderRadius: "12px",
              fontSize: "13px",
              textTransform: "none",
              whiteSpace: "nowrap",
              bgcolor: "#0d9488",
              "&:hover": { bgcolor: "#0f766e" },
              boxShadow: 2,
              ...(hasOutOfStockItems && {
                bgcolor: "action.disabledBackground",
                color: "text.disabled",
              }),
            }}
          >
            {hasOutOfStockItems ? "Fix Items" : "Checkout"}
          </Button>
        </div>
      )}

      {/* Available Coupons Modal */}
      <CouponModal
        open={couponModalOpen}
        onClose={() => setCouponModalOpen(false)}
        coupons={activeCoupons}
        orderValue={baseOrderValue}
        appliedCouponCode={activeCouponCode}
        onApply={handleApplyCoupon}
        loading={couponState.loadingActiveCoupons}
      />
    </div>
  );
}

export default Cart;