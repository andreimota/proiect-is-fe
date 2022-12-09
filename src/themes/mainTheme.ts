import createTheme, { ThemeOptions } from "@mui/material/styles/createTheme";


const mainTheme = createTheme({
  typography: {
    allVariants: {
      color: "#FFFFFF",
    }
  },
  palette: {
    
    primary: {
      main: "#0d0d0e",
    },
    secondary: {
      main: "#F6AE2D",
    },
    success: {
      main: "#2a812e",
    },
    background: {
      default: "#111111",
    },
    info: {
      main: "#2196f3",
    },
    warning: {
      main: "#ff9800",
    },
  },
});

export default mainTheme;