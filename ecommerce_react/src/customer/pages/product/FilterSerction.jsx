import React, { useState } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { teal } from "@mui/material/colors";
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

  // shared label style, kept in one place so it stays consistent everywhere
  const sectionLabelSx = {
    color: teal[700],
    fontWeight: 700,
    mb: 1.5,
    fontSize: "14px",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  };

  const radioSx = {
    color: teal[300],
    "&.Mui-checked": { color: teal[600] },
  };

  const formControlLabelSx = {
    borderRadius: "8px",
    mx: -1,
    px: 1,
    py: 0.25,
    width: "fit-content",
    transition: "background-color 0.15s ease",
    "&:hover": { backgroundColor: teal[50] },
    "& .MuiFormControlLabel-label": {
      fontSize: "14px",
      color: "rgb(55,65,81)",
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full max-h-screen overflow-y-auto w-full">

      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight">
          Filters
        </h2>

        <Button
          size="small"
          onClick={clearAllFilter}
          sx={{
            color: teal[700],
            fontWeight: 600,
            fontSize: "13px",
            textTransform: "none",
            "&:hover": { backgroundColor: teal[50] },
          }}
        >
          Clear All
        </Button>
      </div>

      <div className="p-4 sm:p-5 space-y-6 sm:space-y-8">

        {/* COLOR */}

        <section>
          <FormControl fullWidth>

            <FormLabel sx={sectionLabelSx}>
              Color
            </FormLabel>

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
                    control={<Radio size="small" sx={radioSx} />}
                    sx={formControlLabelSx}
                    label={
                      <div className="flex items-center gap-2.5">
                        <span>{item.name}</span>

                        <span
                          style={{ backgroundColor: item.hex }}
                          className={`w-4 h-4 rounded-full ring-1 ring-black/5 ${
                            item.name === "White" ? "border border-gray-300" : ""
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
                className="mt-2 text-sm font-medium text-teal-700 hover:text-teal-900 transition-colors w-fit"
              >
                {expandColor ? "Show Less" : `+${color.length - 5} More`}
              </button>
            )}
          </FormControl>
        </section>

        <Divider sx={{ borderColor: "rgb(243,244,246)" }} />

        {/* PRICE */}

        <section>
          <FormControl fullWidth>

            <FormLabel sx={sectionLabelSx}>
              Price
            </FormLabel>

            <RadioGroup
              name="price"
              onChange={updateFilterParams}
              sx={{ gap: 0.25 }}
            >
              {price.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item.name}
                  control={<Radio size="small" sx={radioSx} />}
                  sx={formControlLabelSx}
                  label={item.name}
                />
              ))}
            </RadioGroup>

          </FormControl>
        </section>

        <Divider sx={{ borderColor: "rgb(243,244,246)" }} />

        {/* DISCOUNT */}

        <section>
          <FormControl fullWidth>

            <FormLabel sx={sectionLabelSx}>
              Discount
            </FormLabel>

            <RadioGroup
              name="discount"
              onChange={updateFilterParams}
              sx={{ gap: 0.25 }}
            >
              {discount.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item.name}
                  control={<Radio size="small" sx={radioSx} />}
                  sx={formControlLabelSx}
                  label={item.name}
                />
              ))}
            </RadioGroup>

          </FormControl>
        </section>

        <Divider sx={{ borderColor: "rgb(243,244,246)" }} />

        {/* BRAND */}

        <section>
          <FormControl fullWidth>

            <FormLabel sx={sectionLabelSx}>
              Brand
            </FormLabel>

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
                    control={<Radio size="small" sx={radioSx} />}
                    sx={formControlLabelSx}
                    label={item.name}
                  />
                ))}
            </RadioGroup>

            {brand.length > 5 && (
              <button
                onClick={() => setExpandBrand(!expandBrand)}
                className="mt-2 text-sm font-medium text-teal-700 hover:text-teal-900 transition-colors w-fit"
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