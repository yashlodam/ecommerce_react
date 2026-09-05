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
    categoryId: "electronics",
    cta: "Explore Tech Deals",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600&auto=format&fit=crop",
    imagePosition: "object-center",
    ambientGlow: "from-teal-500/20 via-cyan-500/10 to-transparent",
  },
  {
    id: 2,
    tag: "Women's Fashion Edit",
    title: "Designer Kurtas & Modern Fits",
    subtitle: "Handcrafted printed kurtas, palazzo sets, chic crop tops & seasonal festive collections curated for women.",
    discountText: "FLAT 40% OFF",
    categoryId: "women",
    cta: "Shop Women's Fashion",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
    imagePosition: "object-[center_25%]",
    ambientGlow: "from-pink-500/20 via-rose-500/10 to-transparent",
  },
  {
    id: 3,
    tag: "Men's Contemporary Edit",
    title: "Graphic Tees, Chinos & Formal Wear",
    subtitle: "Upgrade your wardrobe with premium cotton tees, relaxed denim trousers, and executive formal shirts.",
    discountText: "UP TO 50% OFF",
    categoryId: "men",
    cta: "Shop Men's Collection",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1600&auto=format&fit=crop",
    imagePosition: "object-[center_20%]",
    ambientGlow: "from-blue-500/20 via-indigo-500/10 to-transparent",
  },
  {
    id: 4,
    tag: "Smart Wearables 2026",
    title: "AMOLED Smartwatches & Fitness Bands",
    subtitle: "Continuous biometric health tracking, heart rate, sleep monitoring, and Bluetooth calling on the go.",
    discountText: "STARTING AT ₹1,499",
    categoryId: "smart_watches",
    cta: "Explore Smartwatches",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1600&auto=format&fit=crop",
    imagePosition: "object-center",
    ambientGlow: "from-cyan-500/20 via-teal-500/10 to-transparent",
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
  const isSwipingRef = useRef(false);
  const containerRef = useRef(null);

  const goTo = useCallback((index, e) => {
    if (e) e.stopPropagation();
    const now = Date.now();
    if (now - lastClickRef.current < TRANSITION_COOLDOWN) return;
    lastClickRef.current = now;
    const next = ((index % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length;
    setCurrent(next);
  }, []);

  const nextSlide = useCallback((e) => {
    if (e) e.stopPropagation();
    goTo(current + 1);
  }, [current, goTo]);

  const prevSlide = useCallback((e) => {
    if (e) e.stopPropagation();
    goTo(current - 1);
  }, [current, goTo]);

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
      prevSlide(e);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide(e);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSlideClick(HERO_SLIDES[current]);
    }
  };

  // Touch swipe handling
  const handleTouchStart = (e) => {
    isSwipingRef.current = false;
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    if (Math.abs(touchStartX.current - touchEndX.current) > 10) {
      isSwipingRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 40) {
      if (delta > 0) nextSlide();
      else prevSlide();
    }
    setTimeout(() => {
      isSwipingRef.current = false;
    }, 120);
  };

  const handleSlideClick = (slide) => {
    if (isSwipingRef.current) return;
    navigate(`/products/${slide.categoryId}`);
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
      className="relative w-full overflow-hidden rounded-[24px] sm:rounded-[36px] bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-xl select-none min-h-[350px] min-[375px]:min-h-[380px] sm:min-h-[440px] md:min-h-[480px] lg:min-h-[520px] flex items-center transition-all duration-300 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
    >
      {/* ============================================================
          LAYER 1: BACKGROUND PHOTOGRAPHY (DESKTOP SPLIT + MOBILE FULL)
          Desktop (>= md): Right-anchored stage, 100% bright, crisp & clear
          Mobile (< md): Full-bleed with bottom-up legibility gradient
          ============================================================ */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === current;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            onClick={() => handleSlideClick(slide)}
            title={`Browse ${slide.title}`}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out cursor-pointer ${
              isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Desktop Image Stage (>= md): Right-anchored, 100% bright, visible & sharp */}
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[54%] lg:w-[52%] xl:w-[50%] h-full overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                loading={idx === 0 ? "eager" : "lazy"}
                className={`w-full h-full object-cover ${slide.imagePosition} transition-transform duration-7000 ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              />
              {/* Left feather fade ONLY on the boundary edge to blend with dark left stage */}
              <div className="absolute inset-y-0 left-0 w-24 lg:w-36 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-slate-950/30 to-transparent pointer-events-none" />
            </div>

            {/* Mobile Image Stage (< md): Full bleed with bottom-up legibility gradient */}
            <div className="md:hidden absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                loading={idx === 0 ? "eager" : "lazy"}
                className={`w-full h-full object-cover ${slide.imagePosition} transition-transform duration-7000 ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent" />
            </div>

            {/* Ambient Lighting on Left Side */}
            <div
              className={`hidden md:block absolute -top-24 -left-24 w-[500px] h-[500px] bg-gradient-to-br ${slide.ambientGlow} blur-3xl pointer-events-none opacity-75`}
            />
          </div>
        );
      })}

      {/* ============================================================
          LAYER 2: CONTENT LAYER (LEFT 48% ON DESKTOP, NEVER CLASHES WITH IMAGE)
          ============================================================ */}
      <div className="relative z-20 w-full max-w-[1540px] mx-auto px-6 sm:px-12 md:px-14 lg:px-20 py-6 sm:py-10 md:py-14 flex flex-col justify-center pointer-events-none">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === current;
          if (!isActive) return null;

          return (
            <div
              key={slide.id}
              onClick={(e) => {
                e.stopPropagation();
                handleSlideClick(slide);
              }}
              className="max-w-xl md:max-w-[46%] lg:max-w-[45%] space-y-2.5 sm:space-y-4 md:space-y-4.5 animate-fade-in cursor-pointer group pointer-events-auto"
            >
              {/* Category Badge Tag */}
              <div
                className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-2.5 sm:px-3.5 py-0.5 sm:py-1 text-[11px] sm:text-xs md:text-sm font-bold text-white shadow-xs transition-all hover:bg-white/25"
              >
                <SparklesIcon sx={{ fontSize: { xs: 13, sm: 15 }, color: "#5eead4" }} />
                <span>{slide.tag}</span>
              </div>

              {/* Main Heading */}
              <h2
                className="text-[clamp(1.25rem,3.2vw+0.2rem,2.6rem)] font-extrabold text-white tracking-tight leading-[1.2] sm:leading-[1.15] group-hover:text-teal-200 transition-colors"
              >
                {slide.title}
              </h2>

              {/* Subtitle Description */}
              <p className="text-xs sm:text-sm md:text-base text-slate-200/90 font-normal leading-relaxed line-clamp-2 sm:line-clamp-3">
                {slide.subtitle}
              </p>

              {/* Promotion Pill & Action CTAs */}
              <div className="pt-1 sm:pt-2.5 flex flex-wrap items-center gap-2 sm:gap-3.5">
                <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 text-[11px] sm:text-xs md:text-sm font-extrabold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-md shrink-0">
                  <LocalFireDepartmentIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                  {slide.discountText}
                </span>

                <Button
                  variant="contained"
                  size="large"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSlideClick(slide);
                  }}
                  endIcon={<ArrowForwardIcon sx={{ fontSize: { xs: 15, sm: 18 } }} />}
                  sx={{
                    bgcolor: "#009688",
                    color: "#ffffff",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: { xs: "12px", sm: "14px", md: "15px" },
                    borderRadius: "12px",
                    px: { xs: 2, sm: 3 },
                    py: { xs: 0.75, sm: 1 },
                    boxShadow: "0 6px 20px rgba(0, 150, 136, 0.4)",
                    "&:hover": {
                      bgcolor: "#00796b",
                      boxShadow: "0 10px 28px rgba(0, 150, 136, 0.6)",
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
        className="flex absolute left-2 sm:left-4 md:left-6 lg:left-7 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white backdrop-blur-md border border-white/25 shadow-lg items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
      >
        <ChevronLeftIcon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next promotional slide"
        className="flex absolute right-2 sm:right-4 md:right-6 lg:right-7 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white backdrop-blur-md border border-white/25 shadow-lg items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
      >
        <ChevronRightIcon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />
      </button>

      {/* ============================================================
          LAYER 5: INDICATOR PROGRESS BARS (INDEPENDENT LAYER)
          ============================================================ */}
      <div
        role="tablist"
        aria-label="Carousel slide pagination"
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2 bg-slate-950/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-md"
      >
        {HERO_SLIDES.map((slide, index) => {
          const isSelected = current === index;
          return (
            <button
              key={slide.id}
              role="tab"
              aria-selected={isSelected}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              onClick={(e) => goTo(index, e)}
              className={`transition-all duration-300 rounded-full cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
                isSelected
                  ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-teal-400 shadow-sm"
                  : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/75"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Slider;