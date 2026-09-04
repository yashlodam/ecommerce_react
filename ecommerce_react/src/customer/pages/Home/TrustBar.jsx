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
  },
  {
    icon: ShieldOutlinedIcon,
    title: "100% Secure Payments",
    subtitle: "UPI, Cards & Razorpay Encrypted",
  },
  {
    icon: ReplayOutlinedIcon,
    title: "7-Day Easy Returns",
    subtitle: "Instant doorstep pickup & refund",
  },
  {
    icon: StorefrontOutlinedIcon,
    title: "Verified Sellers Only",
    subtitle: "GSTIN-authenticated Indian vendors",
  },
  {
    icon: SupportAgentOutlinedIcon,
    title: "24/7 Priority Support",
    subtitle: "Direct resolution within hours",
  },
];

export default function TrustBar() {
  return (
    <section aria-label="Marketplace Trust Badges" className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5 md:gap-4 items-stretch">
        {trustBadges.map((badge, idx) => {
          const Icon = badge.icon;
          const isFifthCard = idx === 4;
          return (
            <div
              key={idx}
              className={`flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 md:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-default h-full ${
                isFifthCard ? "col-span-2 md:col-span-1" : "col-span-1"
              }`}
            >
              <div className="w-9 h-9 min-[375px]:w-10 min-[375px]:h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-800/80 text-teal-600 dark:text-teal-400 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all duration-200">
                <Icon sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-tight">
                  {badge.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5 line-clamp-1 sm:line-clamp-2">
                  {badge.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
