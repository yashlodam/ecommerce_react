import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Hero Header */}
      <section className="bg-linear-to-b from-teal-900/10 via-teal-500/5 to-transparent dark:from-teal-950/40 border-b border-slate-200/80 dark:border-slate-800 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800 shadow-2xs">
            <LocalOfferIcon sx={{ fontSize: 14 }} />
            ShopSphere Deals & Promotions
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Exclusive Marketplace Offers
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Discover verified limited-time price drops, category clearances, seller storefront discounts, and cart-level savings.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Controls Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3 sm:p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={(e, val) => setActiveTab(val)}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 700,
                textTransform: "none",
                fontSize: "13px",
                minHeight: 44,
              },
            }}
          >
            <Tab value="ALL" label={`All Deals (${deals.length})`} />
            <Tab
              value="PRODUCT"
              icon={<ShoppingBagIcon sx={{ fontSize: 16 }} />}
              iconPosition="start"
              label="Product Deals"
            />
            <Tab
              value="CATEGORY"
              icon={<CategoryIcon sx={{ fontSize: 16 }} />}
              iconPosition="start"
              label="Category Offers"
            />
            <Tab
              value="SELLER"
              icon={<StorefrontIcon sx={{ fontSize: 16 }} />}
              iconPosition="start"
              label="Seller Promotions"
            />
            <Tab
              value="ORDER"
              icon={<ShoppingCartCheckoutIcon sx={{ fontSize: 16 }} />}
              iconPosition="start"
              label="Order Discounts"
            />
          </Tabs>

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
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "999px",
                  fontSize: "13px",
                },
              }}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <CircularProgress size={36} color="primary" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Loading active marketplace promotions...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-red-200 dark:border-red-900/50 p-8">
            <p className="text-base font-bold text-red-600 dark:text-red-400">{error}</p>
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

        {/* Deals Grid */}
        {!loading && !error && filteredDeals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
                  className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  {/* Image Stage */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 border-b border-slate-100 dark:border-slate-800/80">
                    <img
                      src={imageUrl}
                      alt={deal.title}
                      loading="lazy"
                      className="h-32 sm:h-36 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";
                      }}
                    />

                    {/* Deal Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <DealBadge
                        discountValue={deal.discountValue || deal.discount}
                        discountType={deal.discountType}
                        size="sm"
                      />
                    </div>

                    {/* Deal Scope Tag */}
                    <span className="absolute top-3 right-3 z-10 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900/80 text-white dark:bg-slate-800 dark:text-slate-200 shadow-2xs backdrop-blur-xs">
                      {deal.dealType || "PROMO"}
                    </span>

                    {/* Expiry Countdown */}
                    {deal.endAt && (
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-center z-10">
                        <DealCountdown dealEndsAt={deal.endAt} compact onExpire={loadDeals} />
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      {/* Meta */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        <span className="uppercase tracking-wider truncate">
                          {deal.categoryName || deal.categorySlug || (firstProduct ? "Featured Product" : "Marketplace")}
                        </span>

                        {deal.sellerName && (
                          <span className="text-teal-600 dark:text-teal-400 font-bold truncate max-w-[120px]">
                            {deal.sellerName}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-sm sm:text-base leading-snug line-clamp-2 text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {deal.title}
                      </h3>

                      {/* Description */}
                      {deal.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {deal.description}
                        </p>
                      )}
                    </div>

                    {/* Footer Conditions & Action */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <div>
                        {deal.minOrderAmount ? (
                          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            Min order: <strong className="text-slate-900 dark:text-slate-100">{formatINR(deal.minOrderAmount)}</strong>
                          </p>
                        ) : firstProduct ? (
                          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            Base: <span className="line-through">{formatINR(firstProduct.mrpPrice || firstProduct.sellingPrice)}</span>
                          </p>
                        ) : (
                          <p className="text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                            Instant Discount
                          </p>
                        )}
                      </div>

                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 13 }} />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClick();
                        }}
                        sx={{
                          borderRadius: "999px",
                          textTransform: "none",
                          fontSize: "11px",
                          fontWeight: 700,
                          py: 0.5,
                          px: 1.5,
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
