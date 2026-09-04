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
  const home = useAppSelector((store) => store.home || store.customer);
  const deals = home?.deals || [];
  const loading = home?.loading || false;

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this deal?")) {
      dispatch(deleteDeal(id));
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <CircularProgress color="primary" size={28} />
        </div>
      ) : !deals || deals.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-sm">
          No active category deals configured. Use &quot;Create Deal&quot; to add one!
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {deals.map((deal, idx) => (
              <div
                key={deal.id || idx}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3 transition-colors"
              >
                <div>
                  <span className="font-mono text-xs text-slate-400">
                    #{deal.id || idx + 1}
                  </span>
                  <p className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-0.5">
                    {deal.category?.categoryId || deal.category?.name || "Marketplace Special"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-2.5 py-1 rounded-full border border-teal-200 dark:border-teal-800">
                    {deal.discount}% OFF
                  </span>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(deal.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <TableContainer
            component={Paper}
            elevation={0}
            className="hidden md:block"
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
                {deals.map((deal, idx) => (
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}