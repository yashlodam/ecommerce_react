import React from "react";
import DealCard from "./DealCard";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { Button } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";

import { useAppSelector } from "../../../../State/Store";
import { homeCategories } from "../../../../data/HomeCategories";

function Deals() {
  const navigate = useNavigate();
  const customer = useAppSelector((state) => state.customer);

  const fallbackDeals = homeCategories
    .filter((c) => c.section === "DEALS")
    .map((c, i) => ({ id: i + 1, discount: 20, category: c }));

  const deals =
    customer?.homeCategories?.deals?.length > 0
      ? customer.homeCategories.deals
      : fallbackDeals;

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-4 sm:p-6 lg:p-7 shadow-sm transition-colors">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="max-w-2xl">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/50 px-3 py-1 text-[11px] font-bold text-teal-700 dark:text-teal-400">
            <LocalOfferRoundedIcon sx={{ fontSize: 14 }} />
            Flash Promotions
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Limited-Time Category Deals
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Handpicked savings across top apparel, electronics, and home living collections.
          </p>
        </div>

        <Button
          onClick={() => navigate("/products/men")}
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{
            borderRadius: "999px",
            textTransform: "none",
            px: 2.7,
            py: 0.9,
            fontWeight: 700,
            fontSize: "13px",
          }}
        >
          View All Deals
        </Button>
      </div>

      <div className="deals-swiper-wrapper">
        {deals?.length > 0 ? (
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
              1440: { slidesPerView: 5, spaceBetween: 20 },
            }}
            className="deals-swiper"
          >
            {deals.map((item, index) => (
              <SwiperSlide key={item.id || index}>
                <DealCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No active deals right now</h3>
            <p className="mt-1 text-xs text-slate-400">
              Fresh promotions will appear here soon.
            </p>
          </div>
        )}
      </div>

      <style>{`
        .deals-swiper {
          padding: 8px 4px 18px;
        }

        .deals-swiper .swiper-slide {
          height: auto;
          display: flex;
        }

        .deals-swiper .swiper-slide > article {
          width: 100%;
        }

        .deals-swiper .swiper-button-next,
        .deals-swiper .swiper-button-prev {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid #e2e8f0;
          color: #009688;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.12);
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :root.dark .deals-swiper .swiper-button-next,
        :root.dark .deals-swiper .swiper-button-prev,
        html.dark .deals-swiper .swiper-button-next,
        html.dark .deals-swiper .swiper-button-prev {
          background: #1e293b;
          border-color: #334155;
          color: #2dd4bf;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }

        .deals-swiper .swiper-button-next:hover,
        .deals-swiper .swiper-button-prev:hover {
          background: #009688;
          color: white;
          transform: scale(1.05);
        }

        .deals-swiper .swiper-button-next::after,
        .deals-swiper .swiper-button-prev::after {
          font-size: 15px;
          font-weight: 700;
        }
      `}</style>
    </section>
  );
}

export default Deals;