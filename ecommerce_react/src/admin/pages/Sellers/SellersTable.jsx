import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {
  Menu,
  Fade,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StoreIcon from "@mui/icons-material/Store";

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchAllSellers,
  updateSellerAccountStatus,
} from "../../../State/admin/adminFetchSlice";
import StatusBadge from "../../../common/StatusBadge";
import EmptyState from "../../../common/EmptyState";

const accountStatuses = [
  { status: "ALL", title: "All Sellers" },
  { status: "PENDING_VERIFICATION", title: "Pending Verification" },
  { status: "ACTIVE", title: "Active" },
  { status: "SUSPENDED", title: "Suspended" },
  { status: "DEACTIVATED", title: "Deactivated" },
  { status: "BANNED", title: "Banned" },
  { status: "CLOSED", title: "Closed" },
];

function SellersTable() {
  const [accountStatus, setAccountStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const { sellers, loading } = useAppSelector((store) => store.adminFetch);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllSellers(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = useState({});

  const handleClick = (event, id) => {
    setAnchorEl((prev) => ({
      ...prev,
      [id]: event.currentTarget,
    }));
  };

  const handleClose = (id) => {
    setAnchorEl((prev) => ({
      ...prev,
      [id]: null,
    }));
  };

  const handleStatusChange = (id, status) => {
    dispatch(
      updateSellerAccountStatus({
        jwt: localStorage.getItem("jwt"),
        id,
        status,
      })
    );
    handleClose(id);
  };

  const filteredSellers = (sellers || []).filter((seller) => {
    const matchesStatus =
      accountStatus === "ALL" || seller.accountStatus === accountStatus;
    const matchesSearch =
      searchQuery.trim() === "" ||
      seller.sellerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.GSTIN?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.businessDetails?.businessName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      seller.businesssDetails?.businessName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Vendor & Seller Governance
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Verify business identities, audit GSTIN compliance, and control vendor access.
        </p>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
        <FormControl size="small" className="w-full sm:w-60">
          <InputLabel id="seller-status-label">Account Status</InputLabel>
          <Select
            labelId="seller-status-label"
            value={accountStatus}
            label="Account Status"
            onChange={(e) => setAccountStatus(e.target.value)}
          >
            {accountStatuses.map((item) => (
              <MenuItem key={item.status} value={item.status}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          size="small"
          placeholder="Search seller by name, email, store, GSTIN..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" className="text-slate-400" />
              </InputAdornment>
            ),
          }}
          className="w-full sm:w-80"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <CircularProgress color="primary" />
        </div>
      ) : filteredSellers.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-8 transition-colors">
          <EmptyState
            icon={StoreIcon}
            title="No sellers found"
            description="No vendors match the selected status or search query."
          />
        </div>
      ) : (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: "20px",
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",
            bgcolor: "background.paper",
          }}
        >
          <Table sx={{ minWidth: 850 }}>
            <TableHead className="bg-slate-50 dark:bg-slate-950/60">
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Seller Identity</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Store Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>GSTIN</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Contact Phone</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Account Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSellers.map((item) => (
                <TableRow key={item.id} hover className="transition-colors">
                  <TableCell>
                    <div className="font-bold text-slate-900 dark:text-slate-100">{item.sellerName}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500">{item.email}</div>
                  </TableCell>

                  <TableCell>
                    <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {item.businessDetails?.businessName || item.businesssDetails?.businessName || "—"}
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="font-mono text-xs font-semibold bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded text-slate-700 dark:text-slate-300">
                      {item.GSTIN || item.gstin || "—"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      {item.mobile || "—"}
                    </span>
                  </TableCell>

                  <TableCell align="center">
                    <StatusBadge status={item.accountStatus} />
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      endIcon={<ExpandMoreIcon />}
                      onClick={(e) => handleClick(e, item.id)}
                      sx={{
                        borderRadius: "10px",
                        fontWeight: 700,
                        textTransform: "none",
                        fontSize: "12px",
                      }}
                    >
                      Status
                    </Button>

                    <Menu
                      anchorEl={anchorEl[item.id]}
                      open={Boolean(anchorEl[item.id])}
                      onClose={() => handleClose(item.id)}
                      TransitionComponent={Fade}
                      PaperProps={{
                        sx: { borderRadius: "14px", minWidth: 140, boxShadow: 4 },
                      }}
                    >
                      <MenuItem onClick={() => handleStatusChange(item.id, "ACTIVE")}>
                        Active
                      </MenuItem>
                      <MenuItem onClick={() => handleStatusChange(item.id, "SUSPENDED")}>
                        Suspended
                      </MenuItem>
                      <MenuItem onClick={() => handleStatusChange(item.id, "DEACTIVATED")}>
                        Deactivated
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleStatusChange(item.id, "BANNED")}
                        sx={{ color: "warning.main", fontWeight: 600 }}
                      >
                        Banned
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleStatusChange(item.id, "CLOSED")}
                        sx={{ color: "error.main", fontWeight: 700 }}
                      >
                        Closed
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default SellersTable;