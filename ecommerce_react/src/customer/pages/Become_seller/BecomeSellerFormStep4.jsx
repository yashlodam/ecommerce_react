import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function BecomeSellerFormStep4({ formik }) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1 mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Store & Account Credentials
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Set up your public brand identity and secure credentials for the seller portal
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
            Business / Store Name
          </label>
          <TextField
            fullWidth
            size="medium"
            name="businessDetails.businessName"
            placeholder="e.g. Acme Retailers"
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <StorefrontOutlinedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
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
            Primary Seller Name
          </label>
          <TextField
            fullWidth
            size="medium"
            name="sellerName"
            placeholder="Your full legal name"
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

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
            Seller Login Email
          </label>
          <TextField
            fullWidth
            size="medium"
            type="email"
            name="email"
            placeholder="seller@business.com"
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
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
            Portal Password
          </label>
          <TextField
            fullWidth
            size="medium"
            type="password"
            name="password"
            placeholder="••••••••"
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
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

export default BecomeSellerFormStep4;