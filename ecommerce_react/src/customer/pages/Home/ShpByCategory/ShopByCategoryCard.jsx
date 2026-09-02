import React from "react";
import { useNavigate } from "react-router-dom";

function ShopByCategoryCard({ item }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${item.categoryId}`)}
      className="group flex w-[90px] sm:w-[110px] md:w-[124px] lg:w-[136px] flex-shrink-0 cursor-pointer flex-col items-center p-2 rounded-2xl transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:-translate-y-1"
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs transition-all duration-300 group-hover:border-teal-500 group-hover:shadow-md group-hover:ring-4 group-hover:ring-teal-50 dark:group-hover:ring-teal-950/40 flex items-center justify-center p-2">
        <img
          src={item.image}
          alt={item.name || "Category"}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-teal-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      <p className="mt-2.5 text-center text-xs sm:text-sm font-bold leading-tight text-slate-800 dark:text-slate-200 transition-colors duration-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 line-clamp-2">
        {item.name}
      </p>
    </div>
  );
}

export default ShopByCategoryCard;