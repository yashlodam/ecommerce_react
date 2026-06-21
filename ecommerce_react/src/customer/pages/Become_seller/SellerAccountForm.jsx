import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import React, { useState } from 'react'

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
  "Bank detaisl",
  
]

function SellerAccountForm() {
  const [activeStep,setActiveStep] = useState(1);
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
    </div>
  )
}

export default SellerAccountForm