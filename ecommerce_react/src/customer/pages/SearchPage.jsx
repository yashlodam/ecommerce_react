import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Divider,
  Chip,
  CircularProgress,
  Stack,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useLocation, useNavigate } from "react-router-dom";
import { searchProduct } from "../../State/customer/ProductSlice";
import { useAppDispatch, useAppSelector } from "../../State/Store";
import ProductCard from "./product/ProductCard";
import { SkeletonGrid } from "../../common/SkeletonCard";

const quickFilters = [
  "All",
  "Men",
  "Women",
  "Mobiles",
  "Fashion",
  "Electronics",
  "Shoes",
  "Watches",
  "Beauty",
];

const quickSuggestions = [
  "iPhone",
  "Samsung",
  "Smartphones",
  "T-Shirts",
  "Formal Shirts",
  "Shoes",
  "Jeans",
  "Watches",
  "Kurtas",
  "Dresses",
  "Beauty",
];

function SearchPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = useAppSelector((store) => store);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q") || "";
    setSearchQuery(query);

    if (query.trim()) {
      dispatch(searchProduct(query));
    }
  }, [dispatch, location.search]);

  const handleSearch = (value = searchQuery) => {
    const trimmed = value.trim();
    const params = new URLSearchParams(location.search);

    if (trimmed) {
      params.set("q", trimmed);
    } else {
      params.delete("q");
    }

    navigate(`/search?${params.toString()}`);
    dispatch(searchProduct(trimmed));
  };

  const results = product?.searchProducts ?? [];
  const isLoading = product?.loading && searchQuery.trim().length > 0;
  const hasResults = results.length > 0;

  const resultsLabel = useMemo(() => {
    if (isLoading) return "Searching for matches…";
    return `${results.length} product${results.length === 1 ? "" : "s"} found`;
  }, [isLoading, results.length]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-800 py-10 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-teal-200">
            ShopSphere Marketplace Search
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Discover Products Across All Stores"}
          </h1>
          <p className="text-xs sm:text-sm text-teal-100/90 max-w-xl mx-auto">
            Browse verified marketplace inventory with live stock and multi-vendor fulfillment.
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4 sticky top-24 transition-colors">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                <TuneIcon fontSize="small" />
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                  Refine Search
                </h3>
              </div>

              <Divider className="!border-slate-100 dark:!border-slate-800" />

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  Category Filters
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickFilters.map((filter) => {
                    const isActive = activeFilter === filter;
                    return (
                      <Chip
                        key={filter}
                        label={filter}
                        variant={isActive ? "filled" : "outlined"}
                        clickable
                        size="small"
                        onClick={() => {
                          setActiveFilter(filter);
                          if (filter === "All") {
                            setSearchQuery("");
                            handleSearch("");
                            return;
                          }
                          setSearchQuery(filter);
                          handleSearch(filter);
                        }}
                        sx={{
                          fontWeight: 600,
                          fontSize: "12px",
                          ...(isActive && {
                            bgcolor: "primary.main",
                            color: "primary.contrastText",
                          }),
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <Divider className="!border-slate-100 dark:!border-slate-800" />

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  Trending Keywords
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickSuggestions.map((suggestion) => (
                    <Chip
                      key={suggestion}
                      label={suggestion}
                      variant="outlined"
                      clickable
                      size="small"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        handleSearch(suggestion);
                      }}
                      sx={{
                        fontWeight: 500,
                        fontSize: "12px",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Grid>

          {/* Results Grid */}
          <Grid item xs={12} md={9}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-sm transition-colors space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                    {searchQuery ? `Products matching "${searchQuery}"` : "Catalog Products"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {resultsLabel}
                  </p>
                </div>
              </div>

              {isLoading ? (
                <SkeletonGrid count={6} />
              ) : !hasResults ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 dark:text-slate-500">
                    <SearchOffIcon sx={{ fontSize: 28 }} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    No matching products found
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Try checking your spelling or selecting one of the suggested keywords from the filter sidebar.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {results.map((item) => (
                    <ProductCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default SearchPage;
