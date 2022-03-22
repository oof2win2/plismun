import NavbarItem from "./NavbarItem"
import NavbarSection from "./NavbarSection"

const Navbar = () => {
  return (
    // TODO: make it start from the middle of the page and go to the end horizontally
    <div style={{ paddingRight: "4em", paddingTop: "1em" }}>
      <NavbarSection>
        <NavbarItem url="/" name="Home" />
        <NavbarItem url="/about" name="About" />
      </NavbarSection>
    </div>
  )
}

export default Navbar
