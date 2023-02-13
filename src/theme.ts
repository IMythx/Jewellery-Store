import { ThemeOptions } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
export const themeOptions: ThemeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e8a86e",
    },
    background: {
      default: "#2b2b2b",
      paper: "#2b2b2b",
    },
    text: {
      secondary: "#8a8a8a",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      miniTablet: 500,
      sm: 600,
      between: 768,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "Source Sans Pro",
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
