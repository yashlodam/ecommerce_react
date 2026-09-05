import React, { useEffect, useMemo, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchAllProducts, clearProductError } from "../../../State/customer/ProductSlice";
import ProductListingLayout from "../Listing/ProductListingLayout";

const categoryMetaMap = {
  all: {
    title: "All Products Catalog",
    subtitle: "Explore our full collection of electronics, fashion apparel, footwear, and home decor from verified sellers.",
    badge: "Full Marketplace",
  },
  deals: {
    title: "Promotional Deals & Flash Offers",
    subtitle: "Explore limited-time discounts and special marketplace offers from verified sellers.",
    badge: "Flash Deals",
  },
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
  smartphones: {
    title: "Flagship 5G Smartphones",
    subtitle: "Next-gen 5G mobile phones, gaming devices and smartphone accessories from authorized brands like Apple, Samsung, Google & vivo.",
    badge: "Mobiles & 5G",
  },
  electronics_smartphones: {
    title: "Flagship 5G Smartphones",
    subtitle: "Next-gen 5G mobile phones, gaming devices and smartphone accessories from authorized brands like Apple, Samsung, Google & vivo.",
    badge: "Mobiles & 5G",
  },
  mobiles: {
    title: "Mobile Phones & 5G Tech",
    subtitle: "Top-rated 5G smartphones, flagship devices, and mobile tech from authorized manufacturers.",
    badge: "Mobiles & 5G",
  },
  electronics_mobiles: {
    title: "Mobile Phones & 5G Tech",
    subtitle: "Top-rated 5G smartphones, flagship devices, and mobile tech from authorized manufacturers.",
    badge: "Mobiles & 5G",
  },
  laptops: {
    title: "High Performance Laptops",
    subtitle: "Next-gen AI laptops, high-performance gaming rigs, and ultrabooks for work and play.",
    badge: "Computers & Gaming",
  },
  electronics_laptops: {
    title: "High Performance Laptops",
    subtitle: "Next-gen AI laptops, high-performance gaming rigs, and ultrabooks for work and play.",
    badge: "Computers & Gaming",
  },
  electronics_gaming_laptops: {
    title: "Gaming Laptops & Workstations",
    subtitle: "GeForce RTX graphics, ultra-fast refresh rates, and raw computing power for creators and gamers.",
    badge: "Gaming Tech",
  },
  headphones: {
    title: "Headphones & High-Res Audio",
    subtitle: "Active noise-canceling over-ear headphones, studio monitors, and wireless audio.",
    badge: "Audio & Sound",
  },
  electronics_headphones: {
    title: "Headphones & High-Res Audio",
    subtitle: "Active noise-canceling over-ear headphones, studio monitors, and wireless audio.",
    badge: "Audio & Sound",
  },
  smart_watches: {
    title: "Smartwatches & Wearables",
    subtitle: "Precision AMOLED displays, biometric health tracking, heart monitors, and durable battery life.",
    badge: "Wearables & Fitness",
  },
  electronics_smart_watches: {
    title: "Smartwatches & Wearables",
    subtitle: "Precision AMOLED displays, biometric health tracking, heart monitors, and durable battery life.",
    badge: "Wearables & Fitness",
  },
  cameras: {
    title: "Cameras & Photography",
    subtitle: "Full-frame mirrorless camera bodies, optical zoom lenses, and high-definition creator kits.",
    badge: "Cameras & Video",
  },
  electronics_cameras: {
    title: "Cameras & Photography",
    subtitle: "Full-frame mirrorless camera bodies, optical zoom lenses, and high-definition creator kits.",
    badge: "Cameras & Video",
  },
  electronics_mirrorless_cameras: {
    title: "Mirrorless Digital Cameras",
    subtitle: "Full-frame mirrorless cameras, 4K video recording, and fast autofocus lenses.",
    badge: "Pro Photography",
  },
  tshirts: {
    title: "Men's T-Shirts & Graphic Polos",
    subtitle: "Breathable cotton tees, graphic streetwear, and classic tailored polos for effortless daily comfort.",
    badge: "Casual Topwear",
  },
  men_tshirts: {
    title: "Men's T-Shirts & Graphic Polos",
    subtitle: "Breathable cotton tees, graphic streetwear, and classic tailored polos for effortless daily comfort.",
    badge: "Casual Topwear",
  },
  formal_shirts: {
    title: "Men's Formal Shirts",
    subtitle: "Crisp cotton formal shirts, executive dress shirts, and tailored fits for meetings and events.",
    badge: "Executive Wear",
  },
  men_formal_shirts: {
    title: "Men's Formal Shirts",
    subtitle: "Crisp cotton formal shirts, executive dress shirts, and tailored fits for meetings and events.",
    badge: "Executive Wear",
  },
  jeans: {
    title: "Men's Denim & Trousers",
    subtitle: "Classic straight-leg jeans, baggy denim fits, and breathable relaxed-fit cotton trousers.",
    badge: "Bottomwear",
  },
  men_jeans: {
    title: "Men's Denim & Trousers",
    subtitle: "Classic straight-leg jeans, baggy denim fits, and breathable relaxed-fit cotton trousers.",
    badge: "Bottomwear",
  },
  kurtas: {
    title: "Women's Designer Kurtas",
    subtitle: "Artisan printed kurtas, matching palazzo pant sets, and festive ethnic ensembles.",
    badge: "Ethnic Collection",
  },
  women_kurtas: {
    title: "Women's Designer Kurtas",
    subtitle: "Artisan printed kurtas, matching palazzo pant sets, and festive ethnic ensembles.",
    badge: "Ethnic Collection",
  },
  tops: {
    title: "Women's Tops & Western Wear",
    subtitle: "Square neck peplum tops, casual daily tees, and chic blouson shirts for every season.",
    badge: "Western Tops",
  },
  women_tops: {
    title: "Women's Tops & Western Wear",
    subtitle: "Square neck peplum tops, casual daily tees, and chic blouson shirts for every season.",
    badge: "Western Tops",
  },
  home_furniture: {
    title: "Home Living & Furnishings",
    subtitle: "Handcrafted wooden furniture, ambient lighting, plush sofas, artisan rugs and bedsheets.",
    badge: "Home & Decor",
  },
  home_beds: {
    title: "Beds & Mattresses",
    subtitle: "Comfortable solid wood beds, orthopedic mattresses, and luxury headboards for restful sleep.",
    badge: "Bedroom",
  },
  home_lighting: {
    title: "Lighting & Ambient Lamps",
    subtitle: "Ceiling chandeliers, warm bedside lamps, fairy string lights, and architectural LEDs.",
    badge: "Lighting & Lamps",
  },
  home_garden_outdoor: {
    title: "Garden & Outdoor Living",
    subtitle: "Plant pots, decorative planters, outdoor patio furniture, and garden watering tools.",
    badge: "Outdoor & Garden",
  },
  home_kitchen_dining: {
    title: "Kitchenware & Dining Essentials",
    subtitle: "Non-stick cookware, elegant porcelain dinner sets, chef cutlery, and food storage containers.",
    badge: "Kitchen & Dining",
  },
  beauty: {
    title: "Beauty & Personal Care",
    subtitle: "Premium skincare, hair treatments, organic fragrances and everyday grooming essentials.",
    badge: "Beauty & Wellness",
  },
  beauty_makeup: {
    title: "Makeup & Cosmetics",
    subtitle: "Flawless foundations, lipsticks, eyeliners, and makeup essentials for every occasion.",
    badge: "Cosmetics",
  },
  beauty_skincare: {
    title: "Skincare & Sun Protection",
    subtitle: "Hydrating moisturizers, vitamin serums, nourishing face masks, and sunscreen.",
    badge: "Skincare",
  },
  beauty_haircare: {
    title: "Haircare & Treatment",
    subtitle: "Strengthening shampoos, deep conditioners, herbal hair oils, and serums.",
    badge: "Haircare",
  },
  beauty_fragrances: {
    title: "Perfumes & Luxury Fragrances",
    subtitle: "Captivating eau de parfums, daily body mists, and luxury scents for men and women.",
    badge: "Fragrances",
  },
  beauty_personal_care: {
    title: "Personal Care & Hygiene",
    subtitle: "Refreshing body washes, gentle soaps, hand washes, and daily hygiene essentials.",
    badge: "Personal Care",
  },
  women_beauty_personal_care: {
    title: "Beauty & Skincare",
    subtitle: "Dermatologist-tested skincare, essential hair oils, organic wellness serums, and luxury fragrances.",
    badge: "Beauty & Skincare",
  },
  men_topwear: {
    title: "Men's Topwear Collection",
    subtitle: "Trendy graphic t-shirts, casual polo shirts, tailored button-downs, and effortless daily tops.",
    badge: "Topwear",
  },
  men_bottomwear: {
    title: "Men's Bottomwear & Denim",
    subtitle: "Slim-fit jeans, relaxed cargo pants, breathable chinos, and comfortable jogger trousers.",
    badge: "Bottomwear",
  },
  men_hoodies: {
    title: "Men's Hoodies & Sweatshirts",
    subtitle: "Fleece-lined winter hoodies, oversized streetwear pullovers, and zipper jackets.",
    badge: "Winter Wear",
  },
  men_jackets: {
    title: "Men's Jackets & Outerwear",
    subtitle: "Rugged denim trucker jackets, leather bombers, lightweight windbreakers, and puffer coats.",
    badge: "Outerwear",
  },
  men_footwear: {
    title: "Men's Footwear & Sneakers",
    subtitle: "High-performance running sneakers, genuine leather formal oxfords, loafers, and daily sliders.",
    badge: "Footwear",
  },
  women_western_wear: {
    title: "Women's Western Wear",
    subtitle: "Contemporary tops, tailored blazers, peplum blouses, and modern partywear ensembles.",
    badge: "Western Fashion",
  },
  women_dresses: {
    title: "Women's Dresses & Jumpsuits",
    subtitle: "Flattering A-line dresses, floral sundresses, elegant maxi silhouettes, and evening jumpsuits.",
    badge: "Dresses",
  },
  women_jewellery: {
    title: "Designer Jewellery & Accessories",
    subtitle: "Gold-plated necklace sets, delicate pearl earrings, oxidized silver chokers, and bangles.",
    badge: "Jewellery",
  },
  women_sarees: {
    title: "Authentic Ethnic Sarees",
    subtitle: "Banarasi silk weaves, lightweight georgette drapes, Kanjeevaram heritage sarees, and festive wear.",
    badge: "Ethnic Sarees",
  },
  women_footwear: {
    title: "Women's Footwear & Heels",
    subtitle: "Strappy block heels, embroidered ethnic juttis, cushioned walking flats, and casual sneakers.",
    badge: "Footwear",
  },
  speakers: {
    title: "Bluetooth Speakers & High-Res Audio",
    subtitle: "Deep bass portable wireless speakers, home theater soundbars, and party audio towers.",
    badge: "Audio & Sound",
  },
  televisions: {
    title: "Smart 4K Ultra HD Televisions",
    subtitle: "Cinematic OLED & QLED displays, Dolby Vision smart TVs, and streaming displays with immersive sound.",
    badge: "Home Theater",
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
      category: category === "all" || category === "deals" ? undefined : category,
      colors: colorParam || undefined,
      brand: brandParam || undefined,
      minPrice,
      maxPrice,
      minDiscount: discountParam
        ? Number(discountParam)
        : category === "deals"
          ? 20
          : undefined,
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

  const cleanCategory = (category || "all").toLowerCase();
  const meta = categoryMetaMap[cleanCategory] || categoryMetaMap[cleanCategory.replace(/-/g, "_")] || {
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
      category={category}
    />
  );
}

export default Product;