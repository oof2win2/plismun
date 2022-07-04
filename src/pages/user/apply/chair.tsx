import React, { useCallback, useEffect, useReducer, useState } from "react"
import Header from "@/components/header"
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks"
import {
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Thead,
  Table,
  TableCaption,
  TableContainer,
  Text,
  Textarea,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Input,
} from "@chakra-ui/react"
import { Select, OptionBase } from "chakra-react-select"
import {
  ChairApply,
  DietaryOptions,
  refineChairApply,
} from "@/utils/validators"
import { useFormik } from "formik"
import Link from "next/link"
import { Committee, Delegation } from "@prisma/client"
import { GetStaticPropsResult } from "next"
import { db } from "@/utils/db"
import { useDebouncedCallback } from "use-debounce"
import { zodErrorToFormik } from "@/utils/utils"
import {
  Application,
  apply,
  ExtraData,
  setExtraData,
} from "@/utils/redux/parts/user"

interface ChairAppProps {
  committees: Committee[]
  delegations: Delegation[]
}

interface CommitteeChoice extends OptionBase {
  label: string
  value: number
}
export default function Signup({ committees, delegations }: ChairAppProps) {
  const userData = useAppSelector((state) => state.user)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean | null>(null)

  const dispatch = useAppDispatch()
  useEffect(() => {
    const run = async () => {
      const req = await fetch("/api/user/application")
      if (req.status !== 200) return
      const json = await req.json()
      const data = json.data as Application
      dispatch(apply(data))

      const extraQuery = await fetch("/api/user/application/extra")
      if (extraQuery.status !== 200) return
      const extraJson = (await extraQuery.json()) as ExtraData
      dispatch(setExtraData(extraJson))
    }
    run()
  }, [])

  const submitApplication = async (form: ChairApply) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const result = await fetch("/api/user/application/chair", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      setLoading(false)

      if (result.status === 201) {
        setSuccess(true)
      } else {
        setError("An unknown error occured")
      }
      return
    } catch (err) {
      setError(err as string)
      setSuccess(false)
      setLoading(false)
    }
  }

  const { setFieldValue, values, handleSubmit, errors } = useFormik<ChairApply>(
    {
      initialValues: {
        userId: userData.user?.id ?? -1,
        motivation: "",
        experience: "",
        delegationId: null,
        choice1committee: -1,
        choice2committee: -1,
        choice3committee: -1,
        shirtSize: null,
        diet: "None",
        phone: "",
      },
      onSubmit: submitApplication,
      validate: async (values) => {
        // this function should return errors it finds
        const results = await ChairApply.superRefine(
          refineChairApply({ committees })
        ).safeParseAsync(values)

        return zodErrorToFormik(results)
      },
    }
  )

  // we have this debounced change handler so that the motivation+experience don't get changed on each keystroke, but only after the user stopped typing for 500ms
  const debouncedHandleChange = useDebouncedCallback(
    (field: string, value: any) => setFieldValue(field, value),
    500
  )
  // stuff that is shown when the user is not logged in
  if (!userData.user) {
    return (
      <Container maxW="110ch">
        <Header title="CHAIR APPLICATIONS" />

        <Heading>CHAIR APPLICATIONS</Heading>

        <br />
        <Text>
          You are not logged in to your PLISMUN account, therefore you cannot
          apply
        </Text>
        <Text>
          You can log in to your existing account{" "}
          <Link href="/user/login">here</Link>, or you can create a new account{" "}
          <Link href="/user/signup">here</Link>
        </Text>
      </Container>
    )
  }

  if (userData.application && !userData.extraData) {
    return (
      <Container maxW="110ch">
        <Header title="CHAIR APPLICATIONS" />

        <Heading>CHAIR APPLICATIONS</Heading>

        <br />
        <Text>
          An error occured whilst fetching information about your application
        </Text>
        <Text>
          You can go back to the main page
          <Link href="/">here</Link>
        </Text>
      </Container>
    )
  }

  if (userData.application && userData.application.type !== "chair") {
    return (
      <Container maxW="110ch">
        <Header title="CHAIR APPLICATIONS" />

        <Heading>CHAIR APPLICATIONS</Heading>

        <br />
        <Text>
          You do not have a valid chair application. Please go back to the
          applications homepage
        </Text>
        <Text>
          You can go back to the main page
          <Link href="/">here</Link>
        </Text>
      </Container>
    )
  }

  if (
    userData.application &&
    userData.extraData?.status === "accepted" &&
    userData.application.application.finalCommittee !== null
  ) {
    const extraData = userData.extraData
    const firstChair = extraData.chairs[0]
      ? extraData.users.find((user) => user.id === extraData.chairs[0].userId)!
      : null
    const secondChair = extraData.chairs[1]
      ? extraData.users.find((user) => user.id === extraData.chairs[1].userId)!
      : null
    return (
      <Container maxW="110ch">
        <Header title="CHAIR APPLICATIONS" />

        <Heading>CHAIR APPLICATIONS</Heading>

        <br />
        <Text>
          Application status: Accepted Final committee:{" "}
          {userData.application.application.finalCommittee}
        </Text>
        <br />

        <Center>
          <Flex direction="row">
            <Center>
              <Text>Chair 1</Text>
              {firstChair ? (
                <>
                  <Text>
                    {firstChair.firstname} {firstChair.lastname}
                  </Text>
                  <Text>{firstChair.email}</Text>
                </>
              ) : (
                <Text>No chair determined yet</Text>
              )}
            </Center>
            <Center>
              <Text>Chair 2</Text>
              {secondChair ? (
                <>
                  <Text>
                    {secondChair.firstname} {secondChair.lastname}
                  </Text>
                  <Text>{secondChair.email}</Text>
                </>
              ) : (
                <Text>No chair determined yet</Text>
              )}
            </Center>
          </Flex>
        </Center>

        <TableContainer>
          <Table>
            <TableCaption>Committee members</TableCaption>
            <Thead>
              <Tr>
                <Th>Country</Th>
                <Th>Name</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {extraData.allCommitteeMembers.map((application) => {
                const user = extraData.users.find(
                  (user) => user.id === application.userId
                )!
                return (
                  <Tr key={user.id}>
                    <Td>{application.finalCountry}</Td>
                    <Td>
                      {user.firstname} {user.lastname}
                    </Td>
                    <Td>{user.email}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    )
  }

  // this function checks whether a committee ID should be disabled for a selection control
  // this checks whether the other two committee IDs have this committee ID selected, if they do, it should be disabled on this one
  const checkShouldBeDisabled = (committeeId: number, choiceId: number) => {
    const otherChoiceIds = ([1, 2, 3] as const).filter((id) => id !== choiceId)
    const otherChoicesAreSame = otherChoiceIds.map((id) => {
      const selectedCommitteeId = values[`choice${id}committee`]
      return selectedCommitteeId === committeeId
    })
    if (otherChoicesAreSame.some((isSame) => isSame == true)) return true
    return false
  }

  // stuff that is shown when the user is logged in
  return (
    <Container maxW="110ch">
      <Header title="CHAIR APPLICATIONS" />

      <br />

      <Heading>Information for chairs</Heading>
      {/* some more specific information here */}

      <br />

      {loading && <Heading>Loading...</Heading>}
      {error && <Heading>{error}</Heading>}
      {success && (
        <>
          <Heading>You have successfully applied to be a chair</Heading>
          <br />
          <Text>
            Go back <Link href="/">home</Link>
          </Text>
        </>
      )}

      {/* application form */}
      {!success && (
        <form onSubmit={handleSubmit}>
          {/* committee choices */}
          <Grid
            width="100%"
            templateRows="repeat(2, 0.1fr)"
            templateColumns="repeat(6, 1fr)"
            gap={4}
            style={{ paddingBottom: "2rem" }}
          >
            {/* committee choices */}
            <GridItem rowSpan={1} colSpan={2}>
              <FormControl
                variant="floating"
                isInvalid={Boolean(errors.choice1committee)}
                isRequired
              >
                <Select<CommitteeChoice, false>
                  options={committees.map((committee) => ({
                    label: committee.displayname,
                    value: committee.id,
                    isDisabled: checkShouldBeDisabled(committee.id, 1),
                  }))}
                  placeholder=" "
                  closeMenuOnSelect
                  selectedOptionColor="green"
                  onChange={(option) =>
                    setFieldValue("choice1committee", option?.value ?? -1)
                  }
                  isInvalid={Boolean(errors.choice1committee)}
                />
                <FormLabel>Committee Choice 1</FormLabel>
                <FormErrorMessage>{errors.choice1committee}</FormErrorMessage>
                <FormHelperText>
                  Select your first committee choice
                </FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem rowSpan={1} colSpan={2}>
              <FormControl
                variant="floating"
                isInvalid={Boolean(errors.choice2committee)}
                isRequired
              >
                <Select<CommitteeChoice, false>
                  options={committees.map((committee) => ({
                    label: committee.displayname,
                    value: committee.id,
                    isDisabled: checkShouldBeDisabled(committee.id, 2),
                  }))}
                  placeholder=" "
                  closeMenuOnSelect
                  selectedOptionColor="green"
                  onChange={(option) =>
                    setFieldValue("choice2committee", option?.value ?? -1)
                  }
                  isInvalid={Boolean(errors.choice2committee)}
                />
                <FormLabel>Committee Choice 2</FormLabel>
                <FormErrorMessage>{errors.choice2committee}</FormErrorMessage>
                <FormHelperText>
                  Select your second committee choice
                </FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem rowSpan={1} colSpan={2}>
              <FormControl
                variant="floating"
                isInvalid={Boolean(errors.choice3committee)}
                isRequired
              >
                <Select<CommitteeChoice, false>
                  options={committees.map((committee) => ({
                    label: committee.displayname,
                    value: committee.id,
                    isDisabled: checkShouldBeDisabled(committee.id, 3),
                  }))}
                  placeholder=" "
                  closeMenuOnSelect
                  selectedOptionColor="green"
                  onChange={(option) =>
                    setFieldValue("choice3committee", option?.value ?? -1)
                  }
                  isInvalid={Boolean(errors.choice3committee)}
                />
                <FormLabel>Committee Choice 3</FormLabel>
                <FormErrorMessage>{errors.choice3committee}</FormErrorMessage>
                <FormHelperText>
                  Select your third committee choice
                </FormHelperText>
              </FormControl>
            </GridItem>

            <Divider />

            <br />

            {/* delegation choice */}
            <GridItem rowSpan={1} colSpan={6}>
              <FormControl
                variant="floating"
                isInvalid={Boolean(errors.delegationId)}
                isRequired
              >
                <Select<CommitteeChoice, false>
                  options={[
                    {
                      name: "None",
                      delegationId: -1,
                    },
                    ...delegations,
                  ].map((delegation) => ({
                    label: delegation.name,
                    value: delegation.delegationId,
                  }))}
                  placeholder=" "
                  onChange={(option) =>
                    setFieldValue("delegationId", option?.value ?? null)
                  }
                  defaultValue={{
                    label: "None",
                    value: -1,
                  }}
                  isInvalid={Boolean(errors.delegationId)}
                />
                <FormLabel>Select a delegation</FormLabel>

                <FormErrorMessage>{errors.delegationId}</FormErrorMessage>
                <FormHelperText>
                  Select a delegation that you are part of if you are part of
                  one. This is something that your club leader or teacher would
                  have told you about. Don't worry about it if you are not
                  partaking in PLISMUN as a club member or as a part of a school
                </FormHelperText>
              </FormControl>
            </GridItem>

            {/* motivation */}
            <GridItem rowSpan={2} colSpan={6}>
              <FormControl
                variant="floating"
                isInvalid={Boolean(errors.motivation)}
                isRequired
              >
                <Textarea
                  // onChange={(e) => setMotivation(e.target.value)}
                  onChange={(e) =>
                    debouncedHandleChange("motivation", e.target.value)
                  }
                  placeholder=" "
                  isInvalid={Boolean(errors.motivation)}
                  height="20em"
                />
                <FormLabel>Motivation</FormLabel>
                <FormErrorMessage>{errors.motivation}</FormErrorMessage>
                <FormHelperText>
                  Fill in some motivation about why you would like to attend
                  PLISMUN as a delegate here (approx. 400 words)
                </FormHelperText>
              </FormControl>
            </GridItem>

            {/* experience */}
            <GridItem rowSpan={2} colSpan={6}>
              <FormControl
                variant="floating"
                isInvalid={Boolean(errors.experience)}
                isRequired
              >
                <Textarea
                  onChange={(e) =>
                    debouncedHandleChange("experience", e.target.value)
                  }
                  placeholder=" "
                  isInvalid={Boolean(errors.experience)}
                  height="20em"
                />
                <FormLabel>Experience</FormLabel>
                <FormErrorMessage>{errors.experience}</FormErrorMessage>
                <FormHelperText>
                  Fill in some experience about your past experiences with
                  PLISMUN, other MUN conferences, or other related work here
                  (approx. 400 words)
                </FormHelperText>
              </FormControl>
            </GridItem>

            {/* shirt size / none */}
            <GridItem rowSpan={1} colSpan={2}>
              <FormControl
                variant="floating"
                isInvalid={Boolean(errors.shirtSize)}
                isRequired
              >
                <Select<
                  { value: string | null; label: string } & OptionBase,
                  false
                >
                  options={[
                    {
                      label: "None",
                      value: null,
                    },
                    {
                      value: "XS",
                      label: "XS",
                    },
                    {
                      value: "S",
                      label: "S",
                    },
                    {
                      value: "M",
                      label: "M",
                    },
                    {
                      value: "L",
                      label: "L",
                    },
                    {
                      value: "XL",
                      label: "XL",
                    },
                    {
                      value: "XXL",
                      label: "XXL",
                    },
                  ]}
                  placeholder=" "
                  onChange={(option) =>
                    setFieldValue("shirtSize", option?.value ?? null)
                  }
                  defaultValue={{
                    label: "None",
                    value: null,
                  }}
                />
                <FormLabel>Shirt Size</FormLabel>
                <FormErrorMessage>{errors.shirtSize}</FormErrorMessage>
                <FormHelperText>
                  Select a shirt size or none if you don't want one
                </FormHelperText>
              </FormControl>
            </GridItem>

            {/* phone number */}
            <GridItem rowSpan={1} colSpan={2}>
              <FormControl
                variant="floating"
                isInvalid={Boolean(errors.phone)}
                isRequired
              >
                <Input
                  onChange={(e) =>
                    debouncedHandleChange("phone", e.target.value)
                  }
                  placeholder=" "
                  isInvalid={Boolean(errors.phone)}
                />
                <FormLabel>Phone number</FormLabel>
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
                <FormHelperText>Please put in your phone number</FormHelperText>
              </FormControl>
            </GridItem>

            {/* dietary choice */}
            <GridItem rowSpan={1} colSpan={2}>
              <FormControl
                variant="floating"
                isInvalid={Boolean(errors.diet)}
                isRequired
              >
                <Select<
                  { value: string | null; label: string } & OptionBase,
                  false
                >
                  options={DietaryOptions.options.map((x) => ({
                    value: x,
                    label: x,
                  }))}
                  placeholder=" "
                  defaultValue={{ value: "None", label: "None" }}
                  onChange={(option) =>
                    setFieldValue("diet", option?.value ?? null)
                  }
                />
                <FormLabel>Diet</FormLabel>
                <FormErrorMessage>{errors.diet}</FormErrorMessage>
                <FormHelperText>Select a diet that you have</FormHelperText>
              </FormControl>
            </GridItem>
          </Grid>

          <Center>
            <Button type="submit">Submit application</Button>
          </Center>
        </form>
      )}
    </Container>
  )
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<ChairAppProps>
> {
  const committees = await db.committee.findMany()
  const delegations = await db.delegation.findMany()

  return {
    props: {
      committees,
      delegations,
    },

    // re-generate the page's data at most every 24h (60s*60m*24h)
    // re-generates ONLY if a request comes in, it doesn't re-generate the page if no requests come in
    revalidate: 60 * 60 * 24,
  }
}
