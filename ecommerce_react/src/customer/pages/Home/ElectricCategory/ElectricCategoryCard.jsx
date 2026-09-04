import React from "react";
import { useNavigate } from "react-router-dom";

function ElectricCategoryCard({ item }) {
  const navigate = useNavigate();
  const categoryId = `electronics_${item.categoryId}`;

  return (
    <button
      type="button"
      onClick={() => navigate(`/products/${categoryId}`)}
      className="group flex w-full cursor-pointer flex-col items-center gap-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 p-2.5 min-[375px]:p-3.5 sm:p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/60 dark:hover:border-teal-500/60 hover:shadow-md hover:bg-white dark:hover:bg-slate-800"
    >
      <div className="flex h-14 w-14 min-[375px]:h-16 min-[375px]:w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 p-2 sm:p-2.5 transition-transform duration-500 group-hover:scale-110 shadow-xs">
        <img
          className="h-full w-full object-contain"
          src={item.image}
          alt={item.name}
          loading="lazy"
        />
      </div>

      <h3 className="text-center text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 transition-colors duration-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 truncate w-full px-0.5">
        {item.name}
      </h3>
    </button>
  );
}

export default ElectricCategoryCard;