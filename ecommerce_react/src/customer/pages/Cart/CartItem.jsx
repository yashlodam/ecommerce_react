import React from 'react'

function CartItem() {
  return (
    <div className='border rounded-md relative'>
        <div className='p-5 flex gap-3'>
            <div>
                <img className='w-[90px] rounded-md' src="https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/n/x/c/xl-met-shirt1408-metronaut-original-imahgrb99ffhkdyg.jpeg?q=70" alt="" />
            </div>
            <div className='space-y-2'>
                <h1 className='font-semibold text-lg'>Virani Clothing</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti optio molestias minima, adipisci necessitatibus eum commodi aspernatur tempora, omnis laboriosam eius impedit aut id aperiam ducimus. Qui quae ducimus harum.</p>
            </div>
        </div>
    </div>
  )
}

export default CartItem