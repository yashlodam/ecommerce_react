import React from 'react'
import DrawerList from './DrawerList'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddIcon from '@mui/icons-material/Add';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';



 const menu = [
            {
                name:"Dashboard",
                path:"/seller",
                icon:<DashboardIcon className="text-primary"/>,
                activeIcon:<DashboardIcon className="text-white"/>,
            },
            // {
            //     name:"Seller",
            //     path:"/seller/orders",
            //     icon:<ShoppingBagIcon className="text-primary"/>,
            //     activeIcon:<ShoppingBagIcon className="text-white"/>,
            // },
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

function SellerDrawerList({toggleDrawer}) {
  
  return (
   
        <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer}/>
    
  )
}

export default SellerDrawerList 