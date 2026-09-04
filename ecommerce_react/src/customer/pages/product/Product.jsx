import React, { useEffect, useMemo, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchAllProducts, clearProductError } from "../../../State/customer/ProductSlice";
import ProductListingLayout from "../Listing/ProductListingLayout";

const categoryMetaMap = {
  men: {
    title: "Men's Fashion & Apparel",
    subtitle: "Curated collection of formal shirts, casual t-shirts, denim jeans, athletic footwear and accessories.",
    badge: "Men's Department",
  },
  women: {
    title: "Women's Fashion & Ethnic Wear",
    subtitle: "Explore designer kurtas, sarees, chic dresses, western wear, jewelry and stylish footwear.",
    badge: "Women's Department",
  },
  electronics: {
    title: "Electronics & Smart Devices",
    subtitle: "Flagship smartphones, noise-canceling headphones, smart watches, laptops and computer accessories.",
    badge: "Tech & Audio",
  },
  electronics_smartphones: {
    title: "Flagship Smartphones",
    subtitle: "Next-gen 5G mobile phones, gaming devices and smartphone accessories from authorized brands.",
    badge: "Mobiles & 5G",
  },
  home_furniture: {
    title: "Home Living & Furnishings",
    subtitle: "Handcrafted wooden furniture, ambient lighting, plush sofas, artisan rugs and bedsheets.",
    badge: "Home & Decor",
  },
  beauty: {
    title: "Beauty & Personal Care",
    subtitle: "Premium skincare, hair treatments, organic fragrances and everyday grooming essentials.",
    badge: "Beauty & Wellness",
  },
};

function Product() {
  const { category = "all" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((store) => store.product);

  // Parse filters and sort state from URL
  const priceParam = searchParams.get("price") || "";
  const colorParam = searchParams.get("color") || "";
  const brandParam = searchParams.get("brand") || "";
  const discountParam = searchParams.get("discount") || "";
  const stockParam = searchParams.get("stock") || "";
  const sortParam = searchParams.get("sort") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const activeFilters = useMemo(
    () => ({
      price: priceParam,
      color: colorParam,
      brand: brandParam,
      discount: discountParam,
      stock: stockParam,
    }),
    [priceParam, colorParam, brandParam, discountParam, stockParam]
  );

  // Fetch products whenever category, filters, sort or page changes
  const loadProducts = useCallback(() => {
    dispatch(clearProductError());

    let minPrice = undefined;
    let maxPrice = undefined;

    if (priceParam) {
      if (priceParam === "10000+") {
        minPrice = 10000;
      } else {
        const [min, max] = priceParam.split("-");
        minPrice = min ? Number(min) : undefined;
        maxPrice = max ? Number(max) : undefined;
      }
    }

    const filterRequest = {
      category: category === "all" ? undefined : category,
      colors: colorParam || undefined,
      brand: brandParam || undefined,
      minPrice,
      maxPrice,
      minDiscount: discountParam ? Number(discountParam) : undefined,
      stock: stockParam || undefined,
      sort: sortParam || undefined,
      pageNumber: Math.max(0, pageParam - 1),
    };

    dispatch(fetchAllProducts(filterRequest));
  }, [dispatch, category, priceParam, colorParam, brandParam, discountParam, stockParam, sortParam, pageParam]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Handler: Update filter in URL
  const handleFilterChange = (name, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set(name, value);
    } else {
      nextParams.delete(name);
    }
    nextParams.set("page", "1");
    setSearchParams(nextParams);
  };

  // Handler: Remove a single filter chip
  const handleRemoveFilter = (key) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete(key);
    nextParams.set("page", "1");
    setSearchParams(nextParams);
  };

  // Handler: Clear all filters
  const handleClearAllFilters = () => {
    const nextParams = new URLSearchParams();
    if (sortParam) nextParams.set("sort", sortParam);
    setSearchParams(nextParams);
  };

  // Handler: Change Sort order
  const handleSortChange = (newSort) => {
    const nextParams = new URLSearchParams(searchParams);
    if (newSort) {
      nextParams.set("sort", newSort);
    } else {
      nextParams.delete("sort");
    }
    nextParams.set("page", "1");
    setSearchParams(nextParams);
  };

  // Handler: Pagination
  const handlePageChange = (newPage) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", newPage.toString());
    setSearchParams(nextParams);
  };

  // Format meta info
  const formattedCategoryName = category
    .replaceAll("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const meta = categoryMetaMap[category] || {
    title: formattedCategoryName,
    subtitle: `Explore authentic ${formattedCategoryName} from verified Indian sellers and official stores.`,
    badge: "Catalog Section",
  };

  const breadcrumbs = [
    { label: "Catalog", path: "/products/all" },
    { label: formattedCategoryName, path: `/products/${category}` },
  ];

  return (
    <ProductListingLayout
      title={meta.title}
      subtitle={meta.subtitle}
      badge={meta.badge}
      breadcrumbs={breadcrumbs}
      products={product.products || []}
      totalElements={product.totalElements || product.products?.length || 0}
      totalPages={product.totalPages || 1}
      currentPage={pageParam}
      loading={product.loading}
      error={product.error}
      filters={activeFilters}
      sort={sortParam}
      onFilterChange={handleFilterChange}
      onRemoveFilter={handleRemoveFilter}
      onClearAllFilters={handleClearAllFilters}
      onSortChange={handleSortChange}
      onPageChange={handlePageChange}
      onRetry={loadProducts}
      isSearchPage={false}
    />
  );
}

export default Product;