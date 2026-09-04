import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchSellerProfile } from "../../../State/seller/sellerSlice";
import StatusBadge from "../../../common/StatusBadge";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";

function Profile() {
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((store) => store.seller || {});

  useEffect(() => {
    dispatch(fetchSellerProfile());
  }, [dispatch]);

  if (loading && !profile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <CircularProgress color="primary" />
      </div>
    );
  }

  const SectionCard = ({ title, icon: Icon, children }) => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 mb-6 overflow-hidden transition-colors">
      <div className="flex items-center gap-3 p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
        <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
          <Icon sx={{ fontSize: 20 }} />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );

  const Row = ({ label, value }) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-slate-100 dark:border-slate-800 last:border-b-0">
      <div className="p-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold bg-slate-50/40 dark:bg-slate-950/20">
        {label}
      </div>
      <div className="sm:col-span-2 p-4 text-sm font-bold text-slate-900 dark:text-slate-100">
        {value || "—"}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Seller Store Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Review GSTIN registration, registered store identity, bank settlement accounts, and warehouse pickup address.
        </p>
      </div>

      {/* Personal Identity */}
      <SectionCard title="Contact & Personal Information" icon={PersonIcon}>
        <Row label="Seller Name" value={profile?.sellerName} />
        <Row label="Seller Email" value={profile?.email} />
        <Row label="Contact Mobile" value={profile?.mobile} />
      </SectionCard>

      {/* Business Details */}
      <SectionCard title="Business & Marketplace Registration" icon={StorefrontIcon}>
        <Row
          label="Store / Brand Name"
          value={profile?.businessDetails?.businessName || profile?.businesssDetails?.businessName}
        />
        <Row
          label="GSTIN Number"
          value={profile?.gstin || profile?.businessDetails?.businessRegistrationNumber}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-slate-100 dark:border-slate-800 last:border-b-0">
          <div className="p-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold bg-slate-50/40 dark:bg-slate-950/20">
            Account Status
          </div>
          <div className="sm:col-span-2 p-4 flex items-center gap-2">
            <StatusBadge status={profile?.accountStatus || "ACTIVE"} />
          </div>
        </div>
      </SectionCard>

      {/* Bank Details */}
      <SectionCard title="Settlement Bank Account" icon={AccountBalanceIcon}>
        <Row
          label="Account Holder Name"
          value={profile?.bankDetails?.accountHolderName}
        />
        <Row
          label="Account Number"
          value={profile?.bankDetails?.accountNumber ? `•••• •••• ${String(profile.bankDetails.accountNumber).slice(-4)}` : "—"}
        />
        <Row
          label="IFSC Code"
          value={profile?.bankDetails?.ifscCode}
        />
      </SectionCard>

      {/* Pickup Address */}
      <SectionCard title="Warehouse Pickup Location" icon={LocationOnIcon}>
        <Row
          label="Street Address"
          value={profile?.pickupAddress?.address}
        />
        <Row
          label="City & State"
          value={profile?.pickupAddress?.city ? `${profile.pickupAddress.city}, ${profile.pickupAddress.state}` : "—"}
        />
        <Row
          label="PIN Code"
          value={profile?.pickupAddress?.pinCode || profile?.pickupAddress?.pincode}
        />
        <Row
          label="Pickup Contact Phone"
          value={profile?.pickupAddress?.mobile}
        />
      </SectionCard>
    </div>
  );
}

export default Profile;