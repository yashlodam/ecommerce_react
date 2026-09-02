import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SwapVertIcon from "@mui/icons-material/SwapVert";

export default function SortControl({ value = "", onChange }) {
  return (
    <FormControl
      size="small"
      sx={{
        minWidth: { xs: 140, sm: 180, md: 200 },
      }}
    >
      <InputLabel id="sort-control-label" sx={{ fontSize: "13px" }}>
        Sort By
      </InputLabel>
      <Select
        labelId="sort-control-label"
        value={value}
        label="Sort By"
        onChange={(e) => onChange(e.target.value)}
        IconComponent={SwapVertIcon}
        sx={{
          borderRadius: "12px",
          fontSize: "13px",
          fontWeight: 600,
          bgcolor: "background.paper",
          "& .MuiSelect-select": {
            py: 1,
          },
        }}
      >
        <MenuItem value="">Featured / Newest</MenuItem>
        <MenuItem value="price_low">Price: Low to High</MenuItem>
        <MenuItem value="price_high">Price: High to Low</MenuItem>
      </Select>
    </FormControl>
  );
}
