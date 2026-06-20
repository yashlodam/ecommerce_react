import React from 'react'

function SimilarProductCard() {
  return (
    <div className="group px-4 relative">
      <div className="card"
      
      >

        <img className="card-media object-top"
        src="https://rukminim2.flixcart.com/image/958/958/xif0q/shirt/k/o/j/-original-imahgfmxfkffnaz2.jpeg?q=90" alt=""
    
        />
        
          
    </div>
    <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
      <div className="name">
        <h1>Levis</h1>
        <p>T-Shirt</p>

      </div>
      <div className="price flex items-center gap-3">
        <span className="font-semibold text-gray-800">
          ₹ 400
        </span>
        <span className=".thin-line-through text-gray-400">
          ₹ 999
        </span>
        <span className="text-primary font-semibold">
          60%
        </span>
      </div>

    </div>
    </div>
  )
}

export default SimilarProductCard