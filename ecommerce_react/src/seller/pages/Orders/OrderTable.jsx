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

export default function OrderTable() {
  const dispatch = useAppDispatch();
  const sellerOrder = useAppSelector((store) => store.sellerOrder);
  const orders = sellerOrder?.orders || [];
  const isLoading = sellerOrder?.loading || false;

  const [selectedTab, setSelectedTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState({});

  useEffect(() => {
    dispatch(fetchSellerOrders());
  }, [dispatch]);

  const orderList = Array.isArray(orders) ? orders : [];

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
        orderId,
        orderStatus: status,
      })
    );
    handleClose(orderId);
  };

  const filteredOrders = orderList.filter((order) => {
    if (!order) return false;
    const matchesTab =
      selectedTab === "ALL" || order.orderStatus === selectedTab;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      order.id?.toString().includes(q) ||
      (order.orderId && String(order.orderId).toLowerCase().includes(q)) ||
      (order.shippingAddress?.name && order.shippingAddress.name.toLowerCase().includes(q)) ||
      order.orderItems?.some((i) =>
        i.product?.title?.toLowerCase().includes(q)
      );
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Order Fulfillment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Process customer orders, update delivery milestones, and track status transitions.
        </p>
      </div>

      {/* Controls & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
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
        <div className="flex justify-center items-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <CircularProgress color="primary" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-8 transition-colors">
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
        <>
          {/* Mobile Cards (visible on xs to md) */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {filteredOrders.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 transition-colors"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      Order #{item.id}
                    </span>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
                      {item.orderDate
                        ? new Date(item.orderDate).toLocaleDateString("en-IN")
                        : "Recent"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={item.orderStatus} />
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      endIcon={<ExpandMoreIcon />}
                      onClick={(e) => handleClick(e, item.id)}
                      sx={{
                        borderRadius: "8px",
                        fontWeight: 700,
                        textTransform: "none",
                        fontSize: "11px",
                        py: 0.3,
                        px: 1,
                      }}
                    >
                      Status
                    </Button>
                  </div>
                </div>

                {/* Products list */}
                <div className="space-y-2">
                  {item.orderItems?.map((orderItem) => (
                    <div key={orderItem.id} className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shrink-0 flex items-center justify-center p-1">
                        <img
                          src={orderItem.product?.images?.[0] || "https://placehold.co/80x80"}
                          alt={orderItem.product?.title || "Item"}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/80x80";
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-xs truncate">
                          {orderItem.product?.title}
                        </h4>
                        <p className="text-xs text-teal-600 dark:text-teal-400 font-bold">
                          {formatINR(orderItem.sellingPrice)} × {orderItem.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer summary */}
                <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/50 p-2.5 rounded-xl">
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {item.shippingAddress?.name || "Customer"}
                  </p>
                  <p className="truncate">
                    {item.shippingAddress?.address}, {item.shippingAddress?.city}
                  </p>
                  <p className="text-teal-600 dark:text-teal-400 font-medium pt-0.5">
                    📞 {item.shippingAddress?.mobile}
                  </p>
                </div>
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
          <Table sx={{ minWidth: 900 }}>
            <TableHead className="bg-slate-50 dark:bg-slate-950/60">
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Ordered Products</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Customer & Address</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredOrders.map((item) => (
                <TableRow key={item.id} hover className="transition-colors">
                  <TableCell>
                    <div className="font-bold text-slate-900 dark:text-slate-100">#{item.id}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500">
                      {item.orderDate
                        ? new Date(item.orderDate).toLocaleDateString("en-IN")
                        : "Recent"}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-3">
                      {item.orderItems?.map((orderItem) => (
                        <div key={orderItem.id} className="flex gap-3 items-center">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shrink-0 flex items-center justify-center p-1">
                            <img
                              src={orderItem.product?.images?.[0] || "https://placehold.co/80x80"}
                              alt={orderItem.product?.title || "Item"}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>

                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm truncate max-w-xs">
                              {orderItem.product?.title}
                            </h4>
                            <p className="text-xs text-teal-700 dark:text-teal-400 font-bold">
                              {formatINR(orderItem.sellingPrice)} × {orderItem.quantity}
                            </p>
                            {orderItem.size && (
                              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                Size: {orderItem.size}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-xs text-slate-700 dark:text-slate-300 space-y-0.5">
                      <p className="font-bold text-slate-900 dark:text-slate-100">
                        {item.shippingAddress?.name || "Customer"}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400">
                        {item.shippingAddress?.address}, {item.shippingAddress?.city}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400">
                        {item.shippingAddress?.state} - {item.shippingAddress?.pinCode}
                      </p>
                      <p className="text-teal-700 dark:text-teal-400 font-medium pt-0.5">
                        📞 {item.shippingAddress?.mobile}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell align="center">
                    <StatusBadge status={item.orderStatus} />
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
                      Update
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
                        sx={{ color: "error.main", fontWeight: 700 }}
                      >
                        Cancelled
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}