import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DealTable from "./DealTable";
import DealCategoryTable from "./DealCategoryTable";
import CreateDealForm from "./CreateDealForm";

function Deal() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Deals & Promotions Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Configure category promotional deals, banner discount highlights, and home showcases.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
        <Tabs
          value={activeTab}
          onChange={(e, val) => setActiveTab(val)}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Active Deals" className="font-bold text-xs" />
          <Tab label="Category Grid" className="font-bold text-xs" />
          <Tab label="Create New Deal" className="font-bold text-xs" />
        </Tabs>
      </div>

      <div>
        {activeTab === 0 && <DealTable />}
        {activeTab === 1 && <DealCategoryTable />}
        {activeTab === 2 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 max-w-xl mx-auto shadow-sm">
            <CreateDealForm onSuccess={() => setActiveTab(0)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Deal;