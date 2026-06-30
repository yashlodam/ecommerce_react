import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Tooltip } from "@mui/material";
import { useAppDispatch } from "../../State/Store";
import { addProductToWishlist } from "../../State/customer/WishlistSlice";

function WishlistProductCard({ item }) {
     
    const dispatch = useAppDispatch()

    const handleWishlist = ()=>{
        item.id && dispatch(addProductToWishlist({productId:item.id,
            jwt:localStorage.getItem("jwt")
        }))
    }


  return (
    <div className="group w-full max-w-xs mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">

      {/* Remove Button */}
      <div onClick={handleWishlist} className="absolute top-3 right-3 z-10">
        <Tooltip title="Remove from Wishlist">
          <IconButton
            size="small"
            sx={{
              bgcolor: "white",
              "&:hover": {
                bgcolor: "#fee2e2",
                color: "#dc2626",
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>

      {/* Discount Badge */}
      {item.discountPercent > 0 && (
        <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded-md font-semibold">
          {item.discountPercent}% OFF
        </div>
      )}


      {/* Product Image */}
<div className="w-full h-64 sm:h-72 md:h-80 lg:h-72 xl:h-80 bg-white flex items-center justify-center p-4">
  <img
    src={item.images[0]}
    alt={item.title}
    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
  />
</div>

      {/* Product Details */}
      <div className="p-4">
        <h2 className="font-semibold text-gray-900 line-clamp-2 h-12">
          {item.title}
        </h2>

        {item.color && (
          <p className="text-sm text-gray-500 mt-1">
            Color: {item.color}
          </p>
        )}

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-xl font-bold text-gray-900">
            ₹{item.sellingPrice}
          </span>

          {item.mrpPrice > item.sellingPrice && (
            <span className="text-gray-400 line-through">
              ₹{item.mrpPrice}
            </span>
          )}
        </div>

        <button className="mt-5 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition font-medium">
          Move to Cart
        </button>
      </div>
    </div>
  );
}

export default WishlistProductCard;