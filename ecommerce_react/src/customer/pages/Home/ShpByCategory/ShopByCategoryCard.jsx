import React from "react";

function ShopByCategoryCard({ image, title }) {
  return (
    <div className="group flex w-[78px] flex-shrink-0 cursor-pointer flex-col items-center sm:w-[92px] md:w-[104px] lg:w-[112px]">
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-[20px] border border-slate-200/80 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.12),_transparent_60%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] shadow-[0_18px_42px_-24px_rgba(15,23,42,0.35)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_56px_-24px_rgba(37,99,235,0.35)] sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 lg:rounded-[24px]">
        <img src={image} alt={title} className="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
      </div>

      <p className="mt-2 text-center text-[11px] font-medium leading-tight text-slate-700 transition-colors duration-300 group-hover:text-blue-700 sm:text-xs md:text-sm">
        {title}
      </p>
    </div>
  );
}

export default ShopByCategoryCard;