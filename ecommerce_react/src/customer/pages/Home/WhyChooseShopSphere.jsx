import React from "react";
import { ShieldCheck, Truck, RefreshCcw, Headphones } from "lucide-react";

function WhyChooseShopSphere() {
  const features = [
    {
      icon: <Truck size={24} />,
      title: "Fast Delivery",
      description: "Quick and reliable express fulfillment across 19,000+ pin codes in India.",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Secure Payments",
      description: "100% secure payment methods with instant UPI, Cards & EMI protection.",
    },
    {
      icon: <RefreshCcw size={24} />,
      title: "Easy Returns",
      description: "Hassle-free 7-day doorstep return pickup and direct refund process.",
    },
    {
      icon: <Headphones size={24} />,
      title: "24/7 Support",
      description: "Dedicated marketplace customer support whenever you need assistance.",
    },
  ];

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-4 sm:p-6 lg:p-7 shadow-sm transition-colors">
      <div className="mb-6 text-center border-b border-slate-100 dark:border-slate-800 pb-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-teal-600 dark:text-teal-400">
          Trusted Marketplace
        </p>
        <h2 className="mt-0.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Why Customers Choose ShopSphere
        </h2>
        <p className="mx-auto mt-1 max-w-lg text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          We make multi-vendor shopping feel secure, authentic, and delightfully seamless.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-3 sm:p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/60 dark:hover:border-teal-500/60 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md"
          >
            <div className="mb-2.5 sm:mb-3.5 flex justify-center">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-800/80 text-teal-600 dark:text-teal-400 transition-all duration-300 group-hover:bg-teal-600 group-hover:text-white">
                {feature.icon}
              </div>
            </div>

            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
              {feature.title}
            </h3>
            <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2 sm:line-clamp-none">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseShopSphere;