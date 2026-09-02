import React from "react";
import { Button, Box, Typography } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

export default function EmptyState({
  icon: Icon = ShoppingBagOutlinedIcon,
  title = "No items found",
  description = "We couldn't find what you were looking for.",
  actionText,
  onAction,
}) {
  return (
    <Box className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4 shadow-inner">
        <Icon sx={{ fontSize: 38 }} />
      </div>
      <Typography variant="h6" className="font-bold text-slate-800 mb-1">
        {title}
      </Typography>
      <Typography variant="body2" className="text-slate-500 max-w-md mb-6">
        {description}
      </Typography>
      {actionText && onAction && (
        <Button
          variant="contained"
          color="primary"
          onClick={onAction}
          className="font-semibold px-6 py-2.5 rounded-xl shadow-sm"
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
}
