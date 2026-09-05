import React from "react";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import { useNavigate } from "react-router-dom";
import DealBadge from "../../../../common/deals/DealBadge";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

function DealCard({ item }) {
  const navigate = useNavigate();

  const hasProducts = Array.isArray(item.products) && item.products.length > 0;
  const firstProduct = hasProducts ? item.products[0] : null;
  const hasCategory = item.category || item.categorySlug;

  const handleClick = () => {
    if (firstProduct) {
      navigate(`/product-details/all/${firstProduct.id}`);
    } else if (hasCategory) {
      const catId = item.category?.categoryId || item.categorySlug;
      navigate(`/products/${catId || "all"}`);
    } else {
      navigate("/deals");
    }
  };

  const discountVal = item.discountValue != null ? item.discountValue : item.discount || 20;
  const discountType = item.discountType || "PERCENTAGE";
  const displayTitle = item.title || firstProduct?.title || item.category?.name || item.categorySlug || "Exclusive Deal";
  const displayImage =
    firstProduct?.image ||
    item.category?.image ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80";

  const claimedPercent = Math.min(95, Math.max(48, Math.round(Number(discountVal) * 1.6 + 22)));
  const isUrgent = claimedPercent >= 75;

  return (
    <article
      onClick={handleClick}
      className="group relative h-full w-full cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-teal-500/60 dark:hover:border-teal-500/60 flex flex-col justify-between"
    >
      <div className="relative flex h-48 sm:h-52 items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 p-4">
        {/* Deal Badge */}
        <div className="absolute left-3 top-3 z-10">
          <DealBadge
            discountValue={discountVal}
            discountType={discountType}
            size="sm"
            urgent={isUrgent}
          />
        </div>

        {/* Flash Sale Tag */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-400 text-slate-950 px-2.5 py-0.5 text-[11px] font-extrabold shadow-sm z-10">
          <FlashOnRoundedIcon sx={{ fontSize: 13 }} />
          Flash Deal
        </div>

        <img
          src={displayImage}
          alt={displayTitle}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80";
          }}
          className="relative z-10 h-32 w-32 sm:h-36 sm:w-36 object-contain transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            <LocalOfferRoundedIcon sx={{ fontSize: 13 }} />
            {item.dealType ? `${item.dealType} Promotion` : "Limited Offer"}
          </div>

          <h3 className="mt-1 text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {displayTitle}
          </h3>
        </div>

        {/* Progress meter */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            <span>Claimed: {claimedPercent}%</span>
            <span
              className={
                isUrgent
                  ? "text-amber-600 dark:text-amber-400 font-bold"
                  : "text-teal-600 dark:text-teal-400 font-bold"
              }
            >
              {isUrgent ? "Almost Gone" : "Selling Fast"}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-teal-500 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${claimedPercent}%` }}
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-[11px] text-slate-400">Special Price</p>
            <p className="text-sm font-extrabold text-teal-700 dark:text-teal-400">
              {discountType === "FIXED_AMOUNT"
                ? `Save ${formatINR(discountVal)}`
                : `${discountVal}% Off`}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="flex items-center gap-1 rounded-xl bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Claim
            <ArrowForwardRoundedIcon sx={{ fontSize: 14 }} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default DealCard;