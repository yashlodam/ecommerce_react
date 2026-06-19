import React from "react";

function ShopByCategoryCard({ image, title }) {
  return (
    <div className="group flex-shrink-0 flex flex-col items-center cursor-pointer w-[75px] sm:w-[90px] md:w-[100px] lg:w-[110px]">

      <div className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">

        <img
          src={image}
          alt={title}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <p className="mt-2 text-[11px] sm:text-xs md:text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-indigo-600 transition-colors">
        {title}
      </p>

    </div>
  );
}

export default ShopByCategoryCard;