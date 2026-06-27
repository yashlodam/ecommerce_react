import React from 'react';
import Divider from '@mui/material/Divider';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useAppSelector } from '../../../State/Store';

function PricingCrd() {

  const {cart} = useAppSelector(store=>store);
  console.log(cart)

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-5 sticky top-5">


      {/* Price Details */}
      <div>
        <h2 className="font-semibold text-lg mb-4">
          Price Details
        </h2>

        <div className="space-y-3 text-sm">

          <div className="flex justify-between">
            <span className="text-gray-600">Price ({cart.cart?.totalItem})</span>
            <span>₹{cart.cart?.totalMrpPrice}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600">- ₹{cart.cart?.totalMrpPrice - cart.cart?.totalSellingPrice}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Charges</span>
            <span className="text-green-600">FREE</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Platform Fee</span>
            <span>FREE</span>
          </div>

        </div>

        <Divider className="!my-4" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total Amount</span>
          <span>₹{cart.cart?.totalSellingPrice}</span>
        </div>

        <p className="text-green-600 text-sm font-medium mt-3">
          You will save ₹{cart.cart?.totalMrpPrice-cart.cart?.totalSellingPrice} on this order
        </p>
      </div>

    </div>
  );
}

export default PricingCrd;