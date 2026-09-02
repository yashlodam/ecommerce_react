import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

function BecomeSellerFormStep3({ formik }) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1 mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Bank Account Details
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Enter your settlement bank account to receive automated payouts from completed orders
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
            Account Number
          </label>
          <TextField
            fullWidth
            size="medium"
            name="bankDetails.accountNumber"
            placeholder="e.g. 123456789012"
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceOutlinedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
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
            IFSC Code
          </label>
          <TextField
            fullWidth
            size="medium"
            name="bankDetails.ifscCode"
            placeholder="11-character IFSC (e.g. HDFC0001234)"
            value={formik.values.bankDetails.ifscCode}
            onChange={(e) => formik.setFieldValue("bankDetails.ifscCode", e.target.value.toUpperCase())}
            onBlur={formik.handleBlur}
            error={
              formik.touched.bankDetails?.ifscCode &&
              Boolean(formik.errors.bankDetails?.ifscCode)
            }
            helperText={
              formik.touched.bankDetails?.ifscCode &&
              formik.errors.bankDetails?.ifscCode
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeOutlinedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
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
            Account Holder Name
          </label>
          <TextField
            fullWidth
            size="medium"
            name="bankDetails.accountHoldername"
            placeholder="Name as registered with bank"
            value={formik.values.bankDetails.accountHoldername}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.bankDetails?.accountHoldername &&
              Boolean(formik.errors.bankDetails?.accountHoldername)
            }
            helperText={
              formik.touched.bankDetails?.accountHoldername &&
              formik.errors.bankDetails?.accountHoldername
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineOutlinedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
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

export default BecomeSellerFormStep3;