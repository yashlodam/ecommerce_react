import React from 'react'
import Navbar from './customer/components/Navbar/Navbar'
import { ThemeProvider } from '@emotion/react'
import customeTheme from "./Theme/customeTheme";
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/product/Product';
import { BrowserRouter } from 'react-router-dom';
import ProductDetails from './customer/pages/ProductDetails/ProductDetails';
import Review from './customer/pages/Review/Review';
import Cart from './customer/pages/Cart/Cart';
import Checkout from './customer/pages/Checkout/Checkout';
import Account from './customer/pages/Account/Account';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={customeTheme}>
        <div>
          <Navbar/>
          {/* <Home/> */}
          {/* <Product/> */}
          {/* <ProductDetails/> */}
          {/* <Cart/> */}
          {/* <Checkout/> */}
          <Account/>
        </div>
        
      </ThemeProvider>
      </BrowserRouter>

      
    
  )
}

export default App