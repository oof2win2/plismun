import React from "react"

export default function About() {
  return (
    <div className="c-page">
      <div className="container">
        <div className="page animate">
          <h1>CONTACT US</h1>

          <div className="big__social">
            <ul className="social__list list-reset">
              <li className="social__item">
                <a
                  aria-label="twitter icon"
                  className="social__link"
                  href="https://twitter.com/plismun"
                  rel="noopener"
                  target="_blank"
                >
                  <ion-icon name="logo-twitter" />
                </a>
                <p style={{ fontSize: 16 }}>@plismun</p>
              </li>

              <li className="social__item">
                <a
                  aria-label="instagram icon"
                  className="social__link"
                  href="https://instagram.com/plismun"
                  rel="noopener"
                  target="_blank"
                >
                  <ion-icon name="logo-instagram" />
                </a>
                <p style={{ fontSize: 16 }}>@plismun</p>
              </li>

              <li className="social__item">
                <a
                  aria-label="facebook icon"
                  className="social__link"
                  href="https://www.facebook.com/Plismunofficial/"
                  rel="noopener"
                  target="_blank"
                >
                  <ion-icon name="logo-facebook" />
                </a>
                <p style={{ fontSize: 16 }}>@Plismunofficial</p>
              </li>

              <li className="social__item">
                <a
                  aria-label="email icon"
                  className="social__link"
                  href="mailto:secretariat@plismun.com"
                  rel="noopener"
                  target="_blank"
                >
                  <ion-icon name="mail" />
                </a>
                <p style={{ fontSize: 16 }}>secretariat@plismun.com</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// this makes the page render only once on server startup, which is good for SEO + performance
// makes TTFB faster since the page is just sent immediately after the request rather than rendering it
export function getStaticProps() {
  return {
    props: {},
  }
}
