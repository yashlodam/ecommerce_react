import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { useNavigate } from "react-router-dom";
import UserAddressCard from "./UserAddressCard";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import { fetchUserProfile } from "../../../State/AuthSlice";

function Address() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
const [openDialog, setOpenDialog] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
const [openError, setOpenError] = useState(false);

  useEffect(()=>{
    dispatch(fetchUserProfile(localStorage.getItem("jwt")))
  },[])

  const {auth} = useAppSelector(store=>store);

  const addresses = auth.user;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            My Addresses
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your delivery addresses.
          </p>
        </div>

        <Button
  onClick={() => setOpenDialog(true)}
  variant="contained"
  startIcon={<AddLocationAltIcon />}
  sx={{
    textTransform: "none",
    bgcolor: "#0f766e",
  }}
>
  
</Button>
      </div>
      <Snackbar
  open={openSuccess}
  autoHideDuration={3000}
  onClose={() => setOpenSuccess(false)}
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
>
  <Alert severity="success" variant="filled">
    Address deleted successfully.
  </Alert>
</Snackbar>

<Snackbar
  open={openError}
  autoHideDuration={3000}
  onClose={() => setOpenError(false)}
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
>
  <Alert severity="error" variant="filled">
    Failed to delete address.
  </Alert>
</Snackbar>
      {/* Address Cards */}
      <div className="space-y-5">
        {addresses?.addresses.map((address) => (
          <UserAddressCard
  key={address.id}
  address={address}
  setOpenSuccess={setOpenSuccess}
  setOpenError={setOpenError}
/>
        ))}
      </div>

      <Dialog
  open={openDialog}
  onClose={() => setOpenDialog(false)}
  fullWidth
  maxWidth="sm"
>
  <DialogTitle>Add New Address</DialogTitle>

  <DialogContent>
    {/* Your address form goes here */}
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenDialog(false)}>
      Cancel
    </Button>

    <Button variant="contained">
      Save Address
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
}

export default Address;