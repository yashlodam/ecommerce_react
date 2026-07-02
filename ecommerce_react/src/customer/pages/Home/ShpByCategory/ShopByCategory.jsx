import React from "react";
import { ArrowRight } from "lucide-react";
import ShopByCategoryCard from "./ShopByCategoryCard";
import { store, useAppSelector } from "../../../../State/Store";

function ShopByCategory() {

  const {customer} = useAppSelector(store=>store);

  console.log("customer", customer);

  const categories = customer?.homeCategories?.shopByCategories;

  

  return (
    <section className="px-3 py-8 sm:px-4 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1400px] rounded-[32px] border border-slate-200/80 bg-white/85 p-4 shadow-[0_30px_90px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-600">Browse by interest</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Shop by category
            </h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Explore products by category with a smoother, more premium browse experience.
            </p>
          </div>

          <button className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700 md:inline-flex">
            View all
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="category-row flex flex-wrap items-start gap-3 overflow-x-auto pb-2 sm:gap-4 lg:gap-5">
          {categories?.map((item, index) => (
            <ShopByCategoryCard key={index} item= {item} />
          ))}
        </div>
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