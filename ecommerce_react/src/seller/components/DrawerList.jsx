import React from 'react'
import ListItemIcon from '@mui/material/ListItemIcon';
import { Divider, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";

function DrawerList({menu,menu2,toggleDrawer}) {

    const location = useLocation();

    const navigate = useNavigate();

    const handleLogout = () => {
  console.log("Logout clicked");
  localStorage.removeItem("jwt");
  navigate("/");
};

    
  return (
    <div className='h-full'>
        <div className='flex flex-col justify-between h-full w-[300px] border-r py-5'>

            
                <div className='space-y-2'>

         {
            menu.map((item,index)=>{
                return(
                <div onClick={()=>navigate(item.path)} className='pr-9 cursor-pointer' key={index}>
                    <p className={`${item.path==location.pathname ? "bg-primary text-white":"text-primary"} flex items-center px-5 py-3 rounded-r-full`}>
                       <ListItemIcon>
                        {item.path==location.pathname?item.activeIcon:item.icon}
                        </ListItemIcon> 
                      <ListItemText primary={item.name}/>
                    </p>
                </div>
                );
            })
         }

                </div>
                <Divider/>
                 <div className='space-y-2'>

        {
  menu2.map((item, index) => {
    return (
      <div
        key={index}
        className="pr-9 cursor-pointer"
        onClick={() => {
          if (item.name === "Logout") {
            handleLogout();
          } else {
            navigate(item.path);
          }
        }}
      >
        <p
          className={`${
            item.path === location.pathname
              ? "bg-primary text-white"
              : "text-primary"
          } flex items-center px-5 py-3 rounded-r-full`}
        >
          <ListItemIcon>
            {item.path === location.pathname
              ? item.activeIcon
              : item.icon}
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </p>
      </div>
    );
  })
}

                </div>
            

        </div>
    </div>
  )
}

export default DrawerList