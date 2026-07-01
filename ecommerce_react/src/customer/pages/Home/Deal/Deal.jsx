import React from "react";
import DealCard from "./DealCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { store, useAppSelector } from "../../../../State/Store";

function Deals() {

  const {customer} = useAppSelector(store=>store);


 

  return (
    <section className="mt-10 px-4 lg:px-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
            Trending Deals
          </h2>
          <p className="text-gray-500 text-sm mt-0.5">
            Best offers curated for you
          </p>
        </div>

        <button className="flex items-center gap-1 text-sm text-[#2874f0] font-semibold hover:underline">
          View All <span aria-hidden="true">→</span>
        </button>
      </div>

      {/* Card grid wrapper gives the white "panel" look common on e-commerce rails */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 lg:p-5">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={16}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          className="!pb-1 deals-swiper"
        >
          {customer?.homeCategories?.deals?.map((item, index) => (
            <SwiperSlide key={index}>
              <DealCard
                item={item}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Scoped overrides so Swiper's default nav arrows match the brand instead of the plugin default look */}
      <style>{`
        .deals-swiper .swiper-button-next,
        .deals-swiper .swiper-button-prev {
          width: 32px;
          height: 32px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 9999px;
          color: #2874f0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
        }
        .deals-swiper .swiper-button-next::after,
        .deals-swiper .swiper-button-prev::after {
          font-size: 13px;
          font-weight: 700;
        }
        .deals-swiper .swiper-button-disabled {
          opacity: 0;
        }
      `}</style>
    </section>
  );
}

export default Deals;