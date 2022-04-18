import Header from "@/components/header"
import React from "react"
import Link from "next/link"
import {
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react"

export default function Signup() {
  return (
    <Container maxW="110ch">
      <Header title="APPLICATIONS" />

      <Heading>DELEGATE APPLICATIONS</Heading>
      {/* some basic info here */}
      <Link href="/user/apply/delegate">Apply to be a delegate here</Link>
    </Container>
  )
}
