import TextField from '@mui/material/TextField';
import React from 'react';
import Box from '@mui/material/Box';

function BecomeSellerFormStep1({ formik }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "750px",
        mx: "auto",
        mt: { xs: 2, md: 4 },
        p: { xs: 3, sm: 4, md: 5 },
        backgroundColor: "#fff",
        borderRadius: "20px",
        boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
        border: "1px solid #f1f5f9",
      }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Contact Details
        </h2>

        <p className="text-sm md:text-base text-gray-500 mt-3">
          Provide your mobile number and GST details to continue
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-6 md:gap-8">
        <TextField
          fullWidth
          name="mobile"
          label="Mobile Number"
          variant="outlined"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
              backgroundColor: "#fafafa",
              transition: "all .3s ease",

              "&:hover": {
                backgroundColor: "#fff",
              },

              "&.Mui-focused": {
                backgroundColor: "#fff",
              },
            },
          }}
        />

        <TextField
          fullWidth
          name="gstin"
          label="GSTIN Number"
          variant="outlined"
          value={formik.values.gstin}
          onChange={formik.handleChange}
          error={formik.touched.gstin && Boolean(formik.errors.gstin)}
          helperText={formik.touched.gstin && formik.errors.gstin}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
              backgroundColor: "#fafafa",
              transition: "all .3s ease",

              "&:hover": {
                backgroundColor: "#fff",
              },

              "&.Mui-focused": {
                backgroundColor: "#fff",
              },
            },
          }}
        />
      </div>
    </Box>
  );
}

export default BecomeSellerFormStep1;