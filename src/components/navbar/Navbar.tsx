import { Typography } from "@mui/material"
import NavbarItem from "./NavbarItem"
import NavbarSection from "./NavbarSection"

const Navbar = () => {
  return (
    // TODO: make it start from the middle of the page and go to the end horizontally
    <div style={{
			paddingRight: "4em",
			paddingTop: "1em",
			paddingBottom: "1em",
			justifyContent: "right",
			display: "flex",
			backgroundColor: "#eae5e85e"
		}}>
			<Typography
				sx={{
					display: "inline",
					color: "#000000",
					position: "absolute",
					top: "0.5rem",
					left: "1rem",
					fontSize: 32
				}}
			>PLISMUN 2023</Typography>
      <NavbarSection>
        <NavbarItem url="/" name="Home" />
        <NavbarItem url="/about" name="About" />
				<NavbarItem url="/login" name="Login/Sign up" />
			</NavbarSection>
    </div>
  )
}

export default Navbar
