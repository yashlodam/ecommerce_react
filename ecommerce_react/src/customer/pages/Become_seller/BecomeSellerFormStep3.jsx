import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function BecomeSellerFormStep3({ formik }) {
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
        maxWidth: "800px",
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
          <span className="text-2xl">🏦</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Bank Details
        </h2>

        <p className="text-gray-500 text-sm md:text-base mt-3 max-w-md mx-auto">
          Enter your bank account information to receive payments from orders.
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-6">
        <TextField
          fullWidth
          name="bankDetails.accountNumber"
          label="Account Number"
          value={formik.values.bankDetails.accountNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.bankDetails?.accountNumber &&
            Boolean(formik.errors.bankDetails?.accountNumber)
          }
          helperText={
            formik.touched.bankDetails?.accountNumber &&
            formik.errors.bankDetails?.accountNumber
          }
          sx={fieldStyle}
        />

        <TextField
          fullWidth
          name="bankDetails.ifscCode"
          label="IFSC Code"
          value={formik.values.bankDetails.ifscCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.bankDetails?.ifscCode &&
            Boolean(formik.errors.bankDetails?.ifscCode)
          }
          helperText={
            formik.touched.bankDetails?.ifscCode &&
            formik.errors.bankDetails?.ifscCode
          }
          sx={fieldStyle}
        />

        <TextField
          fullWidth
          name="bankDetails.accountHolderName"
          label="Account Holder Name"
          value={formik.values.bankDetails.accountHolderName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.bankDetails?.accountHolderName &&
            Boolean(formik.errors.bankDetails?.accountHolderName)
          }
          helperText={
            formik.touched.bankDetails?.accountHolderName &&
            formik.errors.bankDetails?.accountHolderName
          }
          sx={fieldStyle}
        />
      </div>
    </Box>
  );
}

export default BecomeSellerFormStep3;