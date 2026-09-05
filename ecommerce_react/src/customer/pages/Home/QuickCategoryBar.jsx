import React from "react";
import { useNavigate } from "react-router-dom";

const QUICK_CATEGORIES = [
  {
    id: "deals",
    name: "Deals",
    emoji: "🔥",
    badge: "SALE",
    badgeColor: "bg-rose-500 text-white",
    path: "/deals",
    ringColor: "ring-rose-400/40 hover:ring-rose-500",
    bgGradient: "from-rose-50 to-orange-50 dark:from-rose-950/50 dark:to-orange-950/40",
  },
  {
    id: "men",
    name: "Men",
    emoji: "👔",
    badge: "HOT",
    badgeColor: "bg-teal-600 text-white",
    path: "/products/men",
    ringColor: "ring-teal-400/40 hover:ring-teal-500",
    bgGradient: "from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/40",
  },
  {
    id: "women",
    name: "Women",
    emoji: "👗",
    badge: "NEW",
    badgeColor: "bg-pink-600 text-white",
    path: "/products/women",
    ringColor: "ring-pink-400/40 hover:ring-pink-500",
    bgGradient: "from-pink-50 to-rose-50 dark:from-pink-950/50 dark:to-rose-950/40",
  },
  {
    id: "electronics",
    name: "Tech & 5G",
    emoji: "⚡",
    badge: "TECH",
    badgeColor: "bg-cyan-600 text-white",
    path: "/products/electronics",
    ringColor: "ring-cyan-400/40 hover:ring-cyan-500",
    bgGradient: "from-cyan-50 to-blue-50 dark:from-cyan-950/50 dark:to-blue-950/40",
  },
  {
    id: "home_furniture",
    name: "Living",
    emoji: "🏡",
    badge: null,
    path: "/products/home_furniture",
    ringColor: "ring-amber-400/40 hover:ring-amber-500",
    bgGradient: "from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/40",
  },
  {
    id: "beauty",
    name: "Beauty",
    emoji: "💄",
    badge: "GLOW",
    badgeColor: "bg-purple-600 text-white",
    path: "/products/beauty",
    ringColor: "ring-purple-400/40 hover:ring-purple-500",
    bgGradient: "from-purple-50 to-fuchsia-50 dark:from-purple-950/50 dark:to-fuchsia-950/40",
  },
  {
    id: "all",
    name: "All Grid",
    emoji: "🧭",
    badge: null,
    path: "/categories",
    ringColor: "ring-slate-400/40 hover:ring-teal-500",
    bgGradient: "from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-800/60",
  },
];

export default function QuickCategoryBar() {
  const navigate = useNavigate();

  return (
    <nav
      aria-label="Quick Categories"
      className="w-full overflow-hidden py-1 md:hidden"
    >
      <div className="flex items-center gap-3 min-[375px]:gap-3.5 sm:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory px-1 py-1">
        {QUICK_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => navigate(cat.path)}
            className="group flex flex-col items-center gap-1.5 shrink-0 snap-start cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-2xl transition-transform active:scale-95"
            aria-label={`Browse ${cat.name}`}
          >
            {/* Circular Avatar / Bubble */}
            <div className="relative">
              <div
                className={`w-14 h-14 min-[375px]:w-15 min-[375px]:h-15 sm:w-16 sm:h-16 rounded-2xl sm:rounded-full bg-gradient-to-br ${cat.bgGradient} ring-2 ${cat.ringColor} border border-white dark:border-slate-800 shadow-xs group-hover:shadow-md flex items-center justify-center text-2xl sm:text-3xl transition-all duration-300 group-hover:scale-105`}
              >
                <span className="transform transition-transform duration-300 group-hover:scale-110">
                  {cat.emoji}
                </span>
              </div>

              {/* Optional Micro Badge */}
              {cat.badge && (
                <span
                  className={`absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[8px] font-black uppercase tracking-wider shadow-xs ${cat.badgeColor}`}
                >
                  {cat.badge}
                </span>
              )}
            </div>

            {/* Label */}
            <span className="text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors truncate max-w-[70px] text-center leading-tight">
              {cat.name}
            </span>
          </button>
        ))}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
}
