import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Star } from 'lucide-react';
import { useAppDispatch } from '../../../State/Store';
import { closeChat } from '../../../State/customer/ChatSlice';

export default function ProductCardChat({ product }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (!product) return null;

  const defaultVariant = product.variants?.find((v) => v.default) || product.variants?.[0];
  const isInStock =
    product.inStock !== false &&
    (product.quantity == null || product.quantity > 0) &&
    (defaultVariant ? (defaultVariant.quantity == null || defaultVariant.quantity > 0) : true);
  const imageUrl =
    product.images?.[0] ||
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80';

  const handleView = () => {
    dispatch(closeChat());
    const categoryId = product.categoryName || 'all';
    navigate(`/product-details/${encodeURIComponent(categoryId)}/${product.id}`);
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
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-lg hover:border-teal-500/60 dark:hover:border-teal-500/60 transition-all duration-200 cursor-pointer w-[205px] min-[375px]:w-[220px] sm:w-[245px] text-left shrink-0 snap-start focus:outline-none focus:ring-2 focus:ring-teal-500"
    >
      {/* Thumbnail Stage */}
      <div className="relative w-full h-28 min-[375px]:h-32 bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-2 overflow-hidden border-b border-slate-100 dark:border-slate-800">
        <img
          src={imageUrl}
          alt={product.title}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
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
            isInStock
              ? 'bg-emerald-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {isInStock ? 'In Stock' : 'Out of Stock'}
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
        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleView}
            aria-label={`View details for ${product.title}`}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Product Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}
