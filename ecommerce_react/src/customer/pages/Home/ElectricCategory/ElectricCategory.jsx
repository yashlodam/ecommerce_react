import React from "react";
import ElectricCategoryCard from "./ElectricCategoryCard";
import { useAppSelector } from "../../../../State/Store";

function ElectricCategory() {
  const { customer } = useAppSelector((state) => state);

  return (
    <section className="mt-8 overflow-hidden rounded-[32px] border border-slate-200/80 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_35%),linear-gradient(135deg,_#f8fbff_0%,_#ffffff_55%,_#f8fafc_100%)] shadow-[0_30px_90px_-35px_rgba(15,23,42,0.35)]">
      <div className="flex flex-col gap-4 border-b border-slate-200/80 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10 text-2xl shadow-sm">
            📱
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-600">Electronics</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Shop top electronics
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Discover stylish, high-performance gadgets from trusted brands.
            </p>
          </div>
        </div>
      </div>

      {customer?.homeCategories?.electricCategories?.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 lg:gap-5 lg:p-6">
          {customer.homeCategories.electricCategories.map((item) => (
            <ElectricCategoryCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-20 text-center">
          <img src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png" alt="No Categories" className="h-24 w-24 opacity-70" />
          <h3 className="mt-5 text-lg font-semibold text-slate-800">No categories found</h3>
          <p className="mt-2 text-sm text-slate-500">Electronics categories will appear here soon.</p>
        </div>
      )}
    </section>
  );
}

export default ElectricCategory;