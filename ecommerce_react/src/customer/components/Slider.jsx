import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const images = [
  "/images/mobiles.png",
  "/images/laptop_earbuds.png",
  "/images/mens_wear.png",
  "/images/kitchen_images.png",
];

function Slider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-[1600px] xl:max-w-[1800px] mx-auto px-2 md:px-4 lg:px-5 mt-4">
      <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white">

        {/* Banner */}
        <img
          key={current}
          src={images[current]}
          alt="banner"
          className="
            w-full
            h-auto
            max-h-[450px]
            lg:max-h-[500px]
            xl:max-h-[450px]
            object-contain
            transition-all
            duration-500
          "
        />

        {/* Light Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/[0.03] to-transparent pointer-events-none" />

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="
            hidden lg:flex
            items-center
            justify-center
            absolute
            left-6
            top-1/2
            -translate-y-1/2
            bg-white/80
            hover:bg-white
            shadow-2xl
            rounded-full
            p-3
            transition-all
            duration-300
            hover:scale-110
          "
        >
          <ChevronLeftIcon fontSize="large" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="
            hidden lg:flex
            items-center
            justify-center
            absolute
            right-6
            top-1/2
            -translate-y-1/2
            bg-white/80
            hover:bg-white
            shadow-2xl
            rounded-full
            p-3
            transition-all
            duration-300
            hover:scale-110
          "
        >
          <ChevronRightIcon fontSize="large" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 rounded-full ${
                current === index
                  ? "w-10 h-2 bg-primary"
                  : "w-2 h-2 bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;