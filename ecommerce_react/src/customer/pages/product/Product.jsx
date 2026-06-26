import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

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
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-8">
        {/* Heading */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-gray-900">
            {category?.replaceAll("_", " ")}
          </h1>
          <div className="mt-2 flex justify-center">
            <span className="h-1 w-12 rounded-full bg-teal-600" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filter */}
          <aside className="hidden lg:block w-[260px] shrink-0">
            <div className="lg:sticky lg:top-6">
              <FilterSerction />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-5 bg-white rounded-xl border border-gray-200 px-3 sm:px-4 py-2.5">
              {!isLarge ? (
                <>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FilterAltIcon fontSize="small" />}
                    onClick={() => setOpenFilter(true)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      borderColor: "rgb(209,213,219)",
                      color: "rgb(55,65,81)",
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: "rgba(13,148,136,0.04)",
                      },
                    }}
                  >
                    Filters
                  </Button>

                  <Drawer
                    anchor="left"
                    open={openFilter}
                    onClose={() => setOpenFilter(false)}
                  >
                    <Box sx={{ width: { xs: 300, sm: 320 }, height: "100%" }}>
                      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                        <Typography sx={{ fontWeight: 700, fontSize: "15px", pl: 1 }}>
                          Filters
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => setOpenFilter(false)}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </div>
                      <Box sx={{ p: 1.5 }}>
                        <FilterSerction />
                      </Box>
                    </Box>
                  </Drawer>
                </>
              ) : (
                <Typography sx={{ fontSize: "14px", color: "rgb(107,114,128)" }}>
                  {product.products?.length || 0} products
                </Typography>
              )}

              <FormControl
                size="small"
                sx={{
                  width: {
                    xs: 150,
                    sm: 180,
                    md: 200,
                  },
                }}
              >
                <InputLabel>Sort</InputLabel>

                <Select
                  value={sort}
                  label="Sort"
                  onChange={handleSortChange}
                  sx={{
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
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

            {/* Product Grid */}
            {product.products?.length > 0 ? (
              <div
                className="grid gap-4 sm:gap-6"
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
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500 font-medium">No products found</p>
                <p className="text-sm text-gray-400 mt-1">
                  Try adjusting your filters or check back later.
                </p>
              </div>
            )}

            {/* Pagination */}
            {product.products?.length > 0 && (
              <div className="flex justify-center mt-10">
                <Pagination
                  page={page}
                  count={10}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                  onChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;