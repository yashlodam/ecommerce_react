import React from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilled";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import { useNavigate } from "react-router-dom";

function PendingVerification() {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950 flex items-center justify-center p-4 sm:p-6 transition-colors">
      <Paper
        elevation={0}
        className="max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors"
      >
        {/* Top Banner */}
        <div className="relative bg-gradient-to-r from-teal-600 to-emerald-600 px-6 sm:px-10 py-8 sm:py-10 text-white">

          <div className="absolute right-8 top-8 animate-pulse hidden sm:block">
            <CircularProgress
              size={70}
              thickness={4}
              sx={{
                color: "rgba(255,255,255,.35)",
              }}
            />
          </div>

          <div className="relative z-10">

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center shadow-lg animate-bounce">
              <VerifiedUserOutlinedIcon sx={{ fontSize: { xs: 32, sm: 45 } }} />
            </div>

            <Typography
              variant="h4"
              sx={{
                mt: 3,
                fontWeight: 700,
                fontSize: { xs: "1.5rem", sm: "2.125rem" },
              }}
            >
              Account Under Verification
            </Typography>

            <Typography
              sx={{
                mt: 1,
                opacity: .9,
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              Thank you for joining ShopSphere Seller Platform.
            </Typography>

            <Chip
              label="Pending Verification"
              color="warning"
              sx={{
                mt: 2.5,
                fontWeight: 700,
                bgcolor: "#fff3cd",
                color: "#8a6d3b",
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10">

          <Typography
            variant="body1"
            color="text.secondary"
            lineHeight={1.8}
            className="text-xs sm:text-sm"
          >
            Your seller account has been created successfully.
            Our verification team is currently reviewing your
            business information and documents.

            <br />
            <br />

            Once verification is completed, you'll gain access to:

          </Typography>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6">

            {[
              "List Unlimited Products",
              "Manage Orders",
              "Track Revenue",
              "Receive Payments",
              "View Analytics",
              "Manage Inventory",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 sm:p-4 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-all duration-300"
              >
                <CheckCircleOutlineIcon
                  sx={{
                    color: "#009688",
                  }}
                />

                <Typography className="text-xs sm:text-sm font-medium">{item}</Typography>
              </div>
            ))}
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-8">

            <Paper
              variant="outlined"
              className="rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              <div className="flex items-center gap-3">

                <AccessTimeFilledRoundedIcon
                  sx={{
                    color: "#f59e0b",
                  }}
                />

                <div>
                  <Typography fontWeight={600} className="text-xs sm:text-sm">
                    Estimated Verification
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="text-[11px] sm:text-xs"
                  >
                    Usually within 24–48 Hours
                  </Typography>
                </div>
              </div>
            </Paper>

            <Paper
              variant="outlined"
              className="rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              <div className="flex items-center gap-3">

                <EmailRoundedIcon
                  sx={{
                    color: "#009688",
                  }}
                />

                <div>
                  <Typography fontWeight={600} className="text-xs sm:text-sm">
                    Email Notification
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="text-[11px] sm:text-xs"
                  >
                    We'll notify you immediately after approval.
                  </Typography>
                </div>
              </div>
            </Paper>

          </div>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            <Button
              fullWidth
              variant="contained"
              startIcon={<RefreshRoundedIcon />}
              onClick={handleRefresh}
              sx={{
                bgcolor: "#009688",
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#00796b",
                },
              }}
            >
              Refresh Status
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<HomeRoundedIcon />}
              onClick={() => navigate("/")}
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              Back to Home
            </Button>

          </div>

          <Typography
            align="center"
            color="text.secondary"
            sx={{
              mt: 5,
              fontSize: 14,
            }}
          >
            Need help? Contact our support team at{" "}
            <strong>yashlodam03@gmail.com</strong>
          </Typography>

        </div>
      </Paper>
    </Box>
  );
}

export default PendingVerification;