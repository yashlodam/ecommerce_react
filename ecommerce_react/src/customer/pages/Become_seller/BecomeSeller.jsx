import React, { useState } from "react";
import SellerAccountForm from "./SellerAccountForm";
import SellerLoginForm from "./SellerLoginForm";
import Button from "@mui/material/Button";

function BecomeSeller() {
  const [isLogin, setIsLogin] = useState(false);

  const handleShowPage = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="grid lg:grid-cols-3 gap-8 items-center min-h-[90vh]">
          
          {/* Left Section */}
          <section className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-5 md:p-8">
              {!isLogin ? (
                <SellerAccountForm />
              ) : (
                <SellerLoginForm />
              )}

              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-center text-sm text-gray-500 mb-4">
                  {isLogin
                    ? "Don't have a seller account?"
                    : "Already have a seller account?"}
                </p>

                <Button
                  onClick={handleShowPage}
                  fullWidth
                  variant="outlined"
                  sx={{
                    py: "12px",
                    borderRadius: "14px",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  {isLogin ? "Create Seller Account" : "Login"}
                </Button>
              </div>
            </div>
          </section>

          {/* Right Section */}
          <section className="flex flex-col lg:col-span-2 justify-center items-center">
            <div className="max-w-3xl text-center">
              <div className="space-y-5 mb-10">
                <h1 className="text-5xl font-bold text-slate-800 leading-tight">
                  Join the Marketplace
                  <span className="block text-teal-600">
                    Revolution
                  </span>
                </h1>

                <p className="text-xl text-slate-600">
                  Reach thousands of customers, grow your
                  business, and manage everything from a
                  single seller dashboard.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="bg-white rounded-2xl p-5 shadow-md">
                  <h2 className="text-3xl font-bold text-teal-600">
                    10K+
                  </h2>
                  <p className="text-gray-500 text-sm mt-2">
                    Active Buyers
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-md">
                  <h2 className="text-3xl font-bold text-teal-600">
                    24/7
                  </h2>
                  <p className="text-gray-500 text-sm mt-2">
                    Seller Support
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-md">
                  <h2 className="text-3xl font-bold text-teal-600">
                    99%
                  </h2>
                  <p className="text-gray-500 text-sm mt-2">
                    Secure Payments
                  </p>
                </div>
              </div>

              <img
                src="./images/becomeSeller.png"
                alt="Become Seller"
                className="w-full max-w-2xl mx-auto drop-shadow-2xl"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default BecomeSeller;