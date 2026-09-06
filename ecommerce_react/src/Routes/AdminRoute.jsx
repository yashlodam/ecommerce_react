import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import SellersTable from '../admin/pages/Sellers/SellersTable'
import UsersTable from '../admin/pages/Users/UsersTable'
import Coupon from '../admin/pages/Coupon/Coupon'
import AddNewCouponForm from '../admin/pages/Coupon/AddNewCouponForm'
import GridTable from '../admin/pages/HomePage/GridTable'
import ElectronicsTable from '../admin/pages/HomePage/ElectronicsTable'
import ShopByCategoryTable from '../admin/pages/HomePage/ShopByCategoryTable'
import Deal from '../admin/pages/HomePage/Deal'
import NotificationsPage from '../customer/pages/Notifications/NotificationsPage'

function AdminRoute() {
  return (
    <Routes>
      <Route path="/" element={<SellersTable />} />
      <Route path="/sellers" element={<SellersTable />} />
      <Route path="/users" element={<UsersTable />} />
      <Route path="/coupon" element={<Coupon />} />
      <Route path="/add-coupon" element={<AddNewCouponForm />} />
      <Route path="/deals" element={<Deal />} />
      <Route path="/home-grid" element={<GridTable />} />
      <Route path="/electronics-category" element={<ElectronicsTable />} />
      <Route path="/shop-by-category" element={<ShopByCategoryTable />} />
      <Route path="/notifications" element={<NotificationsPage role="ROLE_ADMIN" />} />
      <Route path="/orders" element={<Navigate to="/admin" replace />} />
      <Route path="/transactions" element={<Navigate to="/admin" replace />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

export default AdminRoute;