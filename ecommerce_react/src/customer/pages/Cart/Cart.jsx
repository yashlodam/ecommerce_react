import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import PricingCrd from './PricingCrd'
import { useNavigate } from 'react-router-dom';

import { store, useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchUserCart } from '../../../State/customer/CartSlice';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function Cart() {

  const [couponCode, setCouponCode] = useState("")

  const [couponApplied, setCouponApplied] = useState(false);

  
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;

    // API call here

    setCouponApplied(true);
  };
  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponCode("");
  };

  const handleChange = (e) => {
    setCouponCode(e.target.value)
  }

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(store => store)

  const cartItems = cart.cart?.cartItems || [];


  useEffect(() => {
    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""))
  }, [])

  return (
    <div className='pt-10 px-5 sm:px-10 md:px-60 min-h-screen'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
        <div className="cartItemSection lg:col-span-2 space-y-3">

          {cartItems.length === 0 ? (

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[70vh] flex items-center justify-center">

              <div className="text-center px-6">

                <div className="w-28 h-28 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                  <ShoppingCartOutlinedIcon
                    sx={{
                      fontSize: 65,
                      color: "#9ca3af",
                    }}
                  />
                </div>

                <h1 className="mt-6 text-3xl font-bold text-gray-800">
                  Your Cart is Empty
                </h1>

                <p className="mt-3 text-gray-500 max-w-sm mx-auto">
                  Looks like you haven't added anything to your cart yet.
                  Browse our latest collections and discover products you'll love.
                </p>

                <button
                  onClick={() => navigate("/")}
                  className="cursor-pointer mt-8 px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300"
                >
                  Continue Shopping
                </button>

              </div>

            </div>

          ) : (

            cartItems.map((item) => (
              <CartItem item={item} />
            ))

          )}
        
      </div>
     {cart.cart?.cartItems?.length > 0 && (
 <div className='col-span-1 sticky top-5 h-fit text-sm space-y-3'>
        <div className="col-span-1 rounded-xl bg-white shadow-sm p-5 space-y-5">

          {/* Apply Offer Section */}
          <div>
            <h2 className="font-semibold text-lg mb-3">Apply Offer</h2>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={handleChange}
                disabled={couponApplied}
                className={`flex-1 border rounded-lg px-3 py-2 outline-none transition-all ${couponApplied
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'focus:ring-2 focus:ring-blue-500'
                  }`}
              />

              {!couponApplied ? (
                <button
                  onClick={handleApplyCoupon}
                  className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Apply
                </button>
              ) : (
                <button
                  onClick={handleRemoveCoupon}
                  className="border border-red-200 text-red-600 px-5 py-2 rounded-lg hover:bg-red-50 transition"
                >
                  Remove
                </button>
              )}
            </div>

            {couponApplied && (
              <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm font-semibold text-green-700">
                  ✓ Coupon Applied Successfully
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Discount has been applied to your order.
                </p>
              </div>
            )}
          </div>

          {/* Available Offers */}
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm font-medium text-green-700">
                SAVE20
              </p>
              <p className="text-xs text-green-600">
                Get 20% off on orders above ₹999
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm font-medium text-blue-700">
                FREESHIP
              </p>
              <p className="text-xs text-blue-600">
                Free delivery on orders above ₹499
              </p>
            </div>
          </div>

        </div>
        <PricingCrd />
        {/* Checkout Button */}
        <button onClick={() => navigate("/checkout")} className="w-full cursor-pointer bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
          Proceed to Checkout
        </button>
      </div>
     )
}
    </div>
    </div >
  )
}

export default Cart