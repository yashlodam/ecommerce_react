import React from "react";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import { useNavigate } from "react-router-dom";

function DealCard({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${item.category.categoryId}`);
  };

  return (
    <article
      onClick={handleClick}
      className="group relative h-full w-full cursor-pointer overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_-28px_rgba(15,23,42,0.42)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_35%),linear-gradient(135deg,_rgba(255,255,255,0.82),_rgba(248,250,252,0.95))] opacity-0 transition duration-300 group-hover:opacity-100" />

      <div className="relative flex h-60 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),_transparent_60%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] p-5 sm:h-64">
        <div className="absolute left-3 top-3 rounded-full bg-slate-950/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-lg backdrop-blur">
          {item.discount}% OFF
        </div>

        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-rose-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg">
          <FlashOnRoundedIcon sx={{ fontSize: 14 }} />
          Deal
        </div>

        <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/70 bg-white/70 px-3 py-2 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
          Limited-time offer • Premium selection
        </div>

        <img
          src={item.category.image}
          alt={item.category.name}
          className="relative z-10 h-40 w-40 object-contain transition-all duration-500 group-hover:scale-110 group-hover:-rotate-1 sm:h-44 sm:w-44"
        />
      </div>

      <div className="relative p-5">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700">
          <LocalOfferRoundedIcon sx={{ fontSize: 15 }} />
          Featured collection
        </div>

        <h3 className="mt-3 min-h-[56px] text-lg font-semibold leading-7 text-slate-900 line-clamp-2">
          {item.category.name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Curated savings crafted for premium value, refined style, and everyday confidence.
        </p>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-emerald-600">Save {item.discount}%</p>
            <p className="text-xs text-slate-500">Limited time offer</p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:gap-3 hover:bg-slate-800"
          >
            Shop
            <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      </div>

      <div className="h-1 origin-left scale-x-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 transition-transform duration-500 group-hover:scale-x-100" />
    </article>
  );
}

export default DealCard;