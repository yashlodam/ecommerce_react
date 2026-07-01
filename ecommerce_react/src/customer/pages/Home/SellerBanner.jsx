import React from "react";

function SellerBanner() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_30px_90px_-35px_rgba(15,23,42,0.35)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_34px_90px_-30px_rgba(15,23,42,0.4)]">
        <div className="relative">
          <img
            src="/images/sellerProducts.png"
            alt="Sell your products with ShopSphere"
            className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-transparent to-slate-950/10" />
        </div>
      </div>
    </section>
  );
}

export default SellerBanner;