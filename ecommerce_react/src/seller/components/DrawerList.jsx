import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../State/Store";
import { logout } from "../../State/AuthSlice";
import { logoutSeller } from "../../State/seller/sellerSlice";

function DrawerList({ menu, menu2, toggleDrawer }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    dispatch(logoutSeller());
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="h-full bg-white dark:bg-slate-900 transition-colors duration-200">
      <div className="flex flex-col justify-between h-full w-[280px] lg:w-[290px] border-r border-slate-200 dark:border-slate-800 py-5">
        <div className="space-y-1 pr-3">
          {menu.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                onClick={() => {
                  navigate(item.path);
                  if (toggleDrawer) toggleDrawer();
                }}
                className="cursor-pointer"
                key={index}
              >
                <div
                  className={`flex items-center px-5 py-3 rounded-r-2xl transition-all duration-200 ${
                    isActive
                      ? "bg-teal-600 text-white font-bold shadow-sm"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 font-medium"
                  }`}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 38,
                      color: isActive ? "#ffffff" : "inherit",
                    }}
                  >
                    {isActive ? item.activeIcon || item.icon : item.icon}
                  </ListItemIcon>
                  <span className={`text-sm ${isActive ? "font-bold text-white" : "font-medium"}`}>
                    {item.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <Divider className="!my-3 !border-slate-200 dark:!border-slate-800" />
          <div className="space-y-1 pr-3">
            {menu2.map((item, index) => {
              const isLogout = item.name === "Logout";
              const isActive = location.pathname === item.path;
              return (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => {
                    if (isLogout) {
                      handleLogout();
                    } else {
                      navigate(item.path);
                    }
                    if (toggleDrawer) toggleDrawer();
                  }}
                >
                  <div
                    className={`flex items-center px-5 py-3 rounded-r-2xl transition-colors ${
                      isLogout
                        ? "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-semibold"
                        : isActive
                        ? "bg-teal-600 text-white font-bold shadow-sm"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 font-medium"
                    }`}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 38,
                        color: !isLogout && isActive ? "#ffffff" : "inherit",
                      }}
                    >
                      {!isLogout && isActive ? item.activeIcon || item.icon : item.icon}
                    </ListItemIcon>
                    <span
                      className={`text-sm ${
                        isLogout
                          ? "font-semibold text-rose-600 dark:text-rose-400"
                          : isActive
                          ? "font-bold text-white"
                          : "font-medium"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrawerList;