import { createStyles, createTheme, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const theme = createTheme({
  palette: {
    background: {
      default: "#111111",
      paper: "#1f1f1f",
    },
    primary: {
      main: "#ff0000",
    },
  },
  typography: {
    h1: {
      fontWeight: 400,
      color: "lightgray",
    },
    body1: {
      color: "lightgray",
    },
  },
});

/**
 * A collection of class names of styles for application to different elements
 */
export const useStyles = makeStyles({
  root: {
    // background: theme.palette.background.default,
    backgroundColor: "pink",
  },
  p: {
    color: "#ddd9d9",
  },
  pmono: {
    color: "#ddd9d9",
    fontFamily: "Roboto Mono",
  },
  navbarItem: {
    color: "#000000",
    fontFamily: "Roboto",
    padding: "1rem",
  },
  navbarSection: {
    // TODO: make this background color not be iffy sometimes
    backgroundColor: "#ede6eb",
  },
  menuButton: {},
  footerData: {
    color: "#ffffff",
  },
  columnHeader: {
    color: "#ffffff",
  },
});
