import Divider from '@mui/material/Divider'
import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Order from './Order';

 function Account() {

    const menu = [
        {name:"orders",path:"/account/orders"},
        {name:"profile",path:"/account/profile"},
        {name:"Saved Cards",path:"/account/saved-card"},

        {name:"Address",path:"/account/addresses"},
        {name:"Logout",path:"/"}
    ]
    const navigate = useNavigate();

    const handleClick = (item)=>{
        navigate(item.path)
    }

    const location = useLocation();

  return (
    <div className='px-5 lg:px-52 min-h-screen mt-10'>
        <div>
            <h1 className='text-xl font-bold pb-5'>Yash</h1>
        </div>
        <Divider/>
        <div className='grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]'>
            <section className='col-span-1 lg:border-r lg:pr-5 py-5 h-full '>
                {
                    menu.map((item)=>
                    <div onClick={()=> handleClick(item)} key={item.name} className={`${item.path===location.pathname ?"bg-primary text-white":""} py-3 cursor-pointer hover:text-white  px-5 rounded-md border-b hover:bg-primary`}>
                        <p>{item.name}</p>
                    </div>)
                }
        </section>
            <section className='right lg:col-span-2 lg:pl-5 py-5'>
                <Order/>
            </section>

        </div>
    </div>
  )
}
export default Account
