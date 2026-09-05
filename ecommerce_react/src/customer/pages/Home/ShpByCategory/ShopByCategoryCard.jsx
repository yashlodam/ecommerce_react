import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const CATEGORY_HIGHLIGHTS = {
  men_topwear: { offer: "Min. 40% Off", badge: "Trending" },
  men_bottomwear: { offer: "From ₹499", badge: "Popular" },
  men_hoodies: { offer: "Winter Style", badge: "Hot" },
  men_jackets: { offer: "Flat 45% Off", badge: "Bestseller" },
  men_footwear: { offer: "Top Brands", badge: "New" },
  women_western_wear: { offer: "Chic Styles", badge: "Trending" },
  women_dresses: { offer: "Up to 60% Off", badge: "Special" },
  women_jewellery: { offer: "Artisan Picks", badge: "Festive" },
  women_kurtas: { offer: "Ethnic Edit", badge: "Hot" },
  women_sarees: { offer: "Designer Weaves", badge: "Premium" },
  women_footwear: { offer: "Under ₹999", badge: "Popular" },
  home_beds: { offer: "Best Comfort", badge: "Home" },
  home_furniture: { offer: "Solid Wood", badge: "Crafted" },
  home_lighting: { offer: "From ₹199", badge: "Decor" },
  home_garden_outdoor: { offer: "Green Living", badge: "Outdoor" },
  home_kitchen_dining: { offer: "Cookware Sets", badge: "Kitchen" },
  women_beauty_personal_care: { offer: "Self Care", badge: "Glow" },
  laptops: { offer: "High Speed", badge: "Tech" },
  smartphones: { offer: "5G Flagships", badge: "Mobiles" },
  headphones: { offer: "Up to 80% Off", badge: "Audio" },
  smart_watches: { offer: "AMOLED", badge: "Fitness" },
  speakers: { offer: "Deep Bass", badge: "Sound" },
  cameras: { offer: "4K Capture", badge: "Optics" },
  televisions: { offer: "Ultra HD", badge: "Visual" },
};

function formatDisplayName(name, categoryId) {
  if (name && name !== "Men" && name !== "Women") return name;
  if (!categoryId) return name || "Category";
  return categoryId
    .replace(/^electronics_/, "")
    .replace(/^women_/, "")
    .replace(/^men_/, "")
    .replace(/^home_/, "")
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function ShopByCategoryCard({ item, layout = "carousel" }) {
  const navigate = useNavigate();

  const highlight = CATEGORY_HIGHLIGHTS[item.categoryId] || {
    offer: "Explore Now",
    badge: "Trending",
  };

  const displayName = formatDisplayName(item.name, item.categoryId);
  const isGrid = layout === "grid";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/products/${item.categoryId}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`/products/${item.categoryId}`);
        }
      }}
      aria-label={`Shop ${displayName}`}
      className={`group relative flex cursor-pointer flex-col rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800/90 bg-slate-50/60 dark:bg-slate-800/40 p-2.5 sm:p-3.5 transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-500/80 dark:hover:border-teal-400/80 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-teal-900/5 dark:hover:shadow-teal-950/40 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
        isGrid
          ? "w-full"
          : "w-[120px] min-[375px]:w-[130px] sm:w-[155px] md:w-[165px] lg:w-[180px] shrink-0 snap-start"
      }`}
    >
      {/* Visual Image Stage */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 p-2.5 flex items-center justify-center shadow-2xs group-hover:shadow-sm">
        <img
          src={item.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80"}
          alt={displayName}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80";
          }}
          className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
          loading="lazy"
        />

        {/* Floating Mini Badge */}
        {highlight.badge && (
          <span className="absolute top-1.5 left-1.5 rounded-md bg-teal-600/90 dark:bg-teal-500 text-[9px] font-extrabold text-white px-1.5 py-0.5 shadow-xs uppercase tracking-wider backdrop-blur-xs">
            {highlight.badge}
          </span>
        )}

        {/* Subtle hover icon arrow */}
        <div className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xs group-hover:scale-105">
          <ArrowUpRight size={13} />
        </div>
      </div>

      {/* Meta Content */}
      <div className="mt-2 sm:mt-2.5 flex flex-1 flex-col justify-between text-center">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 transition-colors duration-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 line-clamp-1 leading-snug">
            {displayName}
          </h3>
          <p className="mt-0.5 text-[10px] sm:text-[11px] font-extrabold text-teal-700 dark:text-teal-400 truncate">
            {highlight.offer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShopByCategoryCard;