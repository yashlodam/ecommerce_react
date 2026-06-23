import React, { useState } from 'react'
import Grid from "@mui/material/Grid";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormik } from "formik";

function AddProduct() {

  const [uploadImage,setUploadingImage] = useState(false);

  const [snackbarOpen,setOpenSnackbar] = useState(false);

  const formik = useFormik({
    initialValues:{
      title:"",
      description:"",
      mrpPrice:"",
      sellingPrice:"",
      quantity:"",
      color:"",
      images:[],
      category:"",
      category2:"",
      category3:"",
      sizes:"",
    },
    onSubmit:(values)=>{

    }
  })

  const handleImageChange = async(e)=>{
    const file = e.target.files[0];
    setUploadingImage(true);
    setUploadingImage(false);
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className='space-y-4 p-4'>
        <Grid container spacing={2}>
          <Grid className="flex flex-wrap gap-5" item xs={12}>

            <input type="file" accept='image/*' id="fileInput"
            style={{display:none}}
            onChange={handleImageChange}
             />

             <label className='relative' htmlFor='fileInput'>
              <span className='w-24 h-24 cursor-pointer flex items-center justify-center'>
                <AddPhotoAlternateIcon className="text-gray-700"/>
              </span>
              {
                uploadImage && (
                  <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                    <CircularProgress/>
                  </div>
                )
              }
             </label>

             <div className='flex flex-wrap gap-2'>

             </div>

          </Grid>

        </Grid>
      </form>
    </div>
  )
}

export default AddProduct