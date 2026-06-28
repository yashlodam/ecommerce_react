import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";

function OrderItem({item,order}) {
  console.log(item)
  console.log(order)
  const navigate = useNavigate();
  return (
    <div onClick={()=> navigate(`/account/order/${order.id}/${item.id}`)} className="border rounded-xl overflow-hidden bg-white hover:shadow-md transition-all duration-300">
      
      {/* Order Status */}
      <div className="flex items-center gap-3 px-5 py-4 border-b bg-gray-50">
        <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white">
          <LocalShippingIcon fontSize="small" />
        </div>

        <div>
          <h3 className="font-bold text-green-600 uppercase tracking-wide">
            {order.orderStatus}
          </h3>
         <p className="text-sm text-gray-500">
  Arriving by{" "}
  {new Date(order.deliverDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}
</p>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 bg-teal-50/40">
        <div className="flex gap-4">
          
          {/* Image */}
          <img
            src={item.product.images[0]}
            className="w-20 h-20 object-cover rounded-lg border"
          />

          {/* Details */}
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900 text-lg">
              {item.product.seller.businesssDetails.businessName}
            </h2>

            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {item.product.description}
            </p>

            <div className="flex flex-wrap gap-4 mt-3 text-sm">
              <p>
                <span className="font-semibold">Size:</span> {item.product.Sizes}
              </p>

              <p>
                <span className="font-semibold">Color:</span> {item.product.color}
              </p>

              <p>
                <span className="font-semibold">Qty:</span> {item.quantity}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default OrderItem;