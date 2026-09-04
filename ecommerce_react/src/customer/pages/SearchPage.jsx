import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import { useAppDispatch, useAppSelector } from "../../State/Store";
import { fetchAllProducts, clearProductError } from "../../State/customer/ProductSlice";
import ProductListingLayout from "./Listing/ProductListingLayout";

const TRENDING_SEARCHES = [
  "Nike",
  "Shoes",
  "Smartwatch",
  "T-Shirts",
  "Jeans",
  "Headphones",
  "Kurtas",
  "Beauty",
];

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((store) => store.product);

  // Parse search query, filters, sort, page from URL
  const queryParam = searchParams.get("q") || "";
  const priceParam = searchParams.get("price") || "";
  const colorParam = searchParams.get("color") || "";
  const brandParam = searchParams.get("brand") || "";
  const discountParam = searchParams.get("discount") || "";
  const stockParam = searchParams.get("stock") || "";
  const sortParam = searchParams.get("sort") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const [inputQuery, setInputQuery] = useState(queryParam);

  // Sync internal input when URL query changes
  useEffect(() => {
    setInputQuery(queryParam);
  }, [queryParam]);

  const activeFilters = useMemo(
    () => ({
      price: priceParam,
      color: colorParam,
      brand: brandParam,
      discount: discountParam,
      stock: stockParam,
    }),
    [priceParam, colorParam, brandParam, discountParam, stockParam]
  );

  // Load products based on query & filters
  const loadSearchProducts = useCallback(() => {
    dispatch(clearProductError());

    let minPrice = undefined;
    let maxPrice = undefined;

    if (priceParam) {
      if (priceParam === "10000+") {
        minPrice = 10000;
      } else {
        const [min, max] = priceParam.split("-");
        minPrice = min ? Number(min) : undefined;
        maxPrice = max ? Number(max) : undefined;
      }
    }

    const filterRequest = {
      query: queryParam ? queryParam.trim() : undefined,
      colors: colorParam || undefined,
      brand: brandParam || undefined,
      minPrice,
      maxPrice,
      minDiscount: discountParam ? Number(discountParam) : undefined,
      stock: stockParam || undefined,
      sort: sortParam || undefined,
      pageNumber: Math.max(0, pageParam - 1),
    };

    dispatch(fetchAllProducts(filterRequest));
  }, [dispatch, queryParam, priceParam, colorParam, brandParam, discountParam, stockParam, sortParam, pageParam]);

  useEffect(() => {
    loadSearchProducts();
  }, [loadSearchProducts]);

  // Handler: Submit new search query
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const trimmed = inputQuery.trim();
    const nextParams = new URLSearchParams(searchParams);
    if (trimmed) {
      nextParams.set("q", trimmed);
    } else {
      nextParams.delete("q");
    }
    nextParams.set("page", "1");
    setSearchParams(nextParams);
  };

  // Handler: Update filter
  const handleFilterChange = (name, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set(name, value);
    } else {
      nextParams.delete(name);
    }
    nextParams.set("page", "1");
    setSearchParams(nextParams);
  };

  // Handler: Remove single filter
  const handleRemoveFilter = (key) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete(key);
    nextParams.set("page", "1");
    setSearchParams(nextParams);
  };

  // Handler: Clear all filters
  const handleClearAllFilters = () => {
    const nextParams = new URLSearchParams();
    if (queryParam) nextParams.set("q", queryParam);
    if (sortParam) nextParams.set("sort", sortParam);
    setSearchParams(nextParams);
  };

  // Handler: Sort
  const handleSortChange = (newSort) => {
    const nextParams = new URLSearchParams(searchParams);
    if (newSort) {
      nextParams.set("sort", newSort);
    } else {
      nextParams.delete("sort");
    }
    nextParams.set("page", "1");
    setSearchParams(nextParams);
  };

  // Handler: Page change
  const handlePageChange = (newPage) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", newPage.toString());
    setSearchParams(nextParams);
  };

  const breadcrumbs = [
    { label: "Catalog", path: "/products/all" },
    { label: "Search", path: "/search" },
    ...(queryParam ? [{ label: `"${queryParam}"`, path: `/search?q=${queryParam}` }] : []),
  ];

  const searchHeaderSlot = (
    <div className="space-y-2 pt-1">
      {/* Search Input Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center gap-2 max-w-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1 shadow-2xs focus-within:border-teal-500 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all"
      >
        <SearchIcon sx={{ color: "text.secondary", fontSize: 18 }} />
        <InputBase
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Search products, brands, or categories..."
          className="flex-1 text-xs sm:text-sm text-slate-900 dark:text-slate-100"
          sx={{ fontSize: "13px" }}
        />
        {inputQuery && (
          <button
            type="button"
            onClick={() => {
              setInputQuery("");
              const nextParams = new URLSearchParams(searchParams);
              nextParams.delete("q");
              setSearchParams(nextParams);
            }}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-0.5"
            aria-label="Clear search input"
          >
            <ClearIcon sx={{ fontSize: 15 }} />
          </button>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          sx={{
            borderRadius: "9px",
            textTransform: "none",
            fontWeight: 700,
            px: 2,
            py: 0.4,
            fontSize: "12px",
          }}
        >
          Search
        </Button>
      </form>

      {/* Quick Category Chips & Trending Queries */}
      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-0.5">
          <TrendingUpIcon sx={{ fontSize: 13 }} />
          Trending:
        </span>
        {TRENDING_SEARCHES.map((term) => (
          <Chip
            key={term}
            label={term}
            clickable
            size="small"
            variant="outlined"
            onClick={() => {
              setInputQuery(term);
              const nextParams = new URLSearchParams(searchParams);
              nextParams.set("q", term);
              nextParams.set("page", "1");
              setSearchParams(nextParams);
            }}
            sx={{
              fontSize: "11px",
              fontWeight: 500,
              height: "22px",
              bgcolor: "background.paper",
              "&:hover": {
                bgcolor: "primary.lighter",
                borderColor: "primary.main",
                color: "primary.main",
              },
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <ProductListingLayout
      title={
        queryParam ? (
          <span>
            Results for <span className="text-teal-600 dark:text-teal-400">"{queryParam}"</span>
          </span>
        ) : (
          "Marketplace Product Search"
        )
      }
      subtitle={
        queryParam
          ? "Verified inventory matching your search keyword and filter criteria."
          : "Discover thousands of authentic items from verified sellers across India."
      }
      badge="Search Results"
      breadcrumbs={breadcrumbs}
      searchQuery={queryParam}
      products={product.products || []}
      totalElements={product.totalElements || product.products?.length || 0}
      totalPages={product.totalPages || 1}
      currentPage={pageParam}
      loading={product.loading}
      error={product.error}
      filters={activeFilters}
      sort={sortParam}
      onFilterChange={handleFilterChange}
      onRemoveFilter={handleRemoveFilter}
      onClearAllFilters={handleClearAllFilters}
      onSortChange={handleSortChange}
      onPageChange={handlePageChange}
      onRetry={loadSearchProducts}
      isSearchPage
      headerSlot={searchHeaderSlot}
    />
  );
}

export default SearchPage;
