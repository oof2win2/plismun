import Header from "@/components/header"
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks"
import { login } from "@/utils/redux/parts/user"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { GetServerSideProps, GetServerSidePropsResult } from "next"
import {
  Center,
  Container,
  FormControl,
  Heading,
  Text,
  Grid,
  GridItem,
  Input,
  Button,
  FormLabel,
  FormHelperText,
  Flex,
  Box,
  VStack,
  Divider,
} from "@chakra-ui/react"
import { LoginSchema } from "@/utils/validators"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type {
  AppliedUser,
  ChairApplication,
  User,
  Committee,
  CommitteeCountries,
} from "@prisma/client"
import { getSessionData } from "@/utils/auth"
import { db } from "@/utils/db"
import superjson from "superjson"

type DatabaseProps =
  | {
      authorized: true
      delegates: AppliedUser[]
      chairs: ChairApplication[]
      users: User[]
      countries: CommitteeCountries[]
      committees: Committee[]
    }
  | {
      authorized: false
    }

// TODO: pass in these props so that it can correctly use the data
const DelegateApplication = (props: {
  delegate: AppliedUser
  user: User
  countries: CommitteeCountries[]
  committees: Committee[]
}) => {
  const { delegate, user, countries, committees } = props

  const [c1, c2, c3] = [
    delegate.choice1committee,
    delegate.choice2committee,
    delegate.choice3committee,
  ].map((id) => committees.find((c) => c.id === id)!)

  return (
    <Box>
      <Grid>
        <GridItem>First name: {user.firstname}</GridItem>
        <GridItem>Last name: {user.lastname}</GridItem>
        <GridItem>Email: {user.email}</GridItem>
        <Divider />
        <GridItem>Committee 1: {c1.displayname}</GridItem>
        <GridItem>Committee 2: {c2.displayname}</GridItem>
        <GridItem>Committee 3: {c3.displayname}</GridItem>
        <GridItem>Country 1: {delegate.choice1country}</GridItem>
        <GridItem>Country 2: {delegate.choice2country}</GridItem>
        <GridItem>Country 3: {delegate.choice3country}</GridItem>
      </Grid>
    </Box>
  )
}

export default function About({ stringified }: { stringified: string }) {
  const props: DatabaseProps = superjson.parse(stringified)

  return (
    <Container maxW="110ch">
      <Header title="APPLICATIONS" />

      {!props.authorized && (
        <>
          <Heading>You are not authorized to view this page</Heading>
          <Text>
            If you believe that this is an error, please contact us at{" "}
            <Link href="/contact">the contact page</Link>
          </Text>
        </>
      )}
      {props.authorized && (
        <>
          <VStack>
            {props.delegates.map((delegate) => {
              const user = props.users.find((u) => u.id === delegate.userId)!
              return (
                <DelegateApplication
                  delegate={delegate}
                  user={user}
                  countries={props.countries}
                  committees={props.committees}
                  key={delegate.delegateId}
                />
              )
            })}
          </VStack>
        </>
      )}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<{
  stringified: string
}> = async (context) => {
  const sessionData = await getSessionData(context.req.cookies)
  // user is not logged in at all
  if (!sessionData)
    return {
      props: {
        stringified: superjson.stringify({
          authorized: false,
        }),
      },
    }

  const { user } = sessionData

  // user is not staff so doesn't have perms to view applications
  if (!user.isStaff)
    return {
      props: {
        stringified: superjson.stringify({
          authorized: false,
        }),
      },
    }

  const delegates = await db.appliedUser.findMany({
    where: {
      finalCountry: null,
      finalCommittee: null,
    },
  })
  const chairs = await db.chairApplication.findMany({
    where: {
      finalCommittee: null,
    },
  })

  const appliedUserIDs = new Set([
    ...delegates.map((d) => d.userId),
    ...chairs.map((c) => c.userId),
  ])
  const appliedUsers = await db.user.findMany({
    where: {
      id: {
        in: [...appliedUserIDs],
      },
    },
  })
  console.log(appliedUserIDs)

  const delegateCommitteeIDs = new Set(
    delegates
      .map((d) => [d.choice1committee, d.choice2committee, d.choice3committee])
      .flat()
  )
  const chairCommitteeIDs = new Set(
    chairs
      .map((c) => [c.choice1committee, c.choice2committee, c.choice3committee])
      .flat()
  )
  const delegateCountries = new Set(
    delegates
      .map((c) => [c.choice1country, c.choice2country, c.choice3country])
      .flat()
  )

  const countries = await db.committeeCountries.findMany({
    where: {
      committeeId: {
        in: [...delegateCommitteeIDs],
      },
      country: {
        in: [...delegateCountries],
      },
    },
  })
  const committees = await db.committee.findMany({
    where: {
      id: {
        in: [...delegateCommitteeIDs, ...chairCommitteeIDs],
      },
    },
  })

  const props: DatabaseProps = {
    authorized: true,
    delegates,
    chairs,
    users: appliedUsers,
    committees,
    countries,
  }

  return {
    props: {
      stringified: superjson.stringify(props),
    },
  }
}
