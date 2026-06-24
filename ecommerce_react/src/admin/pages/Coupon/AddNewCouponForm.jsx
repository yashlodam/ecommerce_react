import React from 'react'
import { useFormik } from "formik";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from "@mui/material/Box";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

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
        </Grid>

      </Box>
    </LocalizationProvider>
    </div>
  )
}

export default AddNewCouponForm