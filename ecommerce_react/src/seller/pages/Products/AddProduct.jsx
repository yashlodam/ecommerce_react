import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import { mainCategory } from "../../../data/category/mainCategory";
import { menLevelTwo } from "../../../data/category/level two/menLevelTwo";
import { womenLevelTwo } from "../../../data/category/level two/womensLevelTwo";
import { electronicsLevelTwo } from "../../../data/category/level two/electronicsLevelTwo";
import { homeFurnitureLevelTwo } from "../../../data/category/level two/homeFurnitureLevelTwo";
import { beautyLevelTwo } from "../../../data/category/level two/beautyLevelTwo";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { menLevelThree } from "../../../data/category/level three/menLevelThree";
import { womenLevelThree } from "../../../data/category/level three/womenLevelThree";
import { electronicsLevelThree } from "../../../data/category/level three/electronicsLevelThree";
import { homeFurnitureLevelThree } from "../../../data/category/level three/homeFurnitureLevelThree";
import { beautyLevelThree } from "../../../data/category/level three/beautyLevelThree";
import { useAppDispatch} from '../../../State/Store';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";

import { useFormik } from "formik";
import { uploadToCloudinary } from "../../../Util/uploadToCloudinary";
import { createProduct } from "../../../State/seller/sellerProductSlice";


const categoryTwo = {
  men: menLevelTwo,
  women: womenLevelTwo,
  electronics: electronicsLevelTwo,
  home_furniture: homeFurnitureLevelTwo,
  beauty: beautyLevelTwo,
};

const categoryThree = {
  men: menLevelThree,
  women: womenLevelThree,
  electronics: electronicsLevelThree,
  home_furniture: homeFurnitureLevelThree,
  beauty: beautyLevelThree,
};

const colors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Gray", hex: "#808080" },
  { name: "Silver", hex: "#C0C0C0" },

  { name: "Red", hex: "#FF0000" },
  { name: "Maroon", hex: "#800000" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Hot Pink", hex: "#FF69B4" },

  { name: "Blue", hex: "#0000FF" },
  { name: "Navy Blue", hex: "#000080" },
  { name: "Sky Blue", hex: "#87CEEB" },
  { name: "Royal Blue", hex: "#4169E1" },

  { name: "Green", hex: "#008000" },
  { name: "Light Green", hex: "#90EE90" },
  { name: "Olive", hex: "#808000" },
  { name: "Mint Green", hex: "#98FF98" },

  { name: "Yellow", hex: "#FFFF00" },
  { name: "Mustard", hex: "#FFDB58" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Coral", hex: "#FF7F50" },

  { name: "Purple", hex: "#800080" },
  { name: "Lavender", hex: "#E6E6FA" },
  { name: "Violet", hex: "#8A2BE2" },

  { name: "Brown", hex: "#8B4513" },
  { name: "Chocolate", hex: "#D2691E" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Cream", hex: "#FFFDD0" },
  { name: "Tan", hex: "#D2B48C" },

  { name: "Gold", hex: "#FFD700" },
  { name: "Rose Gold", hex: "#B76E79" },
  { name: "Bronze", hex: "#CD7F32" },

  { name: "Cyan", hex: "#00FFFF" },
  { name: "Teal", hex: "#008080" },
  { name: "Turquoise", hex: "#40E0D0" },

  { name: "Indigo", hex: "#4B0082" },
  { name: "Magenta", hex: "#FF00FF" },

  { name: "Multicolor", hex: "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)" },
  { name: "Transparent", hex: "transparent" },
];

const variants = {
  men: [
    "S",
    "M",
    "L",
    "XL",
    "XXL",
  ],

  women: [
    "XS",
    "S",
    "M",
    "L",
    "XL",
  ],

  electronics: [
  "32 GB",
  "64 GB",
  "128 GB",
  "256 GB",
  "512 GB",
  "1 TB",

  "2 GB RAM",
  "4 GB RAM",
  "6 GB RAM",
  "8 GB RAM",
  "12 GB RAM",
  "16 GB RAM",
  "32 GB RAM",

  "11 inch",
  "13 inch",
  "14 inch",
  "15.6 inch",
  "16 inch",
  "24 inch",
  "27 inch",
  "32 inch",
  "43 inch",
  "50 inch",
  "55 inch",
  "65 inch",

  "Bluetooth",
  "Wireless",
  "Wired",

  "Single SIM",
  "Dual SIM",

  "USB Type-C",
  "Lightning",
  "Micro USB",
],

  home_furniture: [
    "Single",
    "Double",
    "Queen",
    "King",
    "Small",
    "Medium",
    "Large",
  ],

  beauty: [
    "30 ml",
    "50 ml",
    "100 ml",
    "200 ml",
    "250 ml",
    "500 ml",
  ],
};

function AddProduct() {

  
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState("");
const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [uploadImage, setUploadingImage] = useState(false);

  const dispatch = useAppDispatch();

const handleImageChange = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setUploadingImage(true);

  try {
    const imageUrl = await uploadToCloudinary(file);
    console.log(imageUrl)

    if (imageUrl) {
      formik.setFieldValue("images", [
        ...formik.values.images,
        imageUrl,
      ]);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setUploadingImage(false);
  }
};



const handleRemoveImage = (index) => {
  const updatedImages = [...formik.values.images];
  updatedImages.splice(index, 1);

  formik.setFieldValue("images", updatedImages);
};

  const formik = useFormik({
  initialValues: {
    title: "",
    description: "",
    mrpPrice: "",
    sellingPrice: "",
    quantity: "",
    color: "",
    images: [],
    category: "",
    category2: "",
    category3: "",
    sizes: "",
  },

onSubmit: async (values) => {
  const result = await dispatch(
    createProduct({
      product: values,
      jwt: localStorage.getItem("jwt"),
    })
  );


  if (createProduct.fulfilled.match(result)) {
    setSnackbarMessage("Product added successfully.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);

    formik.resetForm();
  } else {
    setSnackbarMessage("Failed to add product. Please try again.");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  }
},
});

const variantOptions = variants[formik.values.category] || [];
  

  const childCategory = (category,parentCategoryId)=>{
    return category.filter((child)=>{
      return child.parentCategoryId==parentCategoryId;
    })
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);   // ✅ Correct
}

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className='space-y-4 p-4'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
  <div className="flex flex-wrap gap-5">
    <input
      type="file"
      accept="image/*"
      id="fileInput"
      style={{ display: "none" }}
      onChange={handleImageChange}
    />

    <label htmlFor="fileInput" className="relative cursor-pointer">
      <span className="w-24 h-24 border rounded-md flex items-center justify-center">
        <AddPhotoAlternateIcon />
      </span>

      {uploadImage && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70">
          <CircularProgress size={30} />
        </div>
      )}
    </label>

    <div className="flex flex-wrap gap-3">
      {formik.values.images.map((image, index) => (
        <div key={index} className="relative">
          <img
            src={image}
            alt={`product-${index}`}
            className="w-24 h-24 rounded-md object-cover border"
          />

          <IconButton
            color="error"
            size="small"
            onClick={() => handleRemoveImage(index)}
            sx={{
              position: "absolute",
              top: -10,
              right: -10,
              bgcolor: "white",
            }}
          >
            ✕
          </IconButton>
        </div>
      ))}
    </div>
  </div>
</Grid>

          <Grid size={{xs:12}}>
            <TextField
            fullWidth
            id='title'
            name='title'
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            required
            />
          </Grid>
          <Grid size={{xs:12}}>
            <TextField
            fullWidth
            multiline
            rows={4}
            id='description'
            name='description'
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            required
            />
          </Grid>
          

 <Grid size={{ xs: 12, md: 4, lg: 3 }}>
  <FormControl
    fullWidth
    error={formik.touched.category && Boolean(formik.errors.category)}
    required
  >
    <InputLabel id="category-label">Category</InputLabel>

    <Select
  labelId="category-label"
  id="category"
  name="category"
  value={formik.values.category}
  label="Category"
  onChange={(e) => {
    formik.setFieldValue("category", e.target.value);
    formik.setFieldValue("category2", "");
    formik.setFieldValue("category3", "");
  }}
>
  <MenuItem value="">
    <em>None</em>
  </MenuItem>

  {mainCategory.map((item) => (
    <MenuItem key={item.categoryId} value={item.categoryId}>
      {item.name}
    </MenuItem>
  ))}
</Select>

    {formik.touched.category && formik.errors.category && (
      <FormHelperText>{formik.errors.category}</FormHelperText>
    )}
  </FormControl>
</Grid>

   <Grid size={{ xs: 12, md: 4, lg: 3 }}>
  <FormControl
    fullWidth
    error={formik.touched.category2 && Boolean(formik.errors.category2)}
    required
  >
    <InputLabel id="category2-label">Second Category</InputLabel>

   <Select
  labelId="category2-label"
  id="category2"
  name="category2"
  value={formik.values.category2}
  label="Second Category"
  onChange={(e) => {
    formik.setFieldValue("category2", e.target.value);
    formik.setFieldValue("category3", "");
  }}
>
  <MenuItem value="">
    <em>None</em>
  </MenuItem>

  {(categoryTwo[formik.values.category] || []).map((item) => (
    <MenuItem key={item.categoryId} value={item.categoryId}>
      {item.name}
    </MenuItem>
  ))}
</Select>

    {formik.touched.category2 && formik.errors.category2 && (
      <FormHelperText>{formik.errors.category2}</FormHelperText>
    )}
  </FormControl>
</Grid>



<Grid size={{ xs: 12, md: 4, lg: 3 }}>
  <FormControl
    fullWidth
    error={formik.touched.category3 && Boolean(formik.errors.category3)}
    required
  >
    <InputLabel id="category3-label">Third Category</InputLabel>

    <Select
  labelId="category3-label"
  id="category3"
  name="category3"
  value={formik.values.category3}
  label="Third Category"
  onChange={formik.handleChange}
>
  <MenuItem value="">
    <em>None</em>
  </MenuItem>

  {(categoryThree[formik.values.category] || [])
    .filter(
      (item) => item.parentCategoryId === formik.values.category2
    )
    .map((item) => (
      <MenuItem key={item.categoryId} value={item.categoryId}>
        {item.name}
      </MenuItem>
    ))}
</Select>

    {formik.touched.category3 && formik.errors.category3 && (
      <FormHelperText>{formik.errors.category3}</FormHelperText>
    )}
  </FormControl>
</Grid>


<Grid size={{xs:12,md:4 ,lg:3}}>
            <TextField
            fullWidth
            id='mrp_price'
            name='mrpPrice'
            label="MRP Price"
            type='number'
            value={formik.values.mrpPrice}
            onChange={formik.handleChange}
            error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
            helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
            required
            />
          </Grid>

          <Grid size={{xs:12,md:4 ,lg:3}}>
            <TextField
            fullWidth
            id='sellingPrice'
            name='sellingPrice'
            label="Selling Price"
            type='number'
            value={formik.values.sellingPrice}
            onChange={formik.handleChange}
            error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
            helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
            required
            />
          </Grid>


         <Grid size={{ xs: 12, md: 4, lg: 3 }}>
  <FormControl
    fullWidth
    error={formik.touched.color && Boolean(formik.errors.color)}
    required
  >
    <InputLabel id="color-label">Color</InputLabel>

    <Select
      labelId="color-label"
      id="color"
      name="color"
      value={formik.values.color}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      label="Color"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>

      {colors.map((color, index) => (
        <MenuItem key={index} value={color.name}>
          <div className="flex gap-3 items-center">
            <span
              style={{ backgroundColor: color.hex }}
              className={`h-5 w-5 rounded-full ${
                color.name === "White" ? "border" : ""
              }`}
            />
            <p>{color.name}</p>
          </div>
        </MenuItem>
      ))}
    </Select>

    {formik.touched.color && formik.errors.color && (
      <FormHelperText>{formik.errors.color}</FormHelperText>
    )}
  </FormControl>
</Grid>

      <Grid size={{ xs: 12, md: 4, lg: 3 }}>
  <FormControl
    fullWidth
    error={formik.touched.sizes && Boolean(formik.errors.sizes)}
    required
  >
    <InputLabel id="sizes-label">Size</InputLabel>

    <Select
      labelId="sizes-label"
      id="sizes"
      name="sizes"
      value={formik.values.sizes}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      label="Size"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>

      {variantOptions.map((item, index) => (
  <MenuItem key={index} value={item}>
    {item}
  </MenuItem>
))}
    </Select>

    {formik.touched.sizes && formik.errors.sizes && (
      <FormHelperText>{formik.errors.sizes}</FormHelperText>
    )}
  </FormControl>
</Grid>

    <Grid size={{xs:12}}>

      <Button
      sx={{p:"14px"}}
      color="primary"
      variant="contained"
      fullWidth
      type="submit"
      >
        {
          false ? <CircularProgress size="small"/>:""
        }
        ADD PRODUCT

      </Button>

    </Grid>

      
        </Grid>
      </form>
      <Snackbar
  open={snackbarOpen}
  autoHideDuration={4000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Alert
    onClose={handleCloseSnackbar}
    severity={snackbarSeverity}
    variant="filled"
    sx={{ width: "100%" }}
  >
    {snackbarMessage}
  </Alert>
</Snackbar>
    </div>
  )
}

export default AddProduct