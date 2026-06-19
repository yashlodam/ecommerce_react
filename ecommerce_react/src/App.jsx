import React from 'react'
import Navbar from './customer/components/Navbar/Navbar'
import { ThemeProvider } from '@emotion/react'
import customeTheme from "./Theme/customeTheme";
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/product/Product';

function App() {
  return (
    
      <ThemeProvider theme={customeTheme}>
        <div>
          <Navbar/>
          {/* <Home/> */}
          <Product/>
        </div>
        
      </ThemeProvider>

      
    
  )
}

export default App