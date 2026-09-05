import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function FeaturedCollections() {
  const collections = [
    {
      title: "Women's Ethnic & Modern Wear",
      subtitle: "Elevated statement layers, sarees and chic dresses",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
      span: "sm:col-span-2 md:col-span-3 lg:col-span-2",
      category: "women",
    },
    {
      title: "Audio & Smart Electronics",
      subtitle: "Noise-canceling earphones and fast chargers",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80",
      span: "md:col-span-3 lg:col-span-2",
      category: "electronics",
    },
    {
      title: "Cameras & Digital Photography",
      subtitle: "Mirrorless cameras, 4K video bodies & zoom lenses",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
      span: "md:col-span-3 lg:col-span-2",
      category: "cameras",
    },
    {
      title: "Athletic & Pro Footwear",
      subtitle: "Running sneakers, casual trainers and gym essentials",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      span: "sm:col-span-2 md:col-span-3 lg:col-span-2",
      category: "men",
    },
  ];

  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-4 sm:p-6 lg:p-7 shadow-sm transition-colors">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-teal-600 dark:text-teal-400">
            Curated Collections
          </p>
          <h2 className="mt-0.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Featured Lifestyle Collections
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Curated departments for every lifestyle, crafted for quick browsing.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-4 sm:gap-5">
        {collections.map((item, index) => (
          <div
            onClick={() => handleClick(item.category)}
            key={index}
            className={`group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-900 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:aspect-[16/10] md:aspect-[16/10] lg:aspect-[4/3] ${item.span}`}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent transition-opacity duration-300 group-hover:from-slate-950/95" />

            <div className="absolute inset-0 flex flex-col justify-end p-5 text-white sm:p-6">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold leading-tight">
                {item.title}
              </h3>
              <p className="mt-1 mb-3 text-xs text-slate-300 line-clamp-1">
                {item.subtitle}
              </p>

              <button className="self-start inline-flex items-center gap-1.5 rounded-full bg-white/95 text-slate-950 px-3.5 py-1.5 text-xs font-bold transition-all duration-300 group-hover:bg-teal-500 group-hover:text-white cursor-pointer shadow-sm">
                Explore Now
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedCollections;