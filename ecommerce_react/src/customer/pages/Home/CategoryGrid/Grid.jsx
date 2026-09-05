import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    title: "Festive Ethnic Edit",
    subtitle: "Statement layers, rich textures and handcrafted sarees",
    category: "women",
    image: "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/v/r/c/xxl-474-mokosh-original-imahmgjphgmjvbyy.jpeg?q=70",
    layout: "lg:col-span-3 lg:row-span-12 col-span-1 row-span-1",
    badge: "New Arrivals",
  },
  {
    title: "Sport Luxe",
    subtitle: "Fresh energy for every workout & daily commute",
    category: "men",
    image: "https://rukminim2.flixcart.com/image/405/405/xif0q/shoe/h/x/a/6-k11241g-tan-6-paragon-tan-original-imahjhweztmchfx9.jpeg?q=90",
    layout: "lg:col-span-2 lg:row-span-6 col-span-1 row-span-1",
    badge: "Trending",
  },
  {
    title: "Premium Essentials",
    subtitle: "Relaxed tailored fits with elevated finish",
    category: "men",
    image: "https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/89594195a9d5ff44.jpg?q=80",
    layout: "lg:col-span-4 lg:row-span-6 col-span-1 row-span-1",
    badge: "Editor's Pick",
  },
  {
    title: "Minimal Staples",
    subtitle: "Clean lines & breathable cottons for every weekday",
    category: "women",
    image: "https://assets.myntassets.com/w_200,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2026/FEBRUARY/11/77fDEAE5_ced0683512c24644a7488385504a8ee2.jpg",
    layout: "lg:col-span-3 lg:row-span-12 col-span-1 row-span-1",
    badge: "Bestseller",
  },
  {
    title: "Evening Glow",
    subtitle: "Polished modern silhouettes for the night out",
    category: "women",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
    layout: "lg:col-span-4 lg:row-span-6 col-span-1 row-span-1",
    badge: "Limited Drop",
  },
];

function Grid() {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-4 sm:p-6 lg:p-7 shadow-sm transition-colors">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-teal-600 dark:text-teal-400">
            Curated Showcase
          </p>
          <h2 className="mt-0.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Discover Your Next Favorite Style
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Seasonal wardrobe drops, ethnic couture and modern streetwear.
          </p>
        </div>
        <button
          onClick={() => navigate("/products/all")}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
        >
          Shop Collection
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid gap-4 lg:h-[600px] lg:grid-cols-12 lg:grid-rows-12">
        {cards.map((card) => (
          <article
            key={card.title}
            onClick={() => navigate(`/products/${card.category}`)}
            className={`group relative min-h-[220px] overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800 cursor-pointer shadow-xs ${card.layout}`}
          >
            <img
              src={card.image}
              alt={card.title}
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
            <div className="absolute left-3.5 top-3.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-sm">
              {card.badge}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
              <h3 className="text-base sm:text-lg font-bold leading-tight">{card.title}</h3>
              <p className="mt-1 text-xs text-slate-200 line-clamp-1">{card.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Grid;
