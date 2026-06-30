import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../State/Store";

import { fetchTransactionsBySeller } from "../../../State/seller/transactionSlice";

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

export default function Transaction() {
  const dispatch = useAppDispatch();

  const { transaction } = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(fetchTransactionsBySeller(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  console.log(transaction);

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Customer</StyledTableCell>
            <StyledTableCell>Order ID</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transaction.loading ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                Loading...
              </TableCell>
            </TableRow>
          ) : transaction.transactions.length > 0 ? (
            transaction.transactions.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell>
                  {new Date(item.date).toLocaleDateString()}
                </StyledTableCell>

                <StyledTableCell>
                  <div>
                    <div className="font-semibold">
                      {item.customer?.fullName}
                    </div>

                    <div className="text-sm text-gray-500">
                      {item.customer?.email}
                    </div>
                  </div>
                </StyledTableCell>

                <StyledTableCell>
                  #{item.order?.id}
                </StyledTableCell>

                <StyledTableCell align="right">
                  ₹{item.order?.totalSellingPrice}
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No transactions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}