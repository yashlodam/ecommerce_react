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

  return (
    <div className="bg-white rounded-lg shadow-sm border h-full max-h-screen overflow-y-auto">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 sticky top-0 bg-white z-10">
        <h2 className="text-lg font-semibold">Filters</h2>

        <Button
          size="small"
          color="primary"
          onClick={clearAllFilter}
        >
          Clear All
        </Button>
      </div>

      <Divider />

      <div className="p-4 space-y-8">

        {/* COLOR */}

        <section>
          <FormControl fullWidth>

            <FormLabel
              sx={{
                color: teal[600],
                fontWeight: "bold",
                mb: 2,
                fontSize: "16px",
              }}
            >
              Color
            </FormLabel>

            <RadioGroup
              name="color"
              onChange={updateFilterParams}
            >
              {color
                .slice(0, expandColor ? color.length : 5)
                .map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.name}
                    control={<Radio size="small" />}
                    label={
                      <div className="flex items-center gap-3">
                        <span>{item.name}</span>

                        <div
                          style={{
                            backgroundColor: item.hex,
                          }}
                          className={`w-5 h-5 rounded-full ${
                            item.name === "White"
                              ? "border"
                              : ""
                          }`}
                        />
                      </div>
                    }
                  />
                ))}
            </RadioGroup>

            <button
              onClick={() =>
                setExpandColor(!expandColor)
              }
              className="mt-2 text-sm text-teal-600 hover:text-teal-800"
            >
              {expandColor
                ? "Show Less"
                : `+${color.length - 5} More`}
            </button>
          </FormControl>
        </section>

        {/* PRICE */}

        <section>
          <FormControl fullWidth>

            <FormLabel
              sx={{
                color: teal[600],
                fontWeight: "bold",
                mb: 2,
                fontSize: "16px",
              }}
            >
              Price
            </FormLabel>

            <RadioGroup
              name="price"
              onChange={updateFilterParams}
            >
              {price.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item.name}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>

          </FormControl>
        </section>

        {/* DISCOUNT */}

        <section>
          <FormControl fullWidth>

            <FormLabel
              sx={{
                color: teal[600],
                fontWeight: "bold",
                mb: 2,
                fontSize: "16px",
              }}
            >
              Discount
            </FormLabel>

            <RadioGroup
              name="discount"
              onChange={updateFilterParams}
            >
              {discount.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item.name}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>

          </FormControl>
        </section>

        {/* BRAND */}

        <section>
          <FormControl fullWidth>

            <FormLabel
              sx={{
                color: teal[600],
                fontWeight: "bold",
                mb: 2,
                fontSize: "16px",
              }}
            >
              Brand
            </FormLabel>

            <RadioGroup
              name="brand"
              onChange={updateFilterParams}
            >
              {brand
                .slice(0, expandBrand ? brand.length : 5)
                .map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.name}
                    control={<Radio size="small" />}
                    label={item.name}
                  />
                ))}
            </RadioGroup>

            <button
              onClick={() =>
                setExpandBrand(!expandBrand)
              }
              className="mt-2 text-sm text-teal-600 hover:text-teal-800"
            >
              {expandBrand
                ? "Show Less"
                : `+${brand.length - 5} More`}
            </button>
          </FormControl>
        </section>

      </div>
    </div>
  );
}

export default FilterSerction;