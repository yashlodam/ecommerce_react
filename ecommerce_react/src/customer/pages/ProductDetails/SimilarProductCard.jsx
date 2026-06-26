import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";

function SimilarProductCard({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo(0, 0);

    navigate(
      `/product-details/${item.category?.categoryId}/${item.title}/${item.id}`
    );
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      {/* Image */}

      <div className="relative overflow-hidden">

        <img
          src={item.images?.[0]}
          alt={item.title}
          className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Discount Badge */}

        <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
          {item.discountPercent}% OFF
        </span>

        {/* Wishlist */}

        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
        >
          <FavoriteBorderIcon fontSize="small" />
        </button>

      </div>

      {/* Content */}

      <div className="p-4 space-y-2">

        <p className="text-sm text-gray-500">
          {item.brand}
        </p>

        <h2 className="font-semibold text-gray-800 line-clamp-2 min-h-[48px]">
          {item.title}
        </h2>

        <div className="flex items-center gap-1">

          <StarIcon
            sx={{
              color: "#facc15",
              fontSize: 18,
            }}
          />

          <span className="text-sm text-gray-600">
            {item.numRatings || 0}
          </span>

        </div>

        <div className="flex items-center gap-2 flex-wrap">

          <span className="text-lg font-bold text-gray-900">
            ₹{item.sellingPrice}
          </span>

          <span className="line-through text-gray-400 text-sm">
            ₹{item.mrpPrice}
          </span>

          <span className="text-green-600 text-sm font-semibold">
            {item.discountPercent}% OFF
          </span>

        </div>

      </div>
    </div>
  );
}

export default SimilarProductCard;