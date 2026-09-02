import { createTheme } from "@mui/material/styles";

export const designTokens = {
  colors: {
    primary: {
      50: "#f0fdfa",
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#14b8a6",
      600: "#009688",
      700: "#0f766e",
      800: "#115e59",
      900: "#134e4a",
    },
    slate: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#0b0f19",
    },
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "400ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

export function createAppTheme(mode = "light") {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? "#2dd4bf" : "#009688",
        light: isDark ? "#5eead4" : "#33ab9f",
        dark: isDark ? "#0f766e" : "#00695f",
        contrastText: isDark ? "#0f172a" : "#ffffff",
      },
      secondary: {
        main: isDark ? "#38bdf8" : "#2563eb",
        light: isDark ? "#7dd3fc" : "#3b82f6",
        dark: isDark ? "#0284c7" : "#1d4ed8",
        contrastText: "#ffffff",
      },
      background: {
        default: isDark ? "#0b0f19" : "#f8fafc",
        paper: isDark ? "#131b2e" : "#ffffff",
      },
      text: {
        primary: isDark ? "#f8fafc" : "#0f172a",
        secondary: isDark ? "#94a3b8" : "#64748b",
      },
      success: {
        main: "#10b981",
        light: isDark ? "rgba(16, 185, 129, 0.2)" : "#d1fae5",
        dark: "#047857",
      },
      error: {
        main: "#ef4444",
        light: isDark ? "rgba(239, 68, 68, 0.2)" : "#fee2e2",
        dark: "#b91c1c",
      },
      warning: {
        main: "#f59e0b",
        light: isDark ? "rgba(245, 158, 11, 0.2)" : "#fef3c7",
        dark: "#b45309",
      },
      info: {
        main: "#0284c7",
        light: isDark ? "rgba(2, 132, 199, 0.2)" : "#e0f2fe",
        dark: "#0369a1",
      },
      divider: isDark ? "#1e293b" : "#e2e8f0",
    },
    typography: {
      fontFamily: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        "sans-serif",
      ].join(","),
      h1: { fontWeight: 800, letterSpacing: "-0.025em" },
      h2: { fontWeight: 700, letterSpacing: "-0.02em" },
      h3: { fontWeight: 700, letterSpacing: "-0.02em" },
      h4: { fontWeight: 600, letterSpacing: "-0.015em" },
      h5: { fontWeight: 600, letterSpacing: "-0.01em" },
      h6: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 12,
            boxShadow: "none",
            padding: "8px 18px",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              boxShadow: isDark
                ? "0 4px 14px rgba(45, 212, 191, 0.25)"
                : "0 4px 14px rgba(0, 150, 136, 0.25)",
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
          },
          containedPrimary: {
            background: isDark
              ? "linear-gradient(135deg, #2dd4bf 0%, #0f766e 100%)"
              : "linear-gradient(135deg, #009688 0%, #00796b 100%)",
            color: isDark ? "#0f172a" : "#ffffff",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
          rounded: {
            borderRadius: 16,
          },
          elevation1: {
            boxShadow: isDark
              ? "0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)"
              : "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: isDark ? "1px solid #1e293b" : "1px solid #f1f5f9",
            color: isDark ? "#f8fafc" : "#0f172a",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: 8,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
            backgroundColor: isDark ? "#131b2e" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "none",
            boxShadow: isDark
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.75)"
              : "0 20px 40px -15px rgba(15, 23, 42, 0.15)",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: isDark ? "#f8fafc" : "#0f172a",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: isDark ? "#334155" : "#e2e8f0",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: isDark ? "#2dd4bf" : "#009688",
            },
          },
        },
      },
    },
  });
}

export default createAppTheme;
