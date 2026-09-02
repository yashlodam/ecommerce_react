import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import createAppTheme from "./createAppTheme";

const ThemeContext = createContext({
  mode: "light",
  effectiveMode: "light",
  setThemeMode: () => {},
  toggleTheme: () => {},
});

const STORAGE_KEY = "shopsphere_theme_mode";

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark" || saved === "system") {
        return saved;
      }
    } catch {
      // Ignore localStorage access errors
    }
    return "light";
  });

  const [systemIsDark, setSystemIsDark] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Listen to system preference changes
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setSystemIsDark(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const effectiveMode = useMemo(() => {
    if (mode === "system") {
      return systemIsDark ? "dark" : "light";
    }
    return mode;
  }, [mode, systemIsDark]);

  // Synchronize document classes and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (effectiveMode === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }

    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Storage unavailable
    }
  }, [mode, effectiveMode]);

  const setThemeMode = useCallback((newMode) => {
    setMode(newMode);
  }, []);

  const toggleTheme = useCallback(() => {
    setMode((prev) => {
      const current = prev === "system" ? effectiveMode : prev;
      const next = current === "dark" ? "light" : "dark";
      return next;
    });
  }, [effectiveMode]);

  const muiTheme = useMemo(() => createAppTheme(effectiveMode), [effectiveMode]);

  const value = useMemo(
    () => ({
      mode,
      effectiveMode,
      setThemeMode,
      toggleTheme,
    }),
    [mode, effectiveMode, setThemeMode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return ctx;
}
