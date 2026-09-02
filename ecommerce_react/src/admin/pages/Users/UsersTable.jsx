import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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
import { styled } from "@mui/material/styles";
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
}));

function UsersTable() {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((store) => store.adminFetch);
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
    <Box>
      <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <Typography variant="h5" className="font-bold text-gray-800">
            User Management
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            View, govern, ban, and manage platform customer and admin accounts.
          </Typography>
        </div>

        <TextField
          size="small"
          placeholder="Search by name, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="text-gray-400" />
              </InputAdornment>
            ),
          }}
          className="w-full sm:w-72 bg-white"
        />
      </Box>

      {loading ? (
        <Box className="flex justify-center items-center py-20">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={1} className="rounded-xl overflow-hidden border border-gray-100">
          <Table sx={{ minWidth: 650 }}>
            <TableHead className="bg-gray-50">
              <TableRow>
                <StyledTableCell>User ID</StyledTableCell>
                <StyledTableCell>Full Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Mobile</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" className="py-10 text-gray-500">
                    No users found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} hover className="transition-colors">
                    <TableCell className="font-mono text-xs text-gray-500">#{user.id}</TableCell>
                    <TableCell className="font-medium text-gray-900">{user.fullName || "—"}</TableCell>
                    <TableCell className="text-gray-600">{user.email}</TableCell>
                    <TableCell className="text-gray-600">{user.mobile || "—"}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        size="small"
                        color={user.role === "ROLE_ADMIN" ? "secondary" : "default"}
                        variant="outlined"
                        className="font-semibold"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.enabled ? "Active" : "Banned"}
                        size="small"
                        color={user.enabled ? "success" : "error"}
                        className="font-semibold text-xs"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box className="flex justify-end items-center gap-2">
                        {user.role !== "ROLE_ADMIN" && (
                          <Button
                            size="small"
                            variant="outlined"
                            color={user.enabled ? "error" : "success"}
                            startIcon={user.enabled ? <BlockIcon /> : <CheckCircleIcon />}
                            onClick={() => handleToggleBan(user)}
                            className="text-xs normal-case"
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
                          >
                            <DeleteIcon fontSize="small" />
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle className="font-bold">Delete User Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete user account{" "}
            <strong>{selectedUser?.email}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UsersTable;
