import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const cards = [
  {
    title: "Festive Ethnic Edit",
    subtitle: "Handcrafted sarees, designer lehengas & artisan zari embroidery",
    category: "women_sarees",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85",
    layout: "lg:col-span-4 lg:row-span-2 col-span-1 md:col-span-2 min-h-[300px] lg:min-h-0",
    badge: "Featured Edit",
  },
  {
    title: "Urban Streetwear",
    subtitle: "Relaxed tailored fits, graphic tees & modern casuals",
    category: "men_topwear",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=85",
    layout: "lg:col-span-4 lg:row-span-1 col-span-1 min-h-[220px] lg:min-h-0",
    badge: "Trending",
  },
  {
    title: "Evening Glamour",
    subtitle: "Polished modern silhouettes, chic partywear & western tops",
    category: "women_western_wear",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85",
    layout: "lg:col-span-4 lg:row-span-1 col-span-1 min-h-[220px] lg:min-h-0",
    badge: "Limited Drop",
  },
  {
    title: "Sport Luxe & Footwear",
    subtitle: "High-performance running sneakers & premium leather kicks",
    category: "men_footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
    layout: "lg:col-span-4 lg:row-span-1 col-span-1 min-h-[220px] lg:min-h-0",
    badge: "Bestseller",
  },
  {
    title: "Executive Tailoring",
    subtitle: "Crisp cotton formal shirts, sharp blazers & executive trousers",
    category: "men_formal_shirts",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85",
    layout: "lg:col-span-4 lg:row-span-1 col-span-1 min-h-[220px] lg:min-h-0",
    badge: "Editor's Pick",
  },
];

function Grid() {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden rounded-[24px] sm:rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-3.5 min-[375px]:p-4 sm:p-6 lg:p-7 shadow-sm transition-colors">
      <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-4 sm:pb-5">
        <div className="min-w-0 flex-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] text-teal-600 dark:text-teal-400">
            <Sparkles size={13} className="text-teal-500" />
            <span>Curated Showcase</span>
          </div>
          <h2 className="mt-0.5 text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 truncate">
            Discover Your Next Favorite Style
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">
            Seasonal wardrobe drops, festive couture, modern streetwear & executive tailoring.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/products/all")}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer shrink-0"
        >
          <span>Shop Collection</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 gap-3 sm:gap-4 lg:h-[560px]">
        {cards.map((card) => (
          <article
            key={card.title}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/products/${card.category}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate(`/products/${card.category}`);
              }
            }}
            aria-label={`Explore ${card.title}`}
            className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/60 dark:border-slate-800 cursor-pointer shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-teal-500/50 ${card.layout}`}
          >
            <img
              src={card.image}
              alt={card.title}
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent transition-opacity duration-300 group-hover:from-slate-950/98" />

            {/* Top Floating Badge */}
            <div className="absolute left-3.5 top-3.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-sm border border-white/20">
              {card.badge}
            </div>

            {/* Bottom Meta Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold leading-tight drop-shadow-xs group-hover:text-teal-200 transition-colors">
                {card.title}
              </h3>
              <p className="mt-1 text-xs text-slate-200/90 line-clamp-1 font-medium">
                {card.subtitle}
              </p>
              <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-extrabold text-teal-300 group-hover:text-teal-200 transition-colors">
                <span>Explore Edit</span>
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Grid;
