import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function BecomeSellerFormStep4({ formik }) {
  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      backgroundColor: "#fafafa",
      transition: "all .3s ease",

      "& fieldset": {
        borderColor: "#e5e7eb",
      },

      "&:hover fieldset": {
        borderColor: "#14b8a6",
      },

      "&.Mui-focused fieldset": {
        borderWidth: "2px",
        borderColor: "#14b8a6",
      },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#14b8a6",
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "850px",
        mx: "auto",
        mt: { xs: 1, md: 3 },
        p: { xs: 3, sm: 4, md: 5 },
        backgroundColor: "#fff",
        borderRadius: "24px",
        border: "1px solid #f1f5f9",
        boxShadow: `
          0px 4px 6px rgba(0,0,0,0.04),
          0px 10px 20px rgba(0,0,0,0.06)
        `,
      }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-50 flex items-center justify-center">
          <span className="text-2xl">🏪</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Business Information
        </h2>

        <p className="text-gray-500 text-sm md:text-base mt-3 max-w-md mx-auto">
          Provide your business and account details to complete seller
          registration.
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-6">
        <TextField
          fullWidth
          name="businessDetails.businessName"
          label="Business Name"
          value={formik.values.businessDetails.businessName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.businessDetails?.businessName &&
            Boolean(formik.errors.businessDetails?.businessName)
          }
          helperText={
            formik.touched.businessDetails?.businessName &&
            formik.errors.businessDetails?.businessName
          }
          sx={fieldStyle}
        />

        <TextField
          fullWidth
          name="sellerName"
          label="Seller Name"
          value={formik.values.sellerName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.sellerName &&
            Boolean(formik.errors.sellerName)
          }
          helperText={
            formik.touched.sellerName &&
            formik.errors.sellerName
          }
          sx={fieldStyle}
        />

        <TextField
          fullWidth
          type="email"
          name="email"
          label="Email Address"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.email &&
            Boolean(formik.errors.email)
          }
          helperText={
            formik.touched.email &&
            formik.errors.email
          }
          sx={fieldStyle}
        />

        <TextField
          fullWidth
          type="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.password &&
            Boolean(formik.errors.password)
          }
          helperText={
            formik.touched.password &&
            formik.errors.password
          }
          sx={fieldStyle}
        />
      </div>
    </Box>
  );
}

export default BecomeSellerFormStep4;