import React from "react";
import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  Headphones,
} from "lucide-react";

function WhyChooseShopSphere() {
  const features = [
    {
      icon: <Truck size={26} />,
      title: "Fast Delivery",
      description: "Quick and reliable delivery across India.",
    },
    {
      icon: <ShieldCheck size={26} />,
      title: "Secure Payments",
      description: "100% secure payment methods and transactions.",
    },
    {
      icon: <RefreshCcw size={26} />,
      title: "Easy Returns",
      description: "Hassle-free returns and refund process.",
    },
    {
      icon: <Headphones size={26} />,
      title: "24/7 Support",
      description: "Dedicated support whenever you need help.",
    },
  ];

  return (
    <section className="px-4 lg:px-8 py-12 max-w-[1400px] mx-auto">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose ShopSphere?
          </h2>
          <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base max-w-md mx-auto">
            We make shopping simple, secure, and enjoyable.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-slate-50 rounded-2xl p-5 sm:p-6 text-center border border-transparent hover:border-[#2874f0]/15 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#2874f0]/10 text-[#2874f0] group-hover:bg-[#2874f0] group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>

              <h3 className="font-semibold text-base sm:text-lg text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
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