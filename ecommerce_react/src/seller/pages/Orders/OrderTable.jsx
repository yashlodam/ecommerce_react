import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Fade,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchSellerOrders,
  updateOrderStatus,
} from "../../../State/seller/sellerOrderSlice";
import StatusBadge from "../../../common/StatusBadge";
import EmptyState from "../../../common/EmptyState";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
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

export default function OrderTable() {
  const dispatch = useAppDispatch();
  const { sellerOrder } = useAppSelector((store) => store);

  const [selectedTab, setSelectedTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState({});

  useEffect(() => {
    dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  const orders = sellerOrder?.orders || [];
  const isLoading = sellerOrder?.loading;

  const handleClick = (event, orderId) => {
    setAnchorEl((prev) => ({
      ...prev,
      [orderId]: event.currentTarget,
    }));
  };

  const handleClose = (orderId) => {
    setAnchorEl((prev) => ({
      ...prev,
      [orderId]: null,
    }));
  };

  const handleStatusChange = (orderId, status) => {
    dispatch(
      updateOrderStatus({
        jwt: localStorage.getItem("jwt"),
        orderId,
        orderStatus: status,
      })
    );
    handleClose(orderId);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      selectedTab === "ALL" || order.orderStatus === selectedTab;
    const matchesSearch =
      searchQuery.trim() === "" ||
      order.id?.toString().includes(searchQuery) ||
      order.shippingAddress?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderItems?.some((i) =>
        i.product?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Controls & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <Tabs
          value={selectedTab}
          onChange={(e, val) => setSelectedTab(val)}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="ALL" label={`All (${orders.length})`} className="font-bold text-xs" />
          <Tab value="PLACED" label="Placed" className="font-bold text-xs" />
          <Tab value="CONFIRMED" label="Confirmed" className="font-bold text-xs" />
          <Tab value="SHIPPED" label="Shipped" className="font-bold text-xs" />
          <Tab value="DELIVERED" label="Delivered" className="font-bold text-xs" />
          <Tab value="CANCELLED" label="Cancelled" className="font-bold text-xs" />
        </Tabs>

        <TextField
          size="small"
          placeholder="Search by Order ID, customer, item..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" className="text-slate-400" />
              </InputAdornment>
            ),
          }}
          className="min-w-[280px]"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20 bg-white rounded-2xl border border-slate-200">
          <CircularProgress color="primary" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <EmptyState
            icon={ShoppingBagOutlinedIcon}
            title="No orders found"
            description={
              searchQuery
                ? "No orders match your filter criteria."
                : "When customers purchase your products, orders will appear here."
            }
          />
        </div>
      ) : (
        <TableContainer
          component={Paper}
          className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <Table sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Order ID</StyledTableCell>
                <StyledTableCell>Ordered Products</StyledTableCell>
                <StyledTableCell>Customer & Address</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredOrders.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>
                    <div className="font-bold text-slate-900">#{item.id}</div>
                    <div className="text-xs text-slate-400">
                      {item.orderDate
                        ? new Date(item.orderDate).toLocaleDateString("en-IN")
                        : "Recent"}
                    </div>
                  </StyledTableCell>

                  <StyledTableCell>
                    <div className="space-y-3">
                      {item.orderItems?.map((orderItem) => (
                        <div key={orderItem.id} className="flex gap-3 items-center">
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-50 border border-slate-200 shrink-0 flex items-center justify-center">
                            <img
                              src={orderItem.product?.images?.[0] || "https://placehold.co/80x80"}
                              alt={orderItem.product?.title || "Item"}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="min-w-0">
                            <h4 className="font-semibold text-slate-900 text-sm truncate max-w-xs">
                              {orderItem.product?.title}
                            </h4>
                            <p className="text-xs text-slate-500 font-medium">
                              {formatINR(orderItem.sellingPrice)} × {orderItem.quantity}
                            </p>
                            {orderItem.size && (
                              <span className="text-[11px] text-slate-400">
                                Size: {orderItem.size}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </StyledTableCell>

                  <StyledTableCell>
                    <div className="text-xs text-slate-700 space-y-0.5">
                      <p className="font-bold text-slate-900">
                        {item.shippingAddress?.name || "Customer"}
                      </p>
                      <p className="text-slate-500">
                        {item.shippingAddress?.address}, {item.shippingAddress?.city}
                      </p>
                      <p className="text-slate-500">
                        {item.shippingAddress?.state} - {item.shippingAddress?.pinCode}
                      </p>
                      <p className="text-teal-700 font-medium pt-0.5">
                        📞 {item.shippingAddress?.mobile}
                      </p>
                    </div>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <StatusBadge status={item.orderStatus} />
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
                      Update
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
                      <MenuItem onClick={() => handleStatusChange(item.id, "PLACED")}>
                        Placed
                      </MenuItem>
                      <MenuItem onClick={() => handleStatusChange(item.id, "CONFIRMED")}>
                        Confirmed
                      </MenuItem>
                      <MenuItem onClick={() => handleStatusChange(item.id, "SHIPPED")}>
                        Shipped
                      </MenuItem>
                      <MenuItem onClick={() => handleStatusChange(item.id, "DELIVERED")}>
                        Delivered
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleStatusChange(item.id, "CANCELLED")}
                        className="text-red-600 font-semibold"
                      >
                        Cancelled
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