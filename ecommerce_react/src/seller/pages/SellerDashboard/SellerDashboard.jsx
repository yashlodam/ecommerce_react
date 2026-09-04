import React from "react";
import SellerDrawerList from "../../components/SellerDrawerList";
import SellerRoute from "../../../Routes/SellerRoute";
import SellerStatusGuard from "./SellerStatusGuard";

function SellerDashboard() {
  const toggleDrawer = () => {};

  return (
    <SellerStatusGuard>
      <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <div className="lg:flex min-h-[calc(100vh-64px)]">
          <aside className="hidden lg:block shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto z-10">
            <SellerDrawerList toggleDrawer={toggleDrawer} />
          </aside>
          <main className="p-3.5 sm:p-5 lg:p-8 w-full flex-1 min-w-0 max-w-[1600px] mx-auto">
            <SellerRoute />
          </main>
        </div>
      </div>
    </SellerStatusGuard>
  );
}

export default SellerDashboard;