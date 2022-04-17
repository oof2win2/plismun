import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import { Container, Heading, Text } from "@chakra-ui/react"

export default function Home() {
  const router = useRouter()

  return (
    <Container maxW="90ch">
      <Header title="" />

      <Heading size="4xl" maxW="100vw">
        Server error occured
      </Heading>

      <br />

      <Heading>
        Sorry, but the server encountered an error whilst processing your
        request
      </Heading>
      <Heading size="md">
        You can go to the{" "}
        <Link href="/">
          <a>homepage</a>
        </Link>{" "}
        , try going <a onClick={() => router.back()}>back</a>, or try{" "}
        <a onClick={() => router.reload()}>reloading</a>.
      </Heading>

      <br />

      <Text>
        I guess the dog ran away with the homework before it was handed out. And
        I <i>still</i> don't have a dog. Though bernese mountain dogs look{" "}
        <i>so</i> adorable
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
