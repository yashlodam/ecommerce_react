import React from "react";
import Slider from "../../components/Slider";
import ElectricCategory from "./ElectricCategory/ElectricCategory";
import Grid from "./CategoryGrid/Grid";
import Deal from "./Deal/Deal";
import ShopByCategory from "./ShpByCategory/ShopByCategory";
import BrandInSpotlight from "./BrandInSpotlight";
import TopRatedProducts from "./TopRatedProducts";
import SellerBanner from "./SellerBanner";
import FeaturedCollections from "./FeaturedCollections";
import WhyChooseShopSphere from "./WhyChooseShopSphere";
import CustomerReviews from "./CustomerReviews";
import Footer from "./Footer";

function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-[1800px] mx-auto px-3 md:px-5 lg:px-8 py-6 md:py-8 lg:py-10">
        <section
          aria-label="Featured promotions"
          className="bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-sm p-2 lg:p-4"
        >
          <Slider />
        </section>
        <ElectricCategory/>
        <Grid/>
        <Deal/>
        <ShopByCategory/>
        <BrandInSpotlight/>
        <TopRatedProducts/>
        <SellerBanner/>
        <FeaturedCollections/>
        <WhyChooseShopSphere/>
        <CustomerReviews/>
        <Footer/>

        
      </div>
    </main>
  );
}

export default Home;