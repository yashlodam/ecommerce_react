import React from 'react'
import { useFormik } from "formik";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from "@mui/material/Box";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AddNewCouponForm() {

 const formik = useFormik({
  initialValues: {
    code: "",
    discountPercentage: 0,
    validityStartDate: null,
    validityEndDate: null,
    minimumOrderValue: 0,
  },

  onSubmit: (values) => {
    console.log("form submited",values)
    const formattedValues = {
      ...values,
      validityStartDate: values.validityStartDate
        ? values.validityStartDate.toISOString()
        : null,
      validityEndDate: values.validityEndDate
        ? values.validityEndDate.toISOString()
        : null,
    };

    console.log("Form submitted", formattedValues);
  },
});

  return (
    <div>
      <h1 className='text-2xl font-bold text-primary pb-5 text-center'>Create New Coupon</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component={"form"} onSubmit={formik.hanndleSubmit} sx={{mt:3}}>
        <Grid container spacing={2}>
          <Grid size={{xs:12,sm:6}}>
            <TextField
            fullWidth
            name='code'
            label='Coupon Code'
            value={formik.values.code}
            onChange={formik.handleChange}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
            />

            
          </Grid>

          <Grid size={{xs:12,sm:6}}>
            <TextField
            fullWidth
            name='discountPercentage'
            label='Discount Percentage'
            value={formik.values.discountPercentage}
            onChange={formik.handleChange}
            error={formik.touched.discountPercentage && Boolean(formik.errors.discountPercentage)}
            helperText={formik.touched.discountPercentage && formik.errors.discountPercentage}
            />

            
          </Grid>
           <Grid size={{xs:12,sm:6}}>
            
            <DatePicker
            sx={{width:"100%"}}
            label="Validity Start Date"
            name='validityStartDate'
            onChange={formik.handleChange}
            value={formik.values.validityStartDate}
            />
            
          </Grid>

           <Grid size={{xs:12,sm:6}}>
            
            <DatePicker
            sx={{width:"100%"}}
            label="Validity End Date"
            name='validityEndDate'
            onChange={formik.handleChange}
            value={formik.values.validityEndDate}
            />
            
          </Grid>

          <Grid size={{xs:12}}>
            <TextField
            fullWidth
            name='minimumOrderValue'
            label='Minimum Order Value'
            value={formik.values.minimumOrderValue}
            onChange={formik.handleChange}
            error={formik.touched.minimumOrderValue && Boolean(formik.errors.minimumOrderValue)}
            helperText={formik.touched.minimumOrderValue && formik.errors.minimumOrderValue}
            />

            
          </Grid>

          <Grid size={{xs:12}}>
            <Button variant='contained' fullWidth sx={{py:".8rem"}}> 
              Create Coupon
            </Button>
          </Grid>

          
        </Grid>

      </Box>
    </LocalizationProvider>
    </div>
  )
}

export default AddNewCouponForm