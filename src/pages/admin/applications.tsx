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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Switch,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react"
import { LoginSchema, ReplyDelegateApplication } from "@/utils/validators"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type {
  AppliedUser,
  ChairApplication,
  User,
  Committee,
  CommitteeCountries,
  Delegation,
} from "@prisma/client"
import { getSessionData } from "@/utils/auth"
import { db } from "@/utils/db"
import superjson from "superjson"
import { differenceInYears, format } from "date-fns"
import { useFormik } from "formik"
import { zodErrorToFormik } from "@/utils/utils"
import { OptionBase, Select } from "chakra-react-select"

type DatabaseProps =
  | {
      authorized: true
      delegates: AppliedUser[]
      // chairs: ChairApplication[]
      users: User[]
      countries: CommitteeCountries[]
      committees: Committee[]
      delegations: Delegation[]
    }
  | {
      authorized: false
    }

const getDifficulty = (obj: { difficulty: string }): "B" | "I" | "A" => {
  switch (obj.difficulty) {
    case "beginner":
      return "B"
    case "intermediate":
      return "I"
    case "advanced":
      return "A"
    default:
      return "B"
  }
}

interface CommitteeChoice extends OptionBase {
  label: string
  value: number
}
interface CountryChoice extends OptionBase {
  label: string
  value: string
}

// TODO: pass in these props so that it can correctly use the data
const DelegateApplication = (props: {
  delegate: AppliedUser
  user: User
  countries: CommitteeCountries[]
  committees: Committee[]
  delegation: Delegation | null
  removeApplication: (delegateId: number) => void
}) => {
  const {
    delegate,
    user,
    countries,
    committees,
    delegation,
    removeApplication,
  } = props

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // get committees and countries for this user's application
  const [com1, com2, com3] = [
    delegate.choice1committee,
    delegate.choice2committee,
    delegate.choice3committee,
  ].map((id) => committees.find((c) => c.id === id)!)
  const [cou1, cou2, cou3] = [
    delegate.choice1country,
    delegate.choice2country,
    delegate.choice3country,
  ].map((name) => countries.find((c) => c.country === name)!)

  const submitResponse = async (form: ReplyDelegateApplication) => {
    setError(null)
    setLoading(true)
    setSuccess(false)

    try {
      const response = await fetch("/api/admin/applications/delegate", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
      if (response.status !== 200) throw await response.json()
      setSuccess(true)
      setError(null)
      setTimeout(() => {
        removeApplication(delegate.delegateId)
      }, 3000)
    } catch (error) {
      // @ts-expect-error
      setError(error.toString() as string)
      setSuccess(false)
    }

    setLoading(false)
  }

  const { setFieldValue, errors, values, submitForm, handleChange } =
    useFormik<ReplyDelegateApplication>({
      initialValues: {
        userId: user.id,
        success: false,
        finalCommittee: null,
        finalCountry: null,
      },
      onSubmit: submitResponse,
      validate: (form) => {
        const results = ReplyDelegateApplication.safeParse(form)

        return zodErrorToFormik(results)
      },
    })

  const userAge = differenceInYears(new Date(), new Date(user.birthdate))

  if (success) {
    return (
      <Box width="65vw" padding="1em" border="2px solid" borderRadius="10px">
        <Heading>Success replying to delegate application</Heading>
      </Box>
    )
  }

  return (
    <Box width="65vw" padding="1em" border="2px solid" borderRadius="10px">
      {loading && <Heading>Loading...</Heading>}
      {error && <Heading>{error}</Heading>}

      {/* information about the user, their committee choices */}
      <Grid
        templateRows="repeat(1, 0.1fr)"
        templateColumns="repeat(3, 2fr)"
        marginBottom="1.5em"
      >
        <GridItem>First name: {user.firstname}</GridItem>
        <GridItem>Last name: {user.lastname}</GridItem>
        <GridItem>School: {delegate.school || "None"}</GridItem>
        <GridItem>Delegation: {delegation?.name || "None"}</GridItem>
        <GridItem>
          Birthdate: {format(user.birthdate, "PP")} ({userAge} years old)
        </GridItem>
        <GridItem>Nationality: {user.nationality}</GridItem>

        <GridItem colSpan={3} my="1.5em">
          <Divider />
        </GridItem>

        <GridItem>
          Committee 1: {com1.displayname} ({getDifficulty(com1)})
        </GridItem>
        <GridItem>
          Committee 2: {com2.displayname} ({getDifficulty(com2)})
        </GridItem>
        <GridItem>
          Committee 3: {com3.displayname} ({getDifficulty(com3)})
        </GridItem>
        <GridItem>
          Country 1: {delegate.choice1country} ({getDifficulty(cou1)})
        </GridItem>
        <GridItem>
          Country 2: {delegate.choice2country} ({getDifficulty(cou2)})
        </GridItem>
        <GridItem>
          Country 3: {delegate.choice3country} ({getDifficulty(cou3)})
        </GridItem>
      </Grid>

      {/* experience and motivation */}
      <Accordion allowToggle allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <AccordionIcon />
            <Heading size="md">Experience</Heading>
          </AccordionButton>
          <AccordionPanel>
            <Text>{delegate.experience}</Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <AccordionIcon />
            <Heading size="md">Motivation</Heading>
          </AccordionButton>
          <AccordionPanel>
            <Text>{delegate.motivation}</Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <br />

      {/* accept or reject user buttons */}
      <Center>
        <VStack>
          <FormControl display="flex">
            <FormLabel marginRight="1em">Deny</FormLabel>
            <Switch
              onChange={(e) => setFieldValue("success", e.target.checked)}
            />
            <FormLabel marginLeft="1em">Accept</FormLabel>
          </FormControl>
          <Box>
            {values.success && (
              <>
                <FormControl
                  variant="floating"
                  isInvalid={Boolean(errors?.finalCommittee)}
                  isRequired
                  width="24em"
                >
                  <Select<CommitteeChoice, false>
                    options={committees.map((committee) => ({
                      label: committee.displayname,
                      value: committee.id,
                    }))}
                    placeholder=" "
                    closeMenuOnSelect
                    selectedOptionColor="green"
                    onChange={(option) =>
                      setFieldValue("finalCommittee", option?.value ?? -1)
                    }
                    isInvalid={Boolean(errors.finalCommittee)}
                  />
                  <FormLabel>Select a final committee</FormLabel>
                  <FormErrorMessage>{errors.finalCommittee}</FormErrorMessage>
                </FormControl>
                <FormControl
                  variant="floating"
                  isInvalid={Boolean(errors.finalCommittee)}
                  isRequired
                  width="24em"
                >
                  <Select<CountryChoice, false>
                    options={countries
                      .filter((c) => c.committeeId === values.finalCommittee)
                      .map((country) => ({
                        label: country.country,
                        value: country.country,
                      }))}
                    placeholder=" "
                    closeMenuOnSelect
                    selectedOptionColor="green"
                    onChange={(option) =>
                      setFieldValue("finalCountry", option?.value ?? -1)
                    }
                    isInvalid={Boolean(errors.finalCountry)}
                  />
                  <FormLabel>Select a final country</FormLabel>
                  <FormErrorMessage>{errors.finalCountry}</FormErrorMessage>
                </FormControl>
              </>
            )}
            <Button onClick={submitForm}>Submit</Button>
          </Box>
        </VStack>
      </Center>
    </Box>
  )
}

function Applications({ stringified }: { stringified: string }) {
  const props: DatabaseProps = superjson.parse(stringified)

  if (!props.authorized) {
    return (
      <Container maxW="110ch">
        <Heading>You are not authorized to view this page</Heading>
        <Text>
          If you believe that this is an error, please contact us at{" "}
          <Link href="/contact">the contact page</Link>
        </Text>
      </Container>
    )
  }

  const removeApplication = (delegateId: number) => {
    props.delegates = props.delegates.filter(
      (application) => application.delegateId !== delegateId
    )
  }

  return (
    <Container maxW="110ch">
      {props.authorized && (
        <>
          <Text>
            The B, I, or A labels below next to committees and countries mean
            Beginner, Intermediate, or Advanced. Please take that into
            consideration
          </Text>

          <br />

          <VStack spacing="4em">
            {props.delegates.map((delegate) => {
              const user = props.users.find((u) => u.id === delegate.userId)!
              const delegation = props.delegations.find(
                (d) => d.delegationId === delegate.delegationId
              )
              return (
                <DelegateApplication
                  delegate={delegate}
                  user={user}
                  countries={props.countries}
                  committees={props.committees}
                  delegation={delegation ?? null}
                  key={delegate.delegateId}
                  removeApplication={removeApplication}
                />
              )
            })}
          </VStack>
        </>
      )}
    </Container>
  )
}

Applications.pageName = "APPLICATIONS"
export default Applications

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

  // get delegates and chairs that have not yet been approved
  const delegates = await db.appliedUser.findMany({
    where: {
      finalCountry: null,
      finalCommittee: null,
      denied: false,
    },
  })
  // const chairs = await db.chairApplication.findMany({
  //   where: {
  //     finalCommittee: null,
  //   },
  // })

  const appliedUserIDs = new Set([
    ...delegates.map((d) => d.userId),
    // ...chairs.map((c) => c.userId),
  ])
  // get user objects for each applied user
  const appliedUsers = await db.user.findMany({
    where: {
      id: {
        in: [...appliedUserIDs],
      },
    },
  })

  // get data that is used both for displaying stuff and assigning new stuff
  const committees = await db.committee.findMany()
  const countries = await db.committeeCountries.findMany()

  // get all delegations that people are in
  const allDelegationIDs = new Set([
    ...delegates
      .map((d) => d.delegationId)
      .filter((id): id is number => id !== null),
    // ...chairs
    //   .map((c) => c.delegationId)
    //   .filter((id): id is number => id !== null),
  ])
  const delegations = await db.delegation.findMany({
    where: {
      delegationId: {
        in: [...allDelegationIDs],
      },
    },
  })

  const props: DatabaseProps = {
    authorized: true,
    delegates,
    // chairs: [],
    users: appliedUsers,
    committees,
    countries,
    delegations,
  }

  return {
    props: {
      stringified: superjson.stringify(props),
    },
  }
}
