import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';import React from 'react';

function ReviewCard() {
  const handleDelete = () => {
    alert("Review Deleted");
    // Call your API here
  };

  return (
    <div className="flex gap-4 p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition ">

      {/* User Avatar */}
      <Avatar
        sx={{
          width: 56,
          height: 56,
          bgcolor: "#9155FD"
        }}
      >
        Z
      </Avatar>

      {/* Review Content */}
      <div className="flex-1">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              Zosh User
            </h3>

            <p className="text-sm text-gray-500">
              20 June 2026
            </p>
          </div>

          <IconButton
            size="small"
            onClick={handleDelete}
            className="hover:bg-red-50"
          >
            <DeleteIcon className="text-red-500" />
          </IconButton>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <Rating
            value={4.5}
            precision={0.5}
            readOnly
            size="small"
          />

          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
            4.5 ★
          </span>
        </div>

        {/* Review Text */}
        <p className="mt-3 text-gray-700 leading-relaxed">
          Excellent product quality. Fabric is comfortable and the fitting is
          perfect. Delivery was quick and packaging was excellent. Highly
          recommended for anyone looking for premium quality clothing.
        </p>

        {/* Review Images */}
        <div className="flex gap-3 mt-4 flex-wrap">

          <img
            src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300"
            alt="review"
            className="w-24 h-24 object-cover rounded-lg border hover:scale-105 transition duration-200"
          />

          <img
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300"
            alt="review"
            className="w-24 h-24 object-cover rounded-lg border hover:scale-105 transition duration-200"
          />

          <img
            src="https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=300"
            alt="review"
            className="w-24 h-24 object-cover rounded-lg border hover:scale-105 transition duration-200"
          />

        </div>
      </div>
    </div>
  );
}

export default ReviewCard;