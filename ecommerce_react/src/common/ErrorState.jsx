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
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-3 shadow-inner">
        <ErrorOutlineIcon sx={{ fontSize: 34 }} />
      </div>
      <Typography variant="h6" className="font-bold text-slate-800 mb-1">
        {title}
      </Typography>
      <Typography variant="body2" className="text-slate-500 max-w-sm mb-5">
        {message}
      </Typography>
      {onRetry && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
          className="font-semibold text-xs rounded-lg"
        >
          Try Again
        </Button>
      )}
    </Box>
  );
}
