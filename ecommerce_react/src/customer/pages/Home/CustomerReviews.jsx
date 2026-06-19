import React from "react";
import { Star } from "lucide-react";

function CustomerReviews() {
  const reviews = [
    {
      name: "Rahul Sharma",
      image: "https://i.pravatar.cc/150?img=11",
      review:
        "Amazing shopping experience! The delivery was fast and the product quality exceeded my expectations.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      image: "https://i.pravatar.cc/150?img=5",
      review:
        "Easy returns, secure payments, and excellent customer support. Highly recommended!",
      rating: 5,
    },
    {
      name: "Amit Verma",
      image: "https://i.pravatar.cc/150?img=15",
      review:
        "ShopSphere offers a great collection of products at competitive prices. Will shop again!",
      rating: 4,
    },
  ];

  return (
    <section className="px-4 lg:px-8 py-12">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Customers Say 💬
          </h2>

          <p className="text-gray-500 mt-2">
            Trusted by thousands of happy shoppers
          </p>
        </div>

        {/* Reviews */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-3xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {review.name}
                  </h3>

                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                "{review.review}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CustomerReviews;