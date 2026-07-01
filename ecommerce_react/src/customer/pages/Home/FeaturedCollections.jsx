import React from "react";
import { ArrowRight } from "lucide-react";

function FeaturedCollections() {
  const collections = [
    {
      title: "Fashion Collection",
      subtitle: "Styles for every season",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
      span: "sm:col-span-2 md:col-span-3 lg:col-span-2",
    },
    {
      title: "Electronics",
      subtitle: "Latest gadgets & tech",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80",
      span: "md:col-span-3 lg:col-span-2",
    },
    {
      title: "Home Decor",
      subtitle: "Make your space yours",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      span: "md:col-span-3 lg:col-span-2",
    },
    {
      title: "Gaming Zone",
      subtitle: "Gear up and level up",
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
      span: "sm:col-span-2 md:col-span-3 lg:col-span-2",
    },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-600">Curated picks</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Featured collections
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Curated collections for every lifestyle, designed to feel elevated from the first glance.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700">
          View all
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-4 sm:gap-5 md:gap-6">
        {collections.map((item, index) => (
          <div
            key={index}
            className={`group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[24px] border border-slate-200/70 bg-white shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-24px_rgba(15,23,42,0.4)] sm:aspect-[16/10] md:aspect-[16/10] lg:aspect-[4/3] ${item.span}`}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent transition-opacity duration-300 group-hover:from-slate-950/90" />

            <div className="absolute inset-0 flex flex-col justify-end p-5 text-white sm:p-6 md:p-7 lg:p-7">
              <h3 className="text-lg font-semibold leading-tight sm:text-xl md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-1 mb-4 text-xs text-white/80 sm:text-sm">
                {item.subtitle}
              </p>

              <button className="self-start inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-all duration-300 group-hover:gap-3 group-hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Explore now
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>

            <span className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10 transition-colors duration-300 group-hover:ring-white/20" />
          </div>
        ))}
      </div>

      <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 sm:hidden">
        View all collections
        <ArrowRight size={16} />
      </button>
    </section>
  );
}

export default FeaturedCollections;