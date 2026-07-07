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
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

function PendingVerification() {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 flex items-center justify-center p-5">
      <Paper
        elevation={0}
        className="max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
      >
        {/* Top Banner */}
        <div className="relative bg-gradient-to-r from-teal-600 to-emerald-600 px-10 py-10 text-white">

          <div className="absolute right-8 top-8 animate-pulse">
            <CircularProgress
              size={70}
              thickness={4}
              sx={{
                color: "rgba(255,255,255,.35)",
              }}
            />
          </div>

          <div className="relative z-10">

            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center shadow-lg animate-bounce">
              <VerifiedUserOutlinedIcon sx={{ fontSize: 45 }} />
            </div>

            <Typography
              variant="h4"
              sx={{
                mt: 3,
                fontWeight: 700,
              }}
            >
              Account Under Verification
            </Typography>

            <Typography
              sx={{
                mt: 1,
                opacity: .9,
              }}
            >
              Thank you for joining ShopSphere Seller Platform.
            </Typography>

            <Chip
              label="Pending Verification"
              color="warning"
              sx={{
                mt: 3,
                fontWeight: 700,
                bgcolor: "#fff3cd",
                color: "#8a6d3b",
              }}
            />
          </div>
        </div>

        {/* Content */}

        <div className="p-10">

          <Typography
            variant="body1"
            color="text.secondary"
            lineHeight={1.8}
          >
            Your seller account has been created successfully.
            Our verification team is currently reviewing your
            business information and documents.

            <br />
            <br />

            Once verification is completed, you'll gain access to:

          </Typography>

          {/* Features */}

          <div className="grid md:grid-cols-2 gap-4 mt-8">

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
                className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 hover:bg-teal-50 transition-all duration-300"
              >
                <CheckCircleOutlineRoundedIcon
                  sx={{
                    color: "#009688",
                  }}
                />

                <Typography>{item}</Typography>
              </div>
            ))}
          </div>

          {/* Info Cards */}

          <div className="grid md:grid-cols-2 gap-5 mt-10">

            <Paper
              variant="outlined"
              className="rounded-2xl p-5"
            >
              <div className="flex items-center gap-3">

                <AccessTimeFilledRoundedIcon
                  sx={{
                    color: "#f59e0b",
                  }}
                />

                <div>
                  <Typography fontWeight={600}>
                    Estimated Verification
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Usually within 24–48 Hours
                  </Typography>
                </div>
              </div>
            </Paper>

            <Paper
              variant="outlined"
              className="rounded-2xl p-5"
            >
              <div className="flex items-center gap-3">

                <EmailRoundedIcon
                  sx={{
                    color: "#009688",
                  }}
                />

                <div>
                  <Typography fontWeight={600}>
                    Email Notification
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
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
            <strong>support@shopsphere.com</strong>
          </Typography>

        </div>
      </Paper>
    </Box>
  );
}

export default PendingVerification;