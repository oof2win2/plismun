import { Box, Center, Container, Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"

const Footer = () => {
  return (
    <footer className="footer">
      {/* <Flex direction="row" justifyContent="center">
        <Flex w="100vw" direction="column"> */}
      <Container centerContent>
        {/* social buttons */}
        <Box>
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
        </Box>

        {/* credits */}
        <Text>
          Made with &lt;3 by{" "}
          <a href="https://github.com/oof2win2">Honza Kocourek</a>
        </Text>
      </Container>
    </footer>
  )
}

export default Footer
