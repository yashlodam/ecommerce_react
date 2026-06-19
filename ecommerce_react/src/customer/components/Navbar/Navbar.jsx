import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Icon from '@mui/material/Icon';
import StoreIcon from '@mui/icons-material/Store';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CategorySheet from './CategorySheet';
import { mainCategory } from '../../../data/category/mainCategory';
function Navbar() {

    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

    const [selectedCategory,setSelectedCategory] = useState('');
    const [showCategorySheet,setShowCategorySheet] = useState();

  return (
    <>
        <Box className="sticky top-0 left-0 right-0 bg-white" sx = {{zIndex:2}}>
            <div className='flex items-center justify-between px-5 lg:px-20 h-[70px] border-b'>
                <div className='flex items-center gap-4 lg:gap-10'>
                    <div className='flex items-center gap-2'>
                      { !isLarge && (
                        <IconButton>
                            <MenuIcon/>
                        </IconButton>
                      )}
                        <h1 className='logo cursor-pointer text-lg md:text-2xl text-[#00927c]'>
                            ShopSphere
                        </h1>
                    </div>
                    
                        <ul className='flex gap-2 lg:gap-4 items-center font-medium text-gray-800'>
                        {mainCategory.map((item,index)=>{
                            return(
                        <li
                            key={index}
                            onMouseLeave={()=>setShowCategorySheet(false)}
                            onMouseEnter={()=>{setSelectedCategory(item.categoryId)
                            setShowCategorySheet(true)}}
                             className="mainCategory hover:text-primary hover:border-b-2 h-[70px] px-4 border-primary flex items-center cursor-pointer"
                             >
                             {item.name}
                          </li>
                            )
                        })}
                    </ul>
                    
                    
                </div>
                <div className='flex gap-1 lg:gap-6 items-center '>
                    <IconButton>
                        <SearchIcon></SearchIcon>
                    </IconButton>
                    {
                        false?<Button className='flex items-center gap-2'>
                            <Avatar
                              sx={{ width: 29, height: 29 }}
                          src="https://yt3.ggpht.com/IQswhTaRAllO-9swJEwsLX3NO0OK_SrLrOFlTfLsjqrAwez9cSQ4cNOac0Ox9reNMsCOhg0hUA=s88-c-k-c0x00ffffff-no-rj"
                           />

                     <h1 className="font-semibold hidden lg:block">Zosh</h1>

                        
                            
                        </Button>:<Button variant='contained'>Login</Button>
                    }
                    <IconButton>
                        <FavoriteBorderIcon sx={{fontSize:29}}/>
                    </IconButton>
                    <IconButton>
                        <AddShoppingCartIcon className='text-gray-700' sx={{fontSize:29}}/>
                    </IconButton>
                    {isLarge && <Button  startIcon={<StoreIcon/>} variant='outlined'>Become Seller</Button>
                    }
                </div>
            </div>

            {
            showCategorySheet &&  <div 
            onMouseLeave={()=>setShowCategorySheet(false)}
            onMouseOver={()=>setShowCategorySheet(true)}   
            className='categorySheet absolute top-[4.41rem] left-20 right-20 '  >
                 
                <CategorySheet selectedCategory={selectedCategory} setShowSheet={setShowCategorySheet}/>
            </div>
            }
        </Box>
    </>
  )
}

export default Navbar;