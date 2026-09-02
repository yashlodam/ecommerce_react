import React from "react";
import Button from "@mui/material/Button";
import StorefrontIcon from "@mui/icons-material/Storefront";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

function SellerBanner() {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 border border-teal-800/40 p-6 sm:p-8 md:p-10 shadow-xl text-white transition-colors relative">
      {/* Ambient Decorative Glows */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Hero Text */}
        <div className="lg:col-span-7 space-y-4 text-white">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs sm:text-sm font-bold tracking-wide">
            <StorefrontIcon sx={{ fontSize: 16 }} />
            <span>Multi-Vendor Partner Program</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Grow Your Business with India's Premier Marketplace
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
            Connect with over 500,000 active buyers nationwide. Enjoy 0% commission on your first 30 days, lightning-fast settlements, and dedicated seller analytics.
          </p>

          {/* Benefit Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <TrendingUpIcon className="text-teal-400" />
              <div>
                <p className="text-[11px] text-slate-400">Scale Fast</p>
                <p className="text-xs sm:text-sm font-bold text-white">500k+ Shoppers</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <MonetizationOnOutlinedIcon className="text-amber-400" />
              <div>
                <p className="text-[11px] text-slate-400">Low Rates</p>
                <p className="text-xs sm:text-sm font-bold text-white">0% Intro Fee</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <VerifiedUserOutlinedIcon className="text-emerald-400" />
              <div>
                <p className="text-[11px] text-slate-400">Fast Onboarding</p>
                <p className="text-xs sm:text-sm font-bold text-white">24h Approval</p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button
              variant="contained"
              size="medium"
              onClick={() => navigate("/become-seller")}
              endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
              sx={{
                bgcolor: "#009688",
                color: "#fff",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "14px",
                borderRadius: "12px",
                px: 3,
                py: 1,
                boxShadow: "0 8px 24px rgba(0, 150, 136, 0.4)",
                "&:hover": {
                  bgcolor: "#00796b",
                },
              }}
            >
              Register as a Seller
            </Button>

            <Button
              variant="outlined"
              size="medium"
              onClick={() => navigate("/seller/login")}
              sx={{
                borderColor: "rgba(255,255,255,0.3)",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "13px",
                borderRadius: "12px",
                px: 2.5,
                py: 0.9,
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Seller Login
            </Button>
          </div>
        </div>

        {/* Right Floating Stats Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 text-white shadow-xl space-y-3.5 transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-teal-300 font-bold">
                  Store Performance
                </p>
                <h3 className="text-lg font-bold">Vendor Dashboard</h3>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between items-center bg-black/20 p-2.5 rounded-xl text-xs">
                <span className="text-slate-300">Active Verified Vendors</span>
                <span className="font-extrabold text-white">10,400+</span>
              </div>
              <div className="flex justify-between items-center bg-black/20 p-2.5 rounded-xl text-xs">
                <span className="text-slate-300">Monthly Orders Fulfilled</span>
                <span className="font-extrabold text-teal-300">285,000+</span>
              </div>
              <div className="flex justify-between items-center bg-black/20 p-2.5 rounded-xl text-xs">
                <span className="text-slate-300">Average Payout Cycle</span>
                <span className="font-extrabold text-amber-300">Instant T+1</span>
              </div>
            </div>

            <div className="pt-1 text-center text-[11px] text-slate-400">
              🔒 Bank-grade encrypted payouts via NEFT/IMPS & UPI
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SellerBanner;