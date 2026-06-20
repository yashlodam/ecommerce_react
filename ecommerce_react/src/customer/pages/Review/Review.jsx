import React from 'react';
import ReviewCard from './ReviewCard';
import Rating from '@mui/material/Rating';

function Review() {
  return (
    <div className="px-5 lg:px-20 py-10">

      <div className="flex flex-col lg:flex-row gap-10">

        {/* Product Section */}
        <section className="w-full lg:w-[25%]">

          <div className="bg-white rounded-xl shadow-sm p-4 border">

            <img
              src="https://rukminim2.flixcart.com/image/964/964/xif0q/shirt/j/x/u/l-fk-may-fuul-shirt-linen-1-vraj-shopee-original-imahcyuehwzyap4c.jpeg?q=90"
              alt="product"
              className="w-full rounded-lg object-cover"
            />

            <div className="mt-4">
              <h2 className="font-semibold text-lg">
                Raam Clothing
              </h2>

              <p className="text-gray-500 text-sm">
                Silk Blend Kanjeevaram Saree
              </p>

              <div className="flex items-center gap-2 mt-3">
                <span className="font-bold text-lg">
                  ₹1149
                </span>

                <span className="line-through text-gray-400">
                  ₹1899
                </span>

                <span className="text-green-600 font-medium">
                  39% OFF
                </span>
              </div>
            </div>

          </div>

        </section>

        {/* Reviews Section */}
        <section className="w-full lg:w-[75%]">

          <div className="bg-white rounded-xl shadow-sm border p-6">

            <h2 className="text-xl font-semibold mb-6">
              Reviews & Ratings
            </h2>

            {/* Rating Summary */}
            <div className="mb-8">

              <div className="flex items-center gap-3 mb-5">
                <Rating value={4.5} precision={0.5} readOnly />

                <span className="text-gray-600">
                  4.5 out of 5
                </span>
              </div>

              {[
                { label: "Excellent", width: "80%", color: "bg-green-600" },
                { label: "Very Good", width: "60%", color: "bg-green-500" },
                { label: "Good", width: "45%", color: "bg-teal-500" },
                { label: "Average", width: "35%", color: "bg-yellow-600" },
                { label: "Poor", width: "15%", color: "bg-red-600" }
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 mb-3"
                >
                  <span className="w-24 text-sm text-gray-600">
                    {item.label}
                  </span>

                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: item.width }}
                    />
                  </div>

                  <span className="text-sm text-gray-500">
                    19259
                  </span>
                </div>
              ))}
            </div>

            {/* Reviews */}
            <div className="space-y-5">
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Review;