import React from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Typography,
} from "@mui/material";
import GppBadRoundedIcon from "@mui/icons-material/GppBadRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import DangerousRoundedIcon from "@mui/icons-material/DangerousRounded";
import { useNavigate } from "react-router-dom";

function BannedAccount() {
  const navigate = useNavigate();

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-red-100 dark:from-slate-950 dark:via-slate-900 dark:to-red-950 flex items-center justify-center p-4 sm:p-6 transition-colors">
      <Paper
        elevation={0}
        className="max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-red-200 dark:border-red-900/50 bg-white dark:bg-slate-900 transition-colors"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-700 via-red-600 to-rose-700 px-6 sm:px-10 py-8 sm:py-10 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,white_2px,transparent_2px)] bg-[length:28px_28px]" />
          </div>

          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center shadow-xl animate-pulse">
              <GppBadRoundedIcon sx={{ fontSize: { xs: 36, sm: 50 } }} />
            </div>

            <Typography
              variant="h4"
              fontWeight={700}
              mt={3}
              sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}
            >
              Seller Account Banned
            </Typography>

            <Typography
              mt={1}
              sx={{ opacity: 0.9, fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              Your seller account has been permanently banned.
            </Typography>

            <Chip
              label="Permanently Banned"
              sx={{
                mt: 3,
                bgcolor: "#FEE2E2",
                color: "#991B1B",
                fontWeight: 700,
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10">
          <Typography
            color="text.secondary"
            lineHeight={1.9}
          >
            After a thorough review, your seller account has been
            permanently banned for violating the ShopSphere Seller
            Terms, Marketplace Policies, or Community Guidelines.
            <br />
            <br />
            Access to all seller services has been permanently revoked.
          </Typography>

          {/* Restricted */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-8">
            {[
              "Seller Dashboard Access",
              "Product Management",
              "Order Management",
              "Payment Withdrawals",
              "Inventory Management",
              "Analytics & Reports",
            ].map((item) => (
              <Paper
                key={item}
                variant="outlined"
                className="rounded-xl p-3.5 sm:p-4 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200"
              >
                <DangerousRoundedIcon
                  sx={{
                    color: "#DC2626",
                  }}
                />
                <Typography className="text-sm font-medium">{item}</Typography>
              </Paper>
            ))}
          </div>

          {/* Notice */}
          <Paper
            variant="outlined"
            className="rounded-2xl p-5 sm:p-6 mt-8 border-red-200 dark:border-red-900/40 bg-red-50/80 dark:bg-red-950/20"
          >
            <div className="flex gap-4">
              <ReportProblemRoundedIcon
                sx={{
                  color: "#DC2626",
                  fontSize: 34,
                }}
              />
              <div>
                <Typography fontWeight={700}>
                  Why was my account banned?
                </Typography>
                <Typography
                  mt={1}
                  color="text.secondary"
                  lineHeight={1.8}
                  className="text-xs sm:text-sm"
                >
                  Common reasons include:
                  <br />
                  • Fraudulent activity
                  <br />
                  • Selling prohibited or counterfeit products
                  <br />
                  • Repeated policy violations
                  <br />
                  • Abuse of marketplace rules
                  <br />
                  • Security or compliance issues
                </Typography>
              </div>
            </div>
          </Paper>

          {/* Appeal */}
          <Paper
            variant="outlined"
            className="rounded-2xl p-5 sm:p-6 mt-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60"
          >
            <Typography fontWeight={700}>
              Appeal Decision
            </Typography>
            <Typography
              mt={1}
              color="text.secondary"
              lineHeight={1.8}
              className="text-xs sm:text-sm"
            >
              If you believe this action was taken in error,
              you may submit an appeal to our Trust &amp; Safety Team.
              Each appeal is reviewed individually.
            </Typography>
          </Paper>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            <Button
              fullWidth
              variant="contained"
              startIcon={<SupportAgentRoundedIcon />}
              sx={{
                bgcolor: "#B91C1C",
                textTransform: "none",
                fontWeight: 700,
                py: 1.5,
                borderRadius: 3,
                "&:hover": {
                  bgcolor: "#991B1B",
                },
              }}
            >
              Submit Appeal
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<EmailRoundedIcon />}
              sx={{
                textTransform: "none",
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
              }}
            >
              Contact Support
            </Button>

            <Button
              fullWidth
              variant="text"
              startIcon={<HomeRoundedIcon />}
              onClick={() => navigate("/")}
              sx={{
                textTransform: "none",
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
              }}
            >
              Back to Home
            </Button>

          </div>

          <Typography
            align="center"
            color="text.secondary"
            sx={{
              mt: 6,
              fontSize: 14,
            }}
          >
            For questions regarding this decision, contact our Trust &
            Safety team at <strong>trust@shopsphere.com</strong>.
          </Typography>

        </div>

      </Paper>

    </Box>
  );
}

export default BannedAccount;