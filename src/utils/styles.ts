import { createTheme, Typography } from "@mui/material"
import { makeStyles, createStyles } from "@mui/styles"
import { styled } from "@mui/system"

export const theme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
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
})

/**
 * A collection of class names of styles for application to different elements
 */
export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // background: theme,
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
      backgroundColor: "#ede6eb",
    },
    menuButton: {},
    footerData: {
      color: "#ffffff",
    },
    columnHeader: {
      color: "#ffffff",
    },
  })
)

export const ParagraphTypography = styled(Typography)`
  color: #000000;
`
