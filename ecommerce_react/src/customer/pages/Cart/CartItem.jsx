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

  const handleUpdateQuantity = (value) => {
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
      await dispatch(
        deleteCartItem({
          jwt: localStorage.getItem("jwt"),
          cartItemId: item.id,
        })
      ).unwrap();

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
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative">
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
        <div className="shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-2">
          <img
            className="w-full h-full object-contain"
            src={product?.images?.[0] || "https://placehold.co/120x120?text=Item"}
            alt={product?.title || "Item"}
          />
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

          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            ✓ In Stock • Eligible for Fast Shipping
          </p>
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
            disabled={item.quantity >= (product?.quantity || 10)}
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
        <div className="text-right">
          <p className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
            {formatINR(item.sellingPrice)}
          </p>
          {item.mrpPrice > item.sellingPrice && (
            <p className="text-xs text-slate-400 dark:text-slate-500 line-through">
              {formatINR(item.mrpPrice)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItem;