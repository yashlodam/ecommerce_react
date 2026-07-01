import React from "react";
import { ShieldCheck, Truck, RefreshCcw, Headphones } from "lucide-react";

function WhyChooseShopSphere() {
  const features = [
    {
      icon: <Truck size={26} />,
      title: "Fast delivery",
      description: "Quick and reliable delivery across India.",
    },
    {
      icon: <ShieldCheck size={26} />,
      title: "Secure payments",
      description: "100% secure payment methods and transactions.",
    },
    {
      icon: <RefreshCcw size={26} />,
      title: "Easy returns",
      description: "Hassle-free returns and refund process.",
    },
    {
      icon: <Headphones size={26} />,
      title: "24/7 support",
      description: "Dedicated support whenever you need help.",
    },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200/80 bg-white/85 p-6 shadow-[0_30px_90px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-8 md:p-10">
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-600">Trusted experience</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Why customers choose ShopSphere
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
            We make shopping feel simple, secure, and genuinely delightful from start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-[24px] border border-slate-200/70 bg-slate-50 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_24px_70px_-34px_rgba(37,99,235,0.4)] sm:p-6"
            >
              <div className="mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseShopSphere;