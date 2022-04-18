import React, { useEffect } from "react"
import Image from "next/image"
// import { ParagraphTypography } from "@/utils/styles"
import Header from "@/components/header"
import { Center, Container, Text } from "@chakra-ui/react"

export default function Home() {
  return (
    <Container maxW="110ch">
      <Header mainPage />
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
        9 committees in PLISMUN '23 means that first-time MUN debutants and
        seasoned debating veterans alike will find their place.
      </Text>
    </Container>
  )
}

// this makes the page render only once on server startup, which is good for SEO + performance
// makes TTFB faster since the page is just sent immediately after the request rather than rendering it
export function getStaticProps() {
  return {
    props: {},
  }
}
