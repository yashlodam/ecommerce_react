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
} from "@mui/material";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../State/Store";

import {
  fetchSellerOrders,
  updateOrderStatus,
} from "../../../State/seller/sellerOrderSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#111827",
    color: "#fff",
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function OrderTable() {
  const dispatch = useAppDispatch();

  const { sellerOrder } = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = useState({});

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

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Order ID</StyledTableCell>
            <StyledTableCell>Products</StyledTableCell>
            <StyledTableCell>Shipping Address</StyledTableCell>
            <StyledTableCell align="center">
              Order Status
            </StyledTableCell>
            <StyledTableCell align="center">
              Update Status
            </StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sellerOrder.orders?.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell>
                #{item.id}
              </StyledTableCell>

              <StyledTableCell>
                <div className="space-y-4">
                  {item.orderItems.map((orderItem) => (
                    <div
                      key={orderItem.id}
                      className="flex gap-4 items-center"
                    >
                      <img
                        src={orderItem.product.images[0]}
                        alt={orderItem.product.title}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />

                      <div>
                        <h3 className="font-semibold">
                          {orderItem.product.title}
                        </h3>

                        <p className="text-sm text-gray-600">
                          ₹{orderItem.product.sellingPrice}
                        </p>

                        <p className="text-sm text-gray-500">
                          Color: {orderItem.product.color}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </StyledTableCell>

              <StyledTableCell>
                <div className="space-y-1">
                  <h3 className="font-semibold">
                    {item.shippingAddress.name}
                  </h3>

                  <p>
                    {item.shippingAddress.address}
                  </p>

                  <p>
                    {item.shippingAddress.city},{" "}
                    {item.shippingAddress.state} -{" "}
                    {item.shippingAddress.pinCode}
                  </p>

                  <p>
                    <strong>Mobile:</strong>{" "}
                    {item.shippingAddress.mobile}
                  </p>
                </div>
              </StyledTableCell>

              <StyledTableCell align="center">
                <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                  {item.orderStatus}
                </span>
              </StyledTableCell>

              <StyledTableCell align="center">
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) =>
                    handleClick(e, item.id)
                  }
                >
                  Status
                </Button>

                <Menu
                  anchorEl={anchorEl[item.id]}
                  open={Boolean(anchorEl[item.id])}
                  onClose={() => handleClose(item.id)}
                  TransitionComponent={Fade}
                >
                  <MenuItem
                    onClick={() =>
                      handleStatusChange(
                        item.id,
                        "PENDING"
                      )
                    }
                  >
                    Pending
                  </MenuItem>

                  <MenuItem
                    onClick={() =>
                      handleStatusChange(
                        item.id,
                        "PLACED"
                      )
                    }
                  >
                    Placed
                  </MenuItem>

                  <MenuItem
                    onClick={() =>
                      handleStatusChange(
                        item.id,
                        "CONFIRMED"
                      )
                    }
                  >
                    Confirmed
                  </MenuItem>

                  <MenuItem
                    onClick={() =>
                      handleStatusChange(
                        item.id,
                        "SHIPPED"
                      )
                    }
                  >
                    Shipped
                  </MenuItem>

                  <MenuItem
                    onClick={() =>
                      handleStatusChange(
                        item.id,
                        "DELIVERED"
                      )
                    }
                  >
                    Delivered
                  </MenuItem>

                  <MenuItem
                    onClick={() =>
                      handleStatusChange(
                        item.id,
                        "CANCELLED"
                      )
                    }
                    sx={{
                      color: "red",
                    }}
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
  );
}