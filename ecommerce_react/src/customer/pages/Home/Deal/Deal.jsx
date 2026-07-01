import React from "react";
import DealCard from "./DealCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";

import { useAppSelector } from "../../../../State/Store";

function Deals() {
  const { customer } = useAppSelector((state) => state);

  const deals = customer?.homeCategories?.deals || [];

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.08),_transparent_42%),linear-gradient(135deg,_#f8fbff_0%,_#ffffff_55%,_#f8fafc_100%)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
      <div className="relative mx-auto max-w-[1600px]">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-3 py-1.5 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur">
              <LocalOfferRoundedIcon sx={{ fontSize: 18 }} />
              Premium offers
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Trending deals curated for modern shoppers
            </h2>

            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              Discover exclusive savings on top collections, handpicked to elevate every purchase.
            </p>
          </div>

          <button className="hidden items-center gap-2 self-start rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-[0_16px_40px_-12px_rgba(15,23,42,0.45)] md:inline-flex">
            View all deals
            <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />
          </button>
        </div>

        <div className="rounded-[30px] border border-slate-200/80 bg-white/85 p-4 shadow-[0_25px_90px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-5">
          {deals.length > 0 ? (
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              loop
              grabCursor={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1.3,
                  spaceBetween: 12,
                },
                480: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 18,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1400: {
                  slidesPerView: 5,
                  spaceBetween: 24,
                },
              }}
              className="deals-swiper"
            >
              {deals.map((item) => (
                <SwiperSlide key={item.id}>
                  <DealCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="No Deals"
                className="h-24 w-24 opacity-70"
              />

              <h3 className="mt-5 text-xl font-semibold text-slate-800">
                No deals available yet
              </h3>

              <p className="mt-2 max-w-md text-sm text-slate-500 sm:text-base">
                Fresh promotions and exclusive offers will appear here soon.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .deals-swiper {
          padding: 12px 8px 18px;
        }

        .deals-swiper .swiper-button-next,
        .deals-swiper .swiper-button-prev {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(226, 232, 240, 0.95);
          color: #0f172a;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.12);
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .deals-swiper .swiper-button-next {
          right: -24px;
        }

        .deals-swiper .swiper-button-prev {
          left: -24px;
        }

        .deals-swiper .swiper-button-next:hover,
        .deals-swiper .swiper-button-prev:hover {
          background: linear-gradient(135deg, #2563eb, #4f46e5);
          color: white;
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 18px 38px rgba(37, 99, 235, 0.25);
          border-color: transparent;
        }

        .deals-swiper .swiper-button-next::after,
        .deals-swiper .swiper-button-prev::after {
          font-size: 17px;
          font-weight: 700;
          line-height: 1;
        }

        .deals-swiper .swiper-button-disabled {
          opacity: 0.35;
          pointer-events: none;
          box-shadow: none;
        }

        @media (max-width: 1024px) {
          .deals-swiper .swiper-button-next,
          .deals-swiper .swiper-button-prev {
            width: 44px;
            height: 44px;
          }

          .deals-swiper .swiper-button-next {
            right: -10px;
          }

          .deals-swiper .swiper-button-prev {
            left: -10px;
          }
        }

        @media (max-width: 768px) {
          .deals-swiper .swiper-button-next,
          .deals-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Deals;