import React from "react";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function ActiveFilterChips({
  filters = {},
  searchQuery = "",
  onRemoveFilter,
  onClearAll,
}) {
  const chips = [];

  if (searchQuery) {
    chips.push({
      key: "q",
      label: `Keyword: "${searchQuery}"`,
      onDelete: () => onRemoveFilter("q"),
    });
  }

  if (filters.price) {
    chips.push({
      key: "price",
      label: `Price: ${filters.price === "10000+" ? "Above ₹10,000" : `₹${filters.price.replace("-", " – ₹")}`}`,
      onDelete: () => onRemoveFilter("price"),
    });
  }

  if (filters.color) {
    chips.push({
      key: "color",
      label: `Color: ${filters.color}`,
      onDelete: () => onRemoveFilter("color"),
    });
  }

  if (filters.brand) {
    chips.push({
      key: "brand",
      label: `Brand: ${filters.brand}`,
      onDelete: () => onRemoveFilter("brand"),
    });
  }

  if (filters.discount) {
    chips.push({
      key: "discount",
      label: `Discount: ${filters.discount}%+ Off`,
      onDelete: () => onRemoveFilter("discount"),
    });
  }

  if (filters.stock) {
    chips.push({
      key: "stock",
      label: filters.stock === "in_stock" ? "In Stock Only" : "Out of Stock",
      onDelete: () => onRemoveFilter("stock"),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1 pb-3">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">
        Active Filters:
      </span>

      {chips.map((chip) => (
        <Chip
          key={chip.key}
          label={chip.label}
          size="small"
          onDelete={chip.onDelete}
          deleteIcon={<CloseIcon sx={{ fontSize: "14px !important" }} />}
          sx={{
            fontWeight: 600,
            fontSize: "12px",
            bgcolor: "rgba(0, 146, 124, 0.08)",
            color: "#00927c",
            border: "1px solid rgba(0, 146, 124, 0.25)",
            "& .MuiChip-deleteIcon": {
              color: "#00927c",
              "&:hover": { color: "#00796b" },
            },
          }}
        />
      ))}

      {chips.length > 1 && (
        <Button
          size="small"
          onClick={onClearAll}
          startIcon={<DeleteOutlineIcon fontSize="small" />}
          sx={{
            textTransform: "none",
            fontSize: "12px",
            fontWeight: 700,
            color: "error.main",
            py: 0.2,
            px: 1,
            borderRadius: "999px",
            "&:hover": { bgcolor: "error.lighter" },
          }}
        >
          Clear All
        </Button>
      )}
    </div>
  );
}
