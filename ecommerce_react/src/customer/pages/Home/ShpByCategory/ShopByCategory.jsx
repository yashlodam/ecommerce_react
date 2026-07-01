import React from "react";
import { ArrowRight } from "lucide-react";
import ShopByCategoryCard from "./ShopByCategoryCard";

function ShopByCategory() {
  const categories = [
    { title: "Mobiles", image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/h/d/9/-original-imagtc2qzgnnuhxh.jpeg?q=70" },
    { title: "Mens Fashion", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/l/h/9/xxl-lycra-shirt-black-cltcly-original-imah7cxydzfafbky.jpeg?q=70" },
    { title: "Womens Fashion", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/sari/i/6/b/free-silk-embroidered-mirror-lace-brahmshakti-unstitched-original-imahhfbyvdujjud2.jpeg?q=70" },
    { title: "Home & Furniture", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/bed/x/i/z/king-205-n-a-no-190-rosewood-sheesham-yes-120-fph-bd-box-swiss-k-original-imaha9jqspgmyshk.jpeg?q=70" },
    { title: "Appliances", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/mixer-grinder-juicer/m/h/d/nutri-nutripro-original-imahhj5ft2tgbmbh.jpeg?q=70" },
    { title: "Beauty & Toys", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-eye-shadow/4/4/s/30-nude-and-rose-gold-eyeshadow-palette-combo-shimmery-finish-original-imahfsfsbvdzgkgw.jpeg?q=70" },
    { title: "Grocery", image: "https://rukminim2.flixcart.com/fk-p-flap/100/100/image/29327f40e9c4d26b.png?q=70" },
    { title: "Sports", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/wicket/f/u/n/cricket-stump-plastic-wickets-stump-set-ospo-sports-original-imahht5hrearegty.jpeg?q=70" },
    { title: "Books", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/regionalbooks/1/t/9/shiv-sutra-in-hindi-hindi-paperback-osho-original-imahfv5y6hwb92gt.jpeg?q=70" },
    { title: "Laptop", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/computer/y/i/s/-original-imahgfdf4tyzdg5x.jpeg?q=70" },
    { title: "Watches", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/y/t/p/1-lcs-8188-blue-lois-caron-men-original-imahmtwehdrjqgbr.jpeg?q=70" },
    { title: "Footwear", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/k/v/a/8-brd-965-8-birde-white-original-imahkz4f8ujtrhwn.jpeg?q=70" },
    { title: "Jewellery", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/jewellery-set/t/x/z/-original-imahfvfhbzuxwuqz.jpeg?q=70" },
    { title: "Health Care", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/ayurvedic/3/x/y/heart-care-juice-cardiac-health-cholesterol-care-bp-care-1-four-original-imahbh6hcksy5ehg.jpeg?q=70" },
    { title: "Pet Supplies", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/pet-collar-harness/o/4/1/small-cat-harness-with-leash-2-pcs-cat-collar-buraq-original-imah6f5ghtht7xke.jpeg?q=70" },
  ];

  return (
    <section className="px-3 py-8 sm:px-4 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1400px] rounded-[32px] border border-slate-200/80 bg-white/85 p-4 shadow-[0_30px_90px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-600">Browse by interest</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Shop by category
            </h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Explore products by category with a smoother, more premium browse experience.
            </p>
          </div>

          <button className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700 md:inline-flex">
            View all
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="category-row flex flex-wrap items-start gap-3 overflow-x-auto pb-2 sm:gap-4 lg:gap-5">
          {categories.map((cat, index) => (
            <ShopByCategoryCard key={index} image={cat.image} title={cat.title} />
          ))}
        </div>
      </div>

      <style>{`
        .category-row {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .category-row::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default ShopByCategory;