import { Typography } from "@mui/material"
import Link from "next/link"
import NavbarItem from "./NavbarItem"
import NavbarSection from "./NavbarSection"
import { useRouter } from "next/router"

const pages = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

const Navbar = () => {
  const router = useRouter()

  const currentPage = router.asPath

  return (
    <header className="c-header">
      <div className="container">
        <div className="row">
          <div className="c-header__inner">
            <div className="logo">
              {/* <img
						alt="PLISMUN '23"
						className="logo__image"
						src="/images/logopublic.svg"
					/> */}
              {/* nbsp here so it looks good guaranteed */}
              <h3>PLISMUN&nbsp;'23</h3>
            </div>
            <nav className="main-nav">
              <div className="main-nav__box">
                <div className="nav__icon-close">
                  <i className="ion ion-md-close"></i>
                </div>

                <div className="nav__title">Menu</div>

                <ul className="nav__list list-reset">
                  {pages.map((page) => {
                    return (
                      <li className="nav__item" key={page.href}>
                        <Link href={page.href}>
                          <a
                            className={
                              "nav__link" +
                              (currentPage === page.href ? " active-link" : "")
                            }
                          >
                            {page.title}
                          </a>
                        </Link>
                      </li>
                    )
                  })}

                  {/* This is an example of how a dropdown would be done */}
                  {/* <li className="nav__item dropdown">
                <span className="nav__link dropdown-toggle">
                  Pages <i className="ion ion-ios-arrow-down arrow-down"></i>
                </span>
                <div className="dropdown-menu">
                  <a className="nav__link" href="/about/">
                    About
                  </a>

                  <a className="nav__link" href="/elements/">
                    Elements
                  </a>
                </div>
              </li> */}
                </ul>
              </div>
              <div className="social">
                <ul className="social__list list-reset">
                  <li className="social__item">
                    <a
                      aria-label="twitter icon"
                      className="social__link"
                      href="https://twitter.com/plismun"
                      rel="noopener"
                      target="_blank"
                    >
                      <i className="ion ion-logo-twitter"></i>
                    </a>
                  </li>

                  <li className="social__item">
                    <a
                      aria-label="instagram icon"
                      className="social__link"
                      href="https://instagram.com/plismun"
                      rel="noopener"
                      target="_blank"
                    >
                      <i className="ion ion-logo-instagram"></i>
                    </a>
                  </li>

                  <li className="social__item">
                    <a
                      aria-label="facebook icon"
                      className="social__link"
                      href="https://www.facebook.com/Plismunofficial/"
                      rel="noopener"
                      target="_blank"
                    >
                      <i className="ion ion-logo-facebook"></i>
                    </a>
                  </li>

                  <li className="social__item">
                    <a
                      aria-label="email icon"
                      className="social__link"
                      href="mailto:secretariat@plismun.com"
                      rel="noopener"
                      target="_blank"
                    >
                      <i className="ion ion-md-mail"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
