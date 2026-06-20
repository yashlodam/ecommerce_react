import React from 'react';
import Divider from '@mui/material/Divider';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

function PricingCrd() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-5 sticky top-5">


      {/* Price Details */}
      <div>
        <h2 className="font-semibold text-lg mb-4">
          Price Details
        </h2>

        <div className="space-y-3 text-sm">

          <div className="flex justify-between">
            <span className="text-gray-600">Price (3 items)</span>
            <span>₹3,499</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600">- ₹700</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Charges</span>
            <span className="text-green-600">FREE</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Platform Fee</span>
            <span>₹10</span>
          </div>

        </div>

        <Divider className="!my-4" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total Amount</span>
          <span>₹2,809</span>
        </div>

        <p className="text-green-600 text-sm font-medium mt-3">
          You will save ₹700 on this order
        </p>
      </div>

      {/* Checkout Button */}
      <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
        Proceed to Checkout
      </button>

    </div>
  );
}

export default PricingCrd;