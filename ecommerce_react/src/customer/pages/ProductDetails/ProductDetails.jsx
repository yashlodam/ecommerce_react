import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import Divider from "@mui/material/Divider";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ShieldIcon from "@mui/icons-material/Shield";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchProductById } from "../../../State/customer/ProductSlice";
import { addItemToCart } from "../../../State/customer/CartSlice";
import { addProductToWishlist } from "../../../State/customer/WishlistSlice";
import useRequireAuth from "../../../useRequireAuth";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../Review/ReviewCard";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [activeImage, setActiveImage] = useState(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { product } = useAppSelector((store) => store);
  const { wishlist } = useAppSelector((store) => store);
  const requireAuth = useRequireAuth();

  const currentProduct = product?.product;
  const isLoading = product?.loading;

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(Number(productId)));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (currentProduct?.sizes) {
      const firstSize = currentProduct.sizes.split(",")[0]?.trim();
      setSelectedSize(firstSize || "");
    }
  }, [currentProduct]);

  const images = currentProduct?.images || [];
  const isInStock = (currentProduct?.quantity ?? 0) > 0;
  const isWishlisted = wishlist?.wishlist?.products?.some(
    (p) => p.id === Number(productId)
  );

  const handleAddToCart = () => {
    if (!requireAuth()) return;
    if (!isInStock) {
      setAlertMsg("Sorry, this product is currently out of stock.");
      setAlertSeverity("error");
      setOpenAlert(true);
      return;
    }

    const data = {
      productId: Number(productId),
      quantity,
      size: selectedSize || currentProduct?.sizes || "Standard",
    };

    dispatch(
      addItemToCart({
        jwt: localStorage.getItem("jwt"),
        request: data,
      })
    )
      .unwrap()
      .then(() => {
        setAlertMsg("Item added to cart successfully!");
        setAlertSeverity("success");
        setOpenAlert(true);
      })
      .catch((err) => {
        setAlertMsg(err || "Failed to add item to cart.");
        setAlertSeverity("error");
        setOpenAlert(true);
      });
  };

  const handleWishlist = () => {
    if (!requireAuth()) return;
    if (productId) {
      dispatch(
        addProductToWishlist({
          productId: Number(productId),
          jwt: localStorage.getItem("jwt"),
        })
      )
        .unwrap()
        .then(() => {
          setAlertMsg("Wishlist updated!");
          setAlertSeverity("success");
          setOpenAlert(true);
        })
        .catch(() => {
          setAlertMsg("Could not update wishlist.");
          setAlertSeverity("error");
          setOpenAlert(true);
        });
    }
  };

  if (isLoading || !currentProduct) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <CircularProgress color="primary" />
      </div>
    );
  }

  const availableSizes = currentProduct.sizes
    ? currentProduct.sizes.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Gallery */}
        <section className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[520px] shrink-0">
            {images.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  activeImage === index
                    ? "border-teal-600 ring-2 ring-teal-100"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <img
                  src={item}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="flex-1 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center min-h-[380px] sm:min-h-[500px]">
            <img
              src={images[activeImage] || "https://placehold.co/600x600?text=Product"}
              alt={currentProduct.title}
              className="w-full max-h-[520px] object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </section>

        {/* Product Meta & Actions */}
        <section className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                {currentProduct.seller?.businesssDetails?.businessName ||
                  currentProduct.brand ||
                  "Verified Store"}
              </span>

              <Chip
                label={isInStock ? "In Stock" : "Out of Stock"}
                size="small"
                color={isInStock ? "success" : "error"}
                className="font-semibold"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 leading-snug">
              {currentProduct.title}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1 bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded text-sm">
                <span>{currentProduct.numRatings > 0 ? "4.5" : "New"}</span>
                <StarIcon sx={{ fontSize: 16, color: "#009688" }} />
              </div>
              <span className="text-sm text-slate-400">
                ({currentProduct.numRatings || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-5">
              <span className="text-3xl font-extrabold text-slate-900">
                {formatINR(currentProduct.sellingPrice)}
              </span>
              {currentProduct.mrpPrice > currentProduct.sellingPrice && (
                <>
                  <span className="text-lg text-slate-400 line-through">
                    {formatINR(currentProduct.mrpPrice)}
                  </span>
                  <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {currentProduct.discountPercent}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Inclusive of all taxes. Free express shipping on all prepaid orders.
            </p>

            <Divider className="my-6" />

            {/* Sizes */}
            {availableSizes.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:border-teal-400"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Quantity
              </p>
              <div className="inline-flex items-center border border-slate-200 rounded-xl bg-white p-1">
                <Button
                  size="small"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  sx={{ minWidth: 36, height: 36 }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <span className="px-4 font-bold text-slate-800 text-sm">
                  {quantity}
                </span>
                <Button
                  size="small"
                  disabled={quantity >= (currentProduct.quantity || 10)}
                  onClick={() => setQuantity((q) => q + 1)}
                  sx={{ minWidth: 36, height: 36 }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <Button
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                disabled={!isInStock}
                onClick={handleAddToCart}
                startIcon={<AddShoppingCartIcon />}
                className="py-3.5 font-bold rounded-xl shadow-md"
              >
                {isInStock ? "Add to Cart" : "Out of Stock"}
              </Button>

              <Button
                fullWidth
                size="large"
                variant="outlined"
                color="primary"
                onClick={handleWishlist}
                startIcon={
                  isWishlisted ? (
                    <FavoriteIcon className="text-red-500" />
                  ) : (
                    <FavoriteBorderIcon />
                  )
                }
                className="py-3.5 font-bold rounded-xl border-slate-300"
              >
                {isWishlisted ? "Wishlisted" : "Wishlist"}
              </Button>
            </div>

            {/* Assurances */}
            <div className="grid grid-cols-2 gap-3 mt-8 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldIcon className="text-teal-600" fontSize="small" />
                <span>100% Genuine Products</span>
              </div>
              <div className="flex items-center gap-2">
                <WorkspacePremiumIcon className="text-teal-600" fontSize="small" />
                <span>Quality Assured</span>
              </div>
              <div className="flex items-center gap-2">
                <LocalShippingIcon className="text-teal-600" fontSize="small" />
                <span>Fast & Safe Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <AccountBalanceWalletIcon className="text-teal-600" fontSize="small" />
                <span>Secure Payments</span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2">
                Product Details
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {currentProduct.description || "No description provided for this item."}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Customer Reviews */}
      <div className="mt-16 pt-12 border-t border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Customer Ratings & Reviews
        </h2>
        <ReviewCard productId={currentProduct.id} />
      </div>

      {/* Similar Products */}
      <div className="mt-16 pt-12 border-t border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          You May Also Like
        </h2>
        <SimilarProduct />
      </div>
    </div>
  );
}

export default ProductDetails;
