import {
  Container,
  Heading,
  Text,
  Img,
  GridItem,
  Grid,
  Flex,
  Box,
} from "@chakra-ui/react"
import React from "react"
import Image from "next/image"
import ASPIRONIX from "../../public/images/sponsors/large/aspironix.png"
import EDN from "../../public/images/sponsors/large/EDN.png"
import MONDI from "../../public/images/sponsors/large/mondi.png"
import FRUITISMO from "../../public/images/sponsors/large/fruitisimo.png"
import FRESHTASTY from "../../public/images/sponsors/large/freshtasty.png"

function Partners() {
  return (
    <Container maxW="110ch">
      <Heading>Our PLISMUN '23 partners are:</Heading>
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
          <Image height="180" width="256" src={ASPIRONIX} />
        </Flex>

        <Flex
          minW="128"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          padding="6"
        >
          <Image height="180" width="256" src={MONDI} />
        </Flex>

        <Flex
          minW="128"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          padding="6"
        >
          <Image height="110" width="256" src={FRUITISMO} />
        </Flex>

        <Flex
          minW="128"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          padding="6"
        >
          <Image height="68" width="256" src={FRESHTASTY} />
        </Flex>

        <Flex
          minW="128"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          padding="6"
        >
          <Image height="256" width="256" src={EDN} />
        </Flex>
      </Box>

      <Heading>What is PLISMUN '23 looking for?</Heading>

      <br />

      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={4}
        justifyContent="center"
        flexWrap="wrap"
        display="flex"
      >
        <GridItem maxW="250px">
          <Heading size="lg">Money</Heading>
          <Heading size="2xl">
            <ion-icon name="logo-euro" />
          </Heading>
          <Text>
            We are looking for financial donations of any size for us to sustain
            the costs of the conference. We are a student-led non-profit
            organization and all funds are allocated to the creation of this
            conference.
          </Text>
        </GridItem>

        <GridItem maxW="250px">
          <Heading size="lg">Speakers</Heading>
          <Heading size="2xl">
            <ion-icon name="person-outline" />
          </Heading>
          <Text>
            We are looking for experienced speakers, that are willing and able
            to deliver speeches within the context of topics that are debated
            and discussed at this conference. These can include politicians,
            journalists, diplomats, mentors and any other appropriate
            occupations.
          </Text>
        </GridItem>

        <GridItem maxW="250px">
          <Heading size="lg">Logistics</Heading>
          <Heading size="2xl">
            <ion-icon name="globe-outline" />
          </Heading>
          <Text>
            We are looking to collaborate with catering companies, venues for
            social events and many others to ensure the best possible experience
            for the whole conference.
          </Text>
        </GridItem>
      </Grid>

      <br />

      <Heading>Why PLISMUN '23?</Heading>
      <ul>
        <li>
          <Text>
            We are a full student-led organization that is composed of students
            from the years 10 to 13, receiving no money or compensation of any
            other kind,
          </Text>
        </li>

        <li>
          <Text>
            We are all enthusiasts and determined to be the next generation of
            leaders interested in politics, history, computer science, economics
            and many more,
          </Text>
        </li>

        <li>
          <Text>
            We are doing the most we can to deliver the best conference in
            Prague!
          </Text>
        </li>
      </ul>

      <br />

      <Heading>What do we offer?</Heading>
      <Text>
        We are offering 3 different tiers of sponsorship, where we promote your
        brand on our website, and social media, and handbooks given to
        individual participants of our conference mentions at the Opening and
        Closing Ceremonies and many more!
      </Text>
    </Container>
  )
}

Partners.pageName = "PARTNERS"
export default Partners

// this makes the page render only once on server startup, which is good for SEO + performance
// makes TTFB faster since the page is just sent immediately after the request rather than rendering it
export function getStaticProps() {
  return {
    props: {},
  }
}
