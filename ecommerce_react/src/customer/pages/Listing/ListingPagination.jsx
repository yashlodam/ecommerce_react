import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

export default function ListingPagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const handleChange = (event, page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 pb-4 border-t border-slate-200/80 dark:border-slate-800 mt-8">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
        Page <span className="font-bold text-slate-900 dark:text-slate-100">{currentPage}</span> of{" "}
        <span className="font-bold text-slate-900 dark:text-slate-100">{totalPages}</span>
      </p>

      <Pagination
        page={currentPage}
        count={totalPages}
        color="primary"
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "13px",
              "&.Mui-selected": {
                bgcolor: "#00927c !important",
                color: "#ffffff !important",
                borderColor: "#00927c",
              },
            }}
          />
        )}
      />
    </div>
  );
}
