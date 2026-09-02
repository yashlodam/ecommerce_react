import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

function BecomeSellerFormStep1({ formik }) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1 mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Contact Details
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Provide your primary mobile number and registered GSTIN details
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
            Mobile Number
          </label>
          <TextField
            fullWidth
            size="medium"
            name="mobile"
            placeholder="10-digit mobile number"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneOutlinedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                fontSize: "14px",
                bgcolor: "background.paper",
              },
            }}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
            GSTIN Number
          </label>
          <TextField
            fullWidth
            size="medium"
            name="gstin"
            placeholder="15-character GSTIN (e.g. 27ABCDE1234F1Z5)"
            value={formik.values.gstin}
            onChange={(e) => formik.setFieldValue("gstin", e.target.value.toUpperCase())}
            onBlur={formik.handleBlur}
            error={formik.touched.gstin && Boolean(formik.errors.gstin)}
            helperText={formik.touched.gstin && formik.errors.gstin}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ReceiptLongOutlinedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                fontSize: "14px",
                bgcolor: "background.paper",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BecomeSellerFormStep1;