import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

import FilterSerction from "./FilterSerction";

import { store, useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchAllProducts } from "../../../State/customer/ProductSlice";
import { useParams, useSearchParams } from "react-router-dom";

function Product() {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  const dispatch = useAppDispatch();

  const { category } = useParams();

  const [searchParams] = useSearchParams();

  const {product} = useAppSelector((store=>store))

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");

  const [openFilter, setOpenFilter] = useState(false);

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const [minPrice, maxPrice] =
      searchParams.get("price")?.split("-") || [];

    dispatch(
      fetchAllProducts(category)
    );
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-8">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-center text-2xl md:text-3xl font-bold uppercase text-gray-800">
            {category?.replaceAll("_", " ")}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filter */}
          <aside className="hidden lg:block w-[260px] shrink-0">
            <FilterSerction />
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5">
              {!isLarge && (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<FilterAltIcon />}
                    onClick={() => setOpenFilter(true)}
                  >
                    Filters
                  </Button>

                  <Drawer
                    anchor="left"
                    open={openFilter}
                    onClose={() => setOpenFilter(false)}
                  >
                    <Box sx={{ width: 280, p: 2 }}>
                      <FilterSerction />
                    </Box>
                  </Drawer>
                </>
              )}

              <FormControl
                size="small"
                sx={{
                  width: {
                    xs: 150,
                    sm: 180,
                    md: 220,
                  },
                }}
              >
                <InputLabel>Sort</InputLabel>

                <Select
                  value={sort}
                  label="Sort"
                  onChange={handleSortChange}
                >
                  <MenuItem value="">Default</MenuItem>
                  <MenuItem value="price_low">
                    Price : Low - High
                  </MenuItem>
                  <MenuItem value="price_high">
                    Price : High - Low
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            <Divider />

            {/* Product Grid */}
            <div
              className="mt-6 grid gap-6"
              style={{
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
              }}
            >
              {product.products.map((item, index) => (
                <div key={index} className="flex justify-center">
                  <ProductCard item={item}/>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10">
              <Pagination
                page={page}
                count={10}
                color="primary"
                variant="outlined"
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;