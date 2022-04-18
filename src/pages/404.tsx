import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Header from "@/components/header"
import { Container, Heading, Text } from "@chakra-ui/react"

export default function Home() {
  const router = useRouter()

  return (
    <Container maxW="110ch">
      <Header title="" />
      <Heading size="4xl">404 - Page not found</Heading>
      <br />
      <Heading>Sorry, but the page you are looking for was not found</Heading>
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
        Maybe a dog ate the contents of this page, just like my homework. Nobody
        ever believes me, but I guess it could be because I don't have a dog
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
