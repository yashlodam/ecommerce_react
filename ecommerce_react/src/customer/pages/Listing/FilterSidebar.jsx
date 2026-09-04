import React, { useState, useEffect, useMemo } from "react";
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

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchBrands } from "../../../State/customer/ProductSlice";

import { color as colorsData } from "../../../data/filter/color";
import { price as priceData } from "../../../data/filter/price";
import { discount as discountData } from "../../../data/filter/discount";

const CATEGORIES_DATA = [
  { name: "Men's Fashion", value: "men" },
  { name: "Women's Fashion", value: "women" },
  { name: "Electronics & Audio", value: "electronics" },
  { name: "Smartphones & 5G", value: "electronics_smartphones" },
  { name: "Home Living & Furniture", value: "home_furniture" },
  { name: "Beauty & Personal Care", value: "beauty" },
];

export default function FilterSidebar({
  filters = {},
  onFilterChange,
  onClearAll,
  showTitle = true,
  showCategoryFilter = false,
  category = "",
  searchQuery = "",
  customBrands = null,
}) {
  const dispatch = useAppDispatch();
  const reduxBrands = useAppSelector((store) => store.product?.brands) || [];
  const reduxProducts = useAppSelector((store) => store.product?.products) || [];

  const activeCategory = filters.category || category;

  // Fetch real brands from backend whenever category or searchQuery changes
  useEffect(() => {
    dispatch(fetchBrands({ category: activeCategory, query: searchQuery }));
  }, [dispatch, activeCategory, searchQuery]);

  // Dynamically derive real brands:
  // 1. Brands returned by backend API (/products/brands)
  // 2. Any brands present on loaded catalog products
  // 3. Current active filter brand from URL
  const realBrands = useMemo(() => {
    const set = new Set();

    if (Array.isArray(customBrands) && customBrands.length > 0) {
      customBrands.forEach((b) => {
        const name = typeof b === "string" ? b.trim() : b?.name?.trim();
        if (name) set.add(name);
      });
    }

    if (Array.isArray(reduxBrands) && reduxBrands.length > 0) {
      reduxBrands.forEach((b) => {
        const name = typeof b === "string" ? b.trim() : b?.name?.trim();
        if (name) set.add(name);
      });
    }

    if (Array.isArray(reduxProducts) && reduxProducts.length > 0) {
      reduxProducts.forEach((p) => {
        const name = p?.brand?.trim();
        if (name) set.add(name);
      });
    }

    if (filters.brand && filters.brand.trim()) {
      set.add(filters.brand.trim());
    }

    return Array.from(set)
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
      .map((name) => ({ name }));
  }, [customBrands, reduxBrands, reduxProducts, filters.brand]);

  // Accordion section collapse state
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    brand: true,
    color: true,
    discount: false,
    stock: false,
  });

  // Item expansion state (by default show fewer/less items; user clicks button to show all)
  const [expandCategory, setExpandCategory] = useState(false);
  const [expandPrice, setExpandPrice] = useState(false);
  const [expandBrand, setExpandBrand] = useState(false);
  const [expandColor, setExpandColor] = useState(false);
  const [expandDiscount, setExpandDiscount] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");

  // Ensure active selections are automatically visible
  useEffect(() => {
    if (filters.price && ["5000-10000", "10000+"].includes(filters.price)) {
      setExpandPrice(true);
    }
    if (filters.color && colorsData.findIndex((c) => c.name === filters.color) >= 5) {
      setExpandColor(true);
    }
    if (filters.brand && realBrands.findIndex((b) => b.name === filters.brand) >= 5) {
      setExpandBrand(true);
    }
    if (filters.discount && [40, 60, 70].includes(Number(filters.discount))) {
      setExpandDiscount(true);
    }
    if (filters.discount) {
      setOpenSections((prev) => ({ ...prev, discount: true }));
    }
    if (filters.stock) {
      setOpenSections((prev) => ({ ...prev, stock: true }));
    }
    if (filters.category) {
      setOpenSections((prev) => ({ ...prev, category: true }));
      if (["electronics_smartphones", "home_furniture", "beauty"].includes(filters.category)) {
        setExpandCategory(true);
      }
    }
  }, [filters, realBrands]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const allSectionsOpen = Object.values(openSections).every(Boolean);
  const toggleAllSections = () => {
    const next = !allSectionsOpen;
    setOpenSections({
      category: next,
      price: next,
      brand: next,
      color: next,
      discount: next,
      stock: next,
    });
    if (next) {
      setExpandCategory(true);
      setExpandPrice(true);
      setExpandBrand(true);
      setExpandColor(true);
      setExpandDiscount(true);
    }
  };

  const filteredBrands = useMemo(() => {
    if (!brandSearch.trim()) return realBrands;
    return realBrands.filter((b) =>
      b.name.toLowerCase().includes(brandSearch.toLowerCase().trim())
    );
  }, [realBrands, brandSearch]);

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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleAllSections}
              className="text-[11px] font-semibold text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors cursor-pointer"
            >
              {allSectionsOpen ? "Collapse All" : "Expand All"}
            </button>

            {activeCount > 0 && (
              <Button
                size="small"
                onClick={onClearAll}
                startIcon={<RestartAltIcon sx={{ fontSize: 14 }} />}
                color="primary"
                sx={{
                  fontWeight: 700,
                  fontSize: "11px",
                  textTransform: "none",
                  p: 0,
                  minWidth: "auto",
                }}
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="p-4 sm:p-5 space-y-4 text-xs">
        {/* ── 0. CATEGORY GROUP (FOR SEARCH OR MULTI-CATEGORY LISTINGS) ── */}
        {(showCategoryFilter || filters.category) && (
          <>
            <section>
              <div
                onClick={() => toggleSection("category")}
                className="flex items-center justify-between py-1 cursor-pointer select-none group"
              >
                <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 text-[11px] group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  Department / Category
                </h4>
                <div className="flex items-center gap-1">
                  {filters.category && (
                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-1.5 py-0.5 rounded">
                      Active
                    </span>
                  )}
                  {openSections.category ? (
                    <KeyboardArrowUpIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                  ) : (
                    <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                  )}
                </div>
              </div>

              <Collapse in={openSections.category}>
                <div className="pt-2">
                  <FormControl fullWidth>
                    <RadioGroup
                      value={filters.category || ""}
                      onChange={(e) => handleRadioChange("category", e.target.value)}
                      sx={{ gap: 0.1 }}
                    >
                      {CATEGORIES_DATA.slice(0, expandCategory ? CATEGORIES_DATA.length : 4).map((item) => (
                        <FormControlLabel
                          key={item.value}
                          value={item.value}
                          control={<Radio size="small" color="primary" sx={{ p: 0.75 }} />}
                          sx={formControlLabelSx}
                          label={
                            <span className={`text-xs ${filters.category === item.value ? "font-bold text-teal-700 dark:text-teal-300" : "text-slate-700 dark:text-slate-300"}`}>
                              {item.name}
                            </span>
                          }
                        />
                      ))}
                    </RadioGroup>

                    {CATEGORIES_DATA.length > 4 && (
                      <button
                        type="button"
                        onClick={() => setExpandCategory(!expandCategory)}
                        className="mt-2 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline transition-colors w-fit cursor-pointer pl-1 inline-flex items-center gap-0.5"
                      >
                        {expandCategory ? "Show Less" : `+${CATEGORIES_DATA.length - 4} More Categories`}
                      </button>
                    )}
                  </FormControl>
                </div>
              </Collapse>
            </section>

            <Divider className="!border-slate-100 dark:!border-slate-800" />
          </>
        )}

        {/* ── 1. PRICE RANGE GROUP ── */}
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
                  {priceData
                    .slice(0, expandPrice ? priceData.length : 4)
                    .map((item) => (
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

                {priceData.length > 4 && (
                  <button
                    type="button"
                    onClick={() => setExpandPrice(!expandPrice)}
                    className="mt-2 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline transition-colors w-fit cursor-pointer pl-1 inline-flex items-center gap-0.5"
                  >
                    {expandPrice ? "Show Less" : `+${priceData.length - 4} More Price Ranges`}
                  </button>
                )}
              </FormControl>
            </div>
          </Collapse>
        </section>

        <Divider className="!border-slate-100 dark:!border-slate-800" />

        {/* ── 2. BRAND GROUP ── */}
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
                {filteredBrands.length === 0 ? (
                  <div className="py-3 px-2 text-center text-xs text-slate-400 dark:text-slate-500 italic bg-slate-50/50 dark:bg-slate-850/50 rounded-xl">
                    {brandSearch.trim()
                      ? `No brands matching "${brandSearch.trim()}"`
                      : "No brands available in this selection"}
                  </div>
                ) : (
                  <>
                    <RadioGroup
                      value={filters.brand || ""}
                      onChange={(e) => handleRadioChange("brand", e.target.value)}
                      sx={{ gap: 0.1 }}
                    >
                      {filteredBrands
                        .slice(0, expandBrand ? filteredBrands.length : 5)
                        .map((item) => (
                          <FormControlLabel
                            key={item.name}
                            value={item.name}
                            control={<Radio size="small" color="primary" sx={{ p: 0.75 }} />}
                            sx={formControlLabelSx}
                            label={
                              <span
                                className={`text-xs ${
                                  filters.brand === item.name
                                    ? "font-bold text-teal-700 dark:text-teal-300"
                                    : "text-slate-700 dark:text-slate-300"
                                }`}
                              >
                                {item.name}
                              </span>
                            }
                          />
                        ))}
                    </RadioGroup>

                    {filteredBrands.length > 5 && (
                      <button
                        type="button"
                        onClick={() => setExpandBrand(!expandBrand)}
                        className="mt-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline transition-colors w-fit cursor-pointer pl-1 inline-flex items-center gap-0.5"
                      >
                        {expandBrand ? "Show Less" : `+${filteredBrands.length - 5} More Brands`}
                      </button>
                    )}
                  </>
                )}
              </FormControl>
            </div>
          </Collapse>
        </section>

        <Divider className="!border-slate-100 dark:!border-slate-800" />

        {/* ── 3. COLOR GROUP ── */}
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
                    .slice(0, expandColor ? colorsData.length : 5)
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

                {colorsData.length > 5 && (
                  <button
                    type="button"
                    onClick={() => setExpandColor(!expandColor)}
                    className="mt-2 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline transition-colors w-fit cursor-pointer pl-1 inline-flex items-center gap-0.5"
                  >
                    {expandColor ? "Show Less" : `+${colorsData.length - 5} More Colors`}
                  </button>
                )}
              </FormControl>
            </div>
          </Collapse>
        </section>

        <Divider className="!border-slate-100 dark:!border-slate-800" />

        {/* ── 4. MIN DISCOUNT GROUP ── */}
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
                  {discountData
                    .slice(0, expandDiscount ? discountData.length : 4)
                    .map((item) => (
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

                {discountData.length > 4 && (
                  <button
                    type="button"
                    onClick={() => setExpandDiscount(!expandDiscount)}
                    className="mt-2 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline transition-colors w-fit cursor-pointer pl-1 inline-flex items-center gap-0.5"
                  >
                    {expandDiscount ? "Show Less" : `+${discountData.length - 4} More Discounts`}
                  </button>
                )}
              </FormControl>
            </div>
          </Collapse>
        </section>

        <Divider className="!border-slate-100 dark:!border-slate-800" />

        {/* ── 5. AVAILABILITY GROUP ── */}
        <section>
          <div
            onClick={() => toggleSection("stock")}
            className="flex items-center justify-between py-1 cursor-pointer select-none group"
          >
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 text-[11px] group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              Availability
            </h4>
            <div className="flex items-center gap-1">
              {filters.stock && (
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-1.5 py-0.5 rounded">
                  In Stock
                </span>
              )}
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
