import Button from '@mui/material/Button'
import { teal } from '@mui/material/colors'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import React from 'react'

function FilterSerction() {
  return (
    <div className='-z-50 space-y-5 bg-white'>
      <div className='flex items-center justify-between h-[40px] px-9 lg:border-r'>

        <p className='text-lg font-semibold'>Filter</p>
        <Button size='small' className='text-teal-600 cursor-pointer font-semibold'>
          Clear all
        </Button>
        <Divider/>
        
      </div>
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
    name="color"
  >
    <FormControlLabel value="female" control={<Radio />} label="Female" />
    <FormControlLabel value="male" control={<Radio />} label="Male" />
    <FormControlLabel value="other" control={<Radio />} label="Other" />
  </RadioGroup>
</FormControl>
        </section>
    </div>
  )
}

export default FilterSerction