import TextField from '@mui/material/TextField'
import React from 'react'
import Box from '@mui/material/Box';


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

            <TextField
            fullWidth
            name='GSTIN'
            label="GSTIN"
            value={formik.value.GSTIN}
            onChange={formik.handleChange}
            error={formik.touched.GSTIN && Boolean(formik.errors.GSTIN)}
            helperText={formik.touched.GSTIN && formik.errors.GSTIN}
            />
        </div>
    </Box>
  )
}

export default BecomeSellerFormStep1