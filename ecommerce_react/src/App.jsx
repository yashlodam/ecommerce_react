import React, { useEffect } from 'react'
import Navbar from './customer/components/Navbar/Navbar'
import { ThemeProvider } from '@emotion/react'
import customeTheme from "./Theme/customeTheme";
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/product/Product';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ProductDetails from './customer/pages/ProductDetails/ProductDetails';
import Review from './customer/pages/Review/Review';
import Cart from './customer/pages/Cart/Cart';
import Checkout from './customer/pages/Checkout/Checkout';
import Account from './customer/pages/Account/Account';
import BecomeSeller from './customer/pages/Become_seller/BecomeSeller';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import Dashboard from './admin/pages/Dashboard/Dashboard';
import AdminDashboard from './admin/pages/Dashboard/Dashboard';
import { store, useAppDispatch, useAppSelector } from './State/Store';
import { fetchSellerProfile } from './State/seller/sellerSlice';



function App() {

  const dispatch = useAppDispatch();
  const {seller} = useAppSelector(store=> store)
  const navigate = useNavigate();
  

  

  return (
    
      <ThemeProvider theme={customeTheme}>
        <div>
          <Navbar/>
          

          <Routes>

            <Route path="/" element={<Home/>}/>
            <Route path='/products/:category' element={<Product/>}/>
             <Route path='/reviews/:productId' element={<Product/>}/>
              <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails/>}/>
               <Route path='/cart' element={<Cart/>}/>
                <Route path='/checkout' element={<Checkout/>}/>

                <Route path='/account/*' element={<Account/>}/>
                <Route path='/become-seller' element={<BecomeSeller/>}/>

                 <Route path='/seller/*' element={<SellerDashboard/>}/>

           <Route path='/admin/*' element={<AdminDashboard/>}/> 

                

          </Routes>

        </div>
        
      </ThemeProvider>
      

      
    
  )
}

export default App