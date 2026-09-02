import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
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

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchAllProducts } from "../../../State/customer/ProductSlice";
import { useParams, useSearchParams } from "react-router-dom";
import { SkeletonGrid } from "../../../common/SkeletonCard";

function Product() {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const dispatch = useAppDispatch();
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const { product } = useAppSelector((store) => store);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const [minPrice, maxPrice] =
      searchParams.get("price")?.split("-") || [];

    const color = searchParams.get("color");
    const minDiscount = searchParams.get("discount")
      ? Number(searchParams.get("discount"))
      : undefined;

    const newFilter = {
      category,
      colors: color || "",
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minDiscount,
      sort,
      pageNumber: page - 1,
    };

    dispatch(fetchAllProducts(newFilter));
  }, [dispatch, category, searchParams, page, sort]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-6 sm:py-8">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-8">
        {/* Heading */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-slate-100">
            {category?.replaceAll("_", " ")}
          </h1>
          <div className="mt-2 flex justify-center">
            <span className="h-1 w-12 rounded-full bg-teal-600 dark:bg-teal-400" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-[280px] shrink-0">
            <div
              className="lg:sticky lg:top-24 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 7rem)" }}
            >
              <FilterSerction />
            </div>
          </aside>

          {/* Products Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 px-4 py-3 shadow-xs transition-colors">
              {!isLarge ? (
                <>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    startIcon={<FilterAltIcon fontSize="small" />}
                    onClick={() => setOpenFilter(true)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: "10px",
                    }}
                  >
                    Filters
                  </Button>

                  <Drawer
                    anchor="left"
                    open={openFilter}
                    onClose={() => setOpenFilter(false)}
                    PaperProps={{
                      sx: {
                        width: { xs: "85vw", sm: 320 },
                        maxWidth: 340,
                        borderTopRightRadius: 20,
                        borderBottomRightRadius: 20,
                        bgcolor: "background.paper",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        bgcolor: "background.paper",
                      }}
                    >
                      <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 shrink-0">
                        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
                          Filter Catalog
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => setOpenFilter(false)}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </div>
                      <Box sx={{ p: 2, overflowY: "auto", flex: 1 }}>
                        <FilterSerction />
                      </Box>
                      <div className="p-3.5 border-t border-slate-100 dark:border-slate-800 shrink-0">
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={() => setOpenFilter(false)}
                          sx={{
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: "12px",
                            py: 1.2,
                          }}
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </Box>
                  </Drawer>
                </>
              ) : (
                <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "text.secondary" }}>
                  {product.products?.length || 0} products listed
                </Typography>
              )}

              <FormControl
                size="small"
                sx={{
                  width: { xs: 150, sm: 180, md: 200 },
                }}
              >
                <InputLabel id="sort-label">Sort Order</InputLabel>
                <Select
                  labelId="sort-label"
                  value={sort}
                  label="Sort Order"
                  onChange={handleSortChange}
                  sx={{ borderRadius: "10px", fontSize: "13px" }}
                >
                  <MenuItem value="">Featured</MenuItem>
                  <MenuItem value="price_low">Price: Low to High</MenuItem>
                  <MenuItem value="price_high">Price: High to Low</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Product Grid */}
            {product.loading ? (
              <SkeletonGrid count={6} />
            ) : product.products?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {product.products.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8">
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No products found</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm">
                  Try adjusting your filter combinations or selecting another department.
                </p>
              </div>
            )}

            {/* Pagination */}
            {product.products?.length > 0 && (
              <div className="flex justify-center mt-10">
                <Pagination
                  page={page}
                  count={product.totalPages || 1}
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