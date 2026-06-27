export const sumCartItemMrpPrice = (cartItems)=>{
    return cartItems.reduce((acc,item)=> acc+item.mrpPrice*item.quantity,0);
}