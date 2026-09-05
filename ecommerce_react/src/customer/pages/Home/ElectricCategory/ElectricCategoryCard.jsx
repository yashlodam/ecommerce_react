import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const ELECTRIC_HIGHLIGHTS = {
  laptops: { offer: "Up to 35% Off", badge: "Hot" },
  smartphones: { offer: "5G Deals", badge: "Trending" },
  headphones: { offer: "Up to 80% Off", badge: "Mega Deal" },
  smart_watches: { offer: "From ₹1,499", badge: "Popular" },
  speakers: { offer: "Extra 20% Off", badge: "Top Sound" },
  cameras: { offer: "Pro 4K Gear", badge: "Creator" },
  televisions: { offer: "Cinematic 4K", badge: "Big Screen" },
};

function ElectricCategoryCard({ item }) {
  const navigate = useNavigate();
  const rawId = item.categoryId || "";
  const categoryId = rawId.startsWith("electronics")
    ? rawId
    : `electronics_${rawId}`;

  const highlight =
    ELECTRIC_HIGHLIGHTS[rawId] ||
    ELECTRIC_HIGHLIGHTS[categoryId] || { offer: "Explore Gadgets", badge: "Tech" };

  return (
    <button
      type="button"
      onClick={() => navigate(`/products/${categoryId}`)}
      className="group flex w-full cursor-pointer flex-col items-center gap-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-2.5 sm:p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-500/80 dark:hover:border-teal-400/80 hover:shadow-lg hover:shadow-teal-900/5 dark:hover:shadow-teal-950/40 hover:bg-white dark:hover:bg-slate-800 text-left"
    >
      <div className="relative flex aspect-square w-full items-center justify-center rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 p-2.5 sm:p-3 transition-all duration-500 group-hover:shadow-sm">
        <img
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
          src={item.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80"}
          alt={item.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80";
          }}
          loading="lazy"
        />

        {highlight.badge && (
          <span className="absolute top-1.5 left-1.5 rounded-md bg-teal-600 dark:bg-teal-500 text-[9px] font-extrabold text-white px-1.5 py-0.5 shadow-xs uppercase tracking-wider backdrop-blur-xs">
            {highlight.badge}
          </span>
        )}

        <div className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xs">
          <ArrowUpRight size={13} />
        </div>
      </div>

      <div className="w-full text-center">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 transition-colors duration-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 truncate">
          {item.name}
        </h3>
        <p className="mt-0.5 text-[10px] sm:text-[11px] font-extrabold text-teal-700 dark:text-teal-400 truncate">
          {highlight.offer}
        </p>
      </div>
    </button>
  );
}

export default ElectricCategoryCard;