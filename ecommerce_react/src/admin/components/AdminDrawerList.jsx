import React from 'react'
import DrawerList from '../../seller/components/DrawerList'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const menu = [
  {
    name: "Sellers",
    path: "/admin",
    icon: <StoreIcon className="text-primary" />,
    activeIcon: <StoreIcon className="text-white" />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <PeopleIcon className="text-primary" />,
    activeIcon: <PeopleIcon className="text-white" />,
  },
  {
    name: "Coupons",
    path: "/admin/coupon",
    icon: <IntegrationInstructionsIcon className="text-primary" />,
    activeIcon: <IntegrationInstructionsIcon className="text-white" />,
  },
  {
    name: "Add New Coupon",
    path: "/admin/add-coupon",
    icon: <AddIcon className="text-primary" />,
    activeIcon: <AddIcon className="text-white" />,
  },
  {
    name: "Deals",
    path: "/admin/deals",
    icon: <LocalOfferIcon className="text-primary" />,
    activeIcon: <LocalOfferIcon className="text-white" />,
  },
  {
    name: "Home Page Grid",
    path: "/admin/home-grid",
    icon: <HomeIcon className="text-primary" />,
    activeIcon: <HomeIcon className="text-white" />,
  },
  {
    name: "Electronics Category",
    path: "/admin/electronics-category",
    icon: <ElectricBoltIcon className="text-primary" />,
    activeIcon: <ElectricBoltIcon className="text-white" />,
  },
  {
    name: "Shop By Category",
    path: "/admin/shop-by-category",
    icon: <CategoryIcon className="text-primary" />,
    activeIcon: <CategoryIcon className="text-white" />,
  },
];

const menu2 = [
  {
    name: "Logout",
    path: "/",
    icon: <LogoutIcon className="text-primary" />,
    activeIcon: <LogoutIcon className="text-white" />,
  },
];

function AdminDrawerList({ toggleDrawer }) {
  return (
    <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />
  );
}

export default AdminDrawerList;