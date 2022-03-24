import { Typography } from "@mui/material"

const Footer = () => {
  return (
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
    </div>
  )
}

export default Footer
