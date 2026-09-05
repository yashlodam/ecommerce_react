import React from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TopRatedProducts() {
  const navigate = useNavigate();

  const products = [
    {
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/h/x/a/6-k11241g-tan-6-paragon-tan-original-imahjhweztmchfx9.jpeg?q=70",
      fallbackImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
      title: "Premium Leather Footwear",
      category: "men",
      rating: 4.9,
    },
    {
      image: "https://res.cloudinary.com/dkn3nesb8/image/upload/v1788605573/s4rsosqrs7lxpy9qpobd.webp",
      fallbackImage: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop",
      title: "Smart Fitness Watch",
      category: "smart_watches",
      rating: 4.8,
    },
    {
      image: "https://res.cloudinary.com/dkn3nesb8/image/upload/v1788604020/uu1ovs7ketnvjsfcttmo.webp",
      fallbackImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
      title: "Wireless ANC Headphones",
      category: "headphones",
      rating: 4.7,
    },
    {
      image: "https://res.cloudinary.com/dkn3nesb8/image/upload/v1788603326/wywqpqfbp5so7ngyly4r.webp",
      fallbackImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
      title: "Flagship 5G Smartphone",
      category: "smartphones",
      rating: 4.9,
    },
  ];

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-4 sm:p-6 lg:p-7 shadow-sm transition-colors">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-teal-600 dark:text-teal-400">
            Top Rated
          </p>
          <h2 className="mt-0.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Customer Favorites
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Highest rated marketplace items for performance, style and durability.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {products.map((product, index) => (
          <div
            key={index}
            onClick={() => navigate(`/products/${product.category}`)}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-teal-500/60 dark:hover:border-teal-500/60 flex flex-col justify-between"
          >
            <div className="bg-white dark:bg-slate-950 p-2.5 sm:p-4 flex items-center justify-center border-b border-slate-100 dark:border-slate-800">
              <img
                src={product.image}
                alt={product.title}
                onError={(e) => {
                  if (product.fallbackImage && e.target.src !== product.fallbackImage) {
                    e.target.src = product.fallbackImage;
                  }
                }}
                className="h-28 sm:h-40 w-full object-contain transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>

            <div className="p-2.5 sm:p-4 space-y-1.5 sm:space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-1 sm:line-clamp-2">
                {product.title}
              </h3>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-0.5 sm:gap-1 rounded-full bg-amber-50 dark:bg-amber-950/50 px-1.5 sm:px-2 py-0.5 border border-amber-200 dark:border-amber-800 text-[10px] sm:text-xs font-bold text-amber-700 dark:text-amber-300">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="hidden sm:inline text-[11px] text-slate-400 font-semibold">Verified Rating</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopRatedProducts;