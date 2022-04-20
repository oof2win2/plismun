import Header from "@/components/header"
import React from "react"
import Link from "next/link"
import { Container, Heading } from "@chakra-ui/react"
import { useAppSelector } from "@/utils/redux/hooks"

export default function ApplyIndex() {
  const { application } = useAppSelector((state) => state.user)

  if (!application)
    return (
      <Container maxW="110ch">
        <Header title="APPLICATIONS" />

        <Heading>DELEGATE APPLICATIONS</Heading>
        {/* some basic info here */}
        <Link href="/user/apply/delegate">Apply to be a delegate here</Link>

        <br />
        <br />

        <Heading>CHAIR APPLICATIONS</Heading>
        {/* some basic info here */}
        <Link href="/user/apply/chair">Apply to be a chair here</Link>

        <br />
        <br />

        <Heading>DELEGATION LEADER APPLICATIONS</Heading>
        {/* some basic info here */}
        <Link href="/user/apply/delegation">
          Apply to be a delegation leader here
        </Link>
      </Container>
    )

  return (
    <Container maxW="110ch">
      <Header title="APPLICATIONS" />

      <p>hi</p>
    </Container>
  )
}
