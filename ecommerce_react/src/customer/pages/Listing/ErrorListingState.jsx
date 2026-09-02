import React from "react";
import Button from "@mui/material/Button";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function ErrorListingState({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3.5 max-w-md mx-auto my-4 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 flex items-center justify-center text-amber-600 dark:text-amber-400">
        <WarningAmberRoundedIcon sx={{ fontSize: 26 }} />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Couldn't load products
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
          {error?.message || (typeof error === "string" ? error : "Please check your connection and try again.")}
        </p>
      </div>

      {onRetry && (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onRetry}
          startIcon={<RefreshIcon sx={{ fontSize: 16 }} />}
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "12px",
            px: 2.5,
            py: 0.6,
          }}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}
