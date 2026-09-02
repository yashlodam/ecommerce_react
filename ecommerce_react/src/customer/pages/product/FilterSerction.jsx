import React, { useState } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useSearchParams } from "react-router-dom";

import { color } from "../../../data/filter/color";
import { price } from "../../../data/filter/price";
import { discount } from "../../../data/filter/discount";
import { brand } from "../../../data/filter/brand";

function FilterSerction() {
  const [expandColor, setExpandColor] = useState(false);
  const [expandBrand, setExpandBrand] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilterParams = (e) => {
    const { name, value } = e.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilter = () => {
    searchParams.forEach((value, key) => {
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  };

  const sectionLabelSx = {
    color: "primary.main",
    fontWeight: 700,
    mb: 1.5,
    fontSize: "12px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  };

  const formControlLabelSx = {
    borderRadius: "10px",
    mx: -0.5,
    px: 1,
    py: 0.25,
    width: "100%",
    transition: "background-color 0.15s ease",
    "&:hover": { bgcolor: "action.hover" },
    "& .MuiFormControlLabel-label": {
      fontSize: "13px",
      fontWeight: 500,
    },
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/80 dark:border-slate-800 w-full overflow-hidden transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Refine By
        </h3>

        <Button
          size="small"
          onClick={clearAllFilter}
          color="primary"
          sx={{
            fontWeight: 700,
            fontSize: "12px",
            textTransform: "none",
          }}
        >
          Clear All
        </Button>
      </div>

      <div className="p-4 sm:p-5 space-y-6">
        {/* COLOR */}
        <section>
          <FormControl fullWidth>
            <FormLabel sx={sectionLabelSx}>Color</FormLabel>
            <RadioGroup
              name="color"
              onChange={updateFilterParams}
              sx={{ gap: 0.25 }}
            >
              {color
                .slice(0, expandColor ? color.length : 5)
                .map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.name}
                    control={<Radio size="small" color="primary" />}
                    sx={formControlLabelSx}
                    label={
                      <div className="flex items-center gap-2.5">
                        <span>{item.name}</span>
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

            {color.length > 5 && (
              <button
                onClick={() => setExpandColor(!expandColor)}
                className="mt-2 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline transition-colors w-fit cursor-pointer"
              >
                {expandColor ? "Show Less" : `+${color.length - 5} More`}
              </button>
            )}
          </FormControl>
        </section>

        <Divider className="!border-slate-100 dark:!border-slate-800" />

        {/* PRICE */}
        <section>
          <FormControl fullWidth>
            <FormLabel sx={sectionLabelSx}>Price Range</FormLabel>
            <RadioGroup
              name="price"
              onChange={updateFilterParams}
              sx={{ gap: 0.25 }}
            >
              {price.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item.value}
                  control={<Radio size="small" color="primary" />}
                  sx={formControlLabelSx}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>

        <Divider className="!border-slate-100 dark:!border-slate-800" />

        {/* DISCOUNT */}
        <section>
          <FormControl fullWidth>
            <FormLabel sx={sectionLabelSx}>Discount</FormLabel>
            <RadioGroup
              name="discount"
              onChange={updateFilterParams}
              sx={{ gap: 0.25 }}
            >
              {discount.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item.value}
                  control={<Radio size="small" color="primary" />}
                  sx={formControlLabelSx}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>

        <Divider className="!border-slate-100 dark:!border-slate-800" />

        {/* BRAND */}
        <section>
          <FormControl fullWidth>
            <FormLabel sx={sectionLabelSx}>Popular Brands</FormLabel>
            <RadioGroup
              name="brand"
              onChange={updateFilterParams}
              sx={{ gap: 0.25 }}
            >
              {brand
                .slice(0, expandBrand ? brand.length : 5)
                .map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.name}
                    control={<Radio size="small" color="primary" />}
                    sx={formControlLabelSx}
                    label={item.name}
                  />
                ))}
            </RadioGroup>

            {brand.length > 5 && (
              <button
                onClick={() => setExpandBrand(!expandBrand)}
                className="mt-2 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline transition-colors w-fit cursor-pointer"
              >
                {expandBrand ? "Show Less" : `+${brand.length - 5} More`}
              </button>
            )}
          </FormControl>
        </section>
      </div>
    </div>
  );
}

export default FilterSerction;