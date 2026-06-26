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
      className="group bg-white rounded-xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden w-full max-w-[280px] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}

      <div className="relative h-72 overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-500"
            style={{
              transform: `translateX(${(index - currentImage) * 100}%)`,
            }}
          />
        ))}

        {isHovered && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
            <Button
              variant="contained"
              sx={{
                minWidth: "45px",
                borderRadius: "50%",
                background: "#fff",
              }}
            >
              <FavoriteIcon sx={{ color: teal[500] }} />
            </Button>

            <Button
              variant="contained"
              sx={{
                minWidth: "45px",
                borderRadius: "50%",
                background: "#fff",
              }}
            >
              <ModeCommentIcon sx={{ color: teal[500] }} />
            </Button>
          </div>
        )}
      </div>

      {/* Details */}

      <div className="p-4">
        <h2 className="font-semibold text-lg line-clamp-2">
          {item?.title}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {item.category?.name}
        </p>

        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-bold">
            ₹{item.sellingPrice}
          </span>

          <span className="line-through text-gray-400">
            ₹{item.mrpPrice}
          </span>

          <span className="text-green-600 font-semibold">
            {item.discountPercent}% OFF
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {item.color}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;