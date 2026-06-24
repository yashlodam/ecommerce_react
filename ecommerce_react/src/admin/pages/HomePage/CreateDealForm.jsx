import React from 'react'
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


function CreateDealForm() {

     const formik = useFormik({
        initialValues:{
            discount:0,
            category:"",


        },
        onSubmit: (values)=>{
            console.log("submit",values)
        }
       })
  return (
    <Box
  component="form"
  onSubmit={formik.handleSubmit}
  sx={{
    maxWidth: 500,
    mx: "auto",
    p: 4,
    bgcolor: "white",
    borderRadius: 3,
    boxShadow: 3,
    display: "flex",
    flexDirection: "column",
    gap: 3,
  }}
>
  <Typography
    variant="h4"
    align="center"
    sx={{
      fontWeight: 600,
      color: "primary.main",
      mb: 1,
    }}
  >
    Create Deal
  </Typography>

  <TextField
    fullWidth
    name="discount"
    label="Discount (%)"
    type="number"
    value={formik.values.discount}
    onChange={formik.handleChange}
    error={formik.touched.discount && Boolean(formik.errors.discount)}
    helperText={formik.touched.discount && formik.errors.discount}
  />

  <FormControl fullWidth>
    <InputLabel>Category</InputLabel>
    <Select
      name="category"
      value={formik.values.category}
      label="Category"
      onChange={formik.handleChange}
    >
      <MenuItem value="electronics">Electronics</MenuItem>
      <MenuItem value="fashion">Fashion</MenuItem>
      <MenuItem value="books">Books</MenuItem>
    </Select>
  </FormControl>

  <Button
    fullWidth
    type="submit"
    variant="contained"
    size="large"
    sx={{
      py: 1.5,
      borderRadius: 2,
      textTransform: "none",
      fontSize: "1rem",
      fontWeight: 600,
    }}
  >
    Create Deal
  </Button>
</Box>
  )
}

export default CreateDealForm