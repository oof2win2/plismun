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

function ApplyIndex() {
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
        <Heading>DELEGATE APPLICATIONS</Heading>
        {/* some basic info here */}
        <Link href="/user/apply/delegate">Apply to be a delegate here</Link>
        {/* <Text>Delegate applications are currently closed</Text> */}

        <br />
        <br />

        <Heading>CHAIR APPLICATIONS</Heading>
        {/* some basic info here */}
        {/* <Link href="/user/apply/chair">Apply to be a chair here</Link> */}
        <Text>Chair applications have been closed</Text>

        <br />
        <br />

        <Heading>DELEGATION LEADER APPLICATIONS</Heading>
        {/* some basic info here */}
        <Link href="/user/apply/delegation">
          Apply to be a delegation leader here
        </Link>
        {/* <Text>Delegation leader applications are currently closed</Text> */}
      </Container>
    )

  if (application.type === "delegation") {
    return (
      <Container maxW="110ch">
        <Text>
          You are a leader of the {application.application.name} delegation
        </Text>
      </Container>
    )
  }

  return (
    <Container maxW="110ch">
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

ApplyIndex.pageName = "APPLICATIONS"
export default ApplyIndex
