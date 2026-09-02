import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { useThemeContext } from "../Theme/ThemeContext";

export default function ThemeToggle({ size = "medium", className = "" }) {
  const { mode, effectiveMode, toggleTheme } = useThemeContext();
  const isDark = effectiveMode === "dark";

  return (
    <Tooltip
      title={
        isDark
          ? "Switch to Light theme"
          : "Switch to Dark theme"
      }
      arrow
    >
      <IconButton
        onClick={toggleTheme}
        aria-label={
          isDark ? "Switch to light theme" : "Switch to dark theme"
        }
        size={size}
        className={`rounded-full transition-all duration-300 ${
          isDark
            ? "bg-slate-800 text-teal-300 hover:bg-slate-700 hover:text-teal-200 border border-slate-700/80 shadow-sm"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-teal-700 border border-slate-200/80 shadow-xs"
        } ${className}`}
        sx={{
          width: size === "small" ? 36 : 40,
          height: size === "small" ? 36 : 40,
          transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease",
          "&:hover": {
            transform: "rotate(12deg) scale(1.08)",
          },
          "&:active": {
            transform: "scale(0.92)",
          },
          "&:focus-visible": {
            outline: "2px solid #009688",
            outlineOffset: "2px",
          },
        }}
      >
        {isDark ? (
          <LightModeOutlinedIcon sx={{ fontSize: size === "small" ? 18 : 20 }} />
        ) : (
          <DarkModeOutlinedIcon sx={{ fontSize: size === "small" ? 18 : 20 }} />
        )}
      </IconButton>
    </Tooltip>
  );
}
