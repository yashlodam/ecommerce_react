import React from "react";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function ErrorListingState({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white dark:bg-slate-900 rounded-3xl border border-rose-200 dark:border-rose-900/50 shadow-sm space-y-4 max-w-lg mx-auto my-6 transition-colors">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/80 flex items-center justify-center text-rose-600 dark:text-rose-400">
        <ErrorOutlineIcon sx={{ fontSize: 36 }} />
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Unable to load products
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {error?.message || (typeof error === "string" ? error : "A network issue occurred while connecting to the marketplace catalog.")}
        </p>
      </div>

      {onRetry && (
        <Button
          variant="contained"
          color="primary"
          onClick={onRetry}
          startIcon={<RefreshIcon />}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            px: 3,
            py: 0.9,
          }}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}
