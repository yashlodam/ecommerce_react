import React from "react";

const cards = [
  {
    title: "Festive edit",
    subtitle: "Statement layers and rich textures",
    image: "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/v/r/c/xxl-474-mokosh-original-imahmgjphgmjvbyy.jpeg?q=70",
    layout: "lg:col-span-3 lg:row-span-12 col-span-1 row-span-1",
    badge: "New arrivals",
  },
  {
    title: "Sport luxe",
    subtitle: "Fresh energy for every commute",
    image: "https://rukminim2.flixcart.com/image/405/405/xif0q/shoe/h/x/a/6-k11241g-tan-6-paragon-tan-original-imahjhweztmchfx9.jpeg?q=90",
    layout: "lg:col-span-2 lg:row-span-6 col-span-1 row-span-1",
    badge: "Trending",
  },
  {
    title: "Premium essentials",
    subtitle: "Relaxed fits with elevated finish",
    image: "https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/89594195a9d5ff44.jpg?q=80",
    layout: "lg:col-span-4 lg:row-span-6 col-span-1 row-span-1",
    badge: "Editors pick",
  },
  {
    title: "Minimal staples",
    subtitle: "Clean lines for every weekday",
    image: "https://assets.myntassets.com/w_200,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2026/FEBRUARY/11/77fDEAE5_ced0683512c24644a7488385504a8ee2.jpg",
    layout: "lg:col-span-3 lg:row-span-12 col-span-1 row-span-1",
    badge: "Bestsellers",
  },
  {
    title: "Evening glow",
    subtitle: "Polished looks for the night out",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
    layout: "lg:col-span-4 lg:row-span-6 col-span-1 row-span-1",
    badge: "Limited drop",
  },
];

function Grid() {
  return (
    <section className="mt-8 px-4 sm:px-6 lg:px-20">
      <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-3 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-4 lg:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-600">Curated collection</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-800 sm:text-2xl">Discover your next favorite style</h2>
          </div>
          <button className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white">
            Shop collection
          </button>
        </div>

        <div className="grid gap-4 lg:h-[620px] lg:grid-cols-12 lg:grid-rows-12">
          {cards.map((card) => (
            <article key={card.title} className={`group relative min-h-[240px] overflow-hidden rounded-[24px] ${card.layout}`}>
              <img src={card.image} alt={card.title} className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/25 to-transparent" />
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-700">
                {card.badge}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-5">
                <h3 className="text-lg font-semibold sm:text-xl">{card.title}</h3>
                <p className="mt-1 text-sm text-slate-200">{card.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Grid;
