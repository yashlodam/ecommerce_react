import React from "react";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import { useNavigate } from "react-router-dom";

function DealCard({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${item.category?.categoryId || "deals"}`);
  };

  return (
    <article
      onClick={handleClick}
      className="group relative h-full w-full cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-teal-500/60 dark:hover:border-teal-500/60 flex flex-col justify-between"
    >
      <div className="relative flex h-48 sm:h-52 items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 p-4">
        {/* Discount Badge */}
        <div className="absolute left-3 top-3 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
          {item.discount}% OFF
        </div>

        {/* Flash Sale Tag */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-400 text-slate-950 px-2.5 py-0.5 text-[11px] font-extrabold shadow-sm">
          <FlashOnRoundedIcon sx={{ fontSize: 13 }} />
          Flash Deal
        </div>

        <img
          src={item.category?.image || "https://placehold.co/200x200?text=Deal"}
          alt={item.category?.name || "Deal"}
          className="relative z-10 h-32 w-32 sm:h-36 sm:w-36 object-contain transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            <LocalOfferRoundedIcon sx={{ fontSize: 13 }} />
            Limited Offer
          </div>

          <h3 className="mt-1 text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {item.category?.name}
          </h3>
        </div>

        {/* Progress meter */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            <span>Claimed: 85%</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">Almost Gone</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="w-[85%] h-full bg-gradient-to-r from-teal-500 to-amber-500 rounded-full" />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-[11px] text-slate-400">Save Today</p>
            <p className="text-sm font-extrabold text-teal-700 dark:text-teal-400">
              Min {item.discount}% Off
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