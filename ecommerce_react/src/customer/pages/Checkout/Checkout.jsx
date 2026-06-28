import Button from '@mui/material/Button'
import React, { useState } from 'react'
import AddressCard from './AddressCard'
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PricingCrd from '../Cart/PricingCrd';
import Radio from '@mui/material/Radio';
import ButtonBase from '@mui/material/ButtonBase';


function Checkout() {

    const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '92%', sm: 500, md: 600 },
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,  // remove padding here since AddAddressForm has its own
};

const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [button,setButton] = useState(false);
const[isChecked,setIsChecked] = useState(false)

  const [paymentGatway,setPaymentGatway] = useState("RAZORPAY");

  

  return (
    <div>
        <div className='pt-10 px-4 sm:px-10 md:px-44 lg:px-60 min-h-screen'>

        <div className='space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9'>
            <div className='col-span-2 space-y-5'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                    <h1 className='font-semibold'>Select Address</h1>
                                    <Button onClick={handleOpen} className='w-full sm:w-auto py-4 px-5  border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer'>
                    <AddIcon className='mr-2'/> Add new Address
                </Button>
                </div>
                <div className='text-xs font-medium space-y-5'>
                    <p className='font-semibold text-[15px]'>Saved Addresses</p>
                    <div className='space-y-3'>
                        {[1,1,1,1].map((item)=><AddressCard/>)}
                    </div>
                </div>
                <Button onClick={handleOpen} className='w-full sm:w-auto py-4 px-5  border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer'>
                    <AddIcon className='mr-2'/> Add new Address
                </Button>
            </div>
             <Modal
          open={open}
         onClose={handleClose}
          aria-labelledby="modal-modal-title"
           aria-describedby="modal-modal-description"
              >
  <Box sx={style}>
    <AddressForm handleClose={handleClose}/>
  </Box>
          </Modal>
           <div>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
  <h2 className="text-center text-xl sm:text-2xl font-semibold text-teal-600 mb-6">
     Payment Gateway
  </h2>

  <div className="">

    {/* Razorpay */}
    <div className="flex items-center gap-2 md:gap-3 border-2 border-teal-500 rounded-lg p-3 sm:p-4 cursor-pointer bg-teal-50"
    onClick={()=> setIsChecked(!isChecked)}>
      <Radio  checked={true} />
      <img
        src="https://razorpay.com/assets/razorpay-logo.svg"
        alt="Razorpay"
        className="h-7 sm:h-8 w-18 md:w-full"
      />
    </div>

   

  </div>
</div>
            <PricingCrd/>
          </div>
        </div>

        

    </div>
          
          <Button >

          </Button>
         
    </div>


  )
}

export default Checkout