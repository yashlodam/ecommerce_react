import React from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  closeCartDrawer,
  deleteCartItem,
  updateCartItem,
} from "../../../State/customer/CartSlice";

const FREE_SHIPPING_THRESHOLD = 499;

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

export default function CartDrawer() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isCartDrawerOpen = useAppSelector(
    (state) => state.cart?.isCartDrawerOpen
  );
  const cart = useAppSelector((state) => state.cart?.cart);
  const cartItems = cart?.cartItems || [];

  const totalSellingPrice = cart?.totalSellingPrice || 0;
  const totalMrpPrice = cart?.totalMrpPrice || 0;
  const totalSavings = Math.max(0, totalMrpPrice - totalSellingPrice);
  const freeShippingProgress = Math.min(
    100,
    Math.round((totalSellingPrice / FREE_SHIPPING_THRESHOLD) * 100)
  );
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - totalSellingPrice
  );

  const outOfStockItems = cartItems.filter((item) => {
    const stock =
      item?.productVariant?.quantity ?? item?.product?.quantity ?? 0;
    return item?.product?.inStock === false || stock <= 0;
  });
  const hasOutOfStock = outOfStockItems.length > 0;

  const handleClose = () => {
    dispatch(closeCartDrawer());
  };

  const handleUpdateQty = (item, newQty) => {
    if (newQty < 1) {
      dispatch(deleteCartItem(item.id));
      return;
    }
    const maxStock =
      item?.productVariant?.quantity ?? item?.product?.quantity ?? 99;
    if (newQty > maxStock) return;

    dispatch(
      updateCartItem({
        cartItemId: item.id,
        cartItem: { quantity: newQty },
      })
    );
  };

  const handleRemove = (itemId) => {
    dispatch(deleteCartItem(itemId));
  };

  const handleNavigateToProduct = (item) => {
    handleClose();
    const catId =
      item?.product?.category?.categoryId ||
      item?.product?.category?.id ||
      "all";
    navigate(`/product-details/${catId}/${item?.product?.id}`);
  };

  const handleCheckout = () => {
    handleClose();
    navigate("/checkout");
  };

  const handleViewCart = () => {
    handleClose();
    navigate("/cart");
  };

  const handleExplore = () => {
    handleClose();
    navigate("/products/all");
  };

  return (
    <Drawer
      anchor="right"
      open={Boolean(isCartDrawerOpen)}
      onClose={handleClose}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: {
          width: { xs: "100vw", sm: "440px", md: "480px" },
          bgcolor: "background.paper",
          backgroundImage: "none",
          boxShadow: "-8px 0 24px -4px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <div className="flex flex-col h-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Shopping Bag
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {cart?.totalItem || 0}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Review items & fast-track your checkout
              </p>
            </div>
          </div>

          <IconButton
            onClick={handleClose}
            size="small"
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </IconButton>
        </div>

        {/* ── Free Delivery Gamification Progress Bar ──────────────────────── */}
        {cartItems.length > 0 && (
          <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Free Express Delivery Unlocked!
                </span>
              ) : (
                <span className="text-slate-600 dark:text-slate-400">
                  Add{" "}
                  <strong className="text-teal-600 dark:text-teal-400">
                    {formatINR(remainingForFreeShipping)}
                  </strong>{" "}
                  more for FREE Delivery
                </span>
              )}
              <span className="text-slate-400 dark:text-slate-500 text-[11px]">
                {freeShippingProgress}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  remainingForFreeShipping === 0
                    ? "bg-emerald-500"
                    : "bg-gradient-to-r from-teal-500 to-teal-600"
                }`}
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* ── Out of stock alert ───────────────────────────────────────────── */}
        {hasOutOfStock && (
          <div className="px-5 pt-3">
            <Alert severity="warning" className="rounded-xl text-xs">
              Some items in your cart are currently out of stock. Please remove
              them before placing an order.
            </Alert>
          </div>
        )}

        {/* ── Items List / Empty State ─────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-20 h-20 rounded-2xl bg-teal-50/80 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
                Your shopping bag is empty
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-6">
                Discover trending apparel, premium electronics, and home essentials with verified reviews.
              </p>
              <Button
                variant="contained"
                onClick={handleExplore}
                sx={{
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "13px",
                  px: 3,
                  py: 1,
                  bgcolor: "#0d9488",
                  "&:hover": { bgcolor: "#0f766e" },
                }}
              >
                Explore Catalog
              </Button>
            </div>
          ) : (
            cartItems.map((item) => {
              const product = item?.product;
              const imageUrl =
                product?.images?.[0] ||
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80";
              const availableStock =
                item?.productVariant?.quantity ?? product?.quantity ?? 0;
              const isItemOutOfStock =
                product?.inStock === false || availableStock <= 0;
              const isLowStock =
                availableStock <= 5 && availableStock > 0 && !isItemOutOfStock;

              return (
                <div
                  key={item.id}
                  className={`flex gap-3.5 p-3 rounded-2xl border transition-all ${
                    isItemOutOfStock
                      ? "border-red-200 dark:border-red-900/50 bg-red-50/30 dark:bg-red-950/20"
                      : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => handleNavigateToProduct(item)}
                    className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 cursor-pointer relative group"
                  >
                    <img
                      src={imageUrl}
                      alt={product?.title || "Product"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {isItemOutOfStock && (
                      <span className="absolute inset-0 bg-black/60 text-[9px] font-bold text-white flex items-center justify-center text-center px-1">
                        Out of stock
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => handleNavigateToProduct(item)}
                          className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-400 line-clamp-2 cursor-pointer leading-snug"
                        >
                          {product?.title || "Product Item"}
                        </h4>
                        <Tooltip title="Remove item">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors shrink-0 p-0.5"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </Tooltip>
                      </div>

                      {/* Variant / Size info */}
                      {(item.size || item.productVariant?.variantName) && (
                        <div className="mt-0.5">
                          <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                            {item.size
                              ? `Size: ${item.size}`
                              : item.productVariant?.variantName}
                          </span>
                        </div>
                      )}

                      {/* Low Stock Chip */}
                      {isLowStock && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium block mt-0.5">
                          Only {availableStock} left
                        </span>
                      )}
                    </div>

                    {/* Price and Quantity Stepper */}
                    <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          {formatINR(item.sellingPrice)}
                        </span>
                        {item.mrpPrice > item.sellingPrice && (
                          <span className="text-[11px] text-slate-400 line-through">
                            {formatINR(item.mrpPrice)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800">
                        <button
                          onClick={() => handleUpdateQty(item, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQty(item, item.quantity + 1)}
                          disabled={
                            isItemOutOfStock || item.quantity >= availableStock
                          }
                          className="w-6 h-6 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/90 space-y-3">
            {/* Price breakdown summary */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal ({cart?.totalItem || 0} items)</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {formatINR(totalSellingPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Delivery Fee</span>
                {remainingForFreeShipping === 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold uppercase text-[11px]">
                    FREE
                  </span>
                ) : (
                  <span className="text-slate-700 dark:text-slate-300">₹70</span>
                )}
              </div>
              {totalSavings > 0 && (
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Total Savings</span>
                  <span>- {formatINR(totalSavings)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm font-bold text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Total Amount</span>
                <span className="text-base text-teal-700 dark:text-teal-400 font-extrabold">
                  {formatINR(
                    totalSellingPrice + (remainingForFreeShipping === 0 ? 0 : 70)
                  )}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <Button
                fullWidth
                variant="contained"
                onClick={handleCheckout}
                disabled={hasOutOfStock}
                endIcon={<ArrowRight className="w-4 h-4" />}
                sx={{
                  py: 1.3,
                  borderRadius: "14px",
                  fontWeight: 700,
                  fontSize: "14px",
                  textTransform: "none",
                  bgcolor: "#0d9488",
                  boxShadow: "0 4px 14px 0 rgba(13, 148, 136, 0.3)",
                  "&:hover": {
                    bgcolor: "#0f766e",
                    boxShadow: "0 6px 18px 0 rgba(13, 148, 136, 0.4)",
                  },
                }}
              >
                Proceed to Checkout
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={handleViewCart}
                sx={{
                  py: 1,
                  borderRadius: "14px",
                  fontWeight: 600,
                  fontSize: "13px",
                  textTransform: "none",
                  borderColor: "rgba(148, 163, 184, 0.4)",
                  color: "inherit",
                  "&:hover": {
                    borderColor: "#0d9488",
                    bgcolor: "rgba(13, 148, 136, 0.05)",
                  },
                }}
              >
                View Full Bag & Apply Coupons
              </Button>
            </div>

            {/* Micro Trust badges */}
            <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                100% Secure
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                7 Days Return
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-blue-500" />
                Fast Dispatch
              </span>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
}
