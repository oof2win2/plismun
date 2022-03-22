import { useStyles } from "@utils/styles"

const NavbarSection: React.FC<{align?: string}> = ({children, align="right"}) => {
	const styles = useStyles()

	return (
		<div style={{justifyContent: "right", display: "flex"}} className={styles.navbarSection}>
			{children}
		</div>
	)
}
export default NavbarSection