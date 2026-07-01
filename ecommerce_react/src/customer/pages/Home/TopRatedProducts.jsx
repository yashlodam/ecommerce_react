import React from "react";
import { Star } from "lucide-react";

function TopRatedProducts() {
  const products = [
    {
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/h/x/a/6-k11241g-tan-6-paragon-tan-original-imahjhweztmchfx9.jpeg?q=70",
      title: "Premium Shoes",
      rating: 4.9,
    },
    {
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/f/l/z/-original-imagqhvgybexgkmh.jpeg?q=70",
      title: "Smart Watch",
      rating: 4.8,
    },
    {
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/x/x/x/-original-imaghx9qj7jzgh8g.jpeg?q=70",
      title: "Headphones",
      rating: 4.7,
    },
    {
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/mobile/h/e/g/-original-imagx9egm9mgmvab.jpeg?q=70",
      title: "Smartphone",
      rating: 4.9,
    },
  ];

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px] rounded-[32px] border border-slate-200/80 bg-white/85 p-6 shadow-[0_30px_90px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-8 md:p-10">
        <div className="mb-8 flex flex-col gap-2 sm:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-600">Best sellers</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Top rated products
            </h2>
          </div>
          <p className="text-sm text-slate-600 sm:text-base">Loved by thousands of customers for performance and style.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <div key={index} className="group cursor-pointer overflow-hidden rounded-[24px] border border-slate-200/70 bg-white shadow-[0_24px_70px_-34px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-28px_rgba(15,23,42,0.4)]">
              <div className="bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.12),_transparent_60%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] p-5">
                <img src={product.image} alt={product.title} className="h-44 w-full object-contain transition-transform duration-500 group-hover:scale-110" />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{product.title}</h3>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1">
                    <Star size={15} className="fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-slate-700">{product.rating}</span>
                  </div>
                  <span className="text-sm text-slate-500">Top rated</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopRatedProducts;