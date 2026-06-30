import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react'
import AddressCard from './AddressCard'
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PricingCrd from '../Cart/PricingCrd';
import Radio from '@mui/material/Radio';
import ButtonBase from '@mui/material/ButtonBase';
import { store, useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchUserProfile } from '../../../State/AuthSlice';
import { createOrder } from '../../../State/customer/OrderSlice';
import { fetchUserCart } from '../../../State/customer/CartSlice';


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
  const [button, setButton] = useState(false);
  const [isChecked, setIsChecked] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null);
  const paymentGatway = "RAZORPAY";
  const dispatch = useAppDispatch();
  
  const { auth } = useAppSelector((store) => store)

  useEffect(() => {
  const jwt = localStorage.getItem("jwt");

  dispatch(fetchUserProfile(jwt));
  dispatch(fetchUserCart(jwt)); // or whatever your thunk is called
}, [dispatch]);

  const handleBuyNow = async () => {
  if (!selectedAddress) {
    alert("Please select an address");
    return;
  }

  try {
    await dispatch(
      createOrder({
        address: selectedAddress,
        jwt: localStorage.getItem("jwt"),
        paymentGateway: paymentGatway,
      })
    ).unwrap();

  } catch (error) {
    console.error(error);
  }
};


  console.log("addresses is ", auth.user)



  return (
    <div>
      <div className='pt-10 px-4 sm:px-10 md:px-44 lg:px-60 min-h-screen'>

        <div className='space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9'>
          <div className='col-span-2 space-y-5'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
              <h1 className='font-semibold'>Select Address</h1>
              <Button onClick={handleOpen} className='w-full sm:w-auto py-4 px-5  border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer'>
                <AddIcon className='mr-2' /> Add new Address
              </Button>
            </div>
            <div className='text-xs font-medium space-y-5'>
              <p className='font-semibold text-[15px]'>Saved Addresses</p>
              <div className="space-y-3">
                {auth.user?.addresses?.length > 0 ? (
                  auth.user.addresses.map((item) => (
                    <AddressCard
                     key={item.id}
                      selectedAddress={selectedAddress}
                      setSelectedAddress={setSelectedAddress}
                      item={item}
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No saved addresses.</p>
                )}
              </div>
            </div>
            <Button onClick={handleOpen} className='w-full sm:w-auto py-4 px-5  border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer'>
              <AddIcon className='mr-2' /> Add new Address
            </Button>
          </div>
        <Modal
  open={open}
  onClose={handleClose}
>
  <Box sx={style}>
    <AddressForm
      handleClose={handleClose}
      onSuccess={() => {
        dispatch(fetchUserProfile(localStorage.getItem("jwt")));
        handleClose();
      }}
    />
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
                  onClick={() => setIsChecked(!isChecked)}>
                  <Radio checked={true} />
                  <img
                    src="https://razorpay.com/assets/razorpay-logo.svg"
                    alt="Razorpay"
                    className="h-7 sm:h-8 w-18 md:w-full"
                  />
                </div>



              </div>
            </div>
            <PricingCrd />
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 600,
                bgcolor: "#009688",
                "&:hover": {
                  bgcolor: "#00796b",
                },
              }}
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>
        </div>



      </div>

    </div>


  )
}

export default Checkout