import Header from "@/components/header"
import React, { useEffect } from "react"
import Link from "next/link"
import { Container, Heading, Text } from "@chakra-ui/react"
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks"
import {
  Application,
  apply,
  ExtraData,
  setExtraData,
} from "@/utils/redux/parts/user"
import { AppliedUser, ChairApplication, Delegation } from "@prisma/client"

export default function ApplyIndex() {
  const { application } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const run = async () => {
      const req = await fetch("/api/user/application")
      if (req.status !== 200) return
      const json = await req.json()
      const data = json.data as Application
      dispatch(apply(data))

      const extraQuery = await fetch("/api/user/application/delegation")
      if (extraQuery.status !== 200) return
      const extraJson = (await extraQuery.json()) as ExtraData
      dispatch(setExtraData(extraJson))
    }
    run()
  }, [])

  if (!application)
    return (
      <Container maxW="110ch">
        <Header title="APPLICATIONS" />

        <Heading>DELEGATE APPLICATIONS</Heading>
        {/* some basic info here */}
        {/* <Link href="/user/apply/delegate">Apply to be a delegate here</Link> */}
        <p>Delegate applications are currently closed</p>

        <br />
        <br />

        <Heading>CHAIR APPLICATIONS</Heading>
        {/* some basic info here */}
        {/* <Link href="/user/apply/chair">Apply to be a chair here</Link> */}
        <p>Chair applications are currently closed</p>

        <br />
        <br />

        <Heading>DELEGATION LEADER APPLICATIONS</Heading>
        {/* some basic info here */}
        {/* <Link href="/user/apply/delegation">
          Apply to be a delegation leader here
        </Link> */}
        <p>Delegation applications are currently closed</p>
      </Container>
    )

  if (application.type === "delegation") {
    return (
      <Container maxW="110ch">
        <Header title="APPLICATIONS" />

        <Text>
          You are a leader of the {application.application.name} delegation
        </Text>
      </Container>
    )
  }

  return (
    <Container maxW="110ch">
      <Header title="APPLICATIONS" />

      <Text>
        You have already submitted a {application.type} application. Please
        check your email inbox for updates on your application.
      </Text>

      <br />

      <Text>
        Your application however has{" "}
        {application.application.finalCommittee ? "accepted" : "pending"}
      </Text>
    </Container>
  )
}
