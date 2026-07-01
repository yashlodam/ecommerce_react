import React from "react";
import DealCard from "./DealCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { Button } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";

import { useAppSelector } from "../../../../State/Store";

function Deals() {
  const { customer } = useAppSelector((state) => state);
  const deals = customer?.homeCategories?.deals || [];

  return (
    <section className="rounded-md relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 xl:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.08),_transparent_34%),linear-gradient(135deg,_#f7fbff_0%,_#ffffff_55%,_#f8fafc_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:34px_34px] opacity-40" />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-3.5 py-1.5 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur">
              <LocalOfferRoundedIcon sx={{ fontSize: 18 }} />
              Premium offers
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Deals crafted for modern shoppers
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Discover handpicked savings on standout collections, designed to feel as polished as the products themselves.
            </p>
          </div>

         <Button
              onClick={() => (window.location.href = `/products/${section.category}`)}
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                borderRadius: "999px",
                textTransform: "none",
                px: 2.7,
                py: 0.95,
                fontWeight: 600,
                boxShadow: "none",
                background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                  boxShadow: "0 14px 28px rgba(37,99,235,0.24)",
                },
              }}
            >
              View All Deals
            </Button>
        </div>

        <div className="rounded-[32px] border border-slate-200/80 bg-white/80 p-3 shadow-[0_28px_90px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-4 lg:p-5">
          {deals.length > 0 ? (
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              loop
              grabCursor
              autoplay={{
                delay: 3600,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                320: { slidesPerView: 1.15, spaceBetween: 12 },
                480: { slidesPerView: 1.8, spaceBetween: 14 },
                768: { slidesPerView: 2.4, spaceBetween: 16 },
                1024: { slidesPerView: 3.2, spaceBetween: 18 },
                1280: { slidesPerView: 4, spaceBetween: 20 },
                1440: { slidesPerView: 5, spaceBetween: 24 },
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

              <h3 className="mt-5 text-xl font-semibold text-slate-800">No deals available yet</h3>

              <p className="mt-2 max-w-md text-sm text-slate-500 sm:text-base">
                Fresh promotions and exclusive offers will appear here soon.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .deals-swiper {
          padding: 12px 10px 20px;
        }

        .deals-swiper .swiper-button-next,
        .deals-swiper .swiper-button-prev {
          width: 52px;
          height: 52px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(226, 232, 240, 0.95);
          color: #0f172a;
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.12);
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .deals-swiper .swiper-button-next {
          right: -8px;
        }

        .deals-swiper .swiper-button-prev {
          left: -8px;
        }

        .deals-swiper .swiper-button-next:hover,
        .deals-swiper .swiper-button-prev:hover {
          background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
          color: white;
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 18px 38px rgba(37, 99, 235, 0.24);
          border-color: transparent;
        }

        .deals-swiper .swiper-button-next::after,
        .deals-swiper .swiper-button-prev::after {
          font-size: 17px;
          font-weight: 700;
          line-height: 1;
        }

        .deals-swiper .swiper-button-disabled {
          opacity: 0.32;
          pointer-events: none;
          box-shadow: none;
        }

        @media (max-width: 1024px) {
          .deals-swiper .swiper-button-next,
          .deals-swiper .swiper-button-prev {
            width: 46px;
            height: 46px;
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