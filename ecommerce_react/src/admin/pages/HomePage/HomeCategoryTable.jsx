import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchHomeCategories,
  updateHomeCategory,
} from "../../../State/admin/adminSlice";

export default function HomeCategoryTable({
  section,
  title = "Homepage Category Configuration",
  subtitle = "Configure banners, category slugs, and imagery displayed on the marketplace storefront.",
}) {
  const dispatch = useAppDispatch();
  const homeCategory = useAppSelector((store) => store.homeCategory || store.admin);
  const categories = homeCategory?.categories || [];
  const loading = homeCategory?.loading || false;

  const [editDialog, setEditDialog] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    dispatch(fetchHomeCategories());
  }, [dispatch]);

  const displayCategories = section
    ? categories.filter((c) => c.section === section)
    : categories;

  const handleOpenEdit = (item) => {
    setSelectedCat(item);
    setImageUrl(item.image || "");
    setCategoryId(item.categoryId || "");
    setEditDialog(true);
  };

  const handleSave = () => {
    if (selectedCat) {
      dispatch(
        updateHomeCategory({
          id: selectedCat.id,
          data: { ...selectedCat, image: imageUrl, categoryId: categoryId },
        })
      );
    }
    setEditDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          {subtitle}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <CircularProgress color="primary" size={28} />
        </div>
      ) : !displayCategories || displayCategories.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-sm">
          No home categories configured.
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {displayCategories.map((cat, idx) => (
              <div
                key={cat.id || idx}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center overflow-hidden p-1">
                    <img
                      src={cat.image || "https://placehold.co/60x60?text=Cat"}
                      alt={cat.categoryId}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                      {cat.categoryId || "Category"}
                    </p>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {cat.section || "HOME_GRID"}
                    </span>
                  </div>
                </div>

                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => handleOpenEdit(cat)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
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
                  <TableCell sx={{ fontWeight: 700 }}>Image Preview</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Category Identifier</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Section</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">Edit</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {displayCategories.map((cat, idx) => (
                  <TableRow key={cat.id || idx} hover className="transition-colors">
                    <TableCell className="font-mono text-xs text-slate-400">
                      #{cat.id || idx + 1}
                    </TableCell>
                    <TableCell>
                      <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center overflow-hidden p-1">
                        <img
                          src={cat.image || "https://placehold.co/60x60?text=Cat"}
                          alt={cat.categoryId}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {cat.categoryId || "Category"}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      {cat.section || "HOME_GRID"}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpenEdit(cat)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Edit Category Dialog */}
      <Dialog
        open={editDialog}
        onClose={() => setEditDialog(false)}
        PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
      >
        <DialogTitle className="font-bold">Edit Homepage Category Banner</DialogTitle>
        <DialogContent className="space-y-4 pt-2">
          <TextField
            fullWidth
            label="Category Slug / ID"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            sx={{ mt: 1 }}
          />
          <TextField
            fullWidth
            label="Banner Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditDialog(false)} color="inherit" sx={{ borderRadius: "10px" }}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary" sx={{ borderRadius: "10px", fontWeight: 700 }}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}