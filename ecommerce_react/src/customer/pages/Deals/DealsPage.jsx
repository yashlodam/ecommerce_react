import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CategoryIcon from "@mui/icons-material/Category";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { getActiveDeals } from "../../../services/dealService";
import DealBadge from "../../../common/deals/DealBadge";
import DealCountdown from "../../../common/deals/DealCountdown";
import EmptyState from "../../../common/EmptyState";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

export default function DealsPage() {
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const loadDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getActiveDeals();
      setDeals(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load active promotional deals right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeals();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredDeals = deals.filter((deal) => {
    const matchesTab =
      activeTab === "ALL" ||
      (activeTab === "PRODUCT" && deal.dealType === "PRODUCT") ||
      (activeTab === "CATEGORY" && (deal.dealType === "CATEGORY" || !deal.dealType)) ||
      (activeTab === "SELLER" && deal.dealType === "SELLER") ||
      (activeTab === "ORDER" && deal.dealType === "ORDER");

    const matchesSearch =
      !searchQuery.trim() ||
      (deal.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (deal.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (deal.categoryName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (deal.categorySlug || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (deal.sellerName || "").toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const tabCounts = {
    ALL: deals.length,
    PRODUCT: deals.filter((d) => d.dealType === "PRODUCT").length,
    CATEGORY: deals.filter((d) => d.dealType === "CATEGORY" || !d.dealType).length,
    SELLER: deals.filter((d) => d.dealType === "SELLER").length,
    ORDER: deals.filter((d) => d.dealType === "ORDER").length,
  };

  const TABS = [
    { id: "ALL", label: "All Deals", count: tabCounts.ALL, icon: <LocalOfferIcon sx={{ fontSize: { xs: 13, sm: 15 } }} /> },
    { id: "PRODUCT", label: "Product Deals", count: tabCounts.PRODUCT, icon: <ShoppingBagIcon sx={{ fontSize: { xs: 13, sm: 15 } }} /> },
    { id: "CATEGORY", label: "Category Offers", count: tabCounts.CATEGORY, icon: <CategoryIcon sx={{ fontSize: { xs: 13, sm: 15 } }} /> },
    { id: "SELLER", label: "Seller Promos", count: tabCounts.SELLER, icon: <StorefrontIcon sx={{ fontSize: { xs: 13, sm: 15 } }} /> },
    { id: "ORDER", label: "Order Discounts", count: tabCounts.ORDER, icon: <ShoppingCartCheckoutIcon sx={{ fontSize: { xs: 13, sm: 15 } }} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Hero Header */}
      <section className="bg-linear-to-b from-teal-900/10 via-teal-500/5 to-transparent dark:from-teal-950/40 border-b border-slate-200/80 dark:border-slate-800 py-5 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-2 sm:space-y-3">
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800 shadow-2xs">
            <LocalOfferIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />
            ShopSphere Deals & Promotions
          </span>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Exclusive Marketplace Offers
          </h1>

          <p className="max-w-2xl mx-auto text-[11px] sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 sm:line-clamp-none">
            Discover verified limited-time price drops, category clearances, seller storefront discounts, and cart-level savings.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-6">
        {/* Controls Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-200/80 dark:border-slate-800 p-2.5 sm:p-4 flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center justify-between shadow-xs">
          {/* Native Touch-friendly Horizontal Pill Tab Rail (No clipping!) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar w-full md:w-auto py-0.5">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-150 shrink-0 cursor-pointer select-none ${
                    isActive
                      ? "bg-teal-600 text-white shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-slate-500 dark:text-slate-400"}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] sm:text-xs px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? "bg-teal-700/80 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72">
            <TextField
              size="small"
              fullWidth
              placeholder="Search deals, categories, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18 }} className="text-slate-400" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold p-1 cursor-pointer"
                      title="Clear search"
                    >
                      ✕
                    </button>
                  </InputAdornment>
                ) : null,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "999px",
                  fontSize: { xs: "12px", sm: "13px" },
                  height: { xs: "36px", sm: "40px" },
                },
              }}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-16 sm:py-20 flex flex-col items-center justify-center gap-3">
            <CircularProgress size={32} color="primary" />
            <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              Loading active marketplace promotions...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="py-12 sm:py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-2xl border border-red-200 dark:border-red-900/50 p-6 sm:p-8">
            <p className="text-sm sm:text-base font-bold text-red-600 dark:text-red-400">{error}</p>
            <Button
              variant="contained"
              color="primary"
              onClick={loadDeals}
              sx={{ borderRadius: "999px", textTransform: "none", fontWeight: 700 }}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredDeals.length === 0 && (
          <EmptyState
            title="No active deals available right now"
            description={
              searchQuery
                ? `No promotional offers matched "${searchQuery}". Try a different keyword.`
                : "Check back shortly! New promotional deals and flash sales are launched regularly."
            }
            actionText={searchQuery ? "Clear Search" : "Explore Products"}
            onAction={() => {
              if (searchQuery) setSearchQuery("");
              else navigate("/products/all");
            }}
          />
        )}

        {/* Deals Grid - 2 Column on Mobile, 3-4 Column on Desktop */}
        {!loading && !error && filteredDeals.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
            {filteredDeals.map((deal) => {
              const hasProducts = deal.products && deal.products.length > 0;
              const firstProduct = hasProducts ? deal.products[0] : null;
              const hasCategory = deal.category || deal.categorySlug;
              const imageUrl =
                firstProduct?.image ||
                deal.category?.image ||
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";

              const handleClick = () => {
                if (firstProduct) {
                  navigate(`/product-details/all/${firstProduct.id}`);
                } else if (hasCategory) {
                  navigate(`/products/${deal.category?.categoryId || deal.categorySlug}`);
                } else {
                  navigate("/products/all");
                }
              };

              return (
                <div
                  key={deal.id}
                  onClick={handleClick}
                  className="group cursor-pointer bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-lg hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  {/* Image Stage */}
                  <div className="relative h-36 sm:h-52 overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-2.5 sm:p-4 border-b border-slate-100 dark:border-slate-800/80">
                    <img
                      src={imageUrl}
                      alt={deal.title}
                      loading="lazy"
                      className="h-24 sm:h-36 w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";
                      }}
                    />

                    {/* Deal Badge */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                      <DealBadge
                        discountValue={deal.discountValue || deal.discount}
                        discountType={deal.discountType}
                        size="xs"
                        className="sm:text-[11px] sm:px-2 sm:py-0.5"
                      />
                    </div>

                    {/* Deal Scope Tag */}
                    <span className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-slate-900/80 text-white dark:bg-slate-800 dark:text-slate-200 shadow-2xs backdrop-blur-xs">
                      {deal.dealType || "PROMO"}
                    </span>

                    {/* Expiry Countdown */}
                    {deal.endAt && (
                      <div className="absolute bottom-1.5 sm:bottom-2.5 left-1.5 right-1.5 sm:left-2.5 sm:right-2.5 flex justify-center z-10">
                        <DealCountdown
                          dealEndsAt={deal.endAt}
                          compact
                          className="text-[9px] sm:text-[11px] px-1.5 py-0.5 sm:px-2 max-w-full truncate"
                          onExpire={loadDeals}
                        />
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between gap-1.5 sm:gap-2">
                    <div className="space-y-0.5 sm:space-y-1">
                      {/* Meta */}
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        <span className="uppercase tracking-wider truncate max-w-[55%] sm:max-w-none">
                          {deal.categoryName || deal.categorySlug || (firstProduct ? "Featured Product" : "Marketplace")}
                        </span>

                        {deal.sellerName && (
                          <span className="text-teal-600 dark:text-teal-400 font-bold truncate max-w-[45%] sm:max-w-[120px]">
                            {deal.sellerName}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-xs sm:text-base leading-snug line-clamp-1 sm:line-clamp-2 text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {deal.title}
                      </h3>

                      {/* Description - hidden on mobile 2-col to maintain uniform card height */}
                      {deal.description && (
                        <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {deal.description}
                        </p>
                      )}
                    </div>

                    {/* Footer Conditions & Action */}
                    <div className="pt-1.5 sm:pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-1">
                      <div className="min-w-0 flex-1">
                        {deal.minOrderAmount ? (
                          <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                            Min: <strong className="text-slate-900 dark:text-slate-100">{formatINR(deal.minOrderAmount)}</strong>
                          </p>
                        ) : firstProduct ? (
                          <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                            Base: <span className="line-through">{formatINR(firstProduct.mrpPrice || firstProduct.sellingPrice)}</span>
                          </p>
                        ) : (
                          <p className="text-[10px] sm:text-[11px] font-semibold text-teal-600 dark:text-teal-400 truncate">
                            Instant Discount
                          </p>
                        )}
                      </div>

                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: { xs: 10, sm: 13 } }} />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClick();
                        }}
                        sx={{
                          borderRadius: "999px",
                          textTransform: "none",
                          fontSize: { xs: "10px", sm: "11px" },
                          fontWeight: 700,
                          py: { xs: 0.2, sm: 0.5 },
                          px: { xs: 1, sm: 1.5 },
                          minWidth: { xs: "auto", sm: "60px" },
                        }}
                      >
                        Shop
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
