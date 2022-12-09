import createTheme, { ThemeOptions } from "@mui/material/styles/createTheme";


const textFieldTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F6AE2D",
      contrastText: "#FFFFFF"
    },
  },
});

export default textFieldTheme;