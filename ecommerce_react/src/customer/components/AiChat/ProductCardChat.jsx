import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye, Check, Star } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { addItemToCart } from '../../../State/customer/CartSlice';

export default function ProductCardChat({ product }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const jwt = useAppSelector((state) => state.auth?.jwt);
  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);

  if (!product) return null;

  const defaultVariant = product.variants?.find((v) => v.default) || product.variants?.[0];
  const size = defaultVariant?.variantName || 'M';
  const imageUrl =
    product.images?.[0] ||
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80';

  const handleView = () => {
    const categoryId = product.categoryName || 'all';
    navigate(`/product-details/${encodeURIComponent(categoryId)}/${product.id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const token = jwt || localStorage.getItem('jwt');
    if (!token) {
      navigate('/login');
      return;
    }

    setAdding(true);
    try {
      await dispatch(
        addItemToCart({
          productId: product.id,
          size: size,
          quantity: 1,
        })
      ).unwrap();
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } catch {
      // handled in slice
    } finally {
      setAdding(false);
    }
  };

  return (
    <div
      onClick={handleView}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleView();
        }
      }}
      aria-label={`View details for ${product.title}`}
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-500/60 dark:hover:border-teal-500/60 transition-all duration-200 cursor-pointer w-[230px] sm:w-[250px] text-left shrink-0 focus:outline-none focus:ring-2 focus:ring-teal-500"
    >
      {/* Thumbnail Stage */}
      <div className="relative w-full h-32 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80';
          }}
        />
        {product.discountPercent > 0 && (
          <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs uppercase tracking-wide">
            {product.discountPercent}% OFF
          </span>
        )}
        <span
          className={`absolute top-2 right-2 text-[10px] font-semibold px-1.5 py-0.5 rounded shadow-xs ${
            product.inStock
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-600 text-white'
          }`}
        >
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      {/* Details Area */}
      <div className="p-3 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-1">
            {product.brand && (
              <p className="text-[10px] font-bold tracking-wider uppercase text-teal-600 dark:text-teal-400 truncate">
                {product.brand}
              </p>
            )}
            {(product.rating || product.numRatings) && (
              <div className="flex items-center gap-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800/80">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                <span>{product.rating || '4.5'}</span>
              </div>
            )}
          </div>

          <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 mt-1 leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {product.title}
          </h4>

          {/* Pricing */}
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              ₹{product.sellingPrice?.toLocaleString('en-IN')}
            </span>
            {product.mrpPrice && product.mrpPrice > product.sellingPrice && (
              <span className="text-[11px] text-slate-400 line-through">
                ₹{product.mrpPrice?.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Variants and Seller snippets */}
          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
            {product.variants && product.variants.length > 0 ? (
              <span className="truncate">
                Sizes: {product.variants.map((v) => v.variantName).join(', ')}
              </span>
            ) : (
              <span>Standard</span>
            )}
            {product.sellerName && (
              <span className="truncate max-w-[90px] text-right font-medium">
                {product.sellerName}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleView}
            aria-label={`View details for ${product.title}`}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <Eye className="w-3 h-3" />
            <span>Details</span>
          </button>

          {product.inStock && (
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={adding || added}
              aria-label={`Add size ${size} of ${product.title} to cart`}
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Added</span>
                </>
              ) : adding ? (
                <span>Adding...</span>
              ) : (
                <>
                  <ShoppingBag className="w-3 h-3" />
                  <span>+ Cart</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
