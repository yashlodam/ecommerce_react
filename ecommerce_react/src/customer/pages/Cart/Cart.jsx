import React from 'react'
import CartItem from './CartItem'

function Cart() {
  return (
    <div className='pt-10 px-5 sm:px-10 md:px-60 min-h-screen'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
            <div className='cartItemSection lg:col-span-2 space-y-3'>
                {[1,1,1,1,1,1].map((item)=> <CartItem/>)}
            </div>
            <div className='col-span-1 text-sm space-y-3 border'>
                <div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart