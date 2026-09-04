import React, { useEffect, useState } from "react";
import SimilarProductCard from "./SimilarProductCard";
import { useParams } from "react-router-dom";
import { api } from "../../../config/Api";
import { SkeletonCard } from "../../../common/SkeletonCard";

function SimilarProduct() {
  const { categoryId, productId } = useParams();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (categoryId) {
      setLoading(true);
      api
        .get("/products", {
          params: { category: categoryId, pageNumber: 0 },
        })
        .then((res) => {
          if (!isMounted) return;
          const list = res.data?.content || (Array.isArray(res.data) ? res.data : []);
          setSimilarProducts(list);
        })
        .catch(() => {
          if (isMounted) setSimilarProducts([]);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  if (loading && similarProducts.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {[...Array(5)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  const items = (similarProducts || [])
    .filter((p) => p.id !== Number(productId))
    .slice(0, 5);

  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
      {items.map((item) => (
        <SimilarProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default SimilarProduct;