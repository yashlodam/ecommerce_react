import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Flame,
  Shirt,
  Smartphone,
  Home as HomeIcon,
  Sparkle,
  X,
  Compass,
} from "lucide-react";

import { menLevelTwo } from "../../../data/category/level two/menLevelTwo";
import { womenLevelTwo } from "../../../data/category/level two/womensLevelTwo";
import { electronicsLevelTwo } from "../../../data/category/level two/electronicsLevelTwo";
import { homeFurnitureLevelTwo } from "../../../data/category/level two/homeFurnitureLevelTwo";
import { beautyLevelTwo } from "../../../data/category/level two/beautyLevelTwo";

import { menLevelThree } from "../../../data/category/level three/menLevelThree";
import { womenLevelThree } from "../../../data/category/level three/womenLevelThree";
import { electronicsLevelThree } from "../../../data/category/level three/electronicsLevelThree";
import { homeFurnitureLevelThree } from "../../../data/category/level three/homeFurnitureLevelThree";
import { beautyLevelThree } from "../../../data/category/level three/beautyLevelThree";

const DEPARTMENTS = [
  {
    id: "men",
    name: "Men",
    subtitle: "Fashion & Grooming",
    icon: Shirt,
    emoji: "👔",
    accent: "from-blue-600 to-indigo-600",
    badge: "Men's Edit",
    allCategoryRoute: "/products/men",
    levelTwo: menLevelTwo,
    levelThree: menLevelThree,
  },
  {
    id: "women",
    name: "Women",
    subtitle: "Ethnic & Western",
    icon: Sparkle,
    emoji: "👗",
    accent: "from-pink-600 to-rose-600",
    badge: "Women's Trends",
    allCategoryRoute: "/products/women",
    levelTwo: womenLevelTwo,
    levelThree: womenLevelThree,
  },
  {
    id: "electronics",
    name: "Electronics",
    subtitle: "Mobiles, Laptops & Audio",
    icon: Smartphone,
    emoji: "⚡",
    accent: "from-cyan-600 to-teal-600",
    badge: "Next-Gen Tech",
    allCategoryRoute: "/products/electronics",
    levelTwo: electronicsLevelTwo,
    levelThree: electronicsLevelThree,
  },
  {
    id: "home_furniture",
    name: "Home & Living",
    subtitle: "Decor, Furniture & Kitchen",
    icon: HomeIcon,
    emoji: "🏡",
    accent: "from-amber-600 to-orange-600",
    badge: "Comfort Living",
    allCategoryRoute: "/products/home_furniture",
    levelTwo: homeFurnitureLevelTwo,
    levelThree: homeFurnitureLevelThree,
  },
  {
    id: "beauty",
    name: "Beauty",
    subtitle: "Skincare, Makeup & Fragrance",
    icon: Sparkles,
    emoji: "💄",
    accent: "from-purple-600 to-fuchsia-600",
    badge: "Glow & Glam",
    allCategoryRoute: "/products/beauty",
    levelTwo: beautyLevelTwo,
    levelThree: beautyLevelThree,
  },
  {
    id: "deals",
    name: "Flash Deals",
    subtitle: "Hot Marketplace Offers",
    icon: Flame,
    emoji: "🔥",
    accent: "from-rose-600 to-red-600",
    badge: "Up to 80% Off",
    allCategoryRoute: "/deals",
    isDeals: true,
  },
];

const POPULAR_QUICK_CHIPS = [
  { label: "T-Shirts", categoryId: "men_tshirts", emoji: "👕" },
  { label: "Smartphones", categoryId: "electronics_smartphones", emoji: "📱" },
  { label: "Kurtas", categoryId: "women_kurtas", emoji: "🥻" },
  { label: "Headphones", categoryId: "headphones", emoji: "🎧" },
  { label: "Sneakers", categoryId: "men_sneakers", emoji: "👟" },
  { label: "Sarees", categoryId: "women_sarees", emoji: "✨" },
  { label: "Skincare", categoryId: "beauty_skincare", emoji: "🧴" },
  { label: "Bedsheets", categoryId: "home_bedsheets", emoji: "🛏️" },
];

export default function CategoriesPage() {
  const navigate = useNavigate();
  const [selectedDeptId, setSelectedDeptId] = useState("men");
  const [searchQuery, setSearchQuery] = useState("");

  const activeDept = useMemo(() => {
    return DEPARTMENTS.find((d) => d.id === selectedDeptId) || DEPARTMENTS[0];
  }, [selectedDeptId]);

  // Pre-index all levelThree items for fast instant search
  const allSearchableItems = useMemo(() => {
    const list = [];
    DEPARTMENTS.forEach((dept) => {
      if (dept.isDeals) return;
      (dept.levelThree || []).forEach((item) => {
        list.push({
          ...item,
          deptId: dept.id,
          deptName: dept.name,
          deptEmoji: dept.emoji,
        });
      });
    });
    return list;
  }, []);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return allSearchableItems.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.parentCategoryName && item.parentCategoryName.toLowerCase().includes(q)) ||
        (item.deptName && item.deptName.toLowerCase().includes(q))
    );
  }, [searchQuery, allSearchableItems]);

  const handleItemClick = (categoryId) => {
    navigate(`/products/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col pb-20 md:pb-8">
      {/* ─── Sticky Header / Search ─── */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="p-1.5 sm:p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Search Input Bar */}
          <div className="flex-1 relative">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100/90 dark:bg-slate-800/90 px-3.5 py-1.5 sm:py-2 focus-within:border-teal-500 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories (e.g., T-Shirts, Kurtas, Laptops)..."
                className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Popular Category Chips (Horizontal Scroll on Mobile) */}
        {!searchQuery && (
          <div className="max-w-7xl mx-auto px-3 sm:px-6 pb-2.5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0 flex items-center gap-1 pl-1">
              <Compass className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              Trending:
            </span>
            {POPULAR_QUICK_CHIPS.map((chip) => (
              <button
                key={chip.categoryId}
                onClick={() => handleItemClick(chip.categoryId)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950/60 hover:text-teal-700 dark:hover:text-teal-400 hover:border-teal-300 border border-slate-200/60 dark:border-slate-700/60 transition-colors shrink-0 cursor-pointer"
              >
                <span>{chip.emoji}</span>
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ─── Search Results View (When typing in search bar) ─── */}
      {searchQuery.trim() ? (
        <main className="max-w-4xl mx-auto w-full px-4 py-4 flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            Matching Categories ({searchResults.length})
          </p>

          {searchResults.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="text-3xl mb-2">🔍</p>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                No matching category found for "{searchQuery}"
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for t-shirts, sarees, audio, laptops, footwear or watches.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-4 py-2 rounded-full text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white cursor-pointer"
              >
                Clear Search & Browse All
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {searchResults.map((item) => (
                <button
                  key={`${item.deptId}_${item.categoryId}`}
                  onClick={() => handleItemClick(item.categoryId)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-teal-500 hover:shadow-sm text-left transition-all group cursor-pointer"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <span>{item.deptEmoji}</span>
                      <span className="truncate">{item.parentCategoryName || item.deptName}</span>
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors shrink-0 ml-2" />
                </button>
              ))}
            </div>
          )}
        </main>
      ) : (
        /* ─── Flipkart-Style Split Rail Category Explorer ─── */
        <main className="flex-1 max-w-7xl mx-auto w-full flex overflow-hidden">
          {/* Left Vertical Department Rail */}
          <aside
            aria-label="Departments"
            className="w-[84px] sm:w-28 md:w-56 shrink-0 bg-slate-100/90 dark:bg-slate-900/90 border-r border-slate-200/80 dark:border-slate-800 overflow-y-auto"
          >
            <div className="flex flex-col py-1.5 space-y-1">
              {DEPARTMENTS.map((dept) => {
                const isSelected = selectedDeptId === dept.id;
                const Icon = dept.icon;

                return (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDeptId(dept.id)}
                    className={`relative w-full flex flex-col md:flex-row items-center md:gap-3 px-2 sm:px-3 py-3 md:py-3.5 transition-all text-center md:text-left cursor-pointer ${
                      isSelected
                        ? "bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 font-bold shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    {/* Active Left Indicator Pill */}
                    {isSelected && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 md:w-1.5 bg-teal-600 dark:bg-teal-400 rounded-r-full" />
                    )}

                    {/* Department Icon / Emoji */}
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 md:w-10 md:h-10 rounded-2xl flex items-center justify-center text-lg sm:text-xl shrink-0 transition-transform ${
                        isSelected
                          ? "bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800/80 scale-105"
                          : "bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60"
                      }`}
                    >
                      {dept.emoji}
                    </div>

                    <div className="min-w-0 mt-1 md:mt-0 flex-1">
                      <p className="text-[11px] sm:text-xs md:text-sm leading-tight truncate">
                        {dept.name}
                      </p>
                      <p className="hidden md:block text-[11px] text-slate-400 font-normal truncate mt-0.5">
                        {dept.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right Subcategories Content Panel */}
          <section className="flex-1 bg-white dark:bg-slate-950 overflow-y-auto px-3 sm:px-6 py-4 space-y-5">
            {/* Department Hero Banner */}
            <div
              className={`rounded-2xl p-4 sm:p-5 text-white bg-gradient-to-r ${activeDept.accent} shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-xs mb-1.5">
                  {activeDept.badge}
                </span>
                <h1 className="text-lg sm:text-2xl font-black flex items-center gap-2">
                  <span>{activeDept.emoji}</span>
                  <span>{activeDept.name}</span>
                </h1>
                <p className="text-xs sm:text-sm text-white/90 mt-0.5">
                  {activeDept.subtitle}
                </p>
              </div>

              <button
                onClick={() => navigate(activeDept.allCategoryRoute)}
                className="self-start sm:self-center px-4 py-2 rounded-full text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <span>Browse All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* If Flash Deals Tab Selected */}
            {activeDept.isDeals ? (
              <div className="p-6 text-center bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                <p className="text-4xl animate-bounce">🔥</p>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Marketplace Flash Deals & Discounts
                </h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Grab limited-time discounts up to 80% across fashion, electronics, and home essentials.
                </p>
                <button
                  onClick={() => navigate("/deals")}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Explore All Deals
                </button>
              </div>
            ) : (
              /* Grouped Level 2 & Level 3 Subcategory Sections */
              <div className="space-y-6">
                {(activeDept.levelTwo || []).map((l2) => {
                  const children = (activeDept.levelThree || []).filter(
                    (child) => child.parentCategoryId === l2.categoryId
                  );

                  return (
                    <div
                      key={l2.categoryId}
                      className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/40 p-3.5 sm:p-4"
                    >
                      {/* Level 2 Section Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800/80 mb-3">
                        <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400" />
                          <span>{l2.name}</span>
                        </h2>

                        <button
                          onClick={() => handleItemClick(l2.categoryId)}
                          className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer flex items-center gap-0.5"
                        >
                          <span>View All</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Level 3 Subcategories Grid */}
                      <div className="grid grid-cols-2 min-[480px]:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5">
                        {children.length > 0 ? (
                          children.map((child) => (
                            <button
                              key={child.categoryId}
                              onClick={() => handleItemClick(child.categoryId)}
                              className="group flex flex-col p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 hover:border-teal-500/80 hover:shadow-xs text-left transition-all active:scale-95 cursor-pointer"
                            >
                              <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 line-clamp-1">
                                {child.name}
                              </span>
                              <span className="text-[10px] text-slate-400 mt-0.5">
                                Explore →
                              </span>
                            </button>
                          ))
                        ) : (
                          <button
                            onClick={() => handleItemClick(l2.categoryId)}
                            className="col-span-full py-2 px-3 text-left text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                          >
                            Explore all items in {l2.name} →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </main>
      )}
    </div>
  );
}
