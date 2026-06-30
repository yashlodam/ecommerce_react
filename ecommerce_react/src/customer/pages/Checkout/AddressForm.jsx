import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../../../State/Store";
import { addUserAddress, createOrder } from "../../../State/customer/OrderSlice";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  mobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
  pincode: Yup.string()
    .matches(/^\d{6}$/, "Enter a valid 6-digit pincode")
    .required("Pincode is required"),
  house: Yup.string().required("House/Flat/Building is required"),
  locality: Yup.string().required("Locality/Street is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
});

const AddAddressForm = ({handleClose}) => {
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useAppDispatch();
 
 const formik = useFormik({
    initialValues: {
      fullName: "",
      mobile: "",
      pincode: "",
      house: "",
      locality: "",
      city: "",
      state: "",
    },
    validationSchema,
    onSubmit: (values) => {
  const address = {
    name: values.fullName,
    mobile: values.mobile,
    address: values.house,
    locality: values.locality,
    city: values.city,
    state: values.state,
    pinCode: values.pincode,
  };

  dispatch(
    addUserAddress({
      address,
      jwt:localStorage.getItem("jwt")
    })
  );

  handleClose();
}
  });


  return (
     <div className="w-full max-h-[90vh] flex flex-col bg-white rounded-xl overflow-hidden">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col bg-white rounded-t-2xl sm:rounded-xl overflow-hidden"
      >
        {/* Header - sticky */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-base sm:text-xl font-semibold text-gray-800">
            Add New Address
          </h2>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              "&:hover": {
                backgroundColor: "#fee2e2",
                color: "#dc2626",
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 sm:space-y-5">
          {/* Contact */}
          <h3 className="font-medium text-gray-700 text-sm sm:text-base">
            Contact Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Full Name */}
            <TextField
              fullWidth
              size="small"
              autoFocus
              id="fullName"
              name="fullName"
              label="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
            {/* Mobile */}
            <TextField
              fullWidth
              size="small"
              id="mobile"
              name="mobile"
              label="Mobile Number"
              inputProps={{ inputMode: "numeric", maxLength: 10 }}
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </div>

          {/* Address */}
          <h3 className="font-medium text-gray-700 text-sm sm:text-base pt-1">
            Address
          </h3>

          {/* Pincode */}
          <TextField
            fullWidth
            size="small"
            id="pincode"
            name="pincode"
            label="Pincode"
            inputProps={{ inputMode: "numeric", maxLength: 6 }}
            value={formik.values.pincode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
            helperText={formik.touched.pincode && formik.errors.pincode}
          />

          {/* House */}
          <TextField
            fullWidth
            size="small"
            id="house"
            name="house"
            label="House No., Building, Street"
            value={formik.values.house}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.house && Boolean(formik.errors.house)}
            helperText={formik.touched.house && formik.errors.house}
          />

          {/* Locality */}
          <TextField
            fullWidth
            size="small"
            id="locality"
            name="locality"
            label="Locality / Town"
            value={formik.values.locality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.locality && Boolean(formik.errors.locality)}
            helperText={formik.touched.locality && formik.errors.locality}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* City */}
            <TextField
              fullWidth
              size="small"
              id="city"
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
            {/* State */}
            <TextField
              fullWidth
              size="small"
              id="state"
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </div>
        </div>

        {/* Buttons - sticky footer */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 px-4 sm:px-6 py-4 border-t border-gray-100 shrink-0 bg-white">
          <button
            type="button"
            onClick={handleClose}
            className="w-full sm:w-auto px-5 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="cursor-pointer w-full sm:w-auto px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 active:bg-gray-900 transition disabled:opacity-50"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;