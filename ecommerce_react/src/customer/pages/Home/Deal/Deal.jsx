import React from "react";
import DealCard from "./DealCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function Deals() {
  const deals = [
    {
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/sandal/j/m/w/9-puk2240g-ogn-9-0-paragon-olive-green-original-imahj9zyvfdpwmqg.jpeg?q=70",
      brand: "Paragon",
      title: "Men's Casual Slip-On Sandals",
      price: 499,
      originalPrice: 999,
      discount: 50,
      rating: 4.1,
      ratingCount: 23456,
    },
    {
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/v/e/m/-original-imahfszc3hgq2c82.jpeg?q=70",
      brand: "Fastrack",
      title: "Analog Watch For Men",
      price: 899,
      originalPrice: 1495,
      discount: 40,
      rating: 4.3,
      ratingCount: 8932,
    },
    {
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/q/y/j/-original-imahfvuh3x8epgnk.jpeg?q=70",
      brand: "boAt",
      title: "Rockerz 450 Bluetooth Wireless Headphones",
      price: 1099,
      originalPrice: 2999,
      discount: 60,
      rating: 4.2,
      ratingCount: 284531,
    },
    {
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/backpack/u/r/m/18-large-35-l-laptop-backpack-ashper-pro-black-9-db-10-laptop-original-imahjqzyygbjzz3b.jpeg?q=70",
      brand: "Skybags",
      title: "Casual Waterproof School Bag Backpack",
      price: 699,
      originalPrice: 999,
      discount: 30,
      rating: 4.0,
      ratingCount: 5421,
    },
    {
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/6/n/g/9-6g-842-9-campus-bt-grn-blk-resized-2-original-imahhdjhbpncmxtz.jpeg?q=70",
      brand: "Campus",
      title: "Sports Running Sneakers For Men",
      price: 1099,
      originalPrice: 1999,
      discount: 45,
      rating: 3.9,
      ratingCount: 15234,
    },
    {
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/9/k/6/15s-laptop-hp-original-imagwccge6ssjr8y.jpeg?q=70",
      brand: "HP",
      title: "Intel Core i3 11th Gen Thin & Light Laptop",
      price: 32990,
      originalPrice: 50795,
      discount: 35,
      rating: 4.1,
      ratingCount: 6789,
    },
    {
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/e/v/t/13c-5g-redmi-13c-5g-redmi-original-imagw6s7zfhb4syx.jpeg?q=70",
      brand: "Redmi",
      title: "13C 5G (128 GB Storage, 6 GB RAM)",
      price: 9999,
      originalPrice: 13332,
      discount: 25,
      rating: 4.0,
      ratingCount: 45213,
    },
    {
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/dslr-camera/b/g/s/-original-imahhy8yhhb4chb6.jpeg?q=70",
      brand: "Canon",
      title: "EOS 1500D DSLR Camera with 18-55mm Lens",
      price: 28990,
      originalPrice: 64495,
      discount: 55,
      rating: 4.4,
      ratingCount: 3211,
    },
    {
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/s/i/u/-original-imah76jt64ffmwg4.jpeg?q=70",
      brand: "Noise",
      title: "ColorFit Pulse 2 Max Bluetooth Calling Smartwatch",
      price: 1299,
      originalPrice: 4999,
      discount: 40,
      rating: 4.0,
      ratingCount: 98765,
    },
    {
      image:
        "https://rukminim2.flixcart.com/image/612/612/l27wtjk0/speaker/i/4/e/-original-imagdhhg2f7zjbt7.jpeg?q=70",
      brand: "JBL",
      title: "Go 3 4 W Bluetooth Speaker",
      price: 1799,
      originalPrice: 2999,
      discount: 20,
      rating: 4.5,
      ratingCount: 67890,
    },
  ];

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
          {deals.map((item, index) => (
            <SwiperSlide key={index}>
              <DealCard
                image={item.image}
                brand={item.brand}
                title={item.title}
                price={item.price}
                originalPrice={item.originalPrice}
                discount={item.discount}
                rating={item.rating}
                ratingCount={item.ratingCount}
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