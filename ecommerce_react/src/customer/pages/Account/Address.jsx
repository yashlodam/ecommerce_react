import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import UserAddressCard from "./UserAddressCard";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { fetchUserProfile } from "../../../State/AuthSlice";
import AddAddressForm from "../Checkout/AddressForm";
import EmptyState from "../../../common/EmptyState";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

function Address() {
  const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    dispatch(fetchUserProfile(localStorage.getItem("jwt")));
  }, [dispatch]);

  const auth = useAppSelector((store) => store.auth);
  const addresses = auth.user?.addresses || [];

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setOpenDialog(true);
  };

  const handleOpenEdit = (addr) => {
    setEditingAddress(addr);
    setOpenDialog(true);
  };

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
          onClick={handleOpenAdd}
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

      {/* Address Cards */}
      {addresses.length === 0 ? (
        <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6">
          <EmptyState
            icon={LocationOnOutlinedIcon}
            title="No Saved Addresses"
            description="Add your delivery address to enjoy seamless 1-click checkout."
            actionText="Add Delivery Address"
            onAction={handleOpenAdd}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <UserAddressCard
              key={address.id}
              address={address}
              onEdit={handleOpenEdit}
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
            addressToEdit={editingAddress}
            handleClose={() => setOpenDialog(false)}
            onSuccess={() => {
              setOpenDialog(false);
              setEditingAddress(null);
              dispatch(fetchUserProfile(localStorage.getItem("jwt")));
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Address;