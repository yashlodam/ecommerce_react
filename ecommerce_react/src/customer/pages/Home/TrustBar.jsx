import React from "react";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

const trustBadges = [
  {
    icon: LocalShippingOutlinedIcon,
    title: "Free Express Delivery",
    subtitle: "Prepaid orders above ₹499",
    tag: "⚡ Fast",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    icon: ShieldOutlinedIcon,
    title: "100% Secure Payments",
    subtitle: "UPI, Cards & Razorpay Safe",
    tag: "🔒 Encrypted",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  {
    icon: ReplayOutlinedIcon,
    title: "7-Day Easy Returns",
    subtitle: "Instant doorstep pickup",
    tag: "🔄 Easy",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  {
    icon: StorefrontOutlinedIcon,
    title: "Verified Sellers Only",
    subtitle: "100% Authentic Products",
    tag: "✓ Genuine",
    badgeColor: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
  },
  {
    icon: SupportAgentOutlinedIcon,
    title: "24/7 Priority Support",
    subtitle: "Instant resolution & chat",
    tag: "💬 24/7",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
];

export default function TrustBar() {
  const scrollRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const idx = Math.round(scrollLeft / (offsetWidth || 1));
    setActiveIndex(Math.min(trustBadges.length - 1, Math.max(0, idx)));
  };

  return (
    <section aria-label="Marketplace Trust Badges" className="w-full">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex md:grid md:grid-cols-5 gap-2.5 sm:gap-3 md:gap-3.5 overflow-x-auto no-scrollbar snap-x snap-mandatory py-1 px-1 -mx-1 sm:mx-0"
      >
        {trustBadges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-default w-full md:w-auto shrink-0 snap-center"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/60 dark:to-emerald-950/40 border border-teal-200/60 dark:border-teal-800/60 text-teal-600 dark:text-teal-400 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all duration-200 shadow-2xs">
                <Icon sx={{ fontSize: { xs: 20, sm: 22 } }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-tight truncate">
                    {badge.title}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5 truncate">
                  {badge.subtitle}
                </p>
                <span
                  className={`inline-block mt-1 text-[9px] font-bold px-1.5 py-0.2 rounded-md border ${badge.badgeColor}`}
                >
                  {badge.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Dots Indicator */}
      <div className="flex md:hidden items-center justify-center gap-1.5 mt-2">
        {trustBadges.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === i ? "w-5 bg-teal-600 dark:bg-teal-400" : "w-1.5 bg-slate-300 dark:bg-slate-700"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
