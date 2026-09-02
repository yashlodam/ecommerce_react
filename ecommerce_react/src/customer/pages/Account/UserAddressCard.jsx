import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import { useAppDispatch } from "../../../State/Store";
import { deleteUserAddress } from "../../../State/customer/OrderSlice";
import { fetchUserProfile } from "../../../State/AuthSlice";

function UserAddressCard({
  address,
  setOpenSuccess,
  setOpenError,
  setSuccessMessage,
}) {
  const dispatch = useAppDispatch();

  const removeAddress = async () => {
    try {
      await dispatch(
        deleteUserAddress({
          addressId: address.id,
          jwt: localStorage.getItem("jwt"),
        })
      ).unwrap();

      await dispatch(fetchUserProfile(localStorage.getItem("jwt")));
      setSuccessMessage("Address deleted successfully.");
      setOpenSuccess(true);
    } catch (error) {
      console.error("Delete Error:", error);
      setOpenError(true);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-800 rounded-full text-xs font-bold uppercase tracking-wider">
              {address.type || "Delivery Address"}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {address.name}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {address.address}, {address.locality ? `${address.locality}, ` : ""}
            {address.city}, {address.state} - <strong className="text-slate-900 dark:text-slate-100">{address.pinCode || address.pincode}</strong>
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <PhoneIcon sx={{ fontSize: 15 }} />
            <span>Mobile: <strong className="text-slate-700 dark:text-slate-300">{address.mobile || address.phone}</strong></span>
          </div>
        </div>

        <div>
          <Button
            onClick={removeAddress}
            size="small"
            color="error"
            variant="outlined"
            startIcon={<DeleteIcon fontSize="small" />}
            sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 600 }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserAddressCard;