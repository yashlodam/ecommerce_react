import React from "react";
import ElectricCategoryCard from "./ElectricCategoryCard";
import { useAppSelector } from "../../../../State/Store";
import { homeCategories } from "../../../../data/HomeCategories";

function ElectricCategory() {
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
      <div className="flex flex-col gap-3 sm:gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4 sm:pb-5 sm:mb-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-800/80 text-xl sm:text-2xl shadow-xs shrink-0">
            📱
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] text-teal-600 dark:text-teal-400">
              Electronics
            </p>
            <h2 className="mt-0.5 text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 truncate">
              Shop Top Electronics
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
              Discover flagship smartphones, noise-canceling audio & modern smart wearables.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 min-[480px]:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2.5 sm:gap-4 lg:gap-5">
        {electricList.map((item, index) => (
          <ElectricCategoryCard key={item.id || index} item={item} />
        ))}
      </div>
    </section>
  );
}

export default ElectricCategory;