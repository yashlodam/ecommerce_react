import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

function BecomeSellerFormStep2({ formik }) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1 mb-5">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Pickup Address
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Location where courier partners will collect your outgoing packages
        </p>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider">
              Contact / Warehouse Name
            </label>
            <TextField
              fullWidth
              size="small"
              name="pickupAddress.name"
              placeholder="e.g. Main Hub Warehouse"
              value={formik.values.pickupAddress.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.pickupAddress?.name &&
                Boolean(formik.errors.pickupAddress?.name)
              }
              helperText={
                formik.touched.pickupAddress?.name &&
                formik.errors.pickupAddress?.name
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  fontSize: "13px",
                  bgcolor: "background.paper",
                },
              }}
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider">
              Warehouse Mobile
            </label>
            <TextField
              fullWidth
              size="small"
              name="pickupAddress.mobile"
              placeholder="10-digit mobile"
              value={formik.values.pickupAddress.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.pickupAddress?.mobile &&
                Boolean(formik.errors.pickupAddress?.mobile)
              }
              helperText={
                formik.touched.pickupAddress?.mobile &&
                formik.errors.pickupAddress?.mobile
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  fontSize: "13px",
                  bgcolor: "background.paper",
                },
              }}
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider">
              Pincode
            </label>
            <TextField
              fullWidth
              size="small"
              name="pickupAddress.pincode"
              placeholder="6-digit pincode"
              value={formik.values.pickupAddress.pincode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.pickupAddress?.pincode &&
                Boolean(formik.errors.pickupAddress?.pincode)
              }
              helperText={
                formik.touched.pickupAddress?.pincode &&
                formik.errors.pickupAddress?.pincode
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  fontSize: "13px",
                  bgcolor: "background.paper",
                },
              }}
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider">
              Street Address / Building
            </label>
            <TextField
              fullWidth
              size="small"
              name="pickupAddress.address"
              placeholder="Plot No, Industrial Area / Street"
              value={formik.values.pickupAddress.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.pickupAddress?.address &&
                Boolean(formik.errors.pickupAddress?.address)
              }
              helperText={
                formik.touched.pickupAddress?.address &&
                formik.errors.pickupAddress?.address
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  fontSize: "13px",
                  bgcolor: "background.paper",
                },
              }}
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider">
              Locality / Landmark
            </label>
            <TextField
              fullWidth
              size="small"
              name="pickupAddress.locality"
              placeholder="Near Metro / Complex"
              value={formik.values.pickupAddress.locality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.pickupAddress?.locality &&
                Boolean(formik.errors.pickupAddress?.locality)
              }
              helperText={
                formik.touched.pickupAddress?.locality &&
                formik.errors.pickupAddress?.locality
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  fontSize: "13px",
                  bgcolor: "background.paper",
                },
              }}
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider">
              City
            </label>
            <TextField
              fullWidth
              size="small"
              name="pickupAddress.city"
              placeholder="e.g. Mumbai"
              value={formik.values.pickupAddress.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.pickupAddress?.city &&
                Boolean(formik.errors.pickupAddress?.city)
              }
              helperText={
                formik.touched.pickupAddress?.city &&
                formik.errors.pickupAddress?.city
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  fontSize: "13px",
                  bgcolor: "background.paper",
                },
              }}
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider">
              State
            </label>
            <TextField
              fullWidth
              size="small"
              name="pickupAddress.state"
              placeholder="e.g. Maharashtra"
              value={formik.values.pickupAddress.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.pickupAddress?.state &&
                Boolean(formik.errors.pickupAddress?.state)
              }
              helperText={
                formik.touched.pickupAddress?.state &&
                formik.errors.pickupAddress?.state
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  fontSize: "13px",
                  bgcolor: "background.paper",
                },
              }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default BecomeSellerFormStep2;