import React, { useState } from "react";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useFormik } from "formik";

import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";
import { validationSchemas } from "./validationSchemas";
import { useAppDispatch } from "../../../State/Store";
import { createSellers } from "../../../State/seller/sellerSlice";

const steps = [
  "Tax & Mobile",
  "Pickup Location",
  "Bank Details",
  "Store & Login",
];

function SellerAccountForm({ onRegisterSuccess }) {
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
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
    onSubmit: async () => {},
  });

  const handleStep = (direction) => async () => {
    if (direction === -1) {
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
      return;
    }

    // Last step -> Submit to backend
    if (activeStep === steps.length - 1) {
      setSubmitting(true);
      try {
        const resultAction = await dispatch(createSellers(formik.values));
        if (createSellers.fulfilled.match(resultAction)) {
          onRegisterSuccess();
        } else {
          alert(
            resultAction.payload?.message ||
              "Unable to complete seller registration. Please verify details."
          );
        }
      } catch {
        alert("Something went wrong during registration. Please try again.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // Move to next step
    setActiveStep((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      {/* Horizontal Stepper */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepLabel-label": {
            fontSize: "11px",
            fontWeight: 600,
            mt: 0.5,
          },
          "& .MuiStepLabel-label.Mui-active": {
            color: "#00927c",
            fontWeight: 700,
          },
          "& .MuiStepLabel-label.Mui-completed": {
            color: "#00927c",
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: "#00927c",
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "#00927c",
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Form Body */}
      <div className="pt-2 min-h-[280px]">
        {activeStep === 0 && <BecomeSellerFormStep1 formik={formik} />}
        {activeStep === 1 && <BecomeSellerFormStep2 formik={formik} />}
        {activeStep === 2 && <BecomeSellerFormStep3 formik={formik} />}
        {activeStep === 3 && <BecomeSellerFormStep4 formik={formik} />}
      </div>

      {/* Step Actions Toolbar */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button
          onClick={handleStep(-1)}
          variant="outlined"
          color="inherit"
          disabled={activeStep === 0 || submitting}
          startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "13px",
            px: 2.5,
            py: 0.9,
          }}
        >
          Back
        </Button>

        <Button
          variant="contained"
          color="primary"
          disabled={submitting}
          onClick={handleStep(1)}
          endIcon={
            submitting ? (
              <CircularProgress size={16} color="inherit" />
            ) : activeStep === steps.length - 1 ? (
              <CheckCircleIcon sx={{ fontSize: 17 }} />
            ) : (
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            )
          }
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "13px",
            px: 3,
            py: 0.9,
            boxShadow: "0 4px 14px rgba(0, 146, 124, 0.3)",
          }}
        >
          {submitting
            ? "Creating Account..."
            : activeStep === steps.length - 1
            ? "Complete Registration"
            : "Continue"}
        </Button>
      </div>
    </div>
  );
}

export default SellerAccountForm;