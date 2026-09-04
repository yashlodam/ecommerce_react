import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  getAllUsers,
  banUser,
  unbanUser,
  deleteUser,
} from "../../../State/admin/adminFetchSlice";
import EmptyState from "../../../common/EmptyState";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

function UsersTable() {
  const dispatch = useAppDispatch();
  const adminFetch = useAppSelector((store) => store.adminFetch);
  const users = adminFetch?.users || [];
  const loading = adminFetch?.loading || false;
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleToggleBan = (user) => {
    if (user.enabled) {
      dispatch(banUser(user.id));
    } else {
      dispatch(unbanUser(user.id));
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      dispatch(deleteUser(selectedUser.id));
    }
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = (users || []).filter(
    (u) =>
      u.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.mobile?.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            User Accounts & Governance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Audit, govern, ban, and manage platform customer and administrative accounts.
          </p>
        </div>

        <TextField
          size="small"
          placeholder="Search by name, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" className="text-slate-400" />
              </InputAdornment>
            ),
          }}
          className="w-full sm:w-72"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <CircularProgress color="primary" />
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-8 transition-colors">
          <EmptyState
            icon={PeopleAltOutlinedIcon}
            title="No users found"
            description="No customer accounts match your search parameters."
          />
        </div>
      ) : (
        <>
          {/* Mobile Cards (visible on xs/sm/md) */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {user.fullName || "User Account"}
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {user.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Chip
                      label={user.role}
                      size="small"
                      color={user.role === "ROLE_ADMIN" ? "primary" : "default"}
                      variant="outlined"
                      className="font-bold text-xs"
                    />
                    <Chip
                      label={user.enabled ? "Active" : "Banned"}
                      size="small"
                      color={user.enabled ? "success" : "error"}
                      className="font-bold text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Phone: {user.mobile || "—"}</span>
                  <span className="font-mono">ID: #{user.id}</span>
                </div>

                {user.role !== "ROLE_ADMIN" && (
                  <div className="flex justify-end items-center gap-2 pt-1">
                    <Button
                      size="small"
                      variant="outlined"
                      color={user.enabled ? "error" : "success"}
                      startIcon={user.enabled ? <BlockIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
                      onClick={() => handleToggleBan(user)}
                      sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, fontSize: "11px" }}
                    >
                      {user.enabled ? "Ban User" : "Unban"}
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      color="error"
                      onClick={() => handleDeleteClick(user)}
                      sx={{ borderRadius: "10px", textTransform: "none", fontSize: "11px" }}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Table (hidden on mobile, visible on lg+) */}
          <TableContainer
            component={Paper}
            elevation={0}
            className="hidden lg:block"
            sx={{
              borderRadius: "20px",
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
              bgcolor: "background.paper",
            }}
          >
          <Table sx={{ minWidth: 650 }}>
            <TableHead className="bg-slate-50 dark:bg-slate-950/60">
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>User ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Full Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email Address</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Mobile</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} hover className="transition-colors">
                  <TableCell className="font-mono text-xs text-slate-400">#{user.id}</TableCell>
                  <TableCell className="font-bold text-slate-900 dark:text-slate-100">{user.fullName || "—"}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 text-sm">{user.email}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 text-sm">{user.mobile || "—"}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      size="small"
                      color={user.role === "ROLE_ADMIN" ? "primary" : "default"}
                      variant="outlined"
                      className="font-bold text-xs"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.enabled ? "Active" : "Banned"}
                      size="small"
                      color={user.enabled ? "success" : "error"}
                      className="font-bold text-xs"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <div className="flex justify-end items-center gap-2">
                      {user.role !== "ROLE_ADMIN" && (
                        <Button
                          size="small"
                          variant="outlined"
                          color={user.enabled ? "error" : "success"}
                          startIcon={user.enabled ? <BlockIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
                          onClick={() => handleToggleBan(user)}
                          sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, fontSize: "12px" }}
                        >
                          {user.enabled ? "Ban User" : "Unban"}
                        </Button>
                      )}
                      {user.role !== "ROLE_ADMIN" && (
                        <Button
                          size="small"
                          variant="text"
                          color="error"
                          onClick={() => handleDeleteClick(user)}
                          sx={{ minWidth: 32 }}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: "16px" } }}
      >
        <DialogTitle className="font-bold">Delete User Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete user account{" "}
            <strong>{selectedUser?.email}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit" sx={{ borderRadius: "10px" }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained" sx={{ borderRadius: "10px", fontWeight: 700 }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UsersTable;
