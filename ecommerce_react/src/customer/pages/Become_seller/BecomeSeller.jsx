import React, { useState } from "react";
import SellerAccountForm from "./SellerAccountForm";
import SellerLoginForm from "./SellerLoginForm";
import Button from "@mui/material/Button";
import { toast } from "../../../common/toast";

function BecomeSeller() {
  const [isLogin, setIsLogin] = useState(false);

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
                    toast.success(
                      "Seller account created successfully! Please sign in with your email OTP."
                    );
                    setTimeout(() => {
                      setIsLogin(true);
                    }, 1500);
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

          {/* Right / Value Proposition & Illustration Section */}
          <section className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800">
                Seller Partner Program
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                Scale Your Business on{" "}
                <span className="text-teal-600 dark:text-teal-400">ShopSphere</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                Reach thousands of customers, grow your business, and manage everything from a single seller dashboard.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400">
                  10K+
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
                  Seller Support
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400">
                  99%
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                  Secure Payments
                </p>
              </div>
            </div>

            {/* Restored Hero Illustration Image */}
            <div className="flex justify-center pt-2">
              <img
                src="/images/becomeSeller.png"
                alt="Scale Your Business with ShopSphere"
                className="w-full max-w-lg lg:max-w-xl mx-auto drop-shadow-2xl object-contain hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default BecomeSeller;