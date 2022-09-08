import { Container, Heading, Text, Img } from "@chakra-ui/react"
import React from "react"

function Contact() {
  return (
    <Container maxW="110ch">
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
            <Text>@plismun</Text>
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
            <Text>@plismun</Text>
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
            <Text>@Plismunofficial</Text>
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
            <Text>plismun@parklane-is.com</Text>
          </li>
        </ul>
      </div>

      <br />
      <Img
        src="/images/contact.jpg"
        //width="16"
        //height="9"
        borderRadius={16}
      />
    </Container>
  )
}

Contact.pageName = "CONTACT US"
export default Contact

// this makes the page render only once on server startup, which is good for SEO + performance
// makes TTFB faster since the page is just sent immediately after the request rather than rendering it
export function getStaticProps() {
  return {
    props: {},
  }
}
