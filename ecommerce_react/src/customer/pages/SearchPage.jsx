import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Grid,
  Typography,
  Paper,
  Divider,
  Chip,
  CircularProgress,
  Stack,
} from "@mui/material";

import TuneIcon from "@mui/icons-material/Tune";
import SearchOffIcon from "@mui/icons-material/SearchOff";

import { useLocation, useNavigate } from "react-router-dom";

import { searchProduct } from "../../State/customer/ProductSlice";
import { useAppDispatch, useAppSelector } from "../../State/Store";

import ProductCard from "./product/ProductCard";

const BRAND = "#00927c";
const BRAND_DARK = "#00695c";

const quickFilters = [
  "All",
  "Men",
  "Women",
  "Smartphones",
  "Fashion",
  "Electronics",
  "Shoes",
  "Watches",
  "Beauty",
];

const quickSuggestions = [
  "iPhone",
  "Samsung",
  "OnePlus",
  "Google Pixel",
  "T-Shirts",
  "Formal Shirts",
  "Shoes",
  "Jeans",
  "Watches",
  "Kurtas",
  "Dresses",
  "Beauty",
];

function SearchPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = useAppSelector(store => store);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q") || "";
    setSearchQuery(query);

    if (query.trim()) {
      dispatch(searchProduct(query));
    }
  }, [dispatch, location.search]);

  const handleSearch = (value = searchQuery) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const params = new URLSearchParams(location.search);
    params.set("q", trimmed);
    navigate(`/search?${params.toString()}`);
    dispatch(searchProduct(trimmed));
  };

  const results = product?.searchProducts ?? [];
  const isLoading = product?.loading && searchQuery.trim().length > 0;
  const hasResults = results.length > 0;

  const resultsLabel = useMemo(() => {
    if (isLoading) return "Searching for matches…";
    return `${results.length} product${results.length === 1 ? "" : "s"} found`;
  }, [isLoading, results.length]);

  return (
    <Box sx={{ bgcolor: "#f6f7f8", minHeight: "100vh", pb: { xs: 4, md: 6 }, overflowX: "hidden" }}>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${BRAND_DARK} 0%, ${BRAND} 55%, #00a896 100%)`,
          pt: { xs: 3.5, sm: 4.5, md: 6 },
          pb: { xs: 4, sm: 5, md: 7 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Box maxWidth={860} mx="auto" textAlign="center">
          <Typography
            variant="overline"
            sx={{
              color: "rgba(255,255,255,0.8)",
              letterSpacing: 2,
              fontWeight: 700,
              fontSize: { xs: "0.7rem", md: "0.75rem" },
            }}
          >
            ShopSphere Search
          </Typography>
          <Typography
            fontWeight={800}
            sx={{
              color: "#fff",
              mb: 1.5,
              letterSpacing: -0.5,
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" },
              lineHeight: 1.25,
            }}
          >
            Find the right product faster
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.9)",
              maxWidth: 680,
              mx: "auto",
              fontSize: { xs: "0.875rem", sm: "0.95rem", md: "1rem" },
            }}
          >
            Browse curated results with a clean, focused experience designed for quick decision-making.
          </Typography>
        </Box>
      </Box>
     <Box
  sx={{
    width: "100%",
    maxWidth: "1700px",
    mx: "auto",
    px: {
      xs: 2,
      sm: 3,
      md: 4,
      lg: 5,
    },
    mt: {
      xs: -1,
      sm: -2,
      md: -3,
    },
  }}
>
  <Grid container spacing={3}>
      
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: { xs: 2, sm: 2.5, md: 3 },
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 2px 10px rgba(15, 23, 42, 0.04)",
              width: "100%",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <TuneIcon sx={{ color: BRAND }} fontSize="small" />
              <Typography variant="h6" fontWeight={700} fontSize={{ xs: "1.05rem", md: "1.25rem" }}>
                Refine your search
              </Typography>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            <Typography
              fontWeight={600}
              mb={1.2}
              color="text.secondary"
              variant="body2"
              textTransform="uppercase"
              letterSpacing={0.5}
            >
              Popular filters
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{
                flexWrap: { xs: "nowrap", md: "wrap" },
                overflowX: { xs: "auto", md: "visible" },
                pb: { xs: 0.5, md: 0 },
                scrollbarWidth: "thin",
              }}
              mb={1}
            >
              {quickFilters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <Chip
                    key={filter}
                    label={filter}
                    variant={isActive ? "filled" : "outlined"}
                    clickable
                    size="small"
                    onClick={() => {
                      setActiveFilter(filter);
                      const query = filter === "All" ? searchQuery : filter;
                      setSearchQuery(query);
                      handleSearch(query);
                    }}
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.75rem", md: "0.8125rem" },
                      "&:focus-visible": {
                        outline: `2px solid ${BRAND_DARK}`,
                        outlineOffset: 2,
                      },
                      ...(isActive && {
                        bgcolor: BRAND,
                        color: "#fff",
                        "&:hover": { bgcolor: BRAND_DARK },
                      }),
                    }}
                  />
                );
              })}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography
              fontWeight={600}
              mb={1.2}
              color="text.secondary"
              variant="body2"
              textTransform="uppercase"
              letterSpacing={0.5}
            >
              Helpful searches
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{
                flexWrap: { xs: "nowrap", md: "wrap" },
                overflowX: { xs: "auto", md: "visible" },
                pb: { xs: 0.5, md: 0 },
                scrollbarWidth: "thin",
              }}
            >
              {quickSuggestions.map((suggestion) => (
                <Chip
                  key={suggestion}
                  label={suggestion}
                  variant="outlined"
                  clickable
                  size="small"
                  onClick={() => {
                    setSearchQuery(suggestion);
                    handleSearch(suggestion);
                  }}
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "0.75rem", md: "0.8125rem" },
                    borderColor: "rgba(0,146,124,0.35)",
                    color: BRAND_DARK,
                    "&:hover": { bgcolor: "rgba(0,146,124,0.08)" },
                    "&:focus-visible": {
                      outline: `2px solid ${BRAND_DARK}`,
                      outlineOffset: 2,
                    },
                  }}
                />
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Results */}
        <Grid item xs={12} md={9}>
          <Paper
            sx={{
              p: { xs: 2, sm: 2.5, md: 3 },
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 2px 10px rgba(15, 23, 42, 0.04)",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={1}
              mb={1}
            >
              <Typography variant="h6" fontWeight={700} fontSize={{ xs: "1.05rem", md: "1.25rem" }}>
                {searchQuery ? `Results for "${searchQuery}"` : "Start searching for products"}
              </Typography>

              {!isLoading && hasResults && (
                <Chip
                  label={resultsLabel}
                  size="small"
                  sx={{ bgcolor: "rgba(0,146,124,0.1)", color: BRAND_DARK, fontWeight: 600 }}
                />
              )}
            </Stack>

            {(isLoading || !hasResults) && (
              <Typography color="text.secondary" mb={3} fontSize={{ xs: "0.875rem", md: "1rem" }}>
                {resultsLabel}
              </Typography>
            )}

            {isLoading ? (
              <Box
                height={{ xs: 240, sm: 280, md: 320 }}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={1.5}
              >
                <CircularProgress sx={{ color: BRAND }} />
                <Typography color="text.secondary" fontSize={{ xs: "0.875rem", md: "1rem" }}>
                  Looking for the best matches...
                </Typography>
              </Box>
            ) : !hasResults ? (
              <Box
                height={{ xs: 240, sm: 280, md: 320 }}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                gap={1.5}
                px={2}
              >
                <Box
                  sx={{
                    width: { xs: 52, md: 64 },
                    height: { xs: 52, md: 64 },
                    borderRadius: "50%",
                    bgcolor: "rgba(0,146,124,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SearchOffIcon sx={{ color: BRAND, fontSize: { xs: 24, md: 30 } }} />
                </Box>
                <Typography variant="h6" fontWeight={700} fontSize={{ xs: "1rem", md: "1.25rem" }}>
                  No products found
                </Typography>
                <Typography color="text.secondary" maxWidth={340} fontSize={{ xs: "0.8125rem", md: "0.875rem" }}>
                  Try a different keyword or browse one of the suggestions on the left.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                {results.map((item) => (
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={2}
                    key={item.id}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <ProductCard item={item} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Grid>
                    </Grid>
      </Box>
    </Box>
  );
}

export default SearchPage;
