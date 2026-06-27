import React from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

function CartItem({item}) {

  const navigate = useNavigate();
  
  const handleUpdateQuantity = () => {
    // update cart item quantity
  };

  const handleRemoveItem = () => {
    // remove item from cart
  };


  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative">

      {/* Remove Item Button */}
      <IconButton
        onClick={handleRemoveItem}
        className="!absolute top-3 right-3"
        size="small"
        sx={{
          backgroundColor: '#f5f5f5',
          '&:hover': {
            backgroundColor: '#fee2e2',
            color: '#dc2626',
          },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      {/* Product Details */}
      <div className="p-5 flex gap-4">
        <div className="flex-shrink-0" onClick={()=> navigate(`/product-details/${item.product.category?.categoryId}/${item.product.title}/${item.product.id}`)}>
          <img
            className="w-[90px] h-[110px] object-cover rounded-lg border"
            src={item.product.images[0]}
            alt="Product"
          />
        </div>

        <div className="flex-1 space-y-2 pr-10">
          <h1 className="font-semibold text-lg text-gray-900">
            {item.product.seller.businesssDetails.businessName}
          </h1>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
           {item.product.title}
          </p>

          <p className="text-gray-500 text-xs">
            <strong>Sold by:</strong>{' '}
            Natural Lifestyle Products Private Limited
          </p>

          <p className="text-sm text-green-600 font-medium">
            7 days replacement available
          </p>

          <p className="text-sm text-gray-700">
            <strong>Quantity:</strong> {item.quantity}
          </p>
        </div>
      </div>

      <Divider />

      {/* Quantity Controls */}
      <div className="px-5 py-4 flex justify-between items-center bg-gray-50">
        <div className="flex items-center gap-3">
          <Button
            onClick={handleUpdateQuantity}
            disabled={true}
            variant="outlined"
            sx={{
              minWidth: '40px',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
            }}
          >
            <RemoveIcon />
          </Button>

          <span className="font-semibold text-lg min-w-[30px] text-center">
            5
          </span>

          <Button
            onClick={handleUpdateQuantity}
            variant="outlined"
            sx={{
              minWidth: '40px',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
            }}
          >
            <AddIcon />
          </Button>
        </div>

        {/* Price Section */}
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">₹{item.sellingPrice}</p>
          <p className="text-sm text-gray-500 line-through">₹{item.mrpPrice}</p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;