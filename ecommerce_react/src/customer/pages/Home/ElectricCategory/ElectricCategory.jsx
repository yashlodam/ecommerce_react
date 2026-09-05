import React from "react";
import ElectricCategoryCard from "./ElectricCategoryCard";
import { useAppSelector } from "../../../../State/Store";
import { homeCategories } from "../../../../data/HomeCategories";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function ElectricCategory() {
  const navigate = useNavigate();
  const customer = useAppSelector((state) => state.customer);

  const fallbackCategories = homeCategories.filter(
    (c) => c.section === "ELECTRIC_CATEGORIES"
  );

  const electricList =
    customer?.homeCategories?.electricCategories?.length > 0
      ? customer.homeCategories.electricCategories
      : customer?.homePageData?.electricCategories?.length > 0
        ? customer.homePageData.electricCategories
        : fallbackCategories;

  return (
    <section className="overflow-hidden rounded-[24px] sm:rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-sm p-3.5 min-[375px]:p-4 sm:p-6 lg:p-7 transition-colors">
      <div className="flex flex-col gap-3 sm:gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4 sm:pb-5 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-800/80 text-xl sm:text-2xl shadow-xs shrink-0">
            ⚡
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] text-teal-600 dark:text-teal-400">
              Electronics & Gadgets
            </p>
            <h2 className="mt-0.5 text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 truncate">
              Top Tech Highlights
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
              Flagship 5G smartphones, wireless noise-canceling audio & AMOLED smart wearables.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/products/electronics")}
          className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer shrink-0"
        >
          <span>Explore Tech</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-2 min-[480px]:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-2.5 sm:gap-4 lg:gap-5">
        {electricList.map((item, index) => (
          <ElectricCategoryCard key={item.id || index} item={item} />
        ))}

        {/* 8th Symmetrical Action Card for 2-Column Mobile & Desktop Grid */}
        <button
          type="button"
          onClick={() => navigate("/products/electronics")}
          className="group flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-teal-500/40 hover:border-teal-500 bg-teal-50/40 dark:bg-teal-950/20 p-2.5 sm:p-3.5 shadow-xs transition-all duration-300 hover:scale-[1.02] text-center min-h-[140px]"
        >
          <div className="flex aspect-square w-11 h-11 sm:w-13 sm:h-13 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md group-hover:scale-110 transition-transform">
            <ArrowRight size={20} />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-teal-700 dark:text-teal-300">All Tech</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">50+ Devices →</p>
          </div>
        </button>
      </div>
    </section>
  );
}

export default ElectricCategory;