import React, { useEffect, useState } from "react";
import "./ProductCard.css";

import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { teal } from "@mui/material/colors";

function ProductCard({ item }) {
  const images = item.images || [];

  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [isHovered, images]);

  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden w-full max-w-[280px] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}

      <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden bg-gray-50">
        {images.length > 0 ? (
          images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={item?.title || "Product image"}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${(index - currentImage) * 100}%)`,
              }}
            />
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm">
            No image
          </div>
        )}

        {/* Discount badge */}
        {item.discountPercent > 0 && (
          <span className="absolute top-3 left-3 bg-teal-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
            {item.discountPercent}% OFF
          </span>
        )}

        {/* Image dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentImage
                    ? "w-4 bg-teal-600"
                    : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}

        {/* Hover actions */}
        <div
          className={`absolute bottom-4 left-0 right-0 flex justify-center gap-3 transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Button
            variant="contained"
            sx={{
              minWidth: "42px",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              "&:hover": { background: teal[50] },
            }}
          >
            <FavoriteIcon sx={{ color: teal[600], fontSize: 20 }} />
          </Button>

          <Button
            variant="contained"
            sx={{
              minWidth: "42px",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              "&:hover": { background: teal[50] },
            }}
          >
            <ModeCommentIcon sx={{ color: teal[600], fontSize: 20 }} />
          </Button>
        </div>
      </div>

      {/* Details */}

      <div className="p-4">
        <h2 className="font-semibold text-base sm:text-lg leading-snug line-clamp-2 text-gray-900">
          {item?.title}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {item.category?.name}
        </p>

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-lg font-bold text-gray-900">
            ₹{item.sellingPrice}
          </span>

          {item.mrpPrice > item.sellingPrice && (
            <span className="line-through text-gray-400 text-sm">
              ₹{item.mrpPrice}
            </span>
          )}

          {item.discountPercent > 0 && (
            <span className="text-green-600 font-semibold text-sm">
              {item.discountPercent}% OFF
            </span>
          )}
        </div>

        {item.color && (
          <p className="text-sm text-gray-500 mt-2">
            {item.color}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductCard;