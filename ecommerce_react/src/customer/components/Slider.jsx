import React, { useEffect, useRef, useState, useCallback } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SparklesIcon from "@mui/icons-material/AutoAwesome";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import { Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../State/Store";
import { fetchActiveCoupons } from "../../State/customer/CouponSlice";
import CouponModal from "../../common/coupons/CouponModal";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

const HERO_SLIDES = [
  {
    id: 1,
    tag: "Trending Tech 2026",
    title: "Flagship Gadgets & Smart Audio",
    subtitle: "Experience next-gen smartphones, noise-canceling headphones & sleek wearables with manufacturer warranty.",
    discountText: "UP TO 50% OFF",
    categoryId: "electronics",
    cta: "Explore Tech Deals",
    couponCode: "MEGA50",
    couponDiscount: "50% OFF",
    couponMinOrder: "₹2,500",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600&auto=format&fit=crop",
    imagePosition: "object-center",
    ambientGlow: "from-teal-500/20 via-cyan-500/10 to-transparent",
  },
  {
    id: 2,
    tag: "Women's Fashion Edit",
    title: "Designer Kurtas & Modern Fits",
    subtitle: "Handcrafted printed kurtas, palazzo sets, chic crop tops & seasonal festive collections curated for women.",
    discountText: "EXTRA 30% OFF",
    categoryId: "women",
    cta: "Shop Women's Fashion",
    couponCode: "FESTIVE30",
    couponDiscount: "30% OFF",
    couponMinOrder: "₹1,000",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
    imagePosition: "object-[center_25%]",
    ambientGlow: "from-pink-500/20 via-rose-500/10 to-transparent",
  },
  {
    id: 3,
    tag: "Men's Contemporary Edit",
    title: "Graphic Tees, Chinos & Formal Wear",
    subtitle: "Upgrade your wardrobe with premium cotton tees, relaxed denim trousers, and executive formal shirts.",
    discountText: "FLAT 20% OFF",
    categoryId: "men",
    cta: "Shop Men's Collection",
    couponCode: "WELCOME20",
    couponDiscount: "20% OFF",
    couponMinOrder: "₹500",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1600&auto=format&fit=crop",
    imagePosition: "object-[center_20%]",
    ambientGlow: "from-blue-500/20 via-indigo-500/10 to-transparent",
  },
  {
    id: 4,
    tag: "Smart Wearables 2026",
    title: "AMOLED Smartwatches & Fitness Bands",
    subtitle: "Continuous biometric health tracking, heart rate, sleep monitoring, and Bluetooth calling on the go.",
    discountText: "EXTRA 10% OFF",
    categoryId: "smart_watches",
    cta: "Explore Smartwatches",
    couponCode: "FLAT10",
    couponDiscount: "10% OFF",
    couponMinOrder: "₹200",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1600&auto=format&fit=crop",
    imagePosition: "object-center",
    ambientGlow: "from-cyan-500/20 via-teal-500/10 to-transparent",
  },
  {
    id: 5,
    tag: "Exclusive Coupon Festival",
    title: "Unlock Sitewide Vouchers & Savings",
    subtitle: "Apply verified promo codes at checkout to unlock up to 50% discount on top brands across every category.",
    discountText: "SAVE UP TO 50%",
    categoryId: "all",
    cta: "View All Coupons",
    couponCode: "MEGA50",
    couponDiscount: "UP TO 50% OFF",
    couponMinOrder: "Sitewide Offers",
    isCouponSpecial: true,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1600&auto=format&fit=crop",
    imagePosition: "object-center",
    ambientGlow: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
];

const AUTOPLAY_DELAY = 5400;
const TRANSITION_COOLDOWN = 450;

function Slider() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const couponState = useAppSelector((store) => store.coupon);
  const activeCoupons = couponState?.activeCoupons || [];

  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [copiedCode, setCopiedCode] = useState("");
  const [couponModalOpen, setCouponModalOpen] = useState(false);

  const timerRef = useRef(null);
  const lastClickRef = useRef(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwipingRef = useRef(false);
  const containerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchActiveCoupons());
  }, [dispatch]);

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
    if (slide.isCouponSpecial) {
      setCouponModalOpen(true);
      return;
    }
    navigate(`/products/${slide.categoryId}`);
  };

  const handleCopyCode = (code, e) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2200);
  };

  return (
    <div className="space-y-3.5">
      {/* ============================================================
          MAIN HERO SLIDER
          ============================================================ */}
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
        className="relative w-full overflow-hidden rounded-[24px] sm:rounded-[36px] bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-xl select-none min-h-[380px] min-[375px]:min-h-[410px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[530px] flex items-center transition-all duration-300 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none"
      >
        {/* LAYER 1: BACKGROUND PHOTOGRAPHY */}
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
              {/* Desktop Image Stage (>= md): Right-anchored, bright & visible */}
              <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[54%] lg:w-[52%] xl:w-[50%] h-full overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading={idx === 0 ? "eager" : "lazy"}
                  className={`w-full h-full object-cover ${slide.imagePosition} transition-transform duration-7000 ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                />
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
              </div>

              {/* Ambient Lighting on Left Side */}
              <div
                className={`hidden md:block absolute -top-24 -left-24 w-[500px] h-[500px] bg-gradient-to-br ${slide.ambientGlow} blur-3xl pointer-events-none opacity-75`}
              />
            </div>
          );
        })}

        {/* LAYER 2: CONTENT LAYER */}
        <div className="relative z-20 w-full max-w-[1540px] mx-auto px-6 sm:px-12 md:px-14 lg:px-20 py-6 sm:py-10 md:py-14 flex flex-col justify-center pointer-events-none">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === current;
            if (!isActive) return null;

            const isThisCopied = copiedCode === slide.couponCode;

            return (
              <div
                key={slide.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSlideClick(slide);
                }}
                className="max-w-xl md:max-w-[48%] lg:max-w-[46%] space-y-2.5 sm:space-y-3.5 md:space-y-4 animate-fade-in cursor-pointer group pointer-events-auto"
              >
                {/* Category Badge Tag + Deal Tag */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold text-white shadow-xs">
                    <SparklesIcon sx={{ fontSize: { xs: 13, sm: 15 }, color: "#5eead4" }} />
                    <span>{slide.tag}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 text-[10px] sm:text-xs font-black px-2.5 py-0.5 sm:py-1 rounded-full shadow-md">
                    <LocalFireDepartmentIcon sx={{ fontSize: { xs: 13, sm: 15 } }} />
                    {slide.discountText}
                  </span>
                </div>

                {/* Main Heading */}
                <h2 className="text-[clamp(1.25rem,3.2vw+0.2rem,2.5rem)] font-extrabold text-white tracking-tight leading-[1.2] sm:leading-[1.15] group-hover:text-teal-200 transition-colors">
                  {slide.title}
                </h2>

                {/* Subtitle Description */}
                <p className="text-xs sm:text-sm text-slate-200/90 font-normal leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {slide.subtitle}
                </p>

                {/* Real-world Coupon Voucher Ticket Pill */}
                {slide.couponCode && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2.5 p-1.5 pr-2.5 sm:p-2 sm:pr-3 rounded-xl border border-dashed border-teal-400/80 bg-teal-950/70 backdrop-blur-md shadow-lg"
                  >
                    <div className="flex items-center gap-1.5 pl-1.5 text-teal-300">
                      <LocalOfferIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                      <span className="text-[11px] sm:text-xs font-extrabold tracking-wide uppercase">
                        Use Code:
                      </span>
                    </div>

                    <span className="font-mono font-black text-xs sm:text-sm text-white bg-teal-800/80 border border-teal-600/70 px-2 py-0.5 rounded-md tracking-wider">
                      {slide.couponCode}
                    </span>

                    <span className="hidden sm:inline text-[11px] text-teal-200/90 font-medium">
                      ({slide.couponMinOrder})
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleCopyCode(slide.couponCode, e)}
                      className={`text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 shrink-0 ${
                        isThisCopied
                          ? "bg-emerald-500 text-white shadow-xs"
                          : "bg-teal-500/30 hover:bg-teal-500/50 text-teal-200 hover:text-white"
                      }`}
                    >
                      {isThisCopied ? (
                        <>
                          <CheckCircleIcon sx={{ fontSize: 13 }} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <ContentCopyIcon sx={{ fontSize: 12 }} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Action CTAs */}
                <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3.5">
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSlideClick(slide);
                    }}
                    endIcon={<ArrowForwardIcon sx={{ fontSize: { xs: 15, sm: 17 } }} />}
                    sx={{
                      bgcolor: "#009688",
                      color: "#ffffff",
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: { xs: "12px", sm: "13.5px" },
                      borderRadius: "12px",
                      px: { xs: 2.5, sm: 3 },
                      py: { xs: 0.8, sm: 1 },
                      boxShadow: "0 6px 20px rgba(0, 150, 136, 0.4)",
                      "&:hover": {
                        bgcolor: "#00796b",
                        boxShadow: "0 10px 28px rgba(0, 150, 136, 0.6)",
                      },
                    }}
                  >
                    {slide.cta}
                  </Button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCouponModalOpen(true);
                    }}
                    className="text-xs sm:text-sm font-bold text-teal-300 hover:text-white underline underline-offset-4 decoration-teal-400/60 transition-colors flex items-center gap-1 py-1 px-1.5"
                  >
                    <ConfirmationNumberOutlinedIcon sx={{ fontSize: 16 }} />
                    View All Coupons ({activeCoupons.length || 4})
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* LAYER 4: NAVIGATION CONTROLS */}
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

        {/* LAYER 5: INDICATOR PROGRESS BARS */}
        <div
          role="tablist"
          aria-label="Carousel slide pagination"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-md"
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

      {/* ============================================================
          DOCKED PROMOTIONAL COUPON RIBBON (MYNTRA / FLIPKART STYLE)
          ============================================================ */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3 sm:p-3.5 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Ribbon Header Label */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <ConfirmationNumberOutlinedIcon sx={{ fontSize: 18 }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  EXCLUSIVE COUPONS
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Live Offers
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Tap code to copy & paste at checkout
              </p>
            </div>
          </div>

          {/* Horizontally Scrolling Voucher Rail */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none flex-1 md:justify-center">
            {(activeCoupons.length > 0 ? activeCoupons : [
              { code: "WELCOME20", discountPercentage: 20, minimumOrderValue: 500 },
              { code: "FESTIVE30", discountPercentage: 30, minimumOrderValue: 1000 },
              { code: "MEGA50", discountPercentage: 50, minimumOrderValue: 2500 },
              { code: "FLAT10", discountPercentage: 10, minimumOrderValue: 200 },
            ]).map((cpn) => {
              const isThisCopied = copiedCode === cpn.code;
              return (
                <div
                  key={cpn.code}
                  onClick={(e) => handleCopyCode(cpn.code, e)}
                  title={`Click to copy coupon code ${cpn.code}`}
                  className="group relative shrink-0 cursor-pointer rounded-xl border border-dashed border-teal-300 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/30 hover:bg-teal-100/60 dark:hover:bg-teal-900/50 transition-all p-2 px-3 flex items-center gap-2 shadow-2xs hover:shadow-xs"
                >
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-black text-xs text-teal-800 dark:text-teal-200 tracking-wider">
                        {cpn.code}
                      </span>
                      <span className="text-[10px] font-extrabold text-white bg-teal-600 px-1.5 py-0.2 rounded">
                        {cpn.discountPercentage}% OFF
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none mt-0.5">
                      {cpn.minimumOrderValue > 0
                        ? `Min order ${formatINR(cpn.minimumOrderValue)}`
                        : "No minimum order"}
                    </p>
                  </div>

                  <Tooltip title={isThisCopied ? "Copied!" : "Copy Code"} arrow placement="top">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                        isThisCopied
                          ? "bg-emerald-500 text-white"
                          : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-teal-600"
                      }`}
                    >
                      {isThisCopied ? (
                        <CheckCircleIcon sx={{ fontSize: 14 }} />
                      ) : (
                        <ContentCopyIcon sx={{ fontSize: 13 }} />
                      )}
                    </span>
                  </Tooltip>
                </div>
              );
            })}
          </div>

          {/* Modal Launch Button */}
          <div className="shrink-0 flex justify-end">
            <button
              type="button"
              onClick={() => setCouponModalOpen(true)}
              className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors flex items-center gap-1 hover:underline"
            >
              <span>View All Offers ({activeCoupons.length || 4})</span>
              <ArrowForwardIcon sx={{ fontSize: 14 }} />
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Coupon Modal for Homepage */}
      <CouponModal
        open={couponModalOpen}
        onClose={() => setCouponModalOpen(false)}
        coupons={activeCoupons}
        orderValue={0}
        loading={couponState.loadingActiveCoupons}
      />
    </div>
  );
}

export default Slider;