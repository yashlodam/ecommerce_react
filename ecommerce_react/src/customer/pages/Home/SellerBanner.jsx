import React from "react";

function SellerBanner() {
  return (
    <section className="px-4 lg:px-8 py-10">
      <div className="group relative overflow-hidden rounded-[32px] bg-white shadow-md hover:shadow-xl transition-all duration-500">

        <img
          src="/images/sellerProducts.png"
          alt="Sell Your Products with ShopSphere"
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Optional subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-transparent pointer-events-none"></div>

      </div>
    </section>
  );
}

export default SellerBanner;