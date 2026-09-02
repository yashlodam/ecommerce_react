import React from "react";
import Slider from "../../components/Slider";
import TrustBar from "./TrustBar";
import ElectricCategory from "./ElectricCategory/ElectricCategory";
import HomeProducts from "./HomeProduct";
import Deal from "./Deal/Deal";
import ShopByCategory from "./ShpByCategory/ShopByCategory";
import Grid from "./CategoryGrid/Grid";
import BrandInSpotlight from "./BrandInSpotlight";
import FeaturedCollections from "./FeaturedCollections";
import TopRatedProducts from "./TopRatedProducts";
import SellerBanner from "./SellerBanner";
import WhyChooseShopSphere from "./WhyChooseShopSphere";
import CustomerReviews from "./CustomerReviews";
import Footer from "./Footer";

function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-8 sm:space-y-12">
        {/* 1. Hero Carousel */}
        <section aria-label="Hero promotions">
          <Slider />
        </section>

        {/* 2. Interactive Trust & Value Proposition Bar */}
        <TrustBar />

        {/* 3. Electronic Gadgets & Tech Highlights */}
        <ElectricCategory />

        {/* 4. Curated Trending Products Carousel */}
        <HomeProducts />

        {/* 5. Limited-Time Flash Deals */}
        <Deal />

        {/* 6. Shop by Category (Interactive Circles) */}
        <ShopByCategory />

        {/* 7. Editorial Masonry Banner Grid */}
        <Grid />

        {/* 8. Brands In The Spotlight */}
        <BrandInSpotlight />

        {/* 9. Featured Curated Collections */}
        <FeaturedCollections />

        {/* 10. Top Rated Marketplace Picks */}
        <TopRatedProducts />

        {/* 11. Become a Seller Partner Card */}
        <SellerBanner />

        {/* 12. Value Proposition & Assurance */}
        <WhyChooseShopSphere />

        {/* 13. Customer Testimonials */}
        <CustomerReviews />

        {/* 14. Marketplace Footer */}
        <Footer />
      </div>
    </main>
  );
}

export default Home;