import Header from "@/components/header"
import React, { useEffect } from "react"
import Link from "next/link"
import { Container, Heading, Text } from "@chakra-ui/react"
import { useAppSelector } from "@/utils/redux/hooks"
import { useDispatch } from "react-redux"
import { apply } from "@/utils/redux/parts/user"

export default function ApplyIndex() {
  const { application } = useAppSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    const run = async () => {
      const req = await fetch("/api/user/application")
      if (req.status !== 200) return
      const json = await req.json()
      const { data } = json
      dispatch(
        apply({
          application: data.application,
          type: data.applicationType,
        })
      )
    }
    if (!application) run()
  }, [])

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

      <Text>
        You have already submitted a {application.type} application. Please
        check your email inbox for updates on your application
      </Text>
    </Container>
  )
}
