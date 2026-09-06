import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Tooltip,
} from "@mui/material";
import { toast } from "../../common/toast";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import { useNavigate } from "react-router-dom";

const SUPPORT_EMAIL = "yashlodam03@gmail.com";
const CASE_ID = "SS-SUS-48213";

const reviewSteps = ["Suspended", "Under Review", "Resolution"];

function SuspendedAccount() {
  const navigate = useNavigate();

  const [checking, setChecking] = useState(false);
  const [appealOpen, setAppealOpen] = useState(false);
  const [appealText, setAppealText] = useState("");
  const [appealSubmitted, setAppealSubmitted] = useState(false);

  const handleRefresh = () => {
    setChecking(true);
    // Simulated status check — swap for a real GET /seller/status call.
    setTimeout(() => {
      setChecking(false);
      toast.info("Your account is still under review. We'll email you once it's resolved.");
    }, 1200);
  };

  const handleContactSupport = () => {
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=Seller%20Account%20Suspended%20-%20Case%20${CASE_ID}`;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
      toast.success("Support email copied to clipboard.");
    } catch {
      toast.error("Couldn't copy — please copy it manually.");
    }
  };

  const handleSubmitAppeal = () => {
    // Swap for a real dispatch(submitSellerAppeal({ caseId, message })) call.
    setAppealSubmitted(true);
  };

  const closeAppealDialog = () => {
    setAppealOpen(false);
    // Reset a moment after the close animation so the dialog doesn't flash empty.
    setTimeout(() => {
      setAppealSubmitted(false);
      setAppealText("");
    }, 300);
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 dark:from-slate-950 dark:via-slate-900 dark:to-red-950 flex items-center justify-center p-4 sm:p-6 transition-colors">
      <Paper
        elevation={0}
        className="max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-600 to-rose-600 px-6 sm:px-10 py-8 sm:py-10 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,white_2px,transparent_2px)] bg-[length:28px_28px]" />
          </div>

          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center shadow-xl">
              <BlockRoundedIcon sx={{ fontSize: { xs: 34, sm: 46 } }} />
            </div>

            <Typography
              variant="h4"
              fontWeight={700}
              mt={3}
              sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}
            >
              Seller Account Suspended
            </Typography>

            <Typography mt={1} sx={{ opacity: 0.9, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
              Your seller account has been temporarily suspended.
            </Typography>

            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Chip
                label="Suspended"
                sx={{ bgcolor: "#FEE2E2", color: "#B91C1C", fontWeight: 700 }}
              />
              <Chip
                label={`Case ${CASE_ID}`}
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.4)",
                  fontWeight: 600,
                }}
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-10">
          {/* Review progress */}
          <Stepper activeStep={1} alternativeLabel sx={{ mb: 5 }}>
            {reviewSteps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Typography color="text.secondary" lineHeight={1.8}>
            We detected an issue that requires review before your seller account
            can continue operating.
            <br />
            <br />
            During this suspension you cannot perform the following actions:
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-8">
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
                className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200 p-3.5 sm:p-4"
              >
                <ReportProblemRoundedIcon sx={{ color: "#DC2626" }} />
                <Typography className="text-sm font-medium">{item}</Typography>
              </div>
            ))}
          </div>

          {/* Reason */}
          <Paper variant="outlined" className="rounded-2xl mt-8 p-5 sm:p-6 border-red-200 dark:border-red-900/40 bg-red-50/80 dark:bg-red-950/20">
            <div className="flex gap-4">
              <GavelRoundedIcon sx={{ color: "#DC2626", fontSize: 34 }} />
              <div>
                <Typography fontWeight={700}>Possible Reasons</Typography>
                <Typography mt={1} color="text.secondary" lineHeight={1.8} className="text-xs sm:text-sm">
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
          <Typography fontWeight={700} mt={5} mb={3}>
            What you can do
          </Typography>

          <div className="space-y-1">
            {[
              { label: "Contact the ShopSphere Support Team", onClick: handleContactSupport },
              { label: "Submit requested documents", onClick: handleContactSupport },
              { label: "Wait for account review", onClick: null },
              { label: "Appeal if you believe this is incorrect", onClick: () => setAppealOpen(true) },
            ].map((item) => (
              <div
                key={item.label}
                onClick={item.onClick || undefined}
                role={item.onClick ? "button" : undefined}
                tabIndex={item.onClick ? 0 : undefined}
                className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 ${
                  item.onClick ? "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <CheckCircleOutlineIcon sx={{ color: "#16A34A" }} />
                  <Typography className="text-sm">{item.label}</Typography>
                </div>
                {item.onClick && (
                  <ChevronRightRoundedIcon sx={{ color: "#94A3B8", fontSize: 20 }} />
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Button
              fullWidth
              variant="contained"
              startIcon={<SupportAgentRoundedIcon />}
              onClick={handleContactSupport}
              sx={{
                bgcolor: "#DC2626",
                borderRadius: 3,
                py: 1.5,
                fontWeight: 700,
                textTransform: "none",
                "&:hover": { bgcolor: "#B91C1C" },
              }}
            >
              Contact Support
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<RefreshRoundedIcon className={checking ? "animate-spin" : ""} />}
              onClick={handleRefresh}
              disabled={checking}
              sx={{ borderRadius: 3, py: 1.5, textTransform: "none", fontWeight: 700 }}
            >
              {checking ? "Checking..." : "Refresh Status"}
            </Button>

            <Button
              fullWidth
              variant="text"
              startIcon={<HomeRoundedIcon />}
              onClick={() => navigate("/")}
              sx={{ borderRadius: 3, py: 1.5, textTransform: "none", fontWeight: 700 }}
            >
              Go Home
            </Button>
          </div>

          <Typography align="center" color="text.secondary" sx={{ mt: 6, fontSize: 14 }}>
            If you believe this suspension was applied in error, please contact{" "}
            <strong>{SUPPORT_EMAIL}</strong> with your seller account details.
            <Tooltip title="Copy email">
              <IconButton size="small" onClick={handleCopyEmail} sx={{ ml: 0.5 }}>
                <ContentCopyRoundedIcon sx={{ fontSize: 15 }} />
              </IconButton>
            </Tooltip>
          </Typography>
        </div>
      </Paper>

      {/* Appeal Dialog */}
      <Dialog open={appealOpen} onClose={closeAppealDialog} fullWidth maxWidth="sm">
        {appealSubmitted ? (
          <DialogContent sx={{ textAlign: "center", py: 6 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 56, color: "#16A34A", mb: 2 }} />
            <Typography variant="h6" fontWeight={700}>
              Appeal submitted
            </Typography>
            <Typography color="text.secondary" mt={1}>
              We've received your appeal for case {CASE_ID}. Our team will review it and
              respond within 3–5 business days.
            </Typography>
            <Button onClick={closeAppealDialog} sx={{ mt: 4, textTransform: "none", fontWeight: 700 }}>
              Close
            </Button>
          </DialogContent>
        ) : (
          <>
            <DialogTitle sx={{ fontWeight: 700 }}>Appeal this suspension</DialogTitle>
            <DialogContent>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Explain why you believe case {CASE_ID} was applied in error. Include any
                relevant order IDs or documents you can attach separately.
              </Typography>
              <TextField
                autoFocus
                multiline
                minRows={4}
                fullWidth
                placeholder="Describe your case..."
                value={appealText}
                onChange={(e) => setAppealText(e.target.value)}
              />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button onClick={closeAppealDialog} sx={{ textTransform: "none" }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled={!appealText.trim()}
                onClick={handleSubmitAppeal}
                sx={{
                  bgcolor: "#DC2626",
                  textTransform: "none",
                  fontWeight: 700,
                  "&:hover": { bgcolor: "#B91C1C" },
                }}
              >
                Submit Appeal
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default SuspendedAccount;