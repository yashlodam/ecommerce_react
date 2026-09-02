import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-8 sm:py-12 bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-50 dark:from-slate-950 dark:via-teal-950/15 dark:to-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 relative overflow-hidden">
      {/* Ambient Decorative Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-[440px] space-y-4 relative z-10">
        {/* Brand Banner */}
        <div className="text-center space-y-1">
          <div
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-600 dark:bg-teal-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <ShoppingBagOutlinedIcon sx={{ fontSize: 20 }} />
            </div>
            <span className="logo text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Shop<span className="text-teal-600 dark:text-teal-400">Sphere</span>
            </span>
          </div>

          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Multi-Vendor Marketplace Customer Portal
          </p>
        </div>

        {/* Main Auth Card */}
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 sm:p-8 transition-colors">
          {isLogin ? <LoginForm /> : <RegisterForm />}

          {/* Toggle between Login and Register */}
          <div className="flex items-center gap-1.5 justify-center mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 hover:underline cursor-pointer"
            >
              {isLogin ? "Create an Account" : "Sign In"}
            </button>
          </div>
        </div>

        {/* Seller Registration Card CTA */}
        <div
          onClick={() => navigate("/become-seller")}
          className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/60 dark:border-slate-800 hover:border-teal-500/50 hover:bg-white dark:hover:bg-slate-900 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-800/80 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-105 transition-transform">
              <StorefrontOutlinedIcon sx={{ fontSize: 18 }} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                Want to sell on ShopSphere?
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                Join 10,000+ verified Indian merchants
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 shrink-0">
            <span>Register</span>
            <ArrowForwardIcon sx={{ fontSize: 14 }} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Auth;