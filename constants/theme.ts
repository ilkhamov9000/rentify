const Theme = {
  colors: {
    primary: {
      main: "#4A6FFF",
      light: "#E5EBFF",
      dark: "#3A5AE0",
    },
    secondary: {
      main: "#7B61FF",
      light: "#EEE9FF",
      dark: "#5A46B8",
    },
    neutral: {
      white: "#FFFFFF",
      background: "#F5F7FA",
      lightGray: "#E5E7EB",
      gray: "#9CA3AF",
      darkGray: "#6B7280",
      black: "#1F2937",
    },
    status: {
      success: "#10B981",
      successLight: "#D1FAE5",
      error: "#EF4444",
      errorLight: "#FEE2E2",
      warning: "#F59E0B",
      warningLight: "#FEF3C7",
      info: "#3B82F6",
      infoLight: "#DBEAFE",
    },
    transparent: "transparent",
  },
  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 22,
      xxl: 28,
    },
    weights: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export default Theme;