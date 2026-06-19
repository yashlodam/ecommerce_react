import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const DEFAULT_IMAGES = [
  "/images/mobile.png",
  "/images/gym.png",
  "/images/kitchen.png",
];

const AUTOPLAY_DELAY = 4000;
const TRANSITION_MS = 700;

function Slider({ images = DEFAULT_IMAGES, autoPlayDelay = AUTOPLAY_DELAY, rounded = "rounded-xl" }) {
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
      const next = ((index % images.length) + images.length) % images.length;
      setIsAnimating(true);
      setCurrent(next);
      window.setTimeout(() => setIsAnimating(false), prefersReducedMotion ? 0 : TRANSITION_MS);
    },
    [images.length, isAnimating, prefersReducedMotion]
  );

  const nextSlide = useCallback(() => goTo(current + 1), [current, goTo]);
  const prevSlide = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay — pauses on hover/focus, restarts its full window on every change
  useEffect(() => {
    if (isHovering || prefersReducedMotion || images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, autoPlayDelay);
    return () => clearInterval(timerRef.current);
  }, [isHovering, current, autoPlayDelay, images.length, prefersReducedMotion]);

  const handleManualNav = (action) => {
    clearInterval(timerRef.current);
    action();
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") handleManualNav(prevSlide);
    if (e.key === "ArrowRight") handleManualNav(nextSlide);
  };

  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) {
      handleManualNav(delta > 0 ? nextSlide : prevSlide);
    }
  };

  const handleImageLoad = (index) => setLoaded((prev) => ({ ...prev, [index]: true }));

  return (
    <div
      className={`relative overflow-hidden ${rounded} group outline-none`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onBlur={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Promotional banners"
    >
      {/* Skeleton shimmer until the active image has actually loaded */}
      {!loaded[current] && <div className="absolute inset-0 bg-slate-200 animate-pulse z-0" />}

      {/* Sliding track */}
      <div
        className="flex cursor-pointer"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: prefersReducedMotion ? "none" : `transform ${TRANSITION_MS}ms ease-out`,
        }}
      >
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Promotional banner ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            onLoad={() => handleImageLoad(index)}
            className="
              w-full flex-shrink-0 relative z-10
              h-[180px] sm:h-[350px] md:h-[450px] lg:h-[450px] xl:h-[520px]
              object-contain lg:object-cover bg-white
            "
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5 pointer-events-none z-10" />

      {images.length > 1 && (
        <>
          <button
            onClick={() => handleManualNav(prevSlide)}
            aria-label="Previous slide"
            className="
              hidden lg:flex items-center justify-center
              absolute left-6 top-1/2 -translate-y-1/2
              w-12 h-12 bg-white/90 hover:bg-white shadow-xl rounded-full
              transition-all duration-300 hover:scale-110
              opacity-0 group-hover:opacity-100 focus-visible:opacity-100 z-20
            "
          >
            <ChevronLeftIcon />
          </button>

          <button
            onClick={() => handleManualNav(nextSlide)}
            aria-label="Next slide"
            className="
              hidden lg:flex items-center justify-center
              absolute right-6 top-1/2 -translate-y-1/2
              w-12 h-12 bg-white/90 hover:bg-white shadow-xl rounded-full
              transition-all duration-300 hover:scale-110
              opacity-0 group-hover:opacity-100 focus-visible:opacity-100 z-20
            "
          >
            <ChevronRightIcon />
          </button>

          {/* Dots with autoplay progress fill */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleManualNav(() => goTo(index))}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={current === index}
                className={`rounded-full overflow-hidden transition-all duration-300 ${
                  current === index ? "w-10 h-2 bg-white/40" : "w-2 h-2 bg-white/60 hover:bg-white/80"
                }`}
              >
                {current === index && !isHovering && !prefersReducedMotion && (
                  <span
                    key={`progress-${current}`}
                    className="block h-full bg-primary rounded-full"
                    style={{ animation: `slider-progress ${autoPlayDelay}ms linear forwards` }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Slide counter */}
          <div className="absolute top-4 right-4 lg:right-6 bg-black/40 text-white text-xs font-medium px-2.5 py-1 rounded-full z-20 tabular-nums">
            {current + 1} / {images.length}
          </div>
        </>
      )}

      <style>{`
        @keyframes slider-progress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  );
}

export default Slider;