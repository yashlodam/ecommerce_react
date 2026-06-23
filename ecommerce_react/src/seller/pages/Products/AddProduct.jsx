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

import { menLevelThree } from "../../../data/category/level three/menLevelThree";
import { womenLevelThree } from "../../../data/category/level three/womenLevelThree";
import { electronicsLevelThree } from "../../../data/category/level three/electronicsLevelThree";
import { homeFurnitureLevelThree } from "../../../data/category/level three/homeFurnitureLevelThree";
import { beautyLevelThree } from "../../../data/category/level three/beautyLevelThree";
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
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Green", hex: "#008000" },
];

const sizes = [
  { name: "S" },
  { name: "M" },
  { name: "L" },
  { name: "XL" },
  { name: "XXL" },
];

function AddProduct() {

  

  const [snackbarOpen,setOpenSnackbar] = useState(false);
  const [uploadImage, setUploadingImage] = useState(false);

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

  onSubmit: (values) => {
    console.log(values);
  },
});


  

  const childCategory = (category,parentCategoryId)=>{
    return category.filter((child)=>{
      return child.parentCategoryId==parentCategoryId;
    })
  }

  const handleCloseSnackbar = ()=>{
    setOpenSnackbar(false)
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

      {sizes.map((size, index) => (
        <MenuItem key={index} value={size.name}>
          {size.name}
        </MenuItem>
      ))}
    </Select>

    {formik.touched.sizes && formik.errors.sizes && (
      <FormHelperText>{formik.errors.sizes}</FormHelperText>
    )}
  </FormControl>
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
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      label="Size"
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
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      label="Size"
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
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      label="Size"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>

      {childCategory(
  categoryThree[formik.values.category] || [],
  formik.values.category2
).map((item) => (
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
    </div>
  )
}

export default AddProduct