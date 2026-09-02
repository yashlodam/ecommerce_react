import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
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

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f8fafc",
  },
  "&:hover": {
    backgroundColor: "#f1f5f9",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
      seller.businesssDetails?.businessName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Filters Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
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
        <div className="flex justify-center items-center py-20 bg-white rounded-2xl border border-slate-200">
          <CircularProgress color="primary" />
        </div>
      ) : filteredSellers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <EmptyState
            icon={StoreIcon}
            title="No sellers found"
            description="No vendors match the selected status or search query."
          />
        </div>
      ) : (
        <TableContainer
          component={Paper}
          className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <Table sx={{ minWidth: 850 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Seller Details</StyledTableCell>
                <StyledTableCell>Business Store</StyledTableCell>
                <StyledTableCell>GSTIN</StyledTableCell>
                <StyledTableCell>Mobile</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSellers.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>
                    <div className="font-bold text-slate-900">{item.sellerName}</div>
                    <div className="text-xs text-slate-500">{item.email}</div>
                  </StyledTableCell>

                  <StyledTableCell>
                    <div className="font-semibold text-slate-900">
                      {item.businesssDetails?.businessName || "N/A"}
                    </div>
                  </StyledTableCell>

                  <StyledTableCell>
                    <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">
                      {item.GSTIN || "N/A"}
                    </span>
                  </StyledTableCell>

                  <StyledTableCell>
                    <span className="text-xs text-slate-700">
                      {item.mobile || "N/A"}
                    </span>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <StatusBadge status={item.accountStatus} />
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      endIcon={<ExpandMoreIcon />}
                      onClick={(e) => handleClick(e, item.id)}
                      className="font-bold text-xs rounded-xl"
                    >
                      Status
                    </Button>

                    <Menu
                      anchorEl={anchorEl[item.id]}
                      open={Boolean(anchorEl[item.id])}
                      onClose={() => handleClose(item.id)}
                      TransitionComponent={Fade}
                      PaperProps={{
                        sx: { borderRadius: "12px", minWidth: 140, boxShadow: 3 },
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
                        className="text-amber-600"
                      >
                        Banned
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleStatusChange(item.id, "CLOSED")}
                        className="text-red-600 font-semibold"
                      >
                        Closed
                      </MenuItem>
                    </Menu>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default SellersTable;