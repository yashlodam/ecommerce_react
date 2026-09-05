import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Button } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "../product/ProductCard";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchHomeProducts } from "../../../State/customer/ProductSlice";

const sections = [
  {
    title: "Men's Fashion",
    subtitle: "Trending styles for every occasion",
    category: "men",
  },
  {
    title: "Women's Fashion",
    subtitle: "Latest collections curated for you",
    category: "women",
  },
  {
    title: "Latest Smartphones",
    subtitle: "Explore flagship devices with cutting-edge technology",
    category: "electronics_smartphones",
  },
];

function HomeProducts() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    sections.forEach((section) => {
      dispatch(fetchHomeProducts({ category: section.category }));
    });
  }, [dispatch]);

  const product = useAppSelector((store) => store.product);
  const { homeProducts } = product;

  return (
    <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10 lg:space-y-12">
      {sections.map((section) => (
        <section
          key={section.category}
          className="overflow-hidden rounded-[30px] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-4 shadow-sm backdrop-blur-sm sm:p-6 lg:p-7 transition-colors"
        >
          <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 inline-flex rounded-full bg-teal-50 dark:bg-teal-950/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-800">
                Curated Picks
              </p>
              <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {section.title}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {section.subtitle}
              </p>
            </div>

            <Button
              onClick={() => navigate(`/products/${section.category}`)}
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                borderRadius: "999px",
                textTransform: "none",
                px: 2.7,
                py: 0.95,
                fontWeight: 600,
                boxShadow: "none",
                background: "linear-gradient(135deg, #009688 0%, #00796b 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #00796b 0%, #004d40 100%)",
                  boxShadow: "0 8px 20px rgba(0, 150, 136, 0.3)",
                },
              }}
            >
              View All
            </Button>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 2.2, spaceBetween: 16 },
              900: { slidesPerView: 3, spaceBetween: 16 },
              1100: { slidesPerView: 4, spaceBetween: 18 },
              1400: { slidesPerView: 5, spaceBetween: 20 },
            }}
            className="home-product-swiper"
          >
            {(homeProducts[section.category] || []).map((item) => (
              <SwiperSlide key={item.id || item._id || item.productId}>
                <ProductCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      ))}

      <style>{`
        .home-product-swiper {
          padding: 6px 2px 22px;
          position: relative;
        }

        .home-product-swiper .swiper-slide {
          height: auto;
          display: flex;
        }

        .home-product-swiper .swiper-slide > div {
          width: 100%;
        }

        .home-product-swiper .swiper-button-next,
        .home-product-swiper .swiper-button-prev {
          width: 38px;
          height: 38px;
          background: rgba(255, 255, 255, 0.96);
          border-radius: 999px;
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

        :root.dark .home-product-swiper .swiper-button-next,
        :root.dark .home-product-swiper .swiper-button-prev,
        html.dark .home-product-swiper .swiper-button-next,
        html.dark .home-product-swiper .swiper-button-prev {
          background: #1e293b;
          border-color: #475569;
          color: #2dd4bf;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
        }

        .home-product-swiper .swiper-button-prev {
          left: 6px;
        }

        .home-product-swiper .swiper-button-next {
          right: 6px;
        }

        .home-product-swiper .swiper-button-next:hover,
        .home-product-swiper .swiper-button-prev:hover {
          background: #009688;
          color: white;
          transform: scale(1.08);
        }

        .home-product-swiper .swiper-button-next::after,
        .home-product-swiper .swiper-button-prev::after {
          font-size: 13px;
          font-weight: 900;
        }

        .home-product-swiper .swiper-button-disabled {
          opacity: 0.3 !important;
          cursor: not-allowed;
          pointer-events: auto;
        }

        @media (min-width: 640px) {
          .home-product-swiper .swiper-button-next,
          .home-product-swiper .swiper-button-prev {
            width: 44px;
            height: 44px;
            top: 48%;
          }

          .home-product-swiper .swiper-button-prev {
            left: 6px;
          }

          .home-product-swiper .swiper-button-next {
            right: 6px;
          }

          .home-product-swiper .swiper-button-next::after,
          .home-product-swiper .swiper-button-prev::after {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}

export default HomeProducts;