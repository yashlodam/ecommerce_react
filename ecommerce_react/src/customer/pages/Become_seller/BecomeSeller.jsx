import React, { useState } from "react";
import SellerAccountForm from "./SellerAccountForm";
import SellerLoginForm from "./SellerLoginForm";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ShieldCheckIcon from "@mui/icons-material/GppGoodOutlined";

function BecomeSeller() {
  const [isLogin, setIsLogin] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleShowPage = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-[90vh] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left / Form Section */}
          <section className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 transition-colors">
              {!isLogin ? (
                <SellerAccountForm
                  onRegisterSuccess={() => {
                    setSnackbarSeverity("success");
                    setSnackbarMessage(
                      "Seller account created successfully! Please sign in with your email OTP."
                    );
                    setOpenSnackbar(true);
                    setTimeout(() => {
                      setIsLogin(true);
                    }, 2000);
                  }}
                />
              ) : (
                <SellerLoginForm />
              )}

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <p className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3">
                  {isLogin
                    ? "New to ShopSphere selling?"
                    : "Already registered as a marketplace vendor?"}
                </p>

                <Button
                  onClick={handleShowPage}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={{
                    py: 1.4,
                    borderRadius: "14px",
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  {isLogin ? "Register New Seller Store" : "Sign In to Seller Portal"}
                </Button>
              </div>
            </div>
          </section>

          {/* Right / Value Proposition Section */}
          <section className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800">
                Seller Partner Program
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                Scale Your Business on{" "}
                <span className="text-teal-600 dark:text-teal-400">ShopSphere</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                Connect directly with thousands of verified shoppers nationwide. Manage listings, track fulfillment, and receive automated settlement payouts with zero setup fees.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400">
                  10.4K+
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                  Active Buyers
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400">
                  24/7
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                  Partner Support
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400">
                  100%
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                  Direct Payouts
                </p>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
                Why Top Indian Vendors Choose ShopSphere
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                    <StorefrontIcon sx={{ fontSize: 18 }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Dedicated Storefront & Brand Identity</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Your store logo, policies, and branded listings showcased to high-intent shoppers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <ShieldCheckIcon sx={{ fontSize: 18 }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Automated Razorpay & Bank Settlement</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Funds settled directly to your registered bank IFSC account upon delivery confirmation.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <SupportAgentIcon sx={{ fontSize: 18 }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Priority Merchant Helpdesk</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">24-hour SLA ticket resolution for shipping logistics and inventory management.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
          onClose={() => setOpenSnackbar(false)}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default BecomeSeller;