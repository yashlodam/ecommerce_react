import React, { useEffect, useRef, useState, useCallback } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SparklesIcon from "@mui/icons-material/AutoAwesome";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HERO_SLIDES = [
  {
    id: 1,
    tag: "Trending Tech 2026",
    title: "Flagship Gadgets & Smart Audio",
    subtitle: "Experience next-gen smartphones, noise-canceling headphones & sleek wearables with manufacturer warranty.",
    discountText: "UP TO 45% OFF",
    categoryId: "smartphones",
    cta: "Explore Tech Deals",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600&auto=format&fit=crop",
    imagePosition: "object-[center_right] sm:object-[75%_center]",
  },
  {
    id: 2,
    tag: "Exclusive Seasonal Drop",
    title: "Designer Apparel & Modern Fits",
    subtitle: "Curated ethnic wear, formal tailored suits, and everyday urban streetwear from verified Indian sellers.",
    discountText: "FLAT 50% DISCOUNT",
    categoryId: "men",
    cta: "Shop Fashion Edit",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
    imagePosition: "object-[center_top] sm:object-[80%_center]",
  },
  {
    id: 3,
    tag: "Home & Lifestyle Special",
    title: "Contemporary Furniture & Ambient Decor",
    subtitle: "Transform your living space with handcrafted wooden beds, plush sofas, artisan rugs & ambient lights.",
    discountText: "STARTING AT ₹499",
    categoryId: "home_furniture",
    cta: "Discover Home Living",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
    imagePosition: "object-center sm:object-[70%_center]",
  },
  {
    id: 4,
    tag: "Athletic & Performance",
    title: "Smartwatches & Pro Footwear",
    subtitle: "Precision health and biometric fitness monitors, ultra-light running sneakers, and durable athletic gear.",
    discountText: "EXTRA 20% WITH CODE: SAVE20",
    categoryId: "smart_watches",
    cta: "View Fitness Gear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop",
    imagePosition: "object-[center_right] sm:object-[85%_center]",
  },
];

const AUTOPLAY_DELAY = 5200;
const TRANSITION_COOLDOWN = 450;

function Slider() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef(null);
  const lastClickRef = useRef(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef(null);

  const goTo = useCallback((index) => {
    const now = Date.now();
    if (now - lastClickRef.current < TRANSITION_COOLDOWN) return;
    lastClickRef.current = now;
    const next = ((index % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length;
    setCurrent(next);
  }, []);

  const nextSlide = useCallback(() => goTo(current + 1), [current, goTo]);
  const prevSlide = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay handler with pause on hover
  useEffect(() => {
    if (isHovering) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timerRef.current);
  }, [current, isHovering]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  // Touch swipe handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 40) {
      if (delta > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <section
      ref={containerRef}
      role="region"
      aria-label="Promotional Hero Carousel"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full overflow-hidden rounded-[28px] sm:rounded-[36px] bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-xl select-none min-h-[440px] sm:min-h-[480px] md:min-h-[520px] lg:min-h-[560px] flex items-center transition-all duration-300 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
    >
      {/* ============================================================
          LAYER 1: BACKGROUND PHOTOGRAPHY (VIBRANT & CLEARLY VISIBLE)
          ============================================================ */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === current;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              loading={idx === 0 ? "eager" : "lazy"}
              className={`w-full h-full object-cover ${slide.imagePosition} transform transition-transform duration-6000 ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            />

            {/* ============================================================
                LAYER 2: SMART DIRECTIONAL GRADIENT OVERLAY
                Left side: Solid, readable dark backdrop for text.
                Right side: Subtle & transparent so the product is crisp and recognizable.
                ============================================================ */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,15,25,0.45)_0%,rgba(11,15,25,0.85)_55%,rgba(11,15,25,0.96)_100%)] sm:bg-[linear-gradient(90deg,rgba(11,15,25,0.94)_0%,rgba(11,15,25,0.86)_38%,rgba(11,15,25,0.45)_65%,rgba(11,15,25,0.12)_90%,transparent_100%)]" />

            {/* Subtle bottom vignette to ensure indicator contrast */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none" />
          </div>
        );
      })}

      {/* ============================================================
          LAYER 3: CONTENT LAYER (SAFE-AREA INSET & STABLE TYPOGRAPHY)
          Uses strict horizontal padding to prevent collision with arrow controls.
          ============================================================ */}
      <div className="relative z-20 w-full max-w-[1540px] mx-auto px-12 sm:px-20 md:px-24 lg:px-28 py-12 sm:py-16 flex flex-col justify-center pointer-events-auto">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === current;
          if (!isActive) return null;

          return (
            <div
              key={slide.id}
              className="max-w-xl sm:max-w-2xl space-y-3.5 sm:space-y-4 md:space-y-5 animate-fade-in"
            >
              {/* Category Badge Tag */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3.5 py-1 text-xs sm:text-sm font-bold text-white shadow-xs">
                <SparklesIcon sx={{ fontSize: 15, color: "#5eead4" }} />
                <span>{slide.tag}</span>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-white tracking-tight leading-[1.12] sm:leading-[1.14]">
                {slide.title}
              </h2>

              {/* Subtitle Description */}
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-200 font-normal leading-relaxed line-clamp-2 sm:line-clamp-3 max-w-lg">
                {slide.subtitle}
              </p>

              {/* Promotion Pill & Action CTAs */}
              <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 text-xs sm:text-sm font-extrabold px-3.5 py-1.5 rounded-full shadow-md shrink-0">
                  <LocalFireDepartmentIcon sx={{ fontSize: 17 }} />
                  {slide.discountText}
                </span>

                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate(`/products/${slide.categoryId}`)}
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    bgcolor: "#009688",
                    color: "#ffffff",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: { xs: "13px", sm: "14px", md: "15px" },
                    borderRadius: "14px",
                    px: { xs: 2.5, sm: 3.5 },
                    py: { xs: 0.9, sm: 1.15 },
                    boxShadow: "0 8px 24px rgba(0, 150, 136, 0.4)",
                    "&:hover": {
                      bgcolor: "#00796b",
                      boxShadow: "0 12px 32px rgba(0, 150, 136, 0.6)",
                    },
                  }}
                >
                  {slide.cta}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================
          LAYER 4: NAVIGATION CONTROLS (INDEPENDENT LAYER)
          Positioned vertically centered on the hero container (top-1/2 -translate-y-1/2)
          ============================================================ */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous promotional slide"
        className="absolute left-2.5 sm:left-4 md:left-6 lg:left-7 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-slate-950/45 hover:bg-slate-950/80 text-white backdrop-blur-md border border-white/25 shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
      >
        <ChevronLeftIcon sx={{ fontSize: { xs: 22, sm: 26, md: 28 } }} />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next promotional slide"
        className="absolute right-2.5 sm:right-4 md:right-6 lg:right-7 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-slate-950/45 hover:bg-slate-950/80 text-white backdrop-blur-md border border-white/25 shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
      >
        <ChevronRightIcon sx={{ fontSize: { xs: 22, sm: 26, md: 28 } }} />
      </button>

      {/* ============================================================
          LAYER 5: INDICATOR PROGRESS BARS (INDEPENDENT LAYER)
          ============================================================ */}
      <div
        role="tablist"
        aria-label="Carousel slide pagination"
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-slate-950/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-lg"
      >
        {HERO_SLIDES.map((slide, index) => {
          const isSelected = current === index;
          return (
            <button
              key={slide.id}
              role="tab"
              aria-selected={isSelected}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              onClick={() => goTo(index)}
              className={`transition-all duration-300 rounded-full cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
                isSelected
                  ? "w-7 sm:w-9 h-2 sm:h-2.5 bg-teal-400 shadow-sm"
                  : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/75"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Slider;