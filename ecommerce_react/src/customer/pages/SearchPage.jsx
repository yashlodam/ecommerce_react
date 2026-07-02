import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";



import { searchProduct } from "../../State/customer/ProductSlice";
import { useAppDispatch, useAppSelector,store } from "../../State/Store";
import ProductCard from "./product/ProductCard";

function SearchPage() {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((store) => store);

  const location = useLocation();

  const query =
    new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    if (query.trim()) {
      dispatch(searchProduct(query));
    }
  }, [dispatch, query]);

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 3 }}>
      <Grid container spacing={3} px={{ xs: 2, md: 4 }}>
        {/* Filters */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Filters
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography fontWeight={600}>
              Brand
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Apple
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Samsung
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              OnePlus
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography fontWeight={600}>
              Price
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              ₹0 - ₹20,000
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              ₹20,000 - ₹50,000
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              ₹50,000+
            </Typography>
          </Paper>
        </Grid>

        {/* Products */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <TextField
              fullWidth
              value={query}
              disabled
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Typography
              mt={3}
              mb={2}
              variant="h6"
              fontWeight="bold"
            >
              Search Results for "{query}"
            </Typography>

            <Typography color="text.secondary" mb={3}>
              {product.searchProducts.length} Products Found
            </Typography>

            {product.searchProducts.length === 0 ? (
              <Box
                height={300}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="h5"
                  color="text.secondary"
                >
                  😔 No Products Found
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {product.searchProducts.map((item) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={item.id}
                  >
                    <ProductCard product={item} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchPage;