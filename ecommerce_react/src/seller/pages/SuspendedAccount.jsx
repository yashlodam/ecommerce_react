import React from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Typography,
} from "@mui/material";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

function SuspendedAccount() {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 flex items-center justify-center p-5">

      <Paper
        elevation={0}
        className="max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-600 to-rose-600 px-10 py-10 text-white">

          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,white_2px,transparent_2px)] bg-[length:28px_28px]" />
          </div>

          <div className="relative">

            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center shadow-xl animate-pulse">
              <BlockRoundedIcon sx={{ fontSize: 46 }} />
            </div>

            <Typography
              variant="h4"
              fontWeight={700}
              mt={3}
            >
              Seller Account Suspended
            </Typography>

            <Typography mt={1} sx={{ opacity: 0.9 }}>
              Your seller account has been temporarily suspended.
            </Typography>

            <Chip
              label="Suspended"
              sx={{
                mt: 3,
                bgcolor: "#FEE2E2",
                color: "#B91C1C",
                fontWeight: 700,
              }}
            />

          </div>
        </div>

        {/* Body */}

        <div className="p-10">

          <Typography
            color="text.secondary"
            lineHeight={1.8}
          >
            We detected an issue that requires review before your
            seller account can continue operating.

            <br />
            <br />

            During this suspension you cannot perform the following actions:
          </Typography>

          <div className="grid md:grid-cols-2 gap-4 mt-8">

            {[
              "Add New Products",
              "Edit Existing Products",
              "Receive Orders",
              "Update Order Status",
              "Access Seller Dashboard",
              "Withdraw Earnings",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl bg-slate-50 hover:bg-red-50 transition-all duration-300 p-4"
              >
                <ReportProblemRoundedIcon
                  sx={{ color: "#DC2626" }}
                />

                <Typography>{item}</Typography>
              </div>
            ))}

          </div>

          {/* Reason */}

          <Paper
            variant="outlined"
            className="rounded-2xl mt-8 p-6 border-red-200 bg-red-50"
          >

            <div className="flex gap-4">

              <GavelRoundedIcon
                sx={{
                  color: "#DC2626",
                  fontSize: 34,
                }}
              />

              <div>

                <Typography fontWeight={700}>
                  Possible Reasons
                </Typography>

                <Typography
                  mt={1}
                  color="text.secondary"
                  lineHeight={1.8}
                >
                  • Marketplace policy violation
                  <br />
                  • Incomplete business verification
                  <br />
                  • Customer complaints under review
                  <br />
                  • Suspicious seller activity
                </Typography>

              </div>

            </div>

          </Paper>

          {/* Next Steps */}

          <Typography
            fontWeight={700}
            mt={5}
            mb={3}
          >
            What you can do
          </Typography>

          <div className="space-y-3">

            {[
              "Contact the ShopSphere Support Team",
              "Submit requested documents",
              "Wait for account review",
              "Appeal if you believe this is incorrect",
            ].map((item) => (

              <div
                key={item}
                className="flex items-center gap-3"
              >

                <CheckCircleOutlineRoundedIcon
                  sx={{
                    color: "#16A34A",
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
                bgcolor: "#DC2626",
                borderRadius: 3,
                py: 1.5,
                fontWeight: 700,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#B91C1C",
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
            If you believe this suspension was applied in error,
            please contact <strong>support@shopsphere.com</strong>
            with your seller account details.
          </Typography>

        </div>

      </Paper>

    </Box>
  );
}

export default SuspendedAccount;