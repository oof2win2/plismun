import NextLink from "next/link"
import { Link } from "@mui/material"

type NavbarItemProps = { url: string; name: string }

const NavbarItem: React.FC<NavbarItemProps> = ({ url, name }) => {
  return (
    <NextLink href={url} passHref>
      {/* Using the mui link instead of anchor as it makes the styles appear better */}
			<Link
				sx={{
					padding: "1rem"
				}}
				color="#000000"
			>
				{name}
			</Link>
    </NextLink>
  )
}

export default NavbarItem
