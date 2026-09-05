import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

function BrandInSpotlight() {
  const navigate = useNavigate();

  // Brands in spotlight: Apple, Samsung, Sony, Vivo
  const brands = [
    {
      name: "Apple",
      tagline: "iPhones, Mac & Accessories",
      category: "electronics",
      query: "Apple",
      discount: "Min 15% Off",
      image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Samsung",
      tagline: "Flagship Galaxy 5G Phones",
      category: "electronics",
      query: "Samsung",
      discount: "Up to 25% Off",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Sony",
      tagline: "Noise Cancelling Headphones & Audio",
      category: "electronics",
      query: "Sony",
      discount: "Up to 30% Off",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Vivo",
      tagline: "Ultra Slim & Portrait 5G",
      category: "electronics",
      query: "Vivo",
      discount: "Flat 20% Off",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80",
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
          Handpicked releases and verified collections from authorized marketplace brand partners.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
        {brands.map((brand, index) => (
          <div
            key={index}
            onClick={() => navigate(`/search?q=${encodeURIComponent(brand.query)}`)}
            className="group relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer"
          >
            <img
              src={brand.image}
              alt={brand.name}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-slate-900 dark:text-slate-100 text-[10px] sm:text-[11px] font-extrabold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm">
              {brand.discount}
            </div>

            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white flex items-end justify-between">
              <div className="min-w-0 flex-1 mr-2">
                <h3 className="text-base sm:text-xl font-extrabold tracking-tight truncate">
                  {brand.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-300 mt-0.5 line-clamp-1">{brand.tagline}</p>
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md shrink-0">
                <ArrowForwardRoundedIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BrandInSpotlight;