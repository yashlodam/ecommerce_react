import React, { useState } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Button from "@mui/material/Button";

function Auth() {

    const [isLogin,setIsLogin] = useState(false);

  return (
    <div className='flex justify-center h-[90vh] items-center'>
        <div className='max-w-md h-[85vh] rounded-md shadow-lg'>
            <img className='w-full rounded-t-md' src="/images/shop.png" alt="" />

            <div className='mt-8 px-10'>
                {isLogin ? <LoginForm/> : <RegisterForm/>}

            <div className='flex items-center gap-1 justify-center mt-5'>
                <p> {isLogin && "Don't"} have Account</p>
                <Button size='small' onClick={()=> setIsLogin(!isLogin)}>
                    {isLogin ? "Create Account":"Login"}
                </Button>
            </div>
            </div>

        </div>
    </div>
  )
}

export default Auth