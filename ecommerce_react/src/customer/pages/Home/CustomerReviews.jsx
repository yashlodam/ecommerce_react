import React from "react";
import { Star } from "lucide-react";

function CustomerReviews() {
  const reviews = [
    {
      name: "Rahul Sharma",
      city: "Mumbai",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop",
      review:
        "Amazing shopping experience! The delivery was fast and the product quality exceeded my expectations. Return pickup was seamless when I needed a size exchange.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      city: "Ahmedabad",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop",
      review:
        "Easy returns, secure payments, and excellent customer support. The multi-vendor variety is huge and authentic. Highly recommended!",
      rating: 5,
    },
    {
      name: "Amit Verma",
      city: "Bengaluru",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop",
      review:
        "ShopSphere offers a curated collection of verified brand products at competitive prices. Quick checkout via UPI and instant tracking.",
      rating: 5,
    },
  ];

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-4 sm:p-6 lg:p-7 shadow-sm transition-colors">
      <div className="text-center border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-teal-600 dark:text-teal-400">
          Verified Testimonials
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
          What Our Shoppers Say
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
          Trusted by over 500,000 verified buyers across India
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-800 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 italic">
              "{review.review}"
            </p>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
              <img
                src={review.image}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-teal-500"
                loading="lazy"
              />

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm truncate">
                  {review.name}
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  {review.city} • Verified Buyer
                </p>
              </div>

              <div className="flex items-center gap-0.5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CustomerReviews;