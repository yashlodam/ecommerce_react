import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";
import Collapse from "@mui/material/Collapse";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { color as colorsData } from "../../../data/filter/color";
import { price as priceData } from "../../../data/filter/price";
import { discount as discountData } from "../../../data/filter/discount";
import { brand as brandData } from "../../../data/filter/brand";

export default function FilterSidebar({
  filters = {},
  onFilterChange,
  onClearAll,
  showTitle = true,
}) {
  const [openSections, setOpenSections] = useState({
    price: true,
    color: true,
    brand: true,
    discount: true,
    stock: true,
  });

  const [expandColor, setExpandColor] = useState(false);
  const [expandBrand, setExpandBrand] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const filteredBrands = brandData.filter((b) =>
    b.name.toLowerCase().includes(brandSearch.toLowerCase().trim())
  );

  const handleRadioChange = (name, value) => {
    if (filters[name] === value) {
      onFilterChange(name, "");
    } else {
      onFilterChange(name, value);
    }
  };

  const activeCount = Object.values(filters).filter(Boolean).length;

  const formControlLabelSx = {
    borderRadius: "8px",
    mx: -0.5,
    px: 1,
    py: 0.15,
    width: "100%",
    transition: "background-color 0.15s ease",
    "&:hover": { bgcolor: "action.hover" },
    "& .MuiFormControlLabel-label": {
      fontSize: "13px",
      fontWeight: 500,
      width: "100%",
    },
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/80 dark:border-slate-800 w-full overflow-hidden transition-colors">
      {/* Sidebar Top Header */}
      {showTitle && (
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
            <TuneIcon sx={{ fontSize: 18 }} />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Filters
            </h3>
            {activeCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] font-extrabold flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </div>

          {activeCount > 0 && (
            <Button
              size="small"
              onClick={onClearAll}
              startIcon={<RestartAltIcon sx={{ fontSize: 15 }} />}
              color="primary"
              sx={{
                fontWeight: 700,
                fontSize: "12px",
                textTransform: "none",
                p: 0,
              }}
            >
              Clear All
            </Button>
          )}
        </div>
      )}

      <div className="p-4 sm:p-5 space-y-4 text-xs">
        {/* 1. PRICE RANGE GROUP */}
        <section>
          <div
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between py-1 cursor-pointer select-none group"
          >
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 text-[11px] group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              Price Range
            </h4>
            <div className="flex items-center gap-1">
              {filters.price && (
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-1.5 py-0.5 rounded">
                  Active
                </span>
              )}
              {openSections.price ? (
                <KeyboardArrowUpIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              ) : (
                <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              )}
            </div>
          </div>

          <Collapse in={openSections.price}>
            <div className="pt-2">
              <FormControl fullWidth>
                <RadioGroup
                  value={filters.price || ""}
                  onChange={(e) => handleRadioChange("price", e.target.value)}
                  sx={{ gap: 0.1 }}
                >
                  {priceData.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio size="small" color="primary" sx={{ p: 0.75 }} />}
                      sx={formControlLabelSx}
                      label={
                        <span className={`text-xs ${filters.price === item.value ? "font-bold text-teal-700 dark:text-teal-300" : "text-slate-700 dark:text-slate-300"}`}>
                          {item.name}
                        </span>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </Collapse>
        </section>

        <Divider className="!border-slate-100 dark:!border-slate-800" />

        {/* 2. COLOR GROUP */}
        <section>
          <div
            onClick={() => toggleSection("color")}
            className="flex items-center justify-between py-1 cursor-pointer select-none group"
          >
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 text-[11px] group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              Color
            </h4>
            <div className="flex items-center gap-1">
              {filters.color && (
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-1.5 py-0.5 rounded">
                  {filters.color}
                </span>
              )}
              {openSections.color ? (
                <KeyboardArrowUpIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              ) : (
                <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              )}
            </div>
          </div>

          <Collapse in={openSections.color}>
            <div className="pt-2">
              <FormControl fullWidth>
                <RadioGroup
                  value={filters.color || ""}
                  onChange={(e) => handleRadioChange("color", e.target.value)}
                  sx={{ gap: 0.1 }}
                >
                  {colorsData
                    .slice(0, expandColor ? colorsData.length : 6)
                    .map((item) => (
                      <FormControlLabel
                        key={item.name}
                        value={item.name}
                        control={<Radio size="small" color="primary" sx={{ p: 0.75 }} />}
                        sx={formControlLabelSx}
                        label={
                          <div className="flex items-center justify-between w-full pr-1">
                            <span className={`text-xs ${filters.color === item.name ? "font-bold text-teal-700 dark:text-teal-300" : "text-slate-700 dark:text-slate-300"}`}>
                              {item.name}
                            </span>
                            <span
                              style={{ backgroundColor: item.hex }}
                              className={`w-3.5 h-3.5 rounded-full ring-1 ring-black/10 dark:ring-white/10 ${
                                item.name === "White" ? "border border-slate-300" : ""
                              }`}
                            />
                          </div>
                        }
                      />
                    ))}
                </RadioGroup>

                {colorsData.length > 6 && (
                  <button
                    type="button"
                    onClick={() => setExpandColor(!expandColor)}
                    className="mt-2 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline transition-colors w-fit cursor-pointer pl-1"
                  >
                    {expandColor ? "Show Less" : `+${colorsData.length - 6} More Colors`}
                  </button>
                )}
              </FormControl>
            </div>
          </Collapse>
        </section>

        <Divider className="!border-slate-100 dark:!border-slate-800" />

        {/* 3. BRAND GROUP */}
        <section>
          <div
            onClick={() => toggleSection("brand")}
            className="flex items-center justify-between py-1 cursor-pointer select-none group"
          >
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 text-[11px] group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              Brand
            </h4>
            <div className="flex items-center gap-1">
              {filters.brand && (
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-1.5 py-0.5 rounded">
                  {filters.brand}
                </span>
              )}
              {openSections.brand ? (
                <KeyboardArrowUpIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              ) : (
                <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              )}
            </div>
          </div>

          <Collapse in={openSections.brand}>
            <div className="pt-2 space-y-2">
              {/* Brand quick search */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                <SearchIcon sx={{ fontSize: 15, color: "text.secondary" }} />
                <InputBase
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  placeholder="Filter brands..."
                  className="w-full text-xs"
                  sx={{ fontSize: "12px" }}
                />
              </div>

              <FormControl fullWidth>
                <RadioGroup
                  value={filters.brand || ""}
                  onChange={(e) => handleRadioChange("brand", e.target.value)}
                  sx={{ gap: 0.1 }}
                >
                  {filteredBrands
                    .slice(0, expandBrand ? filteredBrands.length : 6)
                    .map((item) => (
                      <FormControlLabel
                        key={item.name}
                        value={item.name}
                        control={<Radio size="small" color="primary" sx={{ p: 0.75 }} />}
                        sx={formControlLabelSx}
                        label={
                          <span className={`text-xs ${filters.brand === item.name ? "font-bold text-teal-700 dark:text-teal-300" : "text-slate-700 dark:text-slate-300"}`}>
                            {item.name}
                          </span>
                        }
                      />
                    ))}
                </RadioGroup>

                {filteredBrands.length > 6 && (
                  <button
                    type="button"
                    onClick={() => setExpandBrand(!expandBrand)}
                    className="mt-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline transition-colors w-fit cursor-pointer pl-1"
                  >
                    {expandBrand ? "Show Less" : `+${filteredBrands.length - 6} More Brands`}
                  </button>
                )}
              </FormControl>
            </div>
          </Collapse>
        </section>

        <Divider className="!border-slate-100 dark:!border-slate-800" />

        {/* 4. MIN DISCOUNT GROUP */}
        <section>
          <div
            onClick={() => toggleSection("discount")}
            className="flex items-center justify-between py-1 cursor-pointer select-none group"
          >
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 text-[11px] group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              Discount
            </h4>
            <div className="flex items-center gap-1">
              {filters.discount && (
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-1.5 py-0.5 rounded">
                  {filters.discount}%+
                </span>
              )}
              {openSections.discount ? (
                <KeyboardArrowUpIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              ) : (
                <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              )}
            </div>
          </div>

          <Collapse in={openSections.discount}>
            <div className="pt-2">
              <FormControl fullWidth>
                <RadioGroup
                  value={filters.discount || ""}
                  onChange={(e) => handleRadioChange("discount", e.target.value)}
                  sx={{ gap: 0.1 }}
                >
                  {discountData.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value.toString()}
                      control={<Radio size="small" color="primary" sx={{ p: 0.75 }} />}
                      sx={formControlLabelSx}
                      label={
                        <span className={`text-xs ${filters.discount === item.value.toString() ? "font-bold text-teal-700 dark:text-teal-300" : "text-slate-700 dark:text-slate-300"}`}>
                          {item.name}
                        </span>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </Collapse>
        </section>

        <Divider className="!border-slate-100 dark:!border-slate-800" />

        {/* 5. AVAILABILITY GROUP */}
        <section>
          <div
            onClick={() => toggleSection("stock")}
            className="flex items-center justify-between py-1 cursor-pointer select-none group"
          >
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 text-[11px] group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              Availability
            </h4>
            <div className="flex items-center gap-1">
              {openSections.stock ? (
                <KeyboardArrowUpIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              ) : (
                <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              )}
            </div>
          </div>

          <Collapse in={openSections.stock}>
            <div className="pt-2">
              <FormControl fullWidth>
                <RadioGroup
                  value={filters.stock || ""}
                  onChange={(e) => handleRadioChange("stock", e.target.value)}
                  sx={{ gap: 0.1 }}
                >
                  <FormControlLabel
                    value="in_stock"
                    control={<Radio size="small" color="primary" sx={{ p: 0.75 }} />}
                    sx={formControlLabelSx}
                    label={
                      <span className={`text-xs ${filters.stock === "in_stock" ? "font-bold text-teal-700 dark:text-teal-300" : "text-slate-700 dark:text-slate-300"}`}>
                        In Stock Only
                      </span>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </Collapse>
        </section>
      </div>
    </div>
  );
}
