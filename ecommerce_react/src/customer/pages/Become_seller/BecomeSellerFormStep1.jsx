import TextField from '@mui/material/TextField'
import React from 'react'

function BecomeSellerFormStep1({formik}) {
  return (
    <Box>
        <p className='text-xl font-bold text-center pb-9'>Contact Details</p>
        <div>
            <TextField
            fullWidth
            name='mobile'
            label="Mobile"
            value={formik.value.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
            />
        </div>
    </Box>
  )
}

export default BecomeSellerFormStep1