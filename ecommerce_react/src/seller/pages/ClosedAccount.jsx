import React from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Typography,
} from "@mui/material";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import { useNavigate } from "react-router-dom";

function ClosedAccount() {
  const navigate = useNavigate();

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4 sm:p-6 transition-colors">
      <Paper
        elevation={0}
        className="max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-700 to-slate-900 px-6 sm:px-10 py-8 sm:py-10 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,white_2px,transparent_2px)] bg-[length:30px_30px]" />
          </div>

          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center shadow-xl animate-pulse">
              <TaskAltRoundedIcon sx={{ fontSize: { xs: 34, sm: 48 } }} />
            </div>

            <Typography
              variant="h4"
              fontWeight={700}
              mt={3}
              sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}
            >
              Seller Account Closed
            </Typography>

            <Typography mt={1} sx={{ opacity: 0.9, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
              This seller account has been permanently closed.
            </Typography>

            <Chip
              label="Closed"
              sx={{
                mt: 3,
                bgcolor: "#E2E8F0",
                color: "#334155",
                fontWeight: 700,
              }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-10">
          <Typography
            color="text.secondary"
            lineHeight={1.9}
          >
            Your ShopSphere seller account is no longer active.
            <br />
            <br />
            Access to all seller services has been permanently disabled.
            Existing customer orders will continue to be processed according
            to our marketplace policies where applicable.
          </Typography>

          {/* Disabled Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-8 sm:mt-10">
            <Paper
              variant="outlined"
              className="rounded-2xl p-5 text-center hover:shadow-md transition-all bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
            >
              <Inventory2RoundedIcon
                sx={{
                  fontSize: 42,
                  color: "#64748B",
                }}
              />
              <Typography fontWeight={700} mt={2}>
                Products
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Product management is unavailable.
              </Typography>
            </Paper>

            <Paper
              variant="outlined"
              className="rounded-2xl p-5 text-center hover:shadow-md transition-all bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
            >
              <ShoppingBagRoundedIcon
                sx={{
                  fontSize: 42,
                  color: "#64748B",
                }}
              />
              <Typography fontWeight={700} mt={2}>
                Orders
              </Typography>
              <Typography variant="body2" color="text.secondary">
                New orders cannot be accepted.
              </Typography>
            </Paper>

            <Paper
              variant="outlined"
              className="rounded-2xl p-5 text-center hover:shadow-md transition-all bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
            >
              <AccountBalanceWalletRoundedIcon
                sx={{
                  fontSize: 42,
                  color: "#64748B",
                }}
              />
              <Typography fontWeight={700} mt={2}>
                Payments
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Seller payouts are disabled.
              </Typography>
            </Paper>
          </div>

          {/* Information */}
          <Paper
            variant="outlined"
            className="rounded-2xl mt-8 sm:mt-10 p-5 sm:p-6 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
          >
            <div className="flex gap-4">
              <SupportAgentRoundedIcon
                sx={{
                  color: "#64748B",
                  fontSize: 34,
                }}
              />
              <div>
                <Typography fontWeight={700}>
                  Need Assistance?
                </Typography>
                <Typography
                  mt={1}
                  color="text.secondary"
                  lineHeight={1.8}
                  className="text-xs sm:text-sm"
                >
                  If you believe your account was closed by mistake
                  or you need information about previous transactions,
                  please contact the ShopSphere support team.
                </Typography>
              </div>
            </div>
          </Paper>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            <Button
              fullWidth
              variant="contained"
              startIcon={<SupportAgentRoundedIcon />}
              sx={{
                bgcolor: "#1E293B",
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
                "&:hover": {
                  bgcolor: "#0F172A",
                },
              }}
            >
              Contact Support
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<EmailRoundedIcon />}
              sx={{
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Email Support
            </Button>

            <Button
              fullWidth
              variant="text"
              startIcon={<HomeRoundedIcon />}
              onClick={() => navigate("/")}
              sx={{
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
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
            Thank you for being a part of the ShopSphere Seller Community.
          </Typography>

        </div>

      </Paper>

    </Box>
  );
}

export default ClosedAccount;