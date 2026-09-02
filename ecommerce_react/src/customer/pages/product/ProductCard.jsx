import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { addProductToWishlist } from "../../../State/customer/WishlistSlice";

function ProductCard({ item }) {
  const images = item.images || [];
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((store) => store.wishlist);

  const isWishlisted = wishlist?.products?.some((p) => p.id === item.id);
  const isOutOfStock = item.quantity === 0;

  useEffect(() => {
    if (!isHovered || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 1400);
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (item.id) {
      dispatch(
        addProductToWishlist({
          productId: item.id,
          jwt: localStorage.getItem("jwt"),
        })
      );
    }
  };

  const categoryPath = item.category?.categoryId || "all";

  return (
    <div
      onClick={() => navigate(`/product-details/${categoryPath}/${item.id}`)}
      className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden w-full flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImage(0);
      }}
      onTouchStart={() => {
        setIsHovered(true);
        setTimeout(() => {
          setIsHovered(false);
          setCurrentImage(0);
        }, 3000);
      }}
    >
      {/* Product Image Container */}
      <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-3">
        {images.length > 0 ? (
          images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={item?.title || "Product image"}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain p-2 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${(index - currentImage) * 100}%)`,
              }}
            />
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-600 text-sm font-medium">
            No image
          </div>
        )}

        {/* Discount badge */}
        {item.discountPercent > 0 && (
          <span className="absolute top-3 left-3 bg-teal-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md z-10">
            {item.discountPercent}% OFF
          </span>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-10">
            <span className="bg-red-600 text-white font-bold text-xs uppercase px-3 py-1.5 rounded-full tracking-wider shadow">
              Out of Stock
            </span>
          </div>
        )}

        {/* Wishlist Quick Action */}
        <button
          onClick={handleWishlist}
          aria-label="Add to Wishlist"
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
            isWishlisted
              ? "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400"
              : "bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:scale-110"
          }`}
        >
          {isWishlisted ? (
            <FavoriteIcon sx={{ fontSize: 18, color: "#e11d48" }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 18 }} />
          )}
        </button>

        {/* Image dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentImage
                    ? "w-4 bg-teal-600 dark:bg-teal-400"
                    : "w-1.5 bg-slate-300 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Category & Seller info */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span className="uppercase tracking-wider truncate max-w-[130px]">
              {item.category?.name || "General"}
            </span>

            {item.seller?.sellerName && (
              <span className="inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 truncate max-w-[100px]">
                <StorefrontOutlinedIcon sx={{ fontSize: 13 }} />
                {item.seller.sellerName}
              </span>
            )}
          </div>

          <h3 className="font-bold text-sm sm:text-base leading-snug line-clamp-2 text-slate-900 dark:text-slate-100 mt-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {item?.title}
          </h3>
        </div>

        {/* Rating & Price */}
        <div>
          {item.numRatings > 0 && (
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 mb-1.5">
              <span className="inline-flex items-center gap-0.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800 text-[11px]">
                {item.rating || "4.2"}
                <StarRoundedIcon sx={{ fontSize: 13 }} />
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                ({item.numRatings})
              </span>
            </div>
          )}

          <div className="flex items-baseline gap-2 flex-wrap pt-1 border-t border-slate-100 dark:border-slate-800">
            <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              ₹{Number(item.sellingPrice || 0).toLocaleString("en-IN")}
            </span>

            {item.mrpPrice > item.sellingPrice && (
              <span className="line-through text-slate-400 dark:text-slate-500 text-xs font-medium">
                ₹{Number(item.mrpPrice).toLocaleString("en-IN")}
              </span>
            )}

            {item.discountPercent > 0 && (
              <span className="text-teal-600 dark:text-teal-400 font-bold text-xs">
                Save {item.discountPercent}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;