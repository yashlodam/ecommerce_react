import React, { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import { useAppDispatch } from "../../../State/Store";
import { deleteUserAddress } from "../../../State/customer/OrderSlice";
import { fetchUserProfile } from "../../../State/AuthSlice";
import { toast } from "../../../common/toast";
import ConfirmDialog from "../../../common/dialog/ConfirmDialog";

function UserAddressCard({ address, onEdit }) {
  const dispatch = useAppDispatch();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const removeAddress = async () => {
    setDeleting(true);
    try {
      await dispatch(deleteUserAddress(address.id)).unwrap();
      await dispatch(fetchUserProfile());
      toast.success("Delivery address removed successfully.");
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(error || "Failed to remove delivery address.");
    } finally {
      setDeleting(false);
      setConfirmDeleteOpen(false);
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

        <div className="flex items-center gap-2 self-end sm:self-start">
          {onEdit && (
            <Button
              onClick={() => onEdit(address)}
              size="small"
              variant="outlined"
              color="primary"
              startIcon={<EditOutlinedIcon fontSize="small" />}
              sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 600 }}
            >
              Edit
            </Button>
          )}

          <Button
            onClick={() => setConfirmDeleteOpen(true)}
            size="small"
            color="error"
            variant="outlined"
            disabled={deleting}
            startIcon={<DeleteIcon fontSize="small" />}
            sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 600 }}
          >
            Delete
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmDeleteOpen}
        title="Delete Delivery Address"
        message={`Are you sure you want to remove "${address.name}'s" address from your saved addresses?`}
        confirmText="Delete Address"
        confirmSeverity="danger"
        onConfirm={removeAddress}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </div>
  );
}

export default UserAddressCard;