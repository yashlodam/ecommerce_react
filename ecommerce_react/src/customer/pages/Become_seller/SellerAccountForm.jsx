import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import React, { useState } from 'react'
import BecomeSellerFormStep1 from './BecomeSellerFormStep1';
import { useFormik } from "formik";
import BecomeSellerFormStep2 from './BecomeSellerFormStep2';
import BecomeSellerFormStep3 from './BecomeSellerFormStep3';
import BecomeSellerFormStep4 from './BecomeSellerFormStep4';
import { validationSchemas } from './validationSchemas';

import { useAppDispatch } from '../../../State/Store'
import { createSellers } from '../../../State/seller/sellerSlice';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details"

]


function SellerAccountForm({ onRegisterSuccess }) {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();

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
    validationSchema: validationSchemas[activeStep],
    onSubmit: async (values) => {
      
    }
  });
  const handleCloseSnackbar = () => {
  setOpenSnackbar(false);
};


  const handleStep = (value) => async () => {

    if (value === -1) {
      if (activeStep > 0) {
        setActiveStep((prev) => prev - 1);
      }
      return;
    }

    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      formik.setTouched({
        mobile: true,
        otp: true,
        gstin: true,
        pickupAddress: {
          name: true,
          mobile: true,
          pincode: true,
          address: true,
          locality: true,
          city: true,
          state: true,
        },
        bankDetails: {
          accountNumber: true,
          ifscCode: true,
          accountHoldername: true,
        },
        sellerName: true,
        email: true,
        password: true,
        businessDetails: {
          businessName: true,
          businessEmail: true,
          businessMobile: true,
          logo: true,
          banner: true,
          businessAddress: true,
        },
      });

      console.log(errors);
      return;
    }

    // Last step -> Call API
    // Last step -> Call API
if (activeStep === steps.length - 1) {
 try {
  const resultAction = await dispatch(createSellers(formik.values));

  if (createSellers.fulfilled.match(resultAction)) {
    onRegisterSuccess();
  } else {
    alert(
      resultAction.payload?.message ||
      "Unable to create seller account."
    );
  }
} catch (error) {
  alert("Something went wrong.");
}

return;
}

    // Move to next step
    setActiveStep((prev) => prev + 1);
  };



  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {
          steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))
        }
      </Stepper>
      <section className='mt-20 space-y-10'>
        <div>
          {activeStep == 0 ? <BecomeSellerFormStep1 formik={formik} /> : activeStep == 1 ? <BecomeSellerFormStep2 formik={formik} /> :
            activeStep == 2 ? <BecomeSellerFormStep3 formik={formik} /> :
              activeStep == 3 ? <BecomeSellerFormStep4 formik={formik} /> : ""
          }
        </div>
        <div className='flex items-center justify-between'>
          <Button onClick={handleStep(-1)} variant='contained' disabled={activeStep == 0}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleStep(1)}
          >
            {activeStep === steps.length - 1 ? "Create Account" : "Continue"}
          </Button>
        </div>
      </section>

    </div>
  )
}

export default SellerAccountForm