import React, { useState, useEffect } from "react";
import DealCard from "./DealCard";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { Button } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";

import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import {
  fetchHomePageData,
  fetchActiveDeals,
} from "../../../../State/customer/CustomerSlice";
import { homeCategories } from "../../../../data/HomeCategories";

function Deals() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const customer = useAppSelector((state) => state.customer || state.home);

  const fallbackDeals = homeCategories
    .filter((c) => c.section === "DEALS")
    .map((c, i) => ({ id: i + 1, discount: 20, category: c }));

  const activeDeals =
    customer?.activeDeals && customer.activeDeals.length > 0
      ? customer.activeDeals
      : customer?.deals && customer.deals.length > 0
        ? customer.deals
        : customer?.homeCategories?.deals && customer.homeCategories.deals.length > 0
          ? customer.homeCategories.deals
          : customer?.homePageData?.deals && customer.homePageData.deals.length > 0
            ? customer.homePageData.deals
            : null;

  const deals = activeDeals && activeDeals.length > 0 ? activeDeals : fallbackDeals;

  // Real earliest expiring active deal from backend
  const earliestEndAt = React.useMemo(() => {
    if (!deals || deals.length === 0) return null;
    const now = Date.now();
    const validEnds = deals
      .map((d) => (d.endAt ? new Date(d.endAt).getTime() : null))
      .filter((t) => t && !isNaN(t) && t > now);

    if (validEnds.length === 0) return null;
    return new Date(Math.min(...validEnds));
  }, [deals]);

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      // Target the real earliest deal expiration timestamp from the database
      let targetTime = earliestEndAt ? earliestEndAt.getTime() : null;
      if (!targetTime) {
        const nowDate = new Date();
        targetTime = new Date(
          nowDate.getFullYear(),
          nowDate.getMonth(),
          nowDate.getDate(),
          23,
          59,
          59
        ).getTime();
      }

      const diffMs = Math.max(0, targetTime - now);
      const totalSec = Math.floor(diffMs / 1000);

      const days = Math.floor(totalSec / 86400);
      const hours = Math.floor((totalSec % 86400) / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;
      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [earliestEndAt]);


  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-4 sm:p-6 lg:p-7 shadow-sm transition-colors">
      <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-4 sm:pb-5">
        <div className="max-w-2xl">
          <div className="mb-2.5">
            {/* Unified Flash Deal Header Pill with Live Countdown */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/40 dark:to-amber-950/30 border border-rose-200/80 dark:border-rose-800/60 shadow-xs max-w-full">
              <span className="flex items-center gap-1.5 text-[11px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                </span>
                Flash Deals
              </span>

              {timeLeft && (
                <>
                  <span className="text-rose-300 dark:text-rose-800 select-none">•</span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    <span className="text-slate-400 dark:text-slate-500 font-medium hidden min-[360px]:inline">Ends in</span>
                    <span className="font-mono font-bold text-rose-700 dark:text-rose-300 tracking-tight">
                      {timeLeft.days > 0 ? `${timeLeft.days}d ` : ""}
                      {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m : {String(timeLeft.seconds).padStart(2, "0")}s
                    </span>
                  </span>
                </>
              )}
            </div>
          </div>

          <h2 className="text-lg sm:text-2xl lg:text-[28px] font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Limited-Time Category Deals
          </h2>

          <p className="mt-0.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">
            Handpicked savings across top apparel, electronics, and home living collections.
          </p>
        </div>

        <Button
          onClick={() => navigate("/deals")}
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{
            borderRadius: "999px",
            textTransform: "none",
            px: 2.5,
            py: 0.8,
            fontWeight: 700,
            fontSize: "13px",
            alignSelf: { xs: "flex-start", sm: "auto" },
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
              0: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 2.5, spaceBetween: 16 },
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
          padding: 8px 2px 18px;
          position: relative;
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
          width: 38px;
          height: 38px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid #cbd5e1;
          color: #009688;
          box-shadow: 0 6px 18px rgba(15, 23, 42, 0.2);
          backdrop-filter: blur(8px);
          transition: all 0.25s ease;
          display: flex !important;
          align-items: center;
          justify-content: center;
          z-index: 30;
          top: 38%;
          cursor: pointer;
        }

        :root.dark .deals-swiper .swiper-button-next,
        :root.dark .deals-swiper .swiper-button-prev,
        html.dark .deals-swiper .swiper-button-next,
        html.dark .deals-swiper .swiper-button-prev {
          background: #1e293b;
          border-color: #475569;
          color: #2dd4bf;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
        }

        .deals-swiper .swiper-button-prev {
          left: 6px;
        }

        .deals-swiper .swiper-button-next {
          right: 6px;
        }

        .deals-swiper .swiper-button-next:hover,
        .deals-swiper .swiper-button-prev:hover {
          background: #009688;
          color: white;
          transform: scale(1.08);
        }

        .deals-swiper .swiper-button-next::after,
        .deals-swiper .swiper-button-prev::after {
          font-size: 13px;
          font-weight: 900;
        }

        .deals-swiper .swiper-button-disabled {
          opacity: 0.3 !important;
          cursor: not-allowed;
          pointer-events: auto;
        }

        @media (min-width: 640px) {
          .deals-swiper .swiper-button-next,
          .deals-swiper .swiper-button-prev {
            width: 44px;
            height: 44px;
            top: 50%;
          }

          .deals-swiper .swiper-button-prev {
            left: 8px;
          }

          .deals-swiper .swiper-button-next {
            right: 8px;
          }

          .deals-swiper .swiper-button-next::after,
          .deals-swiper .swiper-button-prev::after {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
}

export default Deals;