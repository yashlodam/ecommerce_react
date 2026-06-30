import React, { useEffect } from 'react'
import AdminDrawerList from '../../components/AdminDrawerList'
import AdminRoute from '../../../Routes/AdminRoute'
import { useAppDispatch } from '../../../State/Store'
import { fetchHomeCategories } from '../../../State/admin/adminSlice'

function AdminDashboard() {

    const toggleDrawer = ()=>{}

    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchHomeCategories())
    },[])

  return (
    <div>

        <div className='lg:flex lg:h-[90vh]'>
            <section className='hidden lg:block h-full'>
                <AdminDrawerList toggleDrawer={toggleDrawer}/>
            </section>
            <section className='p-10 w-full lg:w-[80%] overflow-y-auto'>
                <AdminRoute/>
            </section>
        </div>

    </div>
  )
}

export default AdminDashboard