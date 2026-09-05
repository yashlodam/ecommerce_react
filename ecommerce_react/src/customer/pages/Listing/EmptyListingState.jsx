import React from "react";
import Button from "@mui/material/Button";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

export default function EmptyListingState({
  isSearch = false,
  query = "",
  categoryName = "",
  onClearFilters,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 sm:px-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 max-w-2xl mx-auto my-6 transition-colors">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-800/80 flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-xs">
        {isSearch ? (
          <SearchOffIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />
        ) : (
          <Inventory2OutlinedIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />
        )}
      </div>

      <div className="space-y-1.5 max-w-md">
        <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          {isSearch
            ? query
              ? `No results found for "${query}"`
              : "No search results match your criteria"
            : `No products available in ${categoryName || "this category"}`}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {isSearch
            ? "Try checking your spelling, using broader search keywords, or clearing your active filters."
            : "We're onboarding new sellers daily. Try exploring other departments or resetting your price & color filters."}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {onClearFilters && (
          <Button
            variant="outlined"
            color="primary"
            onClick={onClearFilters}
            startIcon={<RefreshIcon />}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              px: 2.5,
              py: 0.8,
            }}
          >
            Reset Filters
          </Button>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/products/all")}
          endIcon={<ArrowForwardIcon />}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            px: 2.5,
            py: 0.8,
          }}
        >
          Browse All Products
        </Button>
      </div>
    </div>
  );
}
