import Divider from '@mui/material/Divider'
import React from 'react'

 function Account() {
  return (
    <div className='px-5 lg:px-52 min-h-screen mt-10'>
        <div>
            <h1 className='text-xl font-bold pb-5'>Yash</h1>
        </div>
        <Divider/>
        <div className='grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]'>
            <section className='col-span-1 lg:border-r lg:pr-5 py-5 h-full'>
                left</section>
            <section>right</section>

        </div>
    </div>
  )
}
export default Account
