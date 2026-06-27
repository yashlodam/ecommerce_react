export const sumCartItemSellingPrice = (cartItems)=>{
    return cartItems.reduce((acc,item)=> acc+item.sellingPrice*item.quantity,0)
}