import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Tooltip } from "@mui/material";
import { useAppDispatch } from "../../State/Store";
import { addProductToWishlist, removeProductFromWishlist } from "../../State/customer/WishlistSlice";
import { useNavigate } from "react-router-dom";

import { toast } from "../../common/toast";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

function WishlistProductCard({ item }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleWishlist = async (e) => {
    e.stopPropagation();
    try {
      await dispatch(
        removeProductFromWishlist({
          productId: item.id,
          jwt: localStorage.getItem("jwt"),
        })
      ).unwrap();

      toast.info("Item removed from your wishlist.");
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      toast.error(error || "Failed to remove item from wishlist.");
    }
  };

  const categoryPath = item.category?.categoryId || "catalog";

  return (
    <div
      onClick={() => navigate(`/product-details/${categoryPath}/${item.id}`)}
      className="group w-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative cursor-pointer flex flex-col justify-between"
    >
      {/* Remove Button */}
      <div onClick={handleWishlist} className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
        <Tooltip title="Remove from Wishlist">
          <IconButton
            size="small"
            sx={{
              bgcolor: "background.paper",
              boxShadow: 1,
              p: { xs: 0.5, sm: 0.8 },
              "&:hover": {
                bgcolor: "error.light",
                color: "error.main",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
          </IconButton>
        </Tooltip>
      </div>

      {/* Discount Badge */}
      {item.discountPercent > 0 && (
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-teal-600 text-white text-[9px] sm:text-[11px] font-extrabold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-md z-10">
          {item.discountPercent}% OFF
        </div>
      )}

      {/* Product Image */}
      <div className="w-full h-44 sm:h-72 bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-2.5 sm:p-4 relative">
        <img
          src={item.images?.[0] || "https://placehold.co/200x200?text=Wishlist"}
          alt={item.title}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Out of Stock Overlay */}
        {((item.quantity != null && item.quantity <= 0) || item.inStock === false) && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-2xs flex items-center justify-center z-10">
            <span className="bg-red-600 text-white font-bold text-[10px] sm:text-[11px] uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full tracking-wider shadow">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between space-y-1.5 sm:space-y-2">
        <div>
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
            {item.category?.name || "General"}
          </span>
          <h3 className="font-bold text-xs sm:text-base text-slate-900 dark:text-slate-100 line-clamp-2 mt-0.5 group-hover:text-teal-600 transition-colors">
            {item.title}
          </h3>
        </div>

        <div className="flex items-baseline gap-1.5 sm:gap-2 pt-1.5 sm:pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-sm sm:text-lg font-extrabold text-slate-900 dark:text-white">
            {formatINR(item.sellingPrice)}
          </span>

          {item.mrpPrice > item.sellingPrice && (
            <span className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 line-through">
              {formatINR(item.mrpPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default WishlistProductCard;