import React from "react";
import AdminDrawerList from "../../components/AdminDrawerList";
import AdminRoute from "../../../Routes/AdminRoute";

function AdminDashboard() {
  const toggleDrawer = () => {};

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="lg:flex min-h-[calc(100vh-64px)]">
        <section className="hidden lg:block shrink-0">
          <AdminDrawerList toggleDrawer={toggleDrawer} />
        </section>
        <section className="p-4 sm:p-6 lg:p-8 w-full flex-1 overflow-y-auto max-w-[1600px] mx-auto">
          <AdminRoute />
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;