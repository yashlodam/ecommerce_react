import React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import FilterSidebar from "./FilterSidebar";

export default function MobileFilterDrawer({
  open = false,
  onClose,
  filters = {},
  onFilterChange,
  onClearAll,
  totalCount = 0,
  isSearchPage = false,
  category = "",
  searchQuery = "",
}) {
  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "88vw", sm: 340 },
          maxWidth: 360,
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,
          bgcolor: "background.paper",
          backgroundImage: "none",
        },
      }}
    >
      <div className="flex h-full flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold">Filter Catalog</h3>
            {activeCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] font-extrabold flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </div>

          <IconButton
            size="small"
            onClick={onClose}
            aria-label="Close filters"
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <FilterSidebar
            filters={filters}
            onFilterChange={onFilterChange}
            onClearAll={onClearAll}
            showTitle={false}
            showCategoryFilter={isSearchPage}
            category={category}
            searchQuery={searchQuery}
          />
        </div>

        {/* Sticky Drawer Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 flex items-center gap-3">
          <Button
            variant="outlined"
            color="inherit"
            fullWidth
            onClick={onClearAll}
            disabled={activeCount === 0}
            sx={{
              borderRadius: "12px",
              py: 1,
              fontWeight: 700,
              textTransform: "none",
              fontSize: "13px",
            }}
          >
            Reset All
          </Button>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onClose}
            sx={{
              borderRadius: "12px",
              py: 1,
              fontWeight: 700,
              textTransform: "none",
              fontSize: "13px",
            }}
          >
            Show Results
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
