import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import UserAddressCard from "./UserAddressCard";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { fetchUserProfile } from "../../../State/AuthSlice";
import AddAddressForm from "../Checkout/AddressForm";
import EmptyState from "../../../common/EmptyState";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

function Address() {
  const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(fetchUserProfile(localStorage.getItem("jwt")));
  }, [dispatch]);

  const { auth } = useAppSelector((store) => store);
  const addresses = auth.user?.addresses || [];

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Delivery Addresses
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your saved shipping and billing locations.
          </p>
        </div>

        <Button
          onClick={() => setOpenDialog(true)}
          variant="contained"
          color="primary"
          startIcon={<AddLocationAltIcon />}
          sx={{
            textTransform: "none",
            borderRadius: "12px",
            fontWeight: 700,
            px: 2.5,
          }}
        >
          Add New Address
        </Button>
      </div>

      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled">
          Failed to process address request.
        </Alert>
      </Snackbar>

      {/* Address Cards */}
      {addresses.length === 0 ? (
        <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6">
          <EmptyState
            icon={LocationOnOutlinedIcon}
            title="No Saved Addresses"
            description="Add your delivery address to enjoy seamless 1-click checkout."
            actionText="Add Delivery Address"
            onAction={() => setOpenDialog(true)}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <UserAddressCard
              key={address.id}
              address={address}
              setOpenSuccess={setOpenSuccess}
              setOpenError={setOpenError}
              setSuccessMessage={setSuccessMessage}
            />
          ))}
        </div>
      )}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            bgcolor: "background.paper",
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <AddAddressForm
            handleClose={() => setOpenDialog(false)}
            onSuccess={() => {
              setSuccessMessage("Address added successfully.");
              setOpenSuccess(true);
              setOpenDialog(false);
              dispatch(fetchUserProfile(localStorage.getItem("jwt")));
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Address;