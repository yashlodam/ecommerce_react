import React from "react";
import { ArrowRight } from "lucide-react";
import ShopByCategoryCard from "./ShopByCategoryCard";

function ShopByCategory() {
  const categories = [
    {
      title: "Mobiles",
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/h/d/9/-original-imagtc2qzgnnuhxh.jpeg?q=70",
    },
    {
      title: "Mens Fashion",
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/l/h/9/xxl-lycra-shirt-black-cltcly-original-imah7cxydzfafbky.jpeg?q=70",
    },
    {
      title: "Womens Fashion",
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/sari/i/6/b/free-silk-embroidered-mirror-lace-brahmshakti-unstitched-original-imahhfbyvdujjud2.jpeg?q=70",
    },
    {
      title: "Home & Furniture",
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/bed/x/i/z/king-205-n-a-no-190-rosewood-sheesham-yes-120-fph-bd-box-swiss-k-original-imaha9jqspgmyshk.jpeg?q=70",
    },
    {
      title: "Appliances",
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/mixer-grinder-juicer/m/h/d/nutri-nutripro-original-imahhj5ft2tgbmbh.jpeg?q=70",
    },
    {
      title: "Beauty & Toys",
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-eye-shadow/4/4/s/30-nude-and-rose-gold-eyeshadow-palette-combo-shimmery-finish-original-imahfsfsbvdzgkgw.jpeg?q=70",
    },
    {
      title: "Grocery",
      image:
        "https://rukminim2.flixcart.com/fk-p-flap/100/100/image/29327f40e9c4d26b.png?q=70",
    },
    {
      title: "Sports",
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/wicket/f/u/n/cricket-stump-plastic-wickets-stump-set-ospo-sports-original-imahht5hrearegty.jpeg?q=70",
    },
    {
      title: "Books",
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/regionalbooks/1/t/9/shiv-sutra-in-hindi-hindi-paperback-osho-original-imahfv5y6hwb92gt.jpeg?q=70",
    },
    
    {
      title: "Laptop",
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/computer/y/i/s/-original-imahgfdf4tyzdg5x.jpeg?q=70",
    },
    {
      title: "Watches",
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/y/t/p/1-lcs-8188-blue-lois-caron-men-original-imahmtwehdrjqgbr.jpeg?q=70",
    },
    {
      title: "Footwear",
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/k/v/a/8-brd-965-8-birde-white-original-imahkz4f8ujtrhwn.jpeg?q=70",
    },
    {
      title: "Jewellery",
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/jewellery-set/t/x/z/-original-imahfvfhbzuxwuqz.jpeg?q=70",
    },
    {
      title: "Health Care",
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/ayurvedic/3/x/y/heart-care-juice-cardiac-health-cholesterol-care-bp-care-1-four-original-imahbh6hcksy5ehg.jpeg?q=70",
    },
    {
      title: "Pet Supplies",
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/pet-collar-harness/o/4/1/small-cat-harness-with-leash-2-pcs-cat-collar-buraq-original-imah6f5ghtht7xke.jpeg?q=70",
    },
  ];

  return (
    <section className="px-3 sm:px-4 lg:px-8 py-6 lg:py-8">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 sm:p-6">
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Shop by Category
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Explore products by category
            </p>
          </div>

          <button className="hidden md:flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700">
            View All
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="category-row flex flex-wrap items-start gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-3">
          {categories.map((cat, index) => (
            <ShopByCategoryCard
              key={index}
              image={cat.image}
              title={cat.title}
            />
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