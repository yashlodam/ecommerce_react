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
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StorefrontIcon from "@mui/icons-material/Storefront";

import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchProductById } from "../../../State/customer/ProductSlice";
import { addItemToCart } from "../../../State/customer/CartSlice";
import { addProductToWishlist } from "../../../State/customer/WishlistSlice";
import useRequireAuth from "../../../useRequireAuth";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../Review/ReviewCard";
import { api } from "../../../config/Api";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [activeImage, setActiveImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  // Variant state
  const [variants, setVariants] = useState([]);
  const [variantsLoading, setVariantsLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = useAppSelector((store) => store.product);
  const wishlist = useAppSelector((store) => store.wishlist);
  const requireAuth = useRequireAuth();

  const currentProduct = product?.product;
  const isDetailsLoading = product?.productDetailsLoading;
  const isMatchingProduct = currentProduct && String(currentProduct.id) === String(productId);
  const error = product?.error;
  const isLoading = isDetailsLoading || (!isMatchingProduct && !error);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(Number(productId)));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [productId, dispatch]);

  // Fetch variants when product loads
  useEffect(() => {
    if (!productId) return;
    setVariantsLoading(true);
    api
      .get(`/products/${productId}/variants`)
      .then((res) => {
        const variantList = res.data || [];
        setVariants(variantList);
        // Auto-select first in-stock variant, or default/first variant
        const defaultCandidate = variantList.find((v) => v.isDefault);
        const inStockCandidate = variantList.find((v) => (v.quantity ?? 0) > 0);
        const defaultV =
          (defaultCandidate && (defaultCandidate.quantity ?? 0) > 0)
            ? defaultCandidate
            : inStockCandidate || defaultCandidate || variantList[0] || null;
        setSelectedVariant(defaultV);
      })
      .catch(() => {
        setVariants([]);
      })
      .finally(() => setVariantsLoading(false));
  }, [productId]);

  const images = currentProduct?.images || [];
  const isWishlisted = wishlist?.wishlist?.products?.some(
    (p) => p.id === Number(productId)
  );

  // Use selected variant's stock to determine in-stock status
  const currentStock = selectedVariant != null
    ? (selectedVariant.quantity ?? 0)
    : (currentProduct?.quantity ?? 0);

  const isInStock =
    (currentProduct?.inStock !== false) &&
    currentStock > 0;

  // Displayed prices come from selected variant when available
  const displayMrpPrice = selectedVariant?.mrpPrice ?? currentProduct?.mrpPrice ?? 0;
  const displaySellingPrice = selectedVariant?.sellingPrice ?? currentProduct?.sellingPrice ?? 0;
  const displayDiscount = selectedVariant?.discountPercent ?? currentProduct?.discountPercent ?? 0;
  const displayStock = Math.max(0, currentStock);

  const handleAddToCart = () => {
    if (!requireAuth()) return;
    if (!isInStock || displayStock <= 0) {
      setAlertMsg("Sorry, this item is currently out of stock and cannot be added to your cart.");
      setAlertSeverity("warning");
      setOpenAlert(true);
      return;
    }

    setAddingToCart(true);

    const data = {
      productId: Number(productId),
      quantity,
      // Send variantId if a real (non-default) variant is selected
      variantId: selectedVariant?.id ?? null,
      size: selectedVariant?.variantName ?? currentProduct?.sizes ?? "Standard",
    };

    dispatch(addItemToCart(data))
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
      })
      .finally(() => {
        setAddingToCart(false);
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

  // Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] space-y-3">
        <CircularProgress color="primary" />
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
          Loading product specifications...
        </p>
      </div>
    );
  }

  // Error / Not Found State
  if (error || !currentProduct) {
    return (
      <div className="max-w-md mx-auto my-16 text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 mx-auto">
          <WarningAmberRoundedIcon sx={{ fontSize: 28 }} />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Product Not Found
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {error || "The requested item is unavailable or may have been removed from the catalog."}
          </p>
        </div>
        <div className="flex justify-center gap-3 pt-2">
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700 }}
          >
            Go Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(fetchProductById(Number(productId)))}
            sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700 }}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const categoryName = currentProduct.category?.name || "Catalog";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          separator={<NavigateNextIcon sx={{ fontSize: "13px" }} />}
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            color="inherit"
            className="cursor-pointer text-xs font-semibold text-slate-500 hover:text-teal-600 dark:text-slate-400"
            onClick={() => navigate("/")}
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            className="cursor-pointer text-xs font-semibold text-slate-500 hover:text-teal-600 dark:text-slate-400"
            onClick={() => navigate(`/products/${currentProduct.category?.categoryId || "all"}`)}
          >
            {categoryName}
          </Link>
          <span className="text-xs font-bold text-teal-700 dark:text-teal-400 line-clamp-1 max-w-xs">
            {currentProduct.title}
          </span>
        </Breadcrumbs>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Gallery Section */}
          <section className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[520px] shrink-0 pb-2 sm:pb-0">
                {images.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer bg-white dark:bg-slate-900 ${
                      activeImage === index
                        ? "border-teal-600 ring-2 ring-teal-100 dark:ring-teal-950"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-400"
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
            )}

            {/* Main Image Frame */}
            <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 p-4 flex items-center justify-center min-h-[380px] sm:min-h-[500px] shadow-sm transition-colors">
              <img
                src={images[activeImage] || images[0] || "https://placehold.co/600x600?text=Product"}
                alt={currentProduct.title}
                className="w-full max-h-[480px] object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          </section>

          {/* Product Meta & Actions */}
          <section className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Store & Stock Status */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/80 px-3 py-1 rounded-full">
                  <StorefrontIcon sx={{ fontSize: 14 }} />
                  {currentProduct.seller?.businesssDetails?.businessName ||
                    currentProduct.brand ||
                    "Verified Merchant"}
                </span>

                <Chip
                  label={isInStock ? `In Stock (${displayStock} available)` : "Out of Stock"}
                  size="small"
                  color={isInStock ? "success" : "error"}
                  className="font-bold text-xs"
                />
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-3 leading-snug tracking-tight">
                {currentProduct.title}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex items-center gap-1 bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-extrabold px-2 py-0.5 rounded-md text-xs border border-teal-200/60 dark:border-teal-800/60">
                  <span>{currentProduct.numRatings > 0 ? "4.5" : "New"}</span>
                  <StarIcon sx={{ fontSize: 14, color: "#00927c" }} />
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  ({currentProduct.numRatings || 0} customer ratings & verified reviews)
                </span>
              </div>

              {/* Price Line — updates dynamically from selected variant */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100">
                  {formatINR(displaySellingPrice)}
                </span>
                {displayMrpPrice > displaySellingPrice && (
                  <>
                    <span className="text-base sm:text-lg text-slate-400 line-through font-semibold">
                      {formatINR(displayMrpPrice)}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 px-2.5 py-0.5 rounded-full">
                      {displayDiscount}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                Inclusive of all taxes. Free express shipping on all prepaid orders across India.
              </p>

              <Divider className="my-5 dark:border-slate-800" />

              {/* Variant Selector — replaces the old static size buttons */}
              {variantsLoading ? (
                <div className="flex items-center gap-2 mb-5">
                  <CircularProgress size={16} />
                  <span className="text-xs text-slate-400">Loading options...</span>
                </div>
              ) : variants.length > 0 && !(variants.length === 1 && variants[0].isDefault) ? (
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Select Option
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v) => {
                      const outOfStock = v.quantity <= 0;
                      const isSelected = selectedVariant?.id === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          disabled={outOfStock}
                          onClick={() => {
                            setSelectedVariant(v);
                            setQuantity(1);
                          }}
                          className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all relative ${
                            outOfStock
                              ? "opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 line-through"
                              : isSelected
                              ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                              : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-500 cursor-pointer"
                          }`}
                        >
                          {v.variantName}
                          {outOfStock && (
                            <span className="block text-[9px] font-normal not-italic leading-none mt-0.5">
                              Out of stock
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {selectedVariant && (
                    <p className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold mt-2">
                      Selected: <strong>{selectedVariant.variantName}</strong>
                      {selectedVariant.quantity > 0
                        ? ` — ${selectedVariant.quantity} in stock`
                        : " — Out of stock"}
                    </p>
                  )}
                </div>
              ) : null}

              {/* Quantity Stepper */}
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Quantity
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`inline-flex items-center border rounded-xl p-0.5 shadow-2xs transition-colors ${
                      !isInStock
                        ? "border-slate-200/60 dark:border-slate-800/60 bg-slate-100/70 dark:bg-slate-900/50 opacity-60"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                    }`}
                  >
                    <Button
                      size="small"
                      disabled={!isInStock || quantity <= 1}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      sx={{ minWidth: 32, height: 32 }}
                    >
                      <RemoveIcon fontSize="small" />
                    </Button>
                    <span className="px-3 font-bold text-slate-900 dark:text-slate-100 text-xs min-w-[28px] text-center">
                      {isInStock ? quantity : 0}
                    </span>
                    <Button
                      size="small"
                      disabled={!isInStock || quantity >= displayStock}
                      onClick={() => setQuantity((q) => q + 1)}
                      sx={{ minWidth: 32, height: 32 }}
                    >
                      <AddIcon fontSize="small" />
                    </Button>
                  </div>
                  {isInStock && displayStock > 0 && displayStock <= 5 && (
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                      Only {displayStock} left in stock!
                    </span>
                  )}
                </div>
              </div>

              {/* Out of Stock Alert Banner */}
              {!isInStock && (
                <div className="mb-5 flex items-center gap-2.5 p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/80 rounded-xl text-red-700 dark:text-red-400 text-xs font-medium">
                  <WarningAmberRoundedIcon fontSize="small" className="shrink-0 text-red-600 dark:text-red-400" />
                  <span>
                    This product/variant is currently <strong>out of stock</strong>. You cannot add it to your cart.
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  color={isInStock ? "primary" : "inherit"}
                  disabled={!isInStock || addingToCart}
                  onClick={handleAddToCart}
                  startIcon={
                    addingToCart ? (
                      <CircularProgress size={18} color="inherit" />
                    ) : (
                      <AddShoppingCartIcon />
                    )
                  }
                  sx={{
                    py: 1.4,
                    borderRadius: "14px",
                    fontWeight: 700,
                    fontSize: "14px",
                    textTransform: "none",
                    ...(!isInStock && {
                      bgcolor: "action.disabledBackground",
                      color: "text.disabled",
                    }),
                    ...(isInStock && {
                      boxShadow: "0 4px 14px rgba(0, 146, 124, 0.3)",
                    }),
                  }}
                >
                  {addingToCart
                    ? "Adding to Cart..."
                    : isInStock
                    ? "Add to Cart"
                    : "Out of Stock"}
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
                  sx={{
                    py: 1.4,
                    borderRadius: "14px",
                    fontWeight: 700,
                    fontSize: "14px",
                    textTransform: "none",
                  }}
                >
                  {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 mt-6 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldIcon className="text-teal-600 dark:text-teal-400" fontSize="small" />
                  <span>100% Genuine Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <WorkspacePremiumIcon className="text-teal-600 dark:text-teal-400" fontSize="small" />
                  <span>Quality Assured</span>
                </div>
                <div className="flex items-center gap-2">
                  <LocalShippingIcon className="text-teal-600 dark:text-teal-400" fontSize="small" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <AccountBalanceWalletIcon className="text-teal-600 dark:text-teal-400" fontSize="small" />
                  <span>Secure Payments</span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-2">
                  Product Description
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                  {currentProduct.description || "No product description provided."}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Customer Reviews */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Customer Ratings & Reviews
          </h2>
          <ReviewCard productId={currentProduct.id} />
        </div>

        {/* Similar Products */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            You May Also Like
          </h2>
          <SimilarProduct />
        </div>
      </div>

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
    </div>
  );
}

export default ProductDetails;
