import React from "react"
import {
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react"
import Image from "next/image"

function Home() {
  return (
    <Container maxW="110ch">
      <Text>
        Park Lane International School Model United Nations, or PLISMUN for
        short, is a conference where students aged 13 - 18 discuss topics of
        global importance by representing countries in a simulation of select
        committees of the United Nations. Delegations from schools anywhere in
        the world are invited to participate.
      </Text>
      <br />
      <Text>
        The conference takes place in-person and is managed by a completely
        student-led team. January 2023 will mark the sixth annual edition of
        PLISMUN - and by no means the last!
      </Text>
      <br />
      <Text>
        8 committees in PLISMUN '23 means that first-time MUN debutants and
        seasoned debating veterans alike will find their place.
      </Text>
      <Divider margin="1em" />
      <Center flexDir="column">
        <Text>Conference Schedule</Text>
        <img src={"/images/schedule.png"} />
      </Center>
      <Divider margin="1em" />
      <Center>
        <Text>Latest news relating to the conference:</Text>
        <br />
      </Center>
      <Container maxW="l" centerContent>
        <Heading>CHAIR APPLICATIONS OPEN!!</Heading>
        <Text>
          Chair applications have been opened on the 9th of August, 2022
        </Text>
      </Container>
    </Container>
  )
}

Home.mainPage = true

export default Home

// this makes the page render only once on server startup, which is good for SEO + performance
// makes TTFB faster since the page is just sent immediately after the request rather than rendering it
export function getStaticProps() {
  return {
    props: {},
  }
}
