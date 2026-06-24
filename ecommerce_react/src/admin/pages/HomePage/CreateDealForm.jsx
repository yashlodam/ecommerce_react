import React from 'react'
import { useFormik } from "formik";

function CreateDealForm() {

     const formik = useFormik({
        initialValues:{
            discount:0,
            category:"",


        },
        onSubmit: (values)=>{
            console.log("submit",values)
        }
       })
  return (
    <div>

    </div>
  )
}

export default CreateDealForm