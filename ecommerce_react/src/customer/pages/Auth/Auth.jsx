import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Button from "@mui/material/Button";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <div className="w-full max-w-md space-y-4">
        {/* Brand Banner */}
        <div className="text-center space-y-1">
          <h1
            onClick={() => navigate("/")}
            className="logo cursor-pointer text-3xl font-bold text-teal-600 dark:text-teal-400"
          >
            ShopSphere
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Multi-Vendor Marketplace Customer Portal
          </p>
        </div>

        {/* Auth Box */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 sm:p-8 transition-colors">
          {isLogin ? <LoginForm /> : <RegisterForm />}

          <div className="flex items-center gap-1 justify-center mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
            >
              {isLogin ? "Create Account" : "Sign In"}
            </button>
          </div>
        </div>

        {/* Seller registration link */}
        <div className="text-center">
          <button
            onClick={() => navigate("/become-seller")}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors cursor-pointer"
          >
            <StorefrontIcon sx={{ fontSize: 16 }} />
            <span>Want to sell on ShopSphere? Register as a Seller</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;