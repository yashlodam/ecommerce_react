import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import React, { useState } from 'react'
import BecomeSellerFormStep1 from './BecomeSellerFormStep1';
import { useFormik } from "formik";
const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details"

]

function SellerAccountForm() {
  const [activeStep,setActiveStep] = useState(0);
  const formik = useFormik({
  initialValues: {
    mobile: "",
    otp: "",
    gstin: "",
    pickupAddress: {
      name: "",
      mobile: "",
      pincode: "",
      address: "",
      locality: "",
      city: "",
      state: "",
    },
    bankDetails: {
      accountNumber: "",
      ifscCode: "",
      accountHoldername: "",
    },
    sellerName: "",
    email: "",
    businessDetails: {
      businessName: "",
      businessEmail: "",
      businessMobile: "",
      logo: "",
      banner: "",
      businessAddress: "",
    },
    password: "",
  },

  onSubmit: (values) => {
    console.log(values, "formik submitted");
  },
});

  const handleStep= (value)=>()=>{
    
    (activeStep<steps.length-1 || (activeStep>0 && value==-1)) && setActiveStep(activeStep+value);

    activeStep==steps.length-1 && handleCreateAccount();
    console.log("active step:",activeStep)

  }

  const handleCreateAccount = ()=>{
    console.log("Create account")
  }

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {
          steps.map((label,index)=>(
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))
        }
      </Stepper>
      <section>
        {activeStep==0 ? <BecomeSellerFormStep1 formik={formik}/> : null}
      </section>
      <div className='flex items-center justify-between'>
        <Button onClick={handleStep(-1)} variant='contained' disabled={activeStep==0}>
          Back
        </Button>
        <Button onClick={handleStep(1)} variant='contained' >
          {activeStep==(steps.length-1) ?"Create Account":"continue"}
      
        </Button>
      </div>
    </div>
  )
}

export default SellerAccountForm