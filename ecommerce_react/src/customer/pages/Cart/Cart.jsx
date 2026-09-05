import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import CartItem from "./CartItem";
import PricingCrd from "./PricingCrd";
import EmptyState from "../../../common/EmptyState";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchUserCart } from "../../../State/customer/CartSlice";
import { applyCoupon } from "../../../State/customer/CouponSlice";

function Cart() {
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((store) => store.cart);

  const cartItems = cart.cart?.cartItems || [];
  const outOfStockItems = cartItems.filter((item) => {
    const stock = item?.productVariant?.quantity ?? item?.product?.quantity ?? 0;
    return item?.product?.inStock === false || stock <= 0;
  });
  const hasOutOfStockItems = outOfStockItems.length > 0;

  useEffect(() => {
    dispatch(fetchUserCart());
  }, [dispatch]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponError("");
    try {
      await dispatch(
        applyCoupon({
          apply: true,
          code: couponCode.trim(),
          orderValue: cart.cart?.totalSellingPrice || 0,
        })
      ).unwrap();
      setCouponApplied(true);
    } catch (err) {
      setCouponError(
        typeof err === "string" ? err : "Invalid coupon code. Please try again."
      );
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponCode("");
    setCouponError("");
    dispatch(fetchUserCart());
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 min-h-[80vh]">
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
            {/* Coupon Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 space-y-4">
              <div className="flex items-center gap-2">
                <LocalOfferIcon className="text-teal-600 dark:text-teal-400" fontSize="small" />
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  Apply Discount Coupon
                </h3>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase());
                    setCouponError("");
                  }}
                  disabled={couponApplied}
                  className={`flex-1 border uppercase font-mono rounded-xl px-3.5 py-2 text-sm outline-none transition-all ${
                    couponApplied
                      ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-700 dark:text-emerald-300 font-bold"
                      : "border-slate-200 dark:border-slate-700 focus:border-teal-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  }`}
                />
                {!couponApplied ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApplyCoupon}
                    disabled={!couponCode.trim()}
                    className="font-bold text-xs rounded-xl px-4"
                  >
                    Apply
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleRemoveCoupon}
                    className="font-bold text-xs rounded-xl px-3"
                  >
                    Remove
                  </Button>
                )}
              </div>

              {couponError && (
                <Alert severity="error" className="text-xs rounded-xl py-0.5">
                  {couponError}
                </Alert>
              )}

              {couponApplied && (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3">
                  <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    ✓ Coupon code applied to cart
                  </p>
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
    </div>
  );
}

export default Cart;