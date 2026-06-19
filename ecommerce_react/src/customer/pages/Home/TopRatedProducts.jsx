import React from "react";
import { Star } from "lucide-react";

function TopRatedProducts() {
  const products = [
    {
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/h/x/a/6-k11241g-tan-6-paragon-tan-original-imahjhweztmchfx9.jpeg?q=70",
      title: "Premium Shoes",
      rating: 4.9,
    },
    {
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/f/l/z/-original-imagqhvgybexgkmh.jpeg?q=70",
      title: "Smart Watch",
      rating: 4.8,
    },
    {
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/x/x/x/-original-imaghx9qj7jzgh8g.jpeg?q=70",
      title: "Headphones",
      rating: 4.7,
    },
    {
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/mobile/h/e/g/-original-imagx9egm9mgmvab.jpeg?q=70",
      title: "Smartphone",
      rating: 4.9,
    },
  ];

  return (
    <section className="px-4 lg:px-8 py-10">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">

        {/* Header */}
        <div className="mb-8">
            
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Top Rated Products ⭐   
          </h2>

          <p className="text-gray-500 mt-2">
            Loved by thousands of customers
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl border border-slate-100 hover:border-yellow-300 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="bg-slate-50 p-5">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-44 object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800">
                  {product.title}
                </h3>

                <div className="flex items-center gap-1 mt-2">
                  <Star
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {product.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TopRatedProducts;