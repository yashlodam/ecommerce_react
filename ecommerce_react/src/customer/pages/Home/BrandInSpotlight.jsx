import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

function BrandInSpotlight() {
  const navigate = useNavigate();

  const brands = [
    {
      name: "Nike",
      category: "men",
      query: "Nike",
      discount: "Min 30% Off",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop",
    },
    {
      name: "Adidas",
      category: "men",
      query: "Adidas",
      discount: "Flat 40% Off",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop",
    },
    {
      name: "Puma",
      category: "men",
      query: "Puma",
      discount: "Up to 50% Off",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop",
    },
    {
      name: "Levi's",
      category: "men",
      query: "Levis",
      discount: "Starting ₹899",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-4 sm:p-6 lg:p-7 shadow-sm transition-colors">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-teal-600 dark:text-teal-400">
            Official Brand Hubs
          </p>
          <h2 className="mt-0.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Brands in the Spotlight
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Handpicked official store releases and seasonal collections from top athletic and denim brands.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {brands.map((brand, index) => (
          <div
            key={index}
            onClick={() => navigate(`/search?q=${brand.query}`)}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

            <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-slate-900 dark:text-slate-100 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm">
              {brand.discount}
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
              <div>
                <h3 className="text-xl font-extrabold tracking-tight">
                  {brand.name}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">Explore Catalog</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md">
                <ArrowForwardRoundedIcon sx={{ fontSize: 16 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BrandInSpotlight;