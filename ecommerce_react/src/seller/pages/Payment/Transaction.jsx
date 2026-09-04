import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchTransactionsBySeller } from "../../../State/seller/transactionSlice";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

export default function Transaction() {
  const dispatch = useAppDispatch();
  const { transactions = [], loading = false } = useAppSelector(
    (store) => store.transaction || {}
  );

  useEffect(() => {
    dispatch(fetchTransactionsBySeller(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  const transactionList = Array.isArray(transactions) ? transactions : [];

  return (
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
      <Table sx={{ minWidth: 750 }}>
        <TableHead className="bg-slate-50 dark:bg-slate-950/60">
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">Settled Amount</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                <CircularProgress color="primary" size={28} />
              </TableCell>
            </TableRow>
          ) : transactionList.length > 0 ? (
            transactionList.map((item) => (
              <TableRow key={item.id} hover className="transition-colors">
                <TableCell className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {item.date
                    ? new Date(item.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </TableCell>

                <TableCell>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {item.customer?.fullName || "Verified Buyer"}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {item.customer?.email}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                    #{item.order?.id}
                  </span>
                </TableCell>

                <TableCell align="right">
                  <span className="font-bold text-sm text-teal-700 dark:text-teal-400">
                    {formatINR(item.order?.totalSellingPrice)}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center" className="py-12 text-slate-400 dark:text-slate-500 text-sm">
                No transaction records found for this seller account.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}