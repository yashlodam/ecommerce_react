import Button from '@mui/material/Button'
import { teal } from '@mui/material/colors'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import React, { useState } from 'react'
import { color } from '../../../data/filter/color'
import { border } from '@mui/system'
import { useSearchParams } from "react-router-dom";
import { price } from '../../../data/filter/price'
import { discount } from '../../../data/filter/discount'
import { brand } from '../../../data/filter/brand'

function FilterSerction() {

  const [expendColor,setExpendColor] = useState(false);
  const [expendBrand,setExpendBrand] = useState(false);

  const[searchParams,setSearchParams] = useSearchParams();

  const handleExpandColor = ()=>{
    setExpendColor(()=> setExpendColor(!expendColor));
    setExpendBrand(()=> setExpendBrand(!expendBrand))
  }

  const updateFilterParams = (e)=>{

    const {value,name} = e.target;
    console.log(value,name);
    if(value){
      searchParams.set(name,value);

    } else{
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  }


  const clearAllFilter = ()=>{
    console.log("clearFilter",searchParams)
    searchParams.forEach((value,key)=>{
      searchParams.delete(key);
    });
    setSearchParams(searchParams)
  }

  return (
    <div className='-z-50 space-y-5 bg-white h-screen overflow-y-auto custom-scrollbar'>
      <div className='flex items-center justify-between h-[40px] px-9 lg:border-r'>

        <p className='text-lg font-semibold'>Filter</p>
        <Button size='small' className='text-teal-600 cursor-pointer font-semibold' onClick={clearAllFilter}>
          Clear all
        </Button>
        </div>
        <Divider/>
        <div className='px-9 space-y-6'>
          <section>
          <FormControl>
  <FormLabel
  sx={{fontSize:"16px",
    fontWeight:"bold",
    color:teal[500],
    pb:"14px"
  }}
   className='text-2xl font-semibold' id='color' >Color</FormLabel>
  <RadioGroup
    aria-labelledby="color"
    defaultValue=""
    onChange={updateFilterParams}
    name="color"
  >
    {color.slice(0,expendColor?color.length:5).map((item,key)=> <FormControlLabel value={item.name} control={<Radio />} label={<div className='flex items-center gap-3'>
      <p>{item.name}</p>
      <p style={{backgroundColor:item.hex}} 
      className={`h-5 w-5 rounded-full ${item.name==="White"?"border":""}`}>

      </p>
    </div>} />)}
    
  </RadioGroup>
      </FormControl>
      <div>
        <button onClick={handleExpandColor} className='text-primary cursor-pointer hover:text-teal-900 flex items-center'>
          {expendColor?"hide":`+${color.length-5} more`}
        </button>
      </div>
        </section>

        <section>
          <FormControl>
  <FormLabel
  sx={{fontSize:"16px",
    fontWeight:"bold",
    color:teal[600],
    pb:"14px",
    color: teal[600],
  }}
   className='text-2xl font-semibold' id='price' >Price</FormLabel>
  <RadioGroup
    aria-labelledby="price"
    onChange={updateFilterParams}
    defaultValue=""
    name="price"
  >
    {price.slice(0,expendColor?color.length:5).map((item,key)=> <FormControlLabel value={item.name} control={<Radio />} label={<div className='flex items-center gap-3'>
      <p>{item.name}</p>
      <p style={{backgroundColor:item.hex}} 
      >

      </p>
    </div>} />)}
    
  </RadioGroup>
      </FormControl>
        </section>
        
          <section>
          <FormControl>
  <FormLabel
  sx={{fontSize:"16px",
    fontWeight:"bold",
    color:teal[600],
    pb:"14px",
    color: teal[600],
  }}
   className='text-2xl font-semibold' id='price' >Discount</FormLabel>
  <RadioGroup
    aria-labelledby="price"
    onChange={updateFilterParams}
    defaultValue=""
    name="discount"
  >
    {discount.slice(0,expendColor?color.length:5).map((item,key)=> <FormControlLabel value={item.name} control={<Radio />} label={<div className='flex items-center gap-3'>
      <p>{item.name}</p>
      <p style={{backgroundColor:item.hex}} 
      >

      </p>
    </div>} />)}
    
  </RadioGroup>
      </FormControl>
        </section>
         <section>
          <FormControl>
  <FormLabel
  sx={{fontSize:"16px",
    fontWeight:"bold",
    color:teal[600],
    pb:"14px",
    color: teal[600],
  }}
   className='text-2xl font-semibold' id='price' >Price</FormLabel>
  <RadioGroup
    aria-labelledby="price"
    onChange={updateFilterParams}
    defaultValue=""
    name="brand"
  >
    {brand.slice(0,expendBrand?brand.length:5).map((item,key)=> <FormControlLabel value={item.name} control={<Radio />} label={<div className='flex items-center gap-3'>
      <p>{item.name}</p>
      <p style={{backgroundColor:item.hex}} 
      >

      </p>
    </div>} />)}
    
  </RadioGroup>
      </FormControl>
      <div>
        <button onClick={handleExpandColor} className='text-primary cursor-pointer hover:text-teal-900 flex items-center'>
          {expendBrand?"hide":`+${brand.length-5} more`}
        </button>
      </div>
        </section>

        </div>
      
      
    </div>
  )
}

export default FilterSerction