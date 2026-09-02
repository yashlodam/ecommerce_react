import React, { useEffect } from "react";
import SimilarProductCard from "./SimilarProductCard";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchAllProducts } from "../../../State/customer/ProductSlice";

function SimilarProduct() {
  const { categoryId, productId } = useParams();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((store) => store);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchAllProducts({ category: categoryId }));
    }
  }, [categoryId, dispatch]);

  const items = (product?.products || [])
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