import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

function SimilarProductCard({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo(0, 0);
    const categoryId = item.category?.categoryId || item.categoryId || "catalog";
    navigate(`/product-details/${categoryId}/${item.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col justify-between"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 aspect-[4/5] flex items-center justify-center p-3">
        <img
          src={item.images?.[0] || "https://placehold.co/200x250?text=Product"}
          alt={item.title}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {item.discountPercent > 0 && (
          <span className="absolute top-3 left-3 bg-teal-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow z-10">
            {item.discountPercent}% OFF
          </span>
        )}

        {/* Out of Stock Overlay */}
        {((item.quantity != null && item.quantity <= 0) || item.inStock === false) && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-2xs flex items-center justify-center z-10">
            <span className="bg-red-600 text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-full tracking-wider shadow">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-1.5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 truncate">
          {item.brand || item.seller?.businessDetails?.businessName || "ShopSphere"}
        </p>

        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-2 min-h-[40px] group-hover:text-teal-600 transition-colors">
          {item.title}
        </h3>

        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <StarIcon sx={{ color: "#f59e0b", fontSize: 16 }} />
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {item.numRatings ? `${item.numRatings} ratings` : "4.5"}
          </span>
        </div>

        <div className="flex items-baseline gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">
            {formatINR(item.sellingPrice)}
          </span>

          {item.mrpPrice > item.sellingPrice && (
            <span className="line-through text-slate-400 text-xs">
              {formatINR(item.mrpPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SimilarProductCard;