import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../seller/pages/SellerDashboard/Dashboard'
import Products from '../seller/pages/Products/Products'
import AddProduct from '../seller/pages/Products/AddProduct'
import Profile from '../seller/pages/Account/Profile'
import Transaction from '../seller/pages/Payment/Transaction'
import Payment from '../seller/pages/Payment/Payment'
import Orders from '../seller/pages/Orders/Orders'




function SellerRoute() {
  return (
    <div>
        <Routes>

        <Route path='/*' element= {<Dashboard/>} />
        <Route path='/products' element= {<Products/>} />
        <Route path='/add-products' element= {<AddProduct/>} />
        <Route path='/orders' element= {<Orders/>} />
        <Route path='/account' element= {<Profile/>} />
        <Route path='/payment' element= {<Payment/>} />
        <Route path='/transaction' element= {<Transaction/>} />



        </Routes>
    </div>
  )
}

export default SellerRoute