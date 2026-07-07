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
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-5">

      <Paper
        elevation={0}
        className="max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-700 to-slate-900 px-10 py-10 text-white">

          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,white_2px,transparent_2px)] bg-[length:30px_30px]" />
          </div>

          <div className="relative">

            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center shadow-xl animate-pulse">
              <TaskAltRoundedIcon sx={{ fontSize: 48 }} />
            </div>

            <Typography
              variant="h4"
              fontWeight={700}
              mt={3}
            >
              Seller Account Closed
            </Typography>

            <Typography mt={1} sx={{ opacity: .9 }}>
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

        <div className="p-10">

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

          <div className="grid md:grid-cols-3 gap-5 mt-10">

            <Paper
              variant="outlined"
              className="rounded-2xl p-5 text-center hover:shadow-md transition-all"
            >
              <Inventory2RoundedIcon
                sx={{
                  fontSize: 42,
                  color: "#64748B",
                }}
              />

              <Typography
                fontWeight={700}
                mt={2}
              >
                Products
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Product management is unavailable.
              </Typography>

            </Paper>

            <Paper
              variant="outlined"
              className="rounded-2xl p-5 text-center hover:shadow-md transition-all"
            >
              <ShoppingBagRoundedIcon
                sx={{
                  fontSize: 42,
                  color: "#64748B",
                }}
              />

              <Typography
                fontWeight={700}
                mt={2}
              >
                Orders
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                New orders cannot be accepted.
              </Typography>

            </Paper>

            <Paper
              variant="outlined"
              className="rounded-2xl p-5 text-center hover:shadow-md transition-all"
            >
              <AccountBalanceWalletRoundedIcon
                sx={{
                  fontSize: 42,
                  color: "#64748B",
                }}
              />

              <Typography
                fontWeight={700}
                mt={2}
              >
                Payments
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Seller payouts are disabled.
              </Typography>

            </Paper>

          </div>

          {/* Information */}

          <Paper
            variant="outlined"
            className="rounded-2xl mt-10 p-6 bg-slate-50"
          >

            <div className="flex gap-4">

              <SupportAgentRoundedIcon
                sx={{
                  color: "#334155",
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