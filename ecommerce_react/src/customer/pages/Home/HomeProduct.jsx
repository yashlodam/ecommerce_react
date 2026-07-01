import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Button } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

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



   useEffect(() => {
  sections.forEach((section) => {
    dispatch(fetchHomeProducts({ category: section.category }));
  });
}, [dispatch]);

    const { product } = useAppSelector((store) => store);

     const {homeProducts} = product;



  return (
    <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10 lg:space-y-12">

      {sections.map((section) => (
        <section
          key={section.category}
          className="overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/95 p-4 shadow-[0_26px_90px_-38px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-6 lg:p-7"
        >
          <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 inline-flex rounded-full bg-blue-50/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-700">
                Curated picks
              </p>
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-2xl lg:text-[28px]">
                {section.title}
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600 sm:text-base">
                {section.subtitle}
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
              View All
            </Button>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 1.1 },
              480: { slidesPerView: 1.5 },
              640: { slidesPerView: 2.1 },
              900: { slidesPerView: 3 },
              1100: { slidesPerView: 4 },
              1400: { slidesPerView: 5 },
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
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.96);
          border-radius: 999px;
          border: 1px solid #e2e8f0;
          color: #2563eb;
          box-shadow: 0 14px 35px rgba(15, 23, 42, 0.14);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .home-product-swiper .swiper-button-next:hover,
        .home-product-swiper .swiper-button-prev:hover {
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
          color: white;
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 16px 32px rgba(37, 99, 235, 0.24);
        }

        .home-product-swiper .swiper-button-next::after,
        .home-product-swiper .swiper-button-prev::after {
          font-size: 16px;
          font-weight: 700;
        }

        .home-product-swiper .swiper-button-disabled {
          opacity: 0;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .home-product-swiper {
            padding: 4px 0 16px;
            position: relative;
          }

          .home-product-swiper .swiper-button-next,
          .home-product-swiper .swiper-button-prev {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            top: 50%;
            transform: translateY(-50%);
            margin-top: 0;
            opacity: 1;
            pointer-events: auto;
            z-index: 20;
            box-shadow: 0 10px 26px rgba(15, 23, 42, 0.16);
          }

          .home-product-swiper .swiper-button-prev {
            left: 4px;
          }

          .home-product-swiper .swiper-button-next {
            right: 4px;
          }
        }
      `}</style>

    </div>
  );
}

export default HomeProducts;