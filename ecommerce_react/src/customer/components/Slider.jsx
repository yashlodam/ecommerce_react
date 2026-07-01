import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

const DEFAULT_BANNERS = [
  {
    image: "/images/mobile.png",
    categoryId: "electronics_smartphones",
  },
  {
    image: "/images/gym.png",
    categoryId: "sports_fitness",
  },
  {
    image: "/images/kitchen.png",
    categoryId: "home_kitchen",
  },
];

const AUTOPLAY_DELAY = 4000;
const TRANSITION_MS = 700;

function Slider({
  banners = DEFAULT_BANNERS,
  autoPlayDelay = AUTOPLAY_DELAY,
  rounded = "rounded-xl",
}) {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loaded, setLoaded] = useState({});

  const timerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const goTo = useCallback(
    (index) => {
      if (isAnimating) return;

      const next = ((index % banners.length) + banners.length) % banners.length;

      setIsAnimating(true);
      setCurrent(next);

      setTimeout(
        () => setIsAnimating(false),
        prefersReducedMotion ? 0 : TRANSITION_MS
      );
    },
    [banners.length, isAnimating, prefersReducedMotion]
  );

  const nextSlide = useCallback(() => goTo(current + 1), [current, goTo]);

  const prevSlide = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (isHovering || prefersReducedMotion || banners.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, autoPlayDelay);

    return () => clearInterval(timerRef.current);
  }, [
    current,
    banners.length,
    autoPlayDelay,
    isHovering,
    prefersReducedMotion,
  ]);

  const handleManualNav = (action) => {
    clearInterval(timerRef.current);
    action();
  };

  const handleImageLoad = (index) => {
    setLoaded((prev) => ({ ...prev, [index]: true }));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;

    if (Math.abs(delta) > 50) {
      handleManualNav(delta > 0 ? nextSlide : prevSlide);
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${rounded} group`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {!loaded[current] && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
      )}

      <div
        className="flex"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: prefersReducedMotion
            ? "none"
            : `transform ${TRANSITION_MS}ms ease`,
        }}
      >
        {banners.map((banner, index) => (
          <img
            key={banner.categoryId}
            src={banner.image}
            alt={banner.categoryId}
            loading={index === 0 ? "eager" : "lazy"}
            onLoad={() => handleImageLoad(index)}
            onClick={() => navigate(`/products/${banner.categoryId}`)}
            className="
              cursor-pointer
              w-full
              flex-shrink-0
              h-[180px] sm:h-[350px] md:h-[450px] lg:h-[450px] xl:h-[520px]
              object-contain
              lg:object-cover
              bg-white
            "
          />
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <button
            onClick={() => handleManualNav(prevSlide)}
            className="
              hidden lg:flex
              absolute
              left-6
              top-1/2
              -translate-y-1/2
              w-12
              h-12
              rounded-full
              bg-white
              shadow-lg
              items-center
              justify-center
              opacity-0
              group-hover:opacity-100
            "
          >
            <ChevronLeftIcon />
          </button>

          <button
            onClick={() => handleManualNav(nextSlide)}
            className="
              hidden lg:flex
              absolute
              right-6
              top-1/2
              -translate-y-1/2
              w-12
              h-12
              rounded-full
              bg-white
              shadow-lg
              items-center
              justify-center
              opacity-0
              group-hover:opacity-100
            "
          >
            <ChevronRightIcon />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => handleManualNav(() => goTo(index))}
                className={`rounded-full transition-all ${
                  current === index
                    ? "w-8 h-2 bg-blue-600"
                    : "w-2 h-2 bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Slider;