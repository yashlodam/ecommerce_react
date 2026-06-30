import React from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../../State/Store";
import { deleteUserAddress } from "../../../State/customer/OrderSlice";
import { fetchUserProfile } from "../../../State/AuthSlice";

function UserAddressCard({ address,
  setOpenSuccess,
  setOpenError,setSuccessMessage }) {

  const dispatch = useAppDispatch();



const removeAddress = async () => {
  try {
    await dispatch(
      deleteUserAddress({
        addressId: address.id,
        jwt: localStorage.getItem("jwt"),
      })
    ).unwrap();

    // Refresh user profile
    await dispatch(fetchUserProfile(localStorage.getItem("jwt")));

    setSuccessMessage("Address deleted successfully.");
    setOpenSuccess(true);
  } catch (error) {
    console.error("Delete Error:", error);
    setOpenError(true);
  }
};
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start gap-4">
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold">
              {address.type}
            </span>

            {address.default && (
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                Default
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold text-gray-900">
            {address.name}
          </h3>

          <p className="text-gray-600 mt-1">
            {address.phone}
          </p>

          <p className="text-gray-600 mt-3 leading-relaxed">
            {address.address}
          </p>

          <p className="text-gray-500 text-sm mt-2">
            {address.city}, {address.state} - {address.pincode}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            size="small"
            startIcon={<EditIcon />}
            sx={{ textTransform: "none" }}
          >
            Edit
          </Button>

          <Button
          onClick={removeAddress}
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ textTransform: "none" }}
          >
            Delete
          </Button>
        </div>

      </div>
    </div>
  );
}

export default UserAddressCard;