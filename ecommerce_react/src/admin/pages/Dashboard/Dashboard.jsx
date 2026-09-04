import React from "react";
import AdminDrawerList from "../../components/AdminDrawerList";
import AdminRoute from "../../../Routes/AdminRoute";

function AdminDashboard() {
  const toggleDrawer = () => {};

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="lg:flex min-h-[calc(100vh-64px)]">
        <aside className="hidden lg:block shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto z-10">
          <AdminDrawerList toggleDrawer={toggleDrawer} />
        </aside>
        <main className="p-3.5 sm:p-5 lg:p-8 w-full flex-1 min-w-0 max-w-[1600px] mx-auto">
          <AdminRoute />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;