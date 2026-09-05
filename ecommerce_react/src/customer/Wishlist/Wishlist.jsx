import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WishlistProductCard from "./WishlistProductCard";
import { useAppDispatch, useAppSelector } from "../../State/Store";
import { getWishlistByUserId } from "../../State/customer/WishlistSlice";
import EmptyState from "../../common/EmptyState";
import { SkeletonGrid } from "../../common/SkeletonCard";

function Wishlist() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const wishlist = useAppSelector((store) => store.wishlist);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(getWishlistByUserId());
  }, [dispatch]);

  const products = wishlist.wishlist?.products || [];

  return (
    <div className="min-h-[85vh] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 p-6 mb-8 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-900/50 flex items-center justify-center">
                <FavoriteIcon sx={{ color: "#e11d48", fontSize: 26 }} />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                  My Wishlist
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Save your favourite items and access them anytime.
                </p>
              </div>
            </div>

            <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 rounded-xl px-5 py-2.5 text-center self-start sm:self-auto">
              <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
                Saved Items
              </p>
              <h2 className="text-xl font-extrabold text-rose-700 dark:text-rose-300">
                {products.length}
              </h2>
            </div>
          </div>
        </div>

        <Snackbar
          open={openSuccess}
          autoHideDuration={3000}
          onClose={() => setOpenSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
            onClose={() => setOpenSuccess(false)}
          >
            {successMessage}
          </Alert>
        </Snackbar>

        {/* Loading Skeletons */}
        {wishlist.loading && <SkeletonGrid count={4} />}

        {/* Empty State */}
        {!wishlist.loading && products.length === 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-8 transition-colors">
            <EmptyState
              icon={FavoriteBorderIcon}
              title="Your Wishlist is Empty"
              description="Explore trending collections and tap the heart icon on any product to save it here for later!"
              actionText="Explore Marketplace"
              onAction={() => navigate("/")}
            />
          </div>
        )}

        {/* Wishlist Products Grid */}
        {!wishlist.loading && products.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">
                Saved Items ({products.length})
              </h2>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {products.map((item) => (
                <WishlistProductCard
                  key={item.id}
                  item={item}
                  setOpenSuccess={setOpenSuccess}
                  setSuccessMessage={setSuccessMessage}
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