import { Box, Center, Container, Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Image from "next/image"
import ASPIRONIX from "../../public/images/sponsors/large/aspironix.png"
import EDN from "../../public/images/sponsors/large/EDN.png"
import MONDI from "../../public/images/sponsors/large/mondi.png"
import FRUITISMO from "../../public/images/sponsors/large/fruitisimo.png"
import FRESHTASTY from "../../public/images/sponsors/large/freshtasty.png"

const Footer = () => {
  return (
    <footer className="footer">
      <Container centerContent>
        {/* sponsors */}
        <Box
          className="row"
          padding="20px 10px 20px 10px"
          listStyleType="none"
          justifyContent="center"
          width="80vw"
        >
          <Flex
            minW="128"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            padding="6"
          >
            <a href="http://www.aspironix.com" style={{ border: "0" }}>
              <Image height="90" width="128" src={ASPIRONIX} />
            </a>
          </Flex>

          <Flex
            minW="128"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            padding="6"
          >
            <a href="https://www.mondigroup.com" style={{ border: "0" }}>
              <Image height="90" width="128" src={MONDI} />
            </a>
          </Flex>

          <Flex
            minW="128"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            padding="6"
          >
            <a href="https://fruitisimo.cz/" style={{ border: "0" }}>
              <Image height="54.8" width="128" src={FRUITISMO} />
            </a>
          </Flex>

          <Flex
            minW="128"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            padding="6"
          >
            <a href="https://freshtasty.cz/" style={{ border: "0" }}>
              <Image height="34" width="128" src={FRESHTASTY} />
            </a>
          </Flex>

          <Flex
            minW="128"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            padding="6"
          >
            <a href="https://www.edn.cz/" style={{ border: "0" }}>
              <Image height="128" width="128" src={EDN} />
            </a>
          </Flex>
        </Box>

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
