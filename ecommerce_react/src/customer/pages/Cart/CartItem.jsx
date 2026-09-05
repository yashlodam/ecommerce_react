import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../State/Store";
import {
  deleteCartItem,
  updateCartItem,
} from "../../../State/customer/CartSlice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DealBadge from "../../../common/deals/DealBadge";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

function CartItem({ item }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const product = item?.product;
  const availableStock = item?.productVariant?.quantity ?? product?.quantity ?? 0;
  const isOutOfStock = (product?.inStock === false) || availableStock <= 0;
  const isMaxStockReached = item.quantity >= availableStock;

  const qty = item?.quantity || 1;
  const unitSellingPrice = Math.round((item?.sellingPrice || 0) / qty);
  const unitMrpPrice = Math.round((item?.mrpPrice || item?.sellingPrice || 0) / qty);
  const totalItemDiscount = Math.max(0, (item?.mrpPrice || 0) - (item?.sellingPrice || 0));
  const discountPercent = item?.mrpPrice > 0 ? Math.round((totalItemDiscount / item.mrpPrice) * 100) : 0;

  const handleUpdateQuantity = (value) => {
    if (value > item.quantity && (isOutOfStock || isMaxStockReached)) {
      setSnackbar({
        open: true,
        message: isOutOfStock
          ? "This item is currently out of stock."
          : `Cannot add more. Only ${availableStock} available in stock.`,
        severity: "warning",
      });
      return;
    }
    dispatch(
      updateCartItem({
        jwt: localStorage.getItem("jwt"),
        cartItemId: item.id,
        cartItem: {
          quantity: value,
        },
      })
    );
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleRemoveItem = async () => {
    try {
      await dispatch(deleteCartItem(item.id)).unwrap();

      setSnackbar({
        open: true,
        message: "Item removed from your cart.",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Unable to remove the item. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <div className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 overflow-hidden relative ${
      isOutOfStock
        ? "border-red-300 dark:border-red-900/80 shadow-xs bg-red-50/10"
        : "border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md"
    }`}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Remove Item Button */}
      <IconButton
        onClick={handleRemoveItem}
        className="!absolute top-3 right-3 z-10 text-slate-400 hover:text-red-500"
        size="small"
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      {/* Product Details */}
      <div
        className="p-4 sm:p-5 flex gap-4 cursor-pointer"
        onClick={() =>
          navigate(
            `/product-details/${product?.category?.categoryId || "catalog"}/${product?.id}`
          )
        }
      >
        <div className="shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-2 relative">
          <img
            className="w-full h-full object-contain"
            src={product?.images?.[0] || "https://placehold.co/120x120?text=Item"}
            alt={product?.title || "Item"}
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-2xs flex items-center justify-center">
              <span className="text-[10px] font-bold text-white bg-red-600 px-1.5 py-0.5 rounded">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-1.5 pr-8 min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-2.5 py-0.5 rounded-full inline-block">
            {product?.seller?.businesssDetails?.businessName ||
              product?.brand ||
              "Verified Seller"}
          </span>

          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 leading-snug line-clamp-2">
            {product?.title}
          </h3>

          <p className="text-xs text-slate-400 dark:text-slate-500">
            Color: <span className="text-slate-600 dark:text-slate-300 font-medium">{product?.color || "Standard"}</span> • Size: <span className="text-slate-600 dark:text-slate-300 font-medium">{item?.size || "Standard"}</span>
          </p>

          {/* Unit Pricing & Deal Tag */}
          <div className="flex items-baseline gap-2 pt-0.5 flex-wrap">
            <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
              {formatINR(unitSellingPrice)}
            </span>
            {unitMrpPrice > unitSellingPrice && (
              <span className="text-xs line-through text-slate-400 font-medium">
                {formatINR(unitMrpPrice)}
              </span>
            )}
            {discountPercent > 0 && (
              <DealBadge discountValue={discountPercent} size="xs" />
            )}
          </div>

          {isOutOfStock ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/80 text-red-700 dark:text-red-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span>Out of Stock — Please remove item to checkout</span>
            </div>
          ) : isMaxStockReached ? (
            <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
              Maximum available stock selected ({availableStock} available)
            </p>
          ) : (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              ✓ In Stock • Eligible for Fast Shipping
            </p>
          )}
        </div>
      </div>

      <Divider />

      {/* Quantity & Price Controls */}
      <div className="px-4 sm:px-5 py-3.5 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
        <div className="flex items-center gap-2 sm:gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-1">
          <Button
            size="small"
            onClick={() => handleUpdateQuantity(item.quantity - 1)}
            disabled={item.quantity <= 1}
            sx={{
              minWidth: "32px",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>

          <span className="font-bold text-sm min-w-[24px] text-center text-slate-800 dark:text-slate-200">
            {item.quantity}
          </span>

          <Button
            size="small"
            onClick={() => handleUpdateQuantity(item.quantity + 1)}
            disabled={isOutOfStock || isMaxStockReached}
            sx={{
              minWidth: "32px",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </div>

        {/* Price Section */}
        <div className="text-right space-y-0.5">
          <p className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
            {formatINR(item.sellingPrice)}
          </p>
          {totalItemDiscount > 0 && (
            <div className="text-[11px] text-slate-500 dark:text-slate-400 space-x-1">
              <span>Subtotal: <span className="line-through">{formatINR(item.mrpPrice)}</span></span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                (-{formatINR(totalItemDiscount)})
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItem;