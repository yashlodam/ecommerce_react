import React from "react";
import { ArrowRight } from "lucide-react";
import ShopByCategoryCard from "./ShopByCategoryCard";
import { useAppSelector } from "../../../../State/Store";
import { homeCategories } from "../../../../data/HomeCategories";
import { useNavigate } from "react-router-dom";

function ShopByCategory() {
  const navigate = useNavigate();
  const customer = useAppSelector((store) => store.customer);

  const fallbackCategories = homeCategories.filter(
    (c) => c.section === "SHOP_BY_CATEGORIES"
  );

  const categories =
    customer?.homeCategories?.shopByCategories?.length > 0
      ? customer.homeCategories.shopByCategories
      : customer?.homePageData?.shopByCategories?.length > 0
        ? customer.homePageData.shopByCategories
        : fallbackCategories;

  return (
    <section className="overflow-hidden rounded-[24px] sm:rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-3.5 min-[375px]:p-4 sm:p-6 lg:p-7 shadow-sm transition-colors">
      <div className="mb-4 sm:mb-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 sm:pb-5">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] text-teal-600 dark:text-teal-400">
            Browse by Interest
          </p>
          <h2 className="mt-0.5 text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 truncate">
            Shop by Category
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">
            Explore curated fashion, electronics, cosmetics and home lifestyle departments.
          </p>
        </div>

        <button
          onClick={() => navigate("/products/all")}
          className="hidden items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-slate-700 md:inline-flex cursor-pointer shrink-0 ml-4"
        >
          View all
          <ArrowRight size={15} />
        </button>
      </div>

      <div className="category-row flex items-start gap-2.5 min-[375px]:gap-3 sm:gap-4 lg:gap-5 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory">
        {categories?.map((item, index) => (
          <ShopByCategoryCard key={item.id || index} item={item} />
        ))}
      </div>

      <style>{`
        .category-row {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .category-row::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default ShopByCategory;