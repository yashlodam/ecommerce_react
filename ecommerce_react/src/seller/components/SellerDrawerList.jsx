import React from 'react'
import DrawerList from './DrawerList'

function SellerDrawerList() {
    const menu = [
            {
                name:"Dashboard",
                path:"/seller",
                icon:<Dashboard className="text-primary"/>,
                activeIcon:<Dashboard className="text-white"/>,
            },
            {
                name:"Seller",
                path:"/seller/orders",
                icon:<ShoppingBagIcon className="text-primary"/>,
                activeIcon:<ShoppingBagIcon className="text-white"/>,
            },
            {
                name:"Orders",
                path:"/seller/orders",
                icon:<ShoppingBagIcon className="text-primary"/>,
                activeIcon:<ShoppingBagIcon className="text-white"/>,
            },
            {
                name:"Products",
                path:"/seller/products",
                icon:<InventoryIcon className="text-primary"/>,
                activeIcon:<InventoryIcon className="text-white"/>,
            },
            {
                name:"Add Product",
                path:"/seller/add-products",
                icon:<AddIcon className="text-primary"/>,
                activeIcon:<AddIcon className="text-white"/>,
            },
            {
                name:"Payment",
                path:"/seller/payment",
                icon:<AccountBalanceWalletIcon className="text-primary"/>,
                activeIcon:<AccountBalanceWalletIcon  className="text-white"/>,
            },
            {
                name:"Transaction",
                path:"/seller/transaction",
                icon:<ReceiptIcon className="text-primary"/>,
                activeIcon:<ReceiptIcon className="text-white"/>,
            },
            
    
        ]
    
        const menu2 = [
            {
                name:"Account",
                path:"/seller/account",
                icon:<AccountBoxIcon className="text-primary"/>,
                activeIcon:<AccountBoxIcon className="text-white"/>,
            },
            {
                name:"Logout",
                path:"/",
                icon:<LogoutIcon className="text-primary"/>,
                activeIcon:<LogoutIcon className="text-white"/>,
            },
        ]
  return (
    <div>
        <DrawerList menu={menu} menu2={menu2} toggleDrawer={true}/>
    </div>
  )
}

export default SellerDrawerList