import React, { useState } from 'react'
import SellerAccountForm from './SellerAccountForm'
import SellerLoginForm from './SellerLoginForm'
import Button from '@mui/material/Button';


function BecomeSeller() {

    const [isLogin,setIsLogin] = useState(false)

    const handleShowPage = ()=>{
        setIsLogin(!isLogin)
    }

  return (
    <div className='grid md:gap-10 grid-cols-3 min-h-screen'>
        <section className='lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md'>
            {
                !isLogin ?<SellerAccountForm/>:<SellerLoginForm/>}

                <div className='mt-10 space-y-2'>
                    <h1 className='text-center text-sm font-medium'>have account</h1>
                    <Button onClick={handleShowPage} fullWidth sx={{py:"11px"}} variant='outlined'>
                        {isLogin ? "Register":"Login"}
                    </Button>
                </div>
            
        </section>
        <section className='hidden md:flex justify-center items-center'>

        </section>
    </div>
  )
}

export default BecomeSeller