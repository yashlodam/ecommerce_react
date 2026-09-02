import React, { useState } from "react";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useNavigate } from "react-router-dom";

import FilterSidebar from "./FilterSidebar";
import MobileFilterDrawer from "./MobileFilterDrawer";
import ActiveFilterChips from "./ActiveFilterChips";
import SortControl from "./SortControl";
import EmptyListingState from "./EmptyListingState";
import ErrorListingState from "./ErrorListingState";
import ListingPagination from "./ListingPagination";
import ProductCard from "../product/ProductCard";
import { SkeletonGrid } from "../../../common/SkeletonCard";

export default function ProductListingLayout({
  title,
  subtitle,
  badge,
  breadcrumbs = [],
  searchQuery = "",
  products = [],
  totalElements = 0,
  totalPages = 1,
  currentPage = 1,
  loading = false,
  error = null,
  filters = {},
  sort = "",
  onFilterChange,
  onRemoveFilter,
  onClearAllFilters,
  onSortChange,
  onPageChange,
  onRetry,
  isSearchPage = false,
  headerSlot = null,
}) {
  const navigate = useNavigate();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const activeCount = Object.values(filters).filter(Boolean).length + (searchQuery ? 1 : 0);
  const countDisplay = totalElements > 0 ? totalElements : products.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-16">
      {/* ── 1. Page Header & Context ── */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-8 py-4 sm:py-5">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <Breadcrumbs
              separator={<NavigateNextIcon sx={{ fontSize: "13px" }} />}
              aria-label="breadcrumb"
              className="mb-1.5"
            >
              <Link
                underline="hover"
                color="inherit"
                className="cursor-pointer text-xs font-semibold text-slate-500 hover:text-teal-600 dark:text-slate-400"
                onClick={() => navigate("/")}
              >
                Home
              </Link>
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return isLast ? (
                  <span
                    key={crumb.label}
                    className="text-xs font-bold text-teal-700 dark:text-teal-400"
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    key={crumb.label}
                    underline="hover"
                    color="inherit"
                    className="cursor-pointer text-xs font-semibold text-slate-500 hover:text-teal-600 dark:text-slate-400"
                    onClick={() => crumb.path && navigate(crumb.path)}
                  >
                    {crumb.label}
                  </Link>
                );
              })}
            </Breadcrumbs>
          )}

          {/* Heading & Metadata */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                {badge && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/80 text-teal-700 dark:text-teal-400 text-[10px] font-extrabold uppercase tracking-wider">
                    {badge}
                  </span>
                )}
                <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                  {title}
                </h1>
              </div>

              {subtitle && (
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Desktop Count & Sort Combo on top */}
            {!loading && (
              <div className="hidden lg:flex items-center gap-3 shrink-0">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-slate-100 font-extrabold">{countDisplay}</strong> products
                </span>
                <SortControl value={sort} onChange={onSortChange} />
              </div>
            )}
          </div>

          {/* Optional Search Input & Category shortcuts */}
          {headerSlot && <div className="mt-3">{headerSlot}</div>}
        </div>
      </header>

      {/* ── 2. Content Body ── */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-8 mt-5">
        {/* Mobile Toolbar */}
        <div className="flex items-center justify-between gap-2 mb-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 px-3.5 py-2.5 shadow-xs lg:hidden">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<FilterAltOutlinedIcon sx={{ fontSize: 16 }} />}
            onClick={() => setMobileFilterOpen(true)}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "12px",
              py: 0.5,
            }}
          >
            Filters {activeCount > 0 && `(${activeCount})`}
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {countDisplay} items
            </span>
            <SortControl value={sort} onChange={onSortChange} />
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        <div className="mb-3">
          <ActiveFilterChips
            filters={filters}
            searchQuery={searchQuery}
            onRemoveFilter={onRemoveFilter}
            onClearAll={onClearAllFilters}
          />
        </div>

        {/* Split Layout: Filter Sidebar + Product Grid */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-[260px] xl:w-[280px] shrink-0 sticky top-20">
            <FilterSidebar
              filters={filters}
              onFilterChange={onFilterChange}
              onClearAll={onClearAllFilters}
              showTitle
            />
          </aside>

          {/* Main Product Grid Area */}
          <main className="flex-1 min-w-0 w-full">
            {error ? (
              <ErrorListingState error={error} onRetry={onRetry} />
            ) : loading ? (
              <SkeletonGrid count={8} />
            ) : products.length === 0 ? (
              <EmptyListingState
                isSearch={isSearchPage}
                query={searchQuery}
                categoryName={title}
                onClearFilters={activeCount > 0 ? onClearAllFilters : null}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
                  {products.map((item) => (
                    <ProductCard key={item.id || item.productId} item={item} />
                  ))}
                </div>

                {/* Pagination */}
                <ListingPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </>
            )}
          </main>
        </div>
      </div>

      {/* ── 3. Mobile Filter Drawer ── */}
      <MobileFilterDrawer
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={onFilterChange}
        onClearAll={onClearAllFilters}
        totalCount={countDisplay}
      />
    </div>
  );
}
