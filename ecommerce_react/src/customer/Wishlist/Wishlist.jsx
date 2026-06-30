import React, { useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WishlistProductCard from "./WishlistProductCard";
import { useAppDispatch, useAppSelector } from "../../State/Store";
import { getWishlistByUserId } from "../../State/customer/WishlistSlice";

function Wishlist() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { wishlist } = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(getWishlistByUserId(localStorage.getItem("jwt")));
  }, [dispatch]);

  const products = wishlist.wishlist?.products || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">

        {/* Header */}
<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-xl bg-pink-50 flex items-center justify-center">
        <FavoriteIcon
          sx={{
            color: "#ec4899",
            fontSize: 32,
          }}
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          My Wishlist
        </h1>

        <p className="text-gray-500 mt-1">
          Save your favourite products and purchase them anytime.
        </p>
      </div>
    </div>

    <div className="bg-pink-50 border border-pink-100 rounded-xl px-6 py-3 text-center">
      <p className="text-sm text-gray-500">
        Total Items
      </p>

      <h2 className="text-2xl font-bold text-pink-600">
        {products.length}
      </h2>
    </div>
  </div>
</div>

        {/* Loading */}
        {wishlist.loading && (
          <div className="flex flex-col items-center justify-center py-28">
            <CircularProgress color="error" />

            <p className="mt-5 text-gray-500">
              Loading your wishlist...
            </p>
          </div>
        )}

        {/* Empty Wishlist */}
        {!wishlist.loading && products.length === 0 && (
          <div className="bg-white rounded-3xl shadow-sm mt-10 p-8 sm:p-14 text-center">

            <FavoriteBorderIcon
              sx={{
                fontSize: 90,
                color: "#d1d5db",
              }}
            />

            <h2 className="text-2xl sm:text-3xl font-bold mt-6 text-gray-800">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              Looks like you haven't added any products yet.
              Browse our collection and save your favourite items.
            </p>

            <Button
              variant="contained"
              startIcon={<ShoppingBagOutlinedIcon />}
              sx={{
                mt: 5,
                textTransform: "none",
                bgcolor: "#ec4899",
                px: 4,
                py: 1.5,
                borderRadius: 3,
                "&:hover": {
                  bgcolor: "#db2777",
                },
              }}
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>

          </div>
        )}

        {/* Wishlist Products */}
        {!wishlist.loading && products.length > 0 && (
          <div className="mt-10">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Saved Products
              </h2>

              <span className="text-sm text-gray-500">
                {products.length} Items
              </span>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {products.map((item) => (
                <WishlistProductCard
                  key={item.id}
                  item={item}
                />
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;