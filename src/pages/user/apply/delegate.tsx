import React, { useReducer } from "react"
import Header from "@/components/header"
import { useAppSelector } from "@/utils/redux/hooks"
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
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react"
import { Select, OptionBase } from "chakra-react-select"
import { DelegateApply } from "@/utils/validators"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Committee, CommitteeCountries, Delegation } from "@prisma/client"
import { GetStaticPropsResult } from "next"
import { db } from "@/utils/db"

interface DelegateAppProps {
  committees: Committee[]
  countries: CommitteeCountries[]
  delegations: Delegation[]
}

interface CommitteeChoice extends OptionBase {
  label: string
  value: number
}
interface CountryChoice extends OptionBase {
  label: string
  value: string
}

export default function Signup({
  committees,
  countries,
  delegations,
}: DelegateAppProps) {
  const { user } = useAppSelector((state) => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<typeof DelegateApply._type>({
    resolver: zodResolver(DelegateApply),
    defaultValues: {
      // fill in some values
      delegationId: null,
      userId: user?.id,
    },
  })

  // we use the forceUpdate function so that after changing the values on the committee choices, they will change their disabled states
  const [_, forceUpdate] = useReducer<(x: number) => number>(
    (num) => num + 1,
    0
  )

  const applyDelegate = (form: typeof DelegateApply._type) => {}

  // stuff that is shown when the user is not logged in
  if (!user) {
    return (
      <Container maxW="110ch">
        <Header title="DELEGATE APPLICATIONS" />

        <Heading>DELEGATE APPLICATIONS</Heading>

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

  // this function checks whether a committee ID should be disabled for a selection control
  // this checks whether the other two committee IDs have this committee ID selected, if they do, it should be disabled on this one
  const checkShouldBeDisabled = (committeeId: number, choiceId: number) => {
    const otherChoiceIds = ([1, 2, 3] as const).filter((id) => id !== choiceId)
    const otherChoicesAreSame = otherChoiceIds.map((id) => {
      const selectedCommitteeId = getValues(`choice${id}committee`) as number
      return selectedCommitteeId === committeeId
    })
    if (otherChoicesAreSame.some((isSame) => isSame == true)) return true
    return false
  }

  const choice1committee =
    getValues("choice1committee") !== undefined
      ? committees.find(
          (committee) => committee.id === getValues("choice1committee")
        ) || false
      : false
  const choice2committee =
    getValues("choice2committee") !== undefined
      ? committees.find(
          (committee) => committee.id === getValues("choice2committee")
        ) || false
      : false
  const choice3committee =
    getValues("choice3committee") !== undefined
      ? committees.find(
          (committee) => committee.id === getValues("choice3committee")
        ) || false
      : false

  // stuff that is shown when the user is logged in
  return (
    <Container maxW="110ch">
      <Header title="DELEGATE APPLICATIONS" />

      <br />

      <Heading>Information for delegates</Heading>
      {/* some more specific information here */}

      <br />

      {/* application form */}
      <form onSubmit={handleSubmit(applyDelegate)}>
        <FormControl>
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
                isInvalid={Boolean(errors.choice1committee)}
                isRequired
              >
                <FormLabel>Committee Choice 1</FormLabel>
                <Select<CommitteeChoice, false>
                  options={committees.map((committee) => ({
                    label: committee.displayname,
                    value: committee.id,
                    isDisabled: checkShouldBeDisabled(committee.id, 1),
                  }))}
                  placeholder="Select a committee"
                  closeMenuOnSelect
                  selectedOptionColor="green"
                  onChange={(option) => {
                    setValue("choice1committee", option?.value ?? -1)
                    forceUpdate()
                  }}
                  isInvalid={Boolean(errors.choice1committee)}
                />
                {errors.choice1committee ? (
                  <FormErrorMessage>
                    {errors.choice1committee.message}
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>
                    Select your first committee choice
                  </FormHelperText>
                )}
              </FormControl>
            </GridItem>

            <GridItem rowSpan={1} colSpan={2}>
              <FormControl
                isInvalid={Boolean(errors.choice2committee)}
                isRequired
              >
                <FormLabel>Committee Choice 2</FormLabel>
                <Select<CommitteeChoice, false>
                  options={committees.map((committee) => ({
                    label: committee.displayname,
                    value: committee.id,
                    isDisabled: checkShouldBeDisabled(committee.id, 2),
                  }))}
                  placeholder="Select a committee"
                  closeMenuOnSelect
                  selectedOptionColor="green"
                  onChange={(option) => {
                    setValue("choice2committee", option?.value ?? -1)
                    forceUpdate()
                  }}
                  isInvalid={Boolean(errors.choice2committee)}
                />
                {errors.choice2committee ? (
                  <FormErrorMessage>
                    {errors.choice2committee.message}
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>
                    Select your second committee choice
                  </FormHelperText>
                )}
              </FormControl>
            </GridItem>

            <GridItem rowSpan={1} colSpan={2}>
              <FormControl
                isInvalid={Boolean(errors.choice3committee)}
                isRequired
              >
                <FormLabel>Committee Choice 3</FormLabel>
                <Select<CommitteeChoice, false>
                  options={committees.map((committee) => ({
                    label: committee.displayname,
                    value: committee.id,
                    isDisabled: checkShouldBeDisabled(committee.id, 3),
                  }))}
                  placeholder="Select a committee"
                  closeMenuOnSelect
                  selectedOptionColor="green"
                  onChange={(option) => {
                    setValue("choice3committee", option?.value ?? -1)
                    forceUpdate()
                  }}
                  isInvalid={Boolean(errors.choice3committee)}
                />
                {errors.choice3committee ? (
                  <FormErrorMessage>
                    {errors.choice3committee.message}
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>
                    Select your third committee choice
                  </FormHelperText>
                )}
              </FormControl>
            </GridItem>

            {/* country choices */}

            <GridItem rowSpan={1} colSpan={2}>
              <FormControl
                isInvalid={Boolean(errors.choice1country)}
                isRequired
              >
                <FormLabel>Country Choice 1</FormLabel>
                <Select<CountryChoice, false>
                  // filter to only include countries in the specific committee that is selected for the choice
                  options={countries
                    .filter(
                      (country) =>
                        country.committeeId ===
                        Number(getValues("choice1committee"))
                    )
                    .map((country) => ({
                      label: country.country,
                      value: country.country,
                    }))}
                  isDisabled={getValues("choice1committee") === undefined}
                  onChange={(option) =>
                    setValue("choice1country", option?.value ?? "")
                  }
                  isInvalid={Boolean(errors.choice1country)}
                />
                {errors.choice1country ? (
                  <FormErrorMessage>
                    {errors.choice1country.message}
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>
                    Select a country that you want to delegate as in the{" "}
                    {choice1committee ? choice1committee.displayname : "3rd"}{" "}
                    committee
                  </FormHelperText>
                )}
              </FormControl>
            </GridItem>

            <GridItem rowSpan={1} colSpan={2}>
              <FormControl
                isInvalid={Boolean(errors.choice2country)}
                isRequired
              >
                <FormLabel>Country Choice 2</FormLabel>
                <Select<CountryChoice, false>
                  // filter to only include countries in the specific committee that is selected for the choice
                  options={countries
                    .filter(
                      (country) =>
                        country.committeeId ===
                        Number(getValues("choice2committee"))
                    )
                    .map((country) => ({
                      label: country.country,
                      value: country.country,
                    }))}
                  isDisabled={getValues("choice2committee") === undefined}
                  onChange={(option) =>
                    setValue("choice2country", option?.value ?? "")
                  }
                  isInvalid={Boolean(errors.choice2country)}
                />
                {errors.choice2country ? (
                  <FormErrorMessage>
                    {errors.choice2country.message}
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>
                    Select a country that you want to delegate as in the{" "}
                    {choice2committee ? choice2committee.displayname : "3rd"}{" "}
                    committee
                  </FormHelperText>
                )}
              </FormControl>
            </GridItem>

            <GridItem rowSpan={1} colSpan={2}>
              <FormControl
                isInvalid={Boolean(errors.choice3country)}
                isRequired
              >
                <FormLabel>Country Choice 3</FormLabel>
                <Select<CountryChoice, false>
                  // filter to only include countries in the specific committee that is selected for the choice
                  options={countries
                    .filter(
                      (country) =>
                        country.committeeId ===
                        Number(getValues("choice3committee"))
                    )
                    .map((country) => ({
                      label: country.country,
                      value: country.country,
                    }))}
                  isDisabled={getValues("choice3committee") === undefined}
                  onChange={(option) =>
                    setValue("choice3country", option?.value ?? "")
                  }
                  isInvalid={Boolean(errors.choice3country)}
                />
                {errors.choice3country ? (
                  <FormErrorMessage>
                    {errors.choice3country.message}
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>
                    Select a country that you want to delegate as in the{" "}
                    {choice3committee ? choice3committee.displayname : "3rd"}{" "}
                    committee
                  </FormHelperText>
                )}
              </FormControl>
            </GridItem>
          </Grid>

          <Divider />

          <br />

          <FormControl isInvalid={Boolean(errors.delegationId)}>
            <FormLabel>Delegation</FormLabel>
            <Select<CommitteeChoice, false>
              options={delegations.map((delegation) => ({
                label: delegation.name,
                value: delegation.delegationId,
              }))}
              placeholder="Select a delegation"
              onChange={(option) =>
                setValue("delegationId", option?.value ?? null)
              }
              isInvalid={Boolean(errors.delegationId)}
            />

            {errors.delegationId ? (
              <FormErrorMessage>
                {errors.delegationId?.message}
              </FormErrorMessage>
            ) : (
              <FormHelperText>
                Select a delegation that you are part of if you are part of one.
                This is something that your club leader or teacher would have
                told you about. Don't worry about it if you are not partaking in
                PLISMUN as a club member or as a part of a school
              </FormHelperText>
            )}
          </FormControl>

          <br />

          <FormControl isInvalid={Boolean(errors.motivation)} isRequired>
            <FormLabel>Motivation</FormLabel>
            <Textarea
              {...register("motivation")}
              isInvalid={Boolean(errors.motivation)}
            />
            {errors.motivation ? (
              <FormErrorMessage>{errors.motivation?.message}</FormErrorMessage>
            ) : (
              <FormHelperText>
                Fill in some motivation about why you would like to attend
                PLISMUN as a delegate here (approx. 400 words)
              </FormHelperText>
            )}
          </FormControl>

          <br />

          <FormControl isInvalid={Boolean(errors.experience)} isRequired>
            <FormLabel>Experience</FormLabel>
            <Textarea
              {...register("experience")}
              isInvalid={Boolean(errors.experience)}
            />
            {errors.experience ? (
              <FormErrorMessage>{errors.experience?.message}</FormErrorMessage>
            ) : (
              <FormHelperText>
                Fill in some experience about your past experiences with
                PLISMUN, other MUN conferences, or other related work here
                (approx. 400 words)
              </FormHelperText>
            )}
          </FormControl>

          <Center>
            <Button type="submit">Submit application</Button>
          </Center>
        </FormControl>
      </form>
    </Container>
  )
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<DelegateAppProps>
> {
  const committees = await db.committee.findMany()
  const countries = await db.committeeCountries.findMany()
  const delegations = await db.delegation.findMany()

  return {
    props: {
      committees,
      countries,
      delegations,
    },

    // re-generate the page's data at most every 24h (60s*60m*24h)
    // re-generates ONLY if a request comes in, it doesn't re-generate the page if no requests come in
    revalidate: 60 * 60 * 24,
  }
}
