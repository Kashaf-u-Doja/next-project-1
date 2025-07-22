"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      main: "#667eea",
      dark: "#5a6fd8",
      light: "#7a8fed",
      contrastText: "#ffffff",
    },
    success: {
      main: "#28a745",
      dark: "#1e7e34",
      light: "#34ce57",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff6961",
      dark: "#d85650",
      light: "#ff8a80",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#333",
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#333",
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#333",
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.2rem",
      fontWeight: "600",
      color: "#333",
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#333",
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: "600",
      color: "#333",
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: "0.9rem",
      fontWeight: "500",
      color: "#555",
    },
    subtitle2: {
      fontSize: "0.85rem",
      fontWeight: "500",
      color: "#666",
    },
    body1: {
      fontSize: "1rem",
      color: "#333",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.9rem",
      color: "#666",
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "5px",
          fontWeight: "500",
        },
        containedPrimary: {
          backgroundColor: "#667eea",
          "&:hover": {
            backgroundColor: "#5a6fd8",
            transform: "translateY(-1px)",
          },
        },
        containedSuccess: {
          backgroundColor: "#28a745",
          "&:hover": {
            backgroundColor: "#1e7e34",
            transform: "translateY(-1px)",
          },
        },
        outlinedPrimary: {
          borderColor: "#667eea",
          color: "#667eea",
          "&:hover": {
            backgroundColor: "rgba(102, 126, 234, 0.1)",
            borderColor: "#5a6fd8",
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#667eea",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#667eea",
            },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#667eea",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#667eea",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#667eea",
          "&.Mui-checked": {
            color: "#667eea",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#667eea",
          "&.Mui-checked": {
            color: "#667eea",
          },
        },
      },
    },
  },
});

export default function CustomThemeProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
