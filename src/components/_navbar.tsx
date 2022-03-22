import { IconButton, Toolbar, AppBar, Typography, Grid } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import Link from "next/link"
import { useStyles } from "../utils/styles"

const NavbarItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
]

export default function Navbar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" style={{ float: "right" }}>
            PLISMUN 2023
          </Typography>
          {NavbarItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <Typography
                style={{ display: "inline", float: "right" }}
                variant="h6"
                align="right"
                alignSelf="right"
              >
                {item.name}
              </Typography>
            </Link>
          ))}
        </Toolbar>
      </AppBar>
    </div>
  )
}
