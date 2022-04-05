import Link from "next/link"
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

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col col-12">
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
            <div className="copyright">
              <p>
                Made in 2022 with &lt;3 by{" "}
                <a href="https://github.com/oof2win2">oof2win2</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
