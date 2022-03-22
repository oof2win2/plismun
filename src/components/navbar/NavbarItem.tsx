import NextLink from "next/link"
import { Link } from "@mui/material"
import { useStyles } from "@utils/styles"

type NavbarItemProps = { url: string; name: string }

const NavbarItem: React.FC<NavbarItemProps> = ({ url, name }) => {
  const styles = useStyles()

  return (
    <NextLink href={url} passHref>
      {/* Using the mui link instead of anchor as it makes the styles appear better */}
      <Link className={styles.navbarItem} color="#000000">
        {name}
      </Link>
    </NextLink>
  )
}

export default NavbarItem
