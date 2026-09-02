import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchDeals, deleteDeal } from "../../../State/customer/CustomerSlice";

export default function DealTable() {
  const dispatch = useAppDispatch();
  const { deals, loading } = useAppSelector((store) => store.home);

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this deal?")) {
      dispatch(deleteDeal(id));
    }
  };

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
      <Table sx={{ minWidth: 650 }}>
        <TableHead className="bg-slate-50 dark:bg-slate-950/60">
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="center">Discount</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                <CircularProgress color="primary" size={28} />
              </TableCell>
            </TableRow>
          ) : deals && deals.length > 0 ? (
            deals.map((deal, idx) => (
              <TableRow key={deal.id || idx} hover className="transition-colors">
                <TableCell className="font-mono text-xs text-slate-400">
                  #{deal.id || idx + 1}
                </TableCell>
                <TableCell className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {deal.category?.categoryId || deal.category?.name || "Marketplace Special"}
                </TableCell>
                <TableCell align="center">
                  <span className="font-extrabold text-sm text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
                    {deal.discount}% OFF
                  </span>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(deal.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center" className="py-12 text-slate-400 dark:text-slate-500 text-sm">
                No active category deals configured. Use "Create Deal" to add one!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}