import React from "react";
import Radio from "@mui/material/Radio";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

function AddressCard({ item, selectedAddress, setSelectedAddress }) {
  const isSelected = selectedAddress?.id === item.id;

  return (
    <div
      onClick={() => setSelectedAddress(item)}
      className={`border-2 rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer ${
        isSelected
          ? "border-teal-600 bg-teal-50/40 dark:bg-teal-950/30 shadow-md ring-2 ring-teal-100 dark:ring-teal-900/40"
          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio
            checked={isSelected}
            onChange={() => setSelectedAddress(item)}
            color="primary"
          />
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
            {item.name}
          </h3>
        </div>

        {isSelected && (
          <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/50 px-2.5 py-0.5 rounded-full">
            Selected
          </span>
        )}
      </div>

      <div className="mt-3 pl-11 space-y-2">
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {item.address}, {item.locality}, {item.city}, {item.state} - <span className="font-bold text-slate-800 dark:text-slate-200">{item.pinCode}</span>
        </p>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <PhoneIcon sx={{ fontSize: 15 }} />
          <span>Mobile: <strong className="text-slate-700 dark:text-slate-300">{item.mobile}</strong></span>
        </div>
      </div>
    </div>
  );
}

export default AddressCard;