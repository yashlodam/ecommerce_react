import React from "react";
import { Star, Zap } from "lucide-react";

function DealCard({item}) {

  console.log("DealCard item:", item);
  return (
    <div className="group relative w-full max-w-[360px] bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
      {/* Image area */}
      <div className="relative bg-white p-5 pb-3">
        {item.discount ? (
          <span className="absolute top-0 left-3 z-10 bg-[#388e3c] text-white text-[11px] font-bold px-2 py-[3px] rounded">
            {item.discount}% OFF
          </span>
        ) : null}

        <img
          src={item.category.image}
          alt={item.title}
          className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="px-4 pb-4 pt-1">
        {item.brand ? (
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide truncate">
            {item.brand}
          </p>
        ) : null}

        <h3 className="text-[13px] text-gray-800 leading-snug mt-0.5 line-clamp-2 min-h-[34px]">
          {item.category.name}
        </h3>

        

        <div className="flex items-baseline gap-1.5 mt-1.5">
          <span className="text-[16px] font-bold text-gray-900">
            ₹{Number(item..price).toLocaleString("en-IN")}
          </span>
          {item.originalPrice ? (
            <span className="text-[12px] text-gray-400 line-through">
              ₹{Number(item.originalPrice).toLocaleString("en-IN")}
            </span>
          ) : null}
          {item.discount ? (
            <span className="text-[12px] font-medium text-[#388e3c]">
              {item.discount}% off
            </span>
          ) : null}
        </div>

        {item.freeDelivery ? (
          <p className="text-[11px] text-gray-500 mt-1">Free delivery</p>
        ) : null}
      </div>

      {/* Flash deal ribbon (optional, shows on hover for emphasis) */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#2874f0] to-[#388e3c] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
}

export default DealCard;

// Demo wrapper so this renders meaningfully on its own
export function DealCardDemo() {
  return (
    <div className="bg-[#f1f3f6] p-8 flex flex-wrap gap-4 justify-center">
      <DealCard
        image="https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/o/4/x/-original-imahfvf6gzhhh3yh.jpeg"
        brand="boAt"
        title="Rockerz 450 Bluetooth Wireless On Ear Headphones"
        price={1099}
        originalPrice={3490}
        discount={68}
        rating={4.2}
        ratingCount={284531}
      />
      <DealCard
        image="https://rukminim2.flixcart.com/image/416/416/xif0q/shoe/a/u/v/9-running-shoes-9-original-imagez6yydghyaft.jpeg"
        brand="Campus"
        title="Running Shoes For Men"
        price={899}
        originalPrice={2499}
        discount={64}
        rating={3.9}
        ratingCount={15234}
      />
      <DealCard
        image="https://rukminim2.flixcart.com/image/416/416/xif0q/smartwatch/o/m/3/-original-imagqzx7zg7gjg7g.jpeg"
        brand="Noise"
        title="ColorFit Pulse 2 Max 1.91 Bluetooth Calling Smartwatch"
        price={1299}
        originalPrice={4999}
        discount={74}
        rating={4.0}
        ratingCount={98765}
      />
    </div>
  );
}