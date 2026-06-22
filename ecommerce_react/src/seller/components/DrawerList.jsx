import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddIcon from '@mui/icons-material/Add';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';

function DrawerList({menu,menu2,toggleDrawer}) {

    
  return (
    <div className='h-full'>
        <div className='flex flex-col justify-between h-full w-[300px] border-r py-5'>

            <div>
                <div className='space-y-2'>

         {
            menu.map((item,index)=>{
                <div key={index}>
                    <p>
                       <ListItemIcon>
                        {item.icon}
                        </ListItemIcon> 
                        ListItemIcon
                    </p>
                </div>
            })
         }

                </div>
            </div>

        </div>
    </div>
  )
}

export default DrawerList