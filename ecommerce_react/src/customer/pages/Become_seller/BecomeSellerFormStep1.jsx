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
          name="mobile"
          label="Mobile"
            value={formik.values.mobile}
           onChange={formik.handleChange}
           error={formik.touched.mobile && Boolean(formik.errors.mobile)}
           helperText={formik.touched.mobile && formik.errors.mobile}
           />

            <TextField
            fullWidth
            name="gstin"
            label="GSTIN"
             value={formik.values.gstin}
             onChange={formik.handleChange}
             error={formik.touched.gstin && Boolean(formik.errors.gstin)}
             helperText={formik.touched.gstin && formik.errors.gstin}
            />
        </div>
    </Box>
  )
}

export default BecomeSellerFormStep1