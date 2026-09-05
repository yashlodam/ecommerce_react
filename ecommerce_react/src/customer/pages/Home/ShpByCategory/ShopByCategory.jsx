import React, { useState, useMemo, useRef, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, LayoutGrid, Columns3, Sparkles } from "lucide-react";
import ShopByCategoryCard from "./ShopByCategoryCard";
import { useAppSelector } from "../../../../State/Store";
import { homeCategories } from "../../../../data/HomeCategories";
import { useNavigate } from "react-router-dom";

const DEPARTMENT_TABS = [
  { id: "ALL", label: "All Categories", icon: "✨" },
  { id: "MEN", label: "Men's Fashion", icon: "👔" },
  { id: "WOMEN", label: "Women's Fashion", icon: "👗" },
  { id: "ELECTRONICS", label: "Electronics & Tech", icon: "⚡" },
  { id: "HOME", label: "Home & Living", icon: "🏡" },
  { id: "BEAUTY", label: "Beauty & Care", icon: "💄" },
];

function getDepartment(categoryId = "") {
  const cid = (categoryId || "").toLowerCase();
  if (cid.startsWith("men_")) return "MEN";
  if (cid.startsWith("women_beauty") || cid === "beauty") return "BEAUTY";
  if (cid.startsWith("women_")) return "WOMEN";
  if (
    cid.startsWith("home_") ||
    cid.includes("furniture") ||
    cid.includes("bed") ||
    cid.includes("kitchen") ||
    cid.includes("lighting") ||
    cid.includes("garden")
  )
    return "HOME";
  if (
    cid.startsWith("electronics") ||
    cid === "laptops" ||
    cid === "smartphones" ||
    cid === "headphones" ||
    cid === "smart_watches" ||
    cid === "speakers" ||
    cid === "cameras" ||
    cid === "televisions"
  )
    return "ELECTRONICS";
  return "OTHER";
}

function ShopByCategory() {
  const navigate = useNavigate();
  const customer = useAppSelector((store) => store.customer);
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [viewMode, setViewMode] = useState("carousel"); // 'carousel' | 'grid'
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const fallbackCategories = useMemo(
    () => homeCategories.filter((c) => c.section === "SHOP_BY_CATEGORIES"),
    []
  );

  // Merge shopByCategories and electricCategories for a complete catalog view
  const allCategories = useMemo(() => {
    const shopList =
      customer?.homeCategories?.shopByCategories?.length > 0
        ? customer.homeCategories.shopByCategories
        : customer?.homePageData?.shopByCategories?.length > 0
          ? customer.homePageData.shopByCategories
          : fallbackCategories;

    const electricList =
      customer?.homeCategories?.electricCategories?.length > 0
        ? customer.homeCategories.electricCategories
        : customer?.homePageData?.electricCategories?.length > 0
          ? customer.homePageData.electricCategories
          : homeCategories.filter((c) => c.section === "ELECTRIC_CATEGORIES");

    const map = new Map();
    shopList.forEach((c) => map.set(c.categoryId, c));
    electricList.forEach((c) => {
      if (!map.has(c.categoryId)) {
        map.set(c.categoryId, c);
      }
    });

    return Array.from(map.values());
  }, [customer, fallbackCategories]);

  // Filter based on selected department tab
  const filteredCategories = useMemo(() => {
    if (selectedDept === "ALL") return allCategories;
    return allCategories.filter((item) => getDepartment(item.categoryId) === selectedDept);
  }, [allCategories, selectedDept]);

  // Count items per department
  const deptCounts = useMemo(() => {
    const counts = { ALL: allCategories.length, MEN: 0, WOMEN: 0, ELECTRONICS: 0, HOME: 0, BEAUTY: 0 };
    allCategories.forEach((cat) => {
      const d = getDepartment(cat.categoryId);
      if (counts[d] !== undefined) counts[d]++;
    });
    return counts;
  }, [allCategories]);

  // Scroll handler for carousel
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
  }, [filteredCategories, viewMode]);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -380 : 380;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    setTimeout(checkScroll, 350);
  };

  return (
    <section className="overflow-hidden rounded-[24px] sm:rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-3.5 min-[375px]:p-4 sm:p-6 lg:p-7 shadow-sm transition-colors">
      {/* Header section with title, view toggles & catalog CTA */}
      <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-4 sm:pb-5">
        <div className="min-w-0 flex-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] text-teal-600 dark:text-teal-400">
            <Sparkles size={13} className="text-teal-500" />
            <span>Curated Marketplace Departments</span>
          </div>
          <h2 className="mt-0.5 text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 truncate">
            Shop by Category
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">
            Explore authentic fashion, flagship electronics, living essentials, and beauty departments.
          </p>
        </div>

        {/* View mode toggle & All catalog button */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex items-center rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200/60 dark:border-slate-700/60">
            <button
              type="button"
              onClick={() => setViewMode("carousel")}
              aria-label="Carousel slider view"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "carousel"
                  ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Columns3 size={14} />
              <span className="hidden min-[480px]:inline">Slider</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid showcase view"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <LayoutGrid size={14} />
              <span className="hidden min-[480px]:inline">Grid</span>
            </button>
          </div>

          <button
            onClick={() => navigate("/products/all")}
            className="hidden items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-slate-700 md:inline-flex cursor-pointer"
          >
            All Catalog
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Interactive Department Filter Tabs */}
      <div className="mb-5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar">
        {DEPARTMENT_TABS.map((tab) => {
          const count = deptCounts[tab.id] || 0;
          if (count === 0 && tab.id !== "ALL") return null;
          const isActive = selectedDept === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setSelectedDept(tab.id);
                if (scrollRef.current) scrollRef.current.scrollLeft = 0;
              }}
              className={`group flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                isActive
                  ? "bg-teal-600 text-white border-teal-600 shadow-sm shadow-teal-600/20"
                  : "bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:border-teal-400 hover:bg-white dark:hover:bg-slate-800"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span
                className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
                  isActive
                    ? "bg-white/25 text-white"
                    : "bg-slate-200/80 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Categories Presentation Stage */}
      {viewMode === "carousel" ? (
        <div className="relative group/carousel">
          {/* Desktop Floating Navigation Arrows */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Previous categories"
              className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-xl border border-slate-200/80 dark:border-slate-700 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-slate-700 transition-all cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {canScrollRight && (
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Next categories"
              className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-xl border border-slate-200/80 dark:border-slate-700 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-slate-700 transition-all cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Carousel Scroll Row */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="category-row flex items-stretch gap-2.5 min-[375px]:gap-3 sm:gap-4 lg:gap-4.5 overflow-x-auto pb-3 scroll-smooth snap-x snap-mandatory"
          >
            {filteredCategories.map((item, index) => (
              <ShopByCategoryCard key={item.id || item.categoryId || index} item={item} layout="carousel" />
            ))}
          </div>
        </div>
      ) : (
        /* Grid Showcase Mode */
        <div className="grid grid-cols-2 min-[440px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2.5 sm:gap-3.5 lg:gap-4">
          {filteredCategories.map((item, index) => (
            <ShopByCategoryCard key={item.id || item.categoryId || index} item={item} layout="grid" />
          ))}
        </div>
      )}

      <style>{`
        .category-row, .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .category-row::-webkit-scrollbar, .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default ShopByCategory;