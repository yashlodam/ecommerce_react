import React from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Typography,
} from "@mui/material";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { useNavigate } from "react-router-dom";

function DeactivatedAccount() {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-orange-950 flex items-center justify-center p-4 sm:p-6 transition-colors">
      <Paper
        elevation={0}
        className="max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 px-6 sm:px-10 py-8 sm:py-10 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,white_2px,transparent_2px)] bg-[length:30px_30px]" />
          </div>

          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center shadow-lg animate-pulse">
              <PauseCircleFilledRoundedIcon sx={{ fontSize: { xs: 34, sm: 48 } }} />
            </div>

            <Typography
              variant="h4"
              fontWeight={700}
              mt={3}
              sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}
            >
              Seller Account Deactivated
            </Typography>

            <Typography mt={1} sx={{ opacity: 0.9, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
              Your seller account is currently inactive.
            </Typography>

            <Chip
              label="Deactivated"
              sx={{
                mt: 3,
                bgcolor: "#fff7ed",
                color: "#c2410c",
                fontWeight: 700,
              }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-10">
          <Typography
            color="text.secondary"
            lineHeight={1.8}
          >
            Your seller account has been deactivated and seller
            features are temporarily unavailable.
            <br />
            <br />
            While your account is inactive you won't be able to:
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-8">
            {[
              "Add New Products",
              "Receive New Orders",
              "Manage Inventory",
              "Access Seller Dashboard",
              "Withdraw Payments",
              "View Sales Analytics",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all duration-200 p-3.5 sm:p-4"
              >
                <InfoRoundedIcon
                  sx={{
                    color: "#ea580c",
                  }}
                />
                <Typography className="text-sm font-medium">{item}</Typography>
              </div>
            ))}
          </div>

          {/* Info */}
          <Paper
            variant="outlined"
            className="rounded-2xl p-5 sm:p-6 mt-8 bg-orange-50/80 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900/40"
          >
            <div className="flex gap-4">
              <SupportAgentRoundedIcon
                sx={{
                  color: "#ea580c",
                  fontSize: 35,
                }}
              />
              <div>
                <Typography fontWeight={700}>
                  Need to Reactivate?
                </Typography>
                <Typography
                  mt={1}
                  color="text.secondary"
                  className="text-xs sm:text-sm"
                >
                  Contact our support team to reactivate your
                  seller account. Once approved, all seller
                  features will be restored.
                </Typography>
              </div>
            </div>
          </Paper>

          {/* Benefits */}
          <Typography
            fontWeight={700}
            mt={5}
            mb={3}
          >
            After Reactivation you'll be able to:
          </Typography>

          <div className="space-y-3">

            {[
              "Continue selling your products",
              "Manage customer orders",
              "Receive seller payouts",
              "Track revenue and analytics",
            ].map((item) => (

              <div
                key={item}
                className="flex items-center gap-3"
              >

                <CheckCircleOutlineIcon
                  sx={{
                    color: "#16a34a",
                  }}
                />

                <Typography>{item}</Typography>

              </div>

            ))}

          </div>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            <Button
              fullWidth
              variant="contained"
              startIcon={<SupportAgentRoundedIcon />}
              sx={{
                bgcolor: "#ea580c",
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 3,
                py: 1.5,
                "&:hover": {
                  bgcolor: "#c2410c",
                },
              }}
            >
              Contact Support
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<RefreshRoundedIcon />}
              onClick={handleRefresh}
              sx={{
                borderRadius: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Refresh Status
            </Button>

            <Button
              fullWidth
              variant="text"
              startIcon={<HomeRoundedIcon />}
              onClick={() => navigate("/")}
              sx={{
                borderRadius: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Go Home
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
            Need assistance? Contact our support team at{" "}
            <strong>support@shopsphere.com</strong>
          </Typography>

        </div>
      </Paper>

    </Box>
  );
}

export default DeactivatedAccount;