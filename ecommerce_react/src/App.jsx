import React from 'react'
import Navbar from './customer/components/Navbar/Navbar'
import { ThemeProvider } from '@emotion/react'
import customeTheme from "./Theme/customeTheme";
import Home from './customer/pages/Home/Home';
function App() {
  return (
    
      <ThemeProvider theme={customeTheme}>
        <div>
          <Navbar/>
        </div>
        <Home/>
      </ThemeProvider>

      
    
  )
}

export default App