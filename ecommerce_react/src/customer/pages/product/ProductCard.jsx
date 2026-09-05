import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { addProductToWishlist } from "../../../State/customer/WishlistSlice";
import DealBadge from "../../../common/deals/DealBadge";
import DealPrice from "../../../common/deals/DealPrice";

function ProductCard({ item }) {
  const images = item.images || [];
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((store) => store.wishlist);
  const { isLoggedIn } = useAppSelector((store) => store.auth);

  const isWishlisted = wishlist?.products?.some((p) => p.id === item.id);

  // Consider variants stock if variants exist (e.g. products where total variant stock is 0)
  const hasVariants = Array.isArray(item.variants) && item.variants.length > 0;
  const inStockVariants = hasVariants
    ? item.variants.filter((v) => (v.quantity ?? 0) > 0)
    : [];
  const totalVariantStock = hasVariants
    ? item.variants.reduce((acc, v) => acc + (v.quantity ?? 0), 0)
    : null;

  const displayQuantity = hasVariants ? totalVariantStock : item.quantity;
  const isOutOfStock =
    item.inStock === false ||
    (hasVariants
      ? totalVariantStock <= 0 || inStockVariants.length === 0
      : (item.quantity == null || item.quantity <= 0)) ||
    item.quantity === 0;

  const isLowStock = !isOutOfStock && displayQuantity != null && displayQuantity > 0 && displayQuantity <= 5;

  // Auto-cycle product images on hover
  useEffect(() => {
    if (!isHovered || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (item.id) {
      dispatch(
        addProductToWishlist({
          productId: item.id,
          jwt: localStorage.getItem("jwt"),
        })
      );
    }
  };

  const categoryPath = item.category?.categoryId || item.categoryId || "all";

  return (
    <div
      onClick={() => navigate(`/product-details/${categoryPath}/${item.id}`)}
      className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden w-full flex flex-col justify-between"
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
      {/* Product Image Stage */}
      <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-3 border-b border-slate-100 dark:border-slate-800/80">
        {images.length > 0 ? (
          images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={item?.title || "Product image"}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain p-2.5 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${(index - currentImage) * 100}%)`,
              }}
            />
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-600 text-xs font-semibold">
            No image available
          </div>
        )}

        {/* Discount or Deal Badge */}
        {item.dealActive ? (
          <div className="absolute top-2.5 left-2.5 z-10">
            <DealBadge
              discountValue={item.discountPercentage || item.discountPercent}
              discountType={item.discountType || "PERCENTAGE"}
              label={item.discountPercentage ? `${item.discountPercentage}% OFF` : "DEAL"}
              size="xs"
              urgent={true}
            />
          </div>
        ) : item.discountPercent > 0 ? (
          <span className="absolute top-2.5 left-2.5 bg-teal-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm z-10 uppercase tracking-wide">
            {item.discountPercent}% OFF
          </span>
        ) : null}

        {/* Low Stock Scarcity Urgency Pill */}
        {isLowStock && (
          <span className="absolute bottom-2.5 left-2.5 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md z-10 tracking-tight flex items-center gap-1 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
            Only {displayQuantity} left!
          </span>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center z-10">
            <span className="bg-red-600 text-white font-bold text-[11px] uppercase px-3 py-1 rounded-full tracking-wider shadow">
              Out of Stock
            </span>
          </div>
        )}

        {/* Wishlist Quick Button */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer ${
            isWishlisted
              ? "bg-rose-50 text-rose-600 dark:bg-rose-950/70 dark:text-rose-400"
              : "bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:scale-110"
          }`}
        >
          {isWishlisted ? (
            <FavoriteIcon sx={{ fontSize: 16, color: "#e11d48" }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 16 }} />
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
                    ? "w-3.5 bg-teal-600 dark:bg-teal-400"
                    : "w-1.5 bg-slate-300 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Details Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          {/* Category & Seller metadata */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span className="uppercase tracking-wider truncate max-w-[120px]">
              {item.category?.name || "General"}
            </span>

            {item.seller?.sellerName && (
              <span className="inline-flex items-center gap-0.5 text-teal-600 dark:text-teal-400 truncate max-w-[110px]">
                <StorefrontOutlinedIcon sx={{ fontSize: 12 }} />
                {item.seller.sellerName}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-sm leading-snug line-clamp-2 text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {item?.title}
          </h3>
        </div>

        {/* Rating & Pricing Row */}
        <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
          {/* Star Rating */}
          <div className="flex items-center gap-1.5 text-xs">
            <div className="inline-flex items-center gap-0.5 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded-md border border-amber-200/80 dark:border-amber-800 text-[11px] font-bold">
              <span>{item.rating || "4.3"}</span>
              <StarRoundedIcon sx={{ fontSize: 13 }} />
            </div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              ({item.numRatings || 12})
            </span>
          </div>

          {/* Price Line — uses DealPrice for authoritative backend deal prices */}
          <DealPrice
            effectivePrice={item.dealActive && item.effectivePrice != null ? item.effectivePrice : item.sellingPrice}
            basePrice={item.dealActive ? (item.basePrice || item.sellingPrice) : null}
            mrpPrice={item.mrpPrice}
            discountPercentage={item.dealActive ? item.discountPercentage : item.discountPercent}
            discountAmount={item.discountAmount}
            dealActive={Boolean(item.dealActive)}
            size="md"
          />

          {item.dealActive && item.appliedDealTitle && (
            <p className="text-[10px] font-bold text-teal-600 dark:text-teal-400 truncate flex items-center gap-1">
              <span>🔥</span>
              <span>{item.appliedDealTitle}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;