import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchSellerProfile } from "../../../State/seller/sellerSlice";
import ClosedAccount from "../ClosedAccount";
import DeactivatedAccount from "../DeactivatedAccount";
import PendingVerification from "../PendingVerification";
import SuspendedAccount from "../SuspendedAccount";
import BannedAccount from "../BannedAccount";
import { useNavigate } from "react-router-dom";

function SellerStatusGuard({ children }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { profile, profileLoading, error } = useAppSelector(
    (store) => store.seller || {}
  );

  useEffect(() => {
    if (!profile && !profileLoading && !error) {
      dispatch(fetchSellerProfile());
    }
  }, [dispatch, profile, profileLoading, error]);

  // Only show full loading spinner if we don't have a profile yet and it's loading
  if (!profile && profileLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <CircularProgress color="primary" />
        <p className="text-xs text-slate-400 font-medium">Loading seller account...</p>
      </div>
    );
  }

  // If profile failed to load and we have an error
  if (!profile && error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <p className="text-base font-bold text-slate-800 dark:text-slate-200">
          Failed to load seller profile
        </p>
        <p className="text-xs text-slate-500 max-w-sm">
          {typeof error === "string" ? error : "An error occurred while loading your profile."}
        </p>
        <div className="flex gap-3">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => dispatch(fetchSellerProfile())}
            sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700 }}
          >
            Retry
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={() => navigate("/login")}
            sx={{ borderRadius: "10px", textTransform: "none" }}
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  // If profile is still null (waiting for fetch to trigger)
  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <CircularProgress color="primary" />
      </div>
    );
  }

  // Check seller account status
  switch (profile.accountStatus) {
    case "PENDING_VERIFICATION":
      return <PendingVerification />;

    case "SUSPENDED":
      return <SuspendedAccount />;

    case "DEACTIVATED":
      return <DeactivatedAccount />;

    case "BANNED":
      return <BannedAccount />;

    case "CLOSED":
      return <ClosedAccount />;

    default:
      return children;
  }
}

export default SellerStatusGuard;