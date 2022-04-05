import Link from "next/link"
import { useRouter } from "next/router"

type Page = {
  type: "page"
  title: string
  href: string
}
type Category = {
  type: "category"
  categoryName: string
  pages: Page[]
}

const pages: (Page | Category)[] = [
  {
    type: "page",
    title: "Home",
    href: "/",
  },
  {
    categoryName: "About",
    type: "category",
    pages: [
      { title: "About PLISMUN", href: "/about", type: "page" },
      {
        title: "Privacy Policy",
        href: "/about/privacy",
        type: "page",
      },
      {
        title: "Terms of Service",
        href: "/about/tos",
        type: "page",
      },
    ],
  },
  {
    type: "page",
    title: "Contact",
    href: "/contact",
  },
]

// TODO: loop over the sites and add them in the correct order

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
                  {pages
                    // .filter((page): page is Page => page.type == "page")
                    .map((page) => {
                      return page.type == "page" ? (
                        <li className="nav__item" key={page.href}>
                          <Link href={page.href}>
                            <a
                              className={
                                "nav__link" +
                                (currentPage === page.href
                                  ? " active-link"
                                  : "")
                              }
                            >
                              {page.title}
                            </a>
                          </Link>
                        </li>
                      ) : (
                        <li
                          className="nav__item dropdown"
                          key={page.categoryName}
                        >
                          <span className="nav__link dropdown-toggle">
                            {page.categoryName}{" "}
                            <ion-icon
                              name="chevron-down-outline"
                              style={{ verticalAlign: "middle" }}
                            />
                          </span>
                          <div className="dropdown-menu">
                            {page.pages.map((pg) => {
                              return (
                                <Link href={pg.href} key={pg.href}>
                                  <a
                                    className={
                                      "nav__link" +
                                      (currentPage === pg.href
                                        ? " active-link"
                                        : "")
                                    }
                                  >
                                    {pg.title}
                                  </a>
                                </Link>
                              )
                            })}
                          </div>
                        </li>
                      )
                    })}
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
                      <ion-icon
                        name="logo-twitter"
                        style={{
                          verticalAlign: "middle",
                        }}
                      />
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
                      <ion-icon
                        name="logo-instagram"
                        style={{
                          verticalAlign: "middle",
                        }}
                      />
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
                      <ion-icon
                        name="logo-facebook"
                        style={{
                          verticalAlign: "middle",
                        }}
                      />
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
                      <ion-icon
                        name="mail"
                        style={{
                          verticalAlign: "middle",
                        }}
                      />
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
