import { useAppSelector } from "@/utils/redux/hooks"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

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
  {
    type: "page",
    title: "Committees",
    href: "/committees",
  },
]

const Navbar = () => {
  const router = useRouter()
  const [navIsOpen, setNavIsOpen] = useState(false)
  const { user } = useAppSelector((state) => state.user)

  const currentPage = router.asPath

  return (
    <header className="c-header">
      <div className="container">
        <div className="row">
          <div className="c-header__inner">
            <div className="logo">
              {/* nbsp here so it looks good guaranteed */}
              <h3>PLISMUN&nbsp;'23</h3>
            </div>
            <nav className={`main-nav${navIsOpen ? " is-open" : ""}`}>
              <div className="main-nav__box">
                <div
                  className="nav__icon-close"
                  onClick={() => setNavIsOpen(false)}
                >
                  <ion-icon name="close" />
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
                              onClick={() => setNavIsOpen(false)}
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
                                    onClick={() => setNavIsOpen(false)}
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

              <div className="user">
                <ul className="user__list list-reset">
                  {user ? (
                    <li className="user__item user__link">
                      <Link href="/user/logout">
                        <a
                          className={
                            "nav__link" +
                            (currentPage === "/user/logout"
                              ? " active-link"
                              : "")
                          }
                          onClick={() => setNavIsOpen(false)}
                        >
                          Log out
                        </a>
                      </Link>
                    </li>
                  ) : (
                    <li className="user__item user__link">
                      <Link href="/user/login">
                        <a
                          className={
                            "nav__link" +
                            (currentPage === "/user/login"
                              ? " active-link"
                              : "")
                          }
                          onClick={() => setNavIsOpen(false)}
                        >
                          Log in
                        </a>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
            <div className="nav-button" onClick={() => setNavIsOpen(true)}>
              <ion-icon class="nav_button nav__icon-menu" name="menu-outline" />
              {/* <i className="nav__icon nav__icon-menu ion ion-md-menu"></i> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
