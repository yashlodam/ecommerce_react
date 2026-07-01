import React from "react";

function BrandInSpotlight() {
  const brands = [
    {
      name: "Nike",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    },
    {
      name: "Adidas",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800",
    },
    {
      name: "Puma",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800",
    },
    {
      name: "Levi's",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
    },
  ];

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px] rounded-[32px] border border-slate-200/80 bg-white/85 p-6 shadow-[0_30px_90px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-8 md:p-10">
        <div className="mb-8 flex flex-col gap-2 sm:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-600">Featured labels</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Brands in the spotlight
            </h2>
          </div>
          <p className="text-sm text-slate-600 sm:text-base">
            Discover the names shaping the season right now.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand, index) => (
            <div key={index} className="group relative aspect-[4/5] overflow-hidden rounded-[24px] border border-slate-200/70 shadow-[0_24px_70px_-34px_rgba(15,23,42,0.35)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-28px_rgba(15,23,42,0.4)]">
              <img src={brand.image} alt={brand.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-semibold">{brand.name}</h3>
                <p className="mt-1 text-sm text-white/80">Explore collection</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandInSpotlight;