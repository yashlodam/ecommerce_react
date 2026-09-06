import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import AlertTriangleIcon from "@mui/icons-material/WarningAmberRounded";

export default function ConfirmDialog({
  open,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = true,
  loading = false,
  onConfirm,
  onClose,
}) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          p: 1.5,
          maxWidth: 440,
          width: "92%",
          bgcolor: "background.paper",
          backgroundImage: "none",
        },
      }}
    >
      <div className="flex items-start gap-3 p-4 pb-1">
        {isDestructive && (
          <div className="shrink-0 w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <AlertTriangleIcon sx={{ fontSize: 22 }} />
          </div>
        )}
        <div className="space-y-1">
          <DialogTitle sx={{ p: 0, fontSize: "16px", fontWeight: 800 }}>
            {title}
          </DialogTitle>
          <DialogContent sx={{ p: 0, pt: 0.5, fontSize: "13px", color: "text.secondary" }}>
            {message}
          </DialogContent>
        </div>
      </div>

      <DialogActions sx={{ px: 2, pb: 1.5, pt: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          disabled={loading}
          variant="outlined"
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "13px",
            px: 2.5,
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          color={isDestructive ? "error" : "primary"}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "13px",
            px: 2.5,
          }}
        >
          {loading ? "Processing..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
