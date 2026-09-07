import React from "react";
import { Button, Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function ErrorState({
  title = "Something went wrong",
  message = "An error occurred while loading this section. Please try again.",
  onRetry,
}) {
  return (
    <Box className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/60 flex items-center justify-center text-red-500 dark:text-red-400 mb-3 shadow-inner">
        <ErrorOutlineIcon sx={{ fontSize: 34 }} />
      </div>
      <Typography variant="h6" className="font-bold text-slate-800 dark:text-slate-100 mb-1">
        {title}
      </Typography>
      <Typography variant="body2" className="text-slate-500 dark:text-slate-400 max-w-sm mb-5">
        {message}
      </Typography>
      {onRetry && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
          className="font-semibold text-xs rounded-xl"
          sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700 }}
        >
          Try Again
        </Button>
      )}
    </Box>
  );
}
