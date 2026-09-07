import React, { useEffect, useState, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CategoryIcon from "@mui/icons-material/Category";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchHomeCategories,
  createHomeCategory,
  updateHomeCategory,
  deleteHomeCategory,
} from "../../../State/admin/adminSlice";
import { fetchHomePageData } from "../../../State/customer/CustomerSlice";
import ConfirmDialog from "../../../common/dialog/ConfirmDialog";
import EmptyState from "../../../common/EmptyState";
import { toast } from "../../../common/toast";

const SECTIONS = [
  { value: "SHOP_BY_CATEGORIES", label: "Shop By Categories (Landing Circles)" },
  { value: "ELECTRIC_CATEGORIES", label: "Electric Categories (Tech Row)" },
  { value: "GRID", label: "Homepage Grid (Promo Highlights)" },
  { value: "DEALS", label: "Deals & Offers Category" },
];

function getSectionBadge(section) {
  switch (section) {
    case "SHOP_BY_CATEGORIES":
      return <Chip label="Shop By Category" size="small" color="primary" variant="outlined" className="font-bold text-xs" />;
    case "ELECTRIC_CATEGORIES":
      return <Chip label="Electronics" size="small" color="secondary" variant="outlined" className="font-bold text-xs" />;
    case "GRID":
      return <Chip label="Home Grid" size="small" color="warning" variant="outlined" className="font-bold text-xs" />;
    case "DEALS":
      return <Chip label="Deal Showcase" size="small" color="error" variant="outlined" className="font-bold text-xs" />;
    default:
      return <Chip label={section || "Standard"} size="small" variant="outlined" className="font-bold text-xs" />;
  }
}

export default function HomeCategoryTable({
  section,
  title = "Homepage Category Configuration",
  subtitle = "Configure banners, category slugs, and imagery displayed on the marketplace storefront.",
}) {
  const dispatch = useAppDispatch();
  const homeCategory = useAppSelector((store) => store.homeCategory || store.admin);
  const categories = homeCategory?.categories || [];
  const loading = homeCategory?.loading || false;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSectionFilter, setSelectedSectionFilter] = useState(section || "ALL");

  // Modal Dialog states
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [submitting, setSubmitting] = useState(false);

  // Form field state
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    categoryId: "",
    image: "",
    section: section || "SHOP_BY_CATEGORIES",
    priority: 1,
  });
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // Delete dialog state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    dispatch(fetchHomeCategories()).finally(() => {
      setHasFetched(true);
    });
  }, [dispatch]);

  // Filtered categories based on section and search query
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchSection =
        selectedSectionFilter === "ALL" || cat.section === selectedSectionFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        cat.name?.toLowerCase().includes(q) ||
        cat.categoryId?.toLowerCase().includes(q) ||
        cat.section?.toLowerCase().includes(q);
      return matchSection && matchSearch;
    });
  }, [categories, selectedSectionFilter, searchQuery]);

  // Open "Create" modal
  const handleOpenCreate = () => {
    setModalMode("create");
    setSlugManuallyEdited(false);
    setFormData({
      id: null,
      name: "",
      categoryId: "",
      image: "",
      section: section || "SHOP_BY_CATEGORIES",
      priority: (categories.length || 0) + 1,
    });
    setFormModalOpen(true);
  };

  // Open "Edit" modal
  const handleOpenEdit = (item) => {
    setModalMode("edit");
    setSlugManuallyEdited(true);
    setFormData({
      id: item.id,
      name: item.name || "",
      categoryId: item.categoryId || "",
      image: item.image || "",
      section: item.section || section || "SHOP_BY_CATEGORIES",
      priority: item.priority != null ? item.priority : 1,
    });
    setFormModalOpen(true);
  };

  // Name change handler with auto-slug generation in create mode
  const handleNameChange = (e) => {
    const val = e.target.value;
    if (!slugManuallyEdited && modalMode === "create") {
      const autoSlug = val
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
      setFormData((prev) => ({ ...prev, name: val, categoryId: autoSlug }));
    } else {
      setFormData((prev) => ({ ...prev, name: val }));
    }
  };

  // Submit Handler (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.warning("Please enter a category name.");
      return;
    }
    if (!formData.categoryId.trim()) {
      toast.warning("Please provide a category slug / identifier.");
      return;
    }

    setSubmitting(true);
    try {
      if (modalMode === "create") {
        await dispatch(
          createHomeCategory({
            name: formData.name.trim(),
            categoryId: formData.categoryId.trim(),
            image: formData.image.trim(),
            section: formData.section,
            priority: Number(formData.priority) || 0,
          })
        ).unwrap();
        toast.success(`Category "${formData.name}" created successfully!`);
      } else {
        await dispatch(
          updateHomeCategory({
            id: formData.id,
            data: {
              name: formData.name.trim(),
              categoryId: formData.categoryId.trim(),
              image: formData.image.trim(),
              section: formData.section,
              priority: Number(formData.priority) || 0,
            },
          })
        ).unwrap();
        toast.success(`Category "${formData.name}" updated successfully!`);
      }

      // Re-fetch storefront home data so customers instantly see updates
      dispatch(fetchHomePageData());
      setFormModalOpen(false);
    } catch (err) {
      toast.error(err || "Failed to save category. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Open Delete confirmation
  const handleOpenDelete = (item) => {
    setCategoryToDelete(item);
    setDeleteConfirmOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await dispatch(deleteHomeCategory(categoryToDelete.id)).unwrap();
      toast.info(`Category "${categoryToDelete.name || categoryToDelete.categoryId}" removed.`);
      dispatch(fetchHomePageData());
    } catch (err) {
      toast.error(err || "Failed to delete category.");
    } finally {
      setDeleteConfirmOpen(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Title and Add Button */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/50 border border-teal-100 dark:border-teal-900/60 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <CategoryIcon fontSize="small" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {title}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {subtitle}
            </p>
          </div>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenCreate}
            sx={{
              borderRadius: "14px",
              textTransform: "none",
              fontWeight: 800,
              fontSize: "13px",
              px: 3,
              py: 1.2,
              boxShadow: "0 4px 14px 0 rgba(13, 148, 136, 0.3)",
            }}
          >
            Add New Category
          </Button>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          {/* Section Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setSelectedSectionFilter("ALL")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                selectedSectionFilter === "ALL"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              All ({categories.length})
            </button>
            {SECTIONS.map((sec) => {
              const count = categories.filter((c) => c.section === sec.value).length;
              const isSelected = selectedSectionFilter === sec.value;
              return (
                <button
                  key={sec.value}
                  type="button"
                  onClick={() => setSelectedSectionFilter(sec.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-teal-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {sec.value === "SHOP_BY_CATEGORIES"
                    ? "Shop By Category"
                    : sec.value === "ELECTRIC_CATEGORIES"
                    ? "Electronics"
                    : sec.value === "GRID"
                    ? "Grid"
                    : "Deals"}{" "}
                  ({count})
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <TextField
            size="small"
            placeholder="Search category name or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" className="text-slate-400" />
                </InputAdornment>
              ),
            }}
            className="w-full md:w-72"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                fontSize: "13px",
              },
            }}
          />
        </div>
      </div>

      {/* Content Area */}
      {(loading || !hasFetched) && categories.length === 0 ? (
        <div className="flex justify-center items-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800">
          <CircularProgress color="primary" size={32} />
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-12 transition-colors">
          <EmptyState
            icon={CategoryIcon}
            title="No categories found"
            description="No homepage categories match the current filter or search criteria. Click 'Add New Category' to create one."
          />
        </div>
      ) : (
        <>
          {/* Mobile Card Layout (xs to lg) */}
          <div className="grid grid-cols-1 gap-3.5 lg:hidden">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center overflow-hidden p-1.5 shadow-xs">
                    <img
                      src={cat.image || "https://placehold.co/80x80?text=Category"}
                      alt={cat.name || cat.categoryId}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/80x80?text=Category";
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                        {cat.name || cat.categoryId}
                      </h3>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                        #{cat.priority || 0}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-teal-600 dark:text-teal-400 mt-0.5 truncate">
                      /products/{cat.categoryId}
                    </p>
                    <div className="mt-1.5">
                      {getSectionBadge(cat.section)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    size="small"
                    component="a"
                    href={`/products/${cat.categoryId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<OpenInNewIcon fontSize="small" />}
                    sx={{ textTransform: "none", fontSize: "11px", fontWeight: 700 }}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon fontSize="small" />}
                    onClick={() => handleOpenEdit(cat)}
                    sx={{ borderRadius: "10px", textTransform: "none", fontSize: "11px", fontWeight: 700 }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon fontSize="small" />}
                    onClick={() => handleOpenDelete(cat)}
                    sx={{ borderRadius: "10px", textTransform: "none", fontSize: "11px", fontWeight: 700 }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (lg+) */}
          <TableContainer
            component={Paper}
            elevation={0}
            className="hidden lg:block"
            sx={{
              borderRadius: "24px",
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
              bgcolor: "background.paper",
            }}
          >
            <Table sx={{ minWidth: 800 }}>
              <TableHead className="bg-slate-50 dark:bg-slate-950/60">
                <TableRow>
                  <TableCell sx={{ fontWeight: 800, width: "70px" }}>Priority</TableCell>
                  <TableCell sx={{ fontWeight: 800, width: "80px" }}>Image</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Category Name</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Slug / URL Identifier</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Section Placement</TableCell>
                  <TableCell sx={{ fontWeight: 800 }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredCategories.map((cat, idx) => (
                  <TableRow key={cat.id || idx} hover className="transition-colors">
                    {/* Priority Order */}
                    <TableCell>
                      <span className="font-mono text-xs font-bold px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        #{cat.priority ?? idx + 1}
                      </span>
                    </TableCell>

                    {/* Image Preview */}
                    <TableCell>
                      <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center overflow-hidden p-1 shadow-2xs">
                        <img
                          src={cat.image || "https://placehold.co/60x60?text=Category"}
                          alt={cat.name || cat.categoryId}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "https://placehold.co/60x60?text=Category";
                          }}
                        />
                      </div>
                    </TableCell>

                    {/* Category Name */}
                    <TableCell>
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {cat.name || "—"}
                      </span>
                    </TableCell>

                    {/* Category Slug / Link */}
                    <TableCell>
                      <div className="flex items-center gap-1.5 font-mono text-xs text-teal-600 dark:text-teal-400 font-medium">
                        <span>/products/{cat.categoryId}</span>
                        <Tooltip title="Preview category page on storefront">
                          <a
                            href={`/products/${cat.categoryId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors"
                          >
                            <OpenInNewIcon sx={{ fontSize: 14 }} />
                          </a>
                        </Tooltip>
                      </div>
                    </TableCell>

                    {/* Section Placement */}
                    <TableCell>
                      {getSectionBadge(cat.section)}
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="right">
                      <div className="flex items-center justify-end gap-1">
                        <Tooltip title="Edit Category">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenEdit(cat)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Category">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleOpenDelete(cat)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Add / Edit Category Dialog */}
      <Dialog
        open={formModalOpen}
        onClose={submitting ? undefined : () => setFormModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            p: 1.5,
            bgcolor: "background.paper",
            backgroundImage: "none",
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-slate-100">
            {modalMode === "create" ? "Add New Homepage Category" : "Edit Homepage Category"}
          </DialogTitle>

          <DialogContent className="space-y-4 pt-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure how this category appears across the customer marketplace (e.g. Shop by Category carousel, Electronics row, or Homepage Grid).
            </p>

            {/* Category Name */}
            <TextField
              fullWidth
              required
              label="Display Name"
              placeholder="e.g. Men's Footwear, Ethnic Sarees, Smart Watches"
              value={formData.name}
              onChange={handleNameChange}
              sx={{ mt: 1 }}
            />

            {/* Category Slug / Identifier */}
            <TextField
              fullWidth
              required
              label="Category Slug / Identifier"
              placeholder="e.g. men_footwear, women_sarees, smart_watches"
              helperText="Determines the storefront URL: /products/{category_slug}"
              value={formData.categoryId}
              onChange={(e) => {
                setSlugManuallyEdited(true);
                setFormData((prev) => ({ ...prev, categoryId: e.target.value }));
              }}
            />

            {/* Section Placement */}
            <FormControl fullWidth>
              <InputLabel id="section-select-label">Storefront Section Placement</InputLabel>
              <Select
                labelId="section-select-label"
                label="Storefront Section Placement"
                value={formData.section}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, section: e.target.value }))
                }
              >
                {SECTIONS.map((sec) => (
                  <MenuItem key={sec.value} value={sec.value}>
                    {sec.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Priority Order */}
            <TextField
              fullWidth
              type="number"
              label="Display Order / Priority (Lower numbers appear first)"
              value={formData.priority}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, priority: e.target.value }))
              }
              inputProps={{ min: 0, step: 1 }}
            />

            {/* Image URL with live preview */}
            <div className="space-y-2">
              <TextField
                fullWidth
                label="Thumbnail / Banner Image URL"
                placeholder="https://images.unsplash.com/... or cloud image link"
                value={formData.image}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, image: e.target.value }))
                }
              />

              {/* Real-time Image Preview Box */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden p-1 shrink-0">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/80x80?text=Invalid";
                      }}
                    />
                  ) : (
                    <ImageOutlinedIcon className="text-slate-400" />
                  )}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <p className="font-semibold text-slate-700 dark:text-slate-300">
                    Image Live Preview
                  </p>
                  <p className="text-[11px] mt-0.5">
                    {formData.image
                      ? "Check to ensure the aspect ratio and resolution look sharp."
                      : "Paste an image URL above to verify thumbnail preview."}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2.5, pt: 1, gap: 1 }}>
            <Button
              onClick={() => setFormModalOpen(false)}
              disabled={submitting}
              variant="outlined"
              sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 800,
                px: 3,
              }}
            >
              {submitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : modalMode === "create" ? (
                "Create Category"
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Homepage Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name || categoryToDelete?.categoryId}"? This category will be removed from customer navigation and storefront sections.`}
        confirmText="Delete Category"
        isDestructive={true}
      />
    </div>
  );
}
