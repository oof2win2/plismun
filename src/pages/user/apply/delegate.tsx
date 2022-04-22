import React, { useCallback, useEffect, useReducer, useState } from "react"
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
  Text,
  Textarea,
} from "@chakra-ui/react"
import { Select, OptionBase } from "chakra-react-select"
import { DelegateApply, refineDelegateApply } from "@/utils/validators"
import { useFormik } from "formik"
import Link from "next/link"
import { Committee, CommitteeCountries, Delegation } from "@prisma/client"
import { GetStaticPropsResult } from "next"
import { db } from "@/utils/db"
import { useDebouncedCallback } from "use-debounce"
import { zodErrorToFormik } from "@/utils/utils"

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
  const userData = useAppSelector((state) => state.user)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean | null>(null)

  const submitApplication = async (form: DelegateApply) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const result = await fetch("/api/user/application/delegate", {
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

  const { setFieldValue, values, handleSubmit, errors } =
    useFormik<DelegateApply>({
      initialValues: {
        userId: userData.user?.id ?? -1,
        motivation: "",
        experience: "",
        delegationId: null,
        choice1committee: -1,
        choice1country: "",
        choice2committee: -1,
        choice2country: "",
        choice3committee: -1,
        choice3country: "",
        shirtSize: null,
      },
      onSubmit: submitApplication,
      validate: async (values) => {
        // this function should return errors it finds
        const results = await DelegateApply.superRefine(
          refineDelegateApply({ committees, committeeCountries: countries })
        ).safeParseAsync(values)

        return zodErrorToFormik(results)
      },
    })

  // we have this debounced change handler so that the motivation+experience don't get changed on each keystroke, but only after the user stopped typing for 500ms
  const debouncedHandleChange = useDebouncedCallback(
    (field: string, value: any) => setFieldValue(field, value),
    500
  )
  // stuff that is shown when the user is not logged in
  if (!userData.user) {
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

  if (userData.application) {
    return (
      <Container maxW="110ch">
        <Header title="DELEGATE APPLICATIONS" />

        <Heading>DELEGATE APPLICATIONS</Heading>

        <br />
        <Text>
          You have already applied to be a {userData.application.type}, you
          therefore cannot apply again
        </Text>
        <Text>
          You can go back to the main page
          <Link href="/">here</Link>
        </Text>
      </Container>
    )
  }

  const choice1committee =
    values.choice1committee !== undefined
      ? committees.find(
          (committee) => committee.id === values.choice1committee
        ) || false
      : false
  const choice2committee =
    values.choice2committee !== undefined
      ? committees.find(
          (committee) => committee.id === values.choice2committee
        ) || false
      : false
  const choice3committee =
    values.choice3committee !== undefined
      ? committees.find(
          (committee) => committee.id === values.choice3committee
        ) || false
      : false

  const isCountryDisabled = (choiceId: 1 | 2 | 3, country: string) => {
    // check if the country in the committee is already occupied by someone else
    const committeeCountry = countries.find(
      (c) =>
        c.committeeId === values[`choice${choiceId}committee`] &&
        c.country === country
    )
    // if no committee country is found or the country is occupied by a user, it is disabled
    if (!committeeCountry || committeeCountry.userId) return true

    // if all committee choices are different, the country is not disabled
    const choices = [
      values.choice1committee,
      values.choice2committee,
      values.choice3committee,
    ]
    if (new Set(choices).size === 3) return false

    // for each of the other committees, if the country is the same, the country is disabled
    const otherCommittees = ([1, 2, 3] as const).filter((x) => x !== choiceId)
    for (const otherId of otherCommittees) {
      // if the other choice committee is not the same as the current choice committee, the country is not disabled since they are in different committees
      if (
        values[`choice${otherId}committee`] !==
        values[`choice${choiceId}committee`]
      )
        continue
      // if the countries are identical, then the country is disabled
      if (values[`choice${otherId}country`] === country) return true
    }
    // this should never happen, but we return false
    return false
  }

  // stuff that is shown when the user is logged in
  return (
    <Container maxW="110ch">
      <Header title="DELEGATE APPLICATIONS" />

      <br />

      <Heading>Information for delegates</Heading>
      {/* some more specific information here */}

      <br />

      {loading && <Heading>Loading...</Heading>}
      {error && <Heading>{error}</Heading>}
      {success && (
        <>
          <Heading>You have successfully applied to be a delegate</Heading>
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

            {/* country choices */}

            <GridItem rowSpan={1} colSpan={2}>
              <FormControl
                variant="floating"
                isInvalid={Boolean(errors.choice1country)}
                isRequired
              >
                <Select<CountryChoice, false>
                  // filter to only include countries in the specific committee that is selected for the choice
                  options={countries
                    .filter(
                      (country) =>
                        country.committeeId === Number(values.choice1committee)
                    )
                    .map((country) => ({
                      label: country.country,
                      value: country.country,
                      isDisabled: isCountryDisabled(1, country.country),
                    }))}
                  placeholder=" "
                  isDisabled={values.choice1committee === -1}
                  onChange={(option) =>
                    setFieldValue("choice1country", option?.value ?? "")
                  }
                  isInvalid={Boolean(errors.choice1country)}
                />
                <FormLabel>Country Choice 1</FormLabel>
                <FormErrorMessage>{errors.choice1country}</FormErrorMessage>
                <FormHelperText>
                  Select a country that you want to delegate as in the{" "}
                  {choice1committee ? choice1committee.displayname : "3rd"}{" "}
                  committee
                </FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem rowSpan={1} colSpan={2}>
              <FormControl
                variant="floating"
                isInvalid={Boolean(errors.choice2country)}
                isRequired
              >
                <Select<CountryChoice, false>
                  // filter to only include countries in the specific committee that is selected for the choice
                  options={countries
                    .filter(
                      (country) =>
                        country.committeeId === Number(values.choice2committee)
                    )
                    .map((country) => ({
                      label: country.country,
                      value: country.country,
                      isDisabled: isCountryDisabled(2, country.country),
                    }))}
                  placeholder=" "
                  isDisabled={values.choice2committee === -1}
                  onChange={(option) =>
                    setFieldValue("choice2country", option?.value ?? "")
                  }
                  isInvalid={Boolean(errors.choice2country)}
                />
                <FormLabel>Country Choice 2</FormLabel>
                <FormErrorMessage>{errors.choice2country}</FormErrorMessage>
                <FormHelperText>
                  Select a country that you want to delegate as in the{" "}
                  {choice2committee ? choice2committee.displayname : "3rd"}{" "}
                  committee
                </FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem rowSpan={1} colSpan={2}>
              <FormControl
                variant="floating"
                isInvalid={Boolean(errors.choice3country)}
                isRequired
              >
                <Select<CountryChoice, false>
                  // filter to only include countries in the specific committee that is selected for the choice
                  options={countries
                    .filter(
                      (country) =>
                        country.committeeId === Number(values.choice3committee)
                    )
                    .map((country) => ({
                      label: country.country,
                      value: country.country,
                      isDisabled: isCountryDisabled(3, country.country),
                    }))}
                  placeholder=" "
                  isDisabled={values.choice3committee === -1}
                  onChange={(option) =>
                    setFieldValue("choice3country", option?.value ?? "")
                  }
                  isInvalid={Boolean(errors.choice3country)}
                />
                <FormLabel>Country Choice 3</FormLabel>
                <FormErrorMessage>{errors.choice3country}</FormErrorMessage>
                <FormHelperText>
                  Select a country that you want to delegate as in the{" "}
                  {choice3committee ? choice3committee.displayname : "3rd"}{" "}
                  committee
                </FormHelperText>
              </FormControl>
            </GridItem>
          </Grid>

          <Divider />

          <br />

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
              placeholder=""
              onChange={(option) =>
                setFieldValue("delegationId", option?.value ?? null)
              }
              defaultValue={{
                label: "None",
                value: -1,
              }}
              isInvalid={Boolean(errors.delegationId)}
            />
            <FormLabel>Delegation</FormLabel>

            <FormErrorMessage>{errors.delegationId}</FormErrorMessage>
            <FormHelperText>
              Select a delegation that you are part of if you are part of one.
              This is something that your club leader or teacher would have told
              you about. Don't worry about it if you are not partaking in
              PLISMUN as a club member or as a part of a school
            </FormHelperText>
          </FormControl>

          <br />

          <FormControl
            variant="floating"
            isInvalid={Boolean(errors.motivation)}
            isRequired
          >
            <Textarea
              onChange={(e) =>
                debouncedHandleChange("motivation", e.target.value)
              }
              isInvalid={Boolean(errors.motivation)}
              height="20em"
              placeholder=" "
            />
            <FormLabel>Motivation</FormLabel>
            <FormErrorMessage>{errors.motivation}</FormErrorMessage>
            <FormHelperText>
              Fill in some motivation about why you would like to attend PLISMUN
              as a delegate here (approx. 400 words)
            </FormHelperText>
          </FormControl>

          <br />

          <FormControl
            variant="floating"
            isInvalid={Boolean(errors.experience)}
            isRequired
          >
            <Textarea
              onChange={(e) =>
                debouncedHandleChange("experience", e.target.value)
              }
              isInvalid={Boolean(errors.experience)}
              height="20em"
              placeholder=" "
            />
            <FormLabel>Experience</FormLabel>
            <FormErrorMessage>{errors.experience}</FormErrorMessage>
            <FormHelperText>
              Fill in some experience about your past experiences with PLISMUN,
              other MUN conferences, or other related work here (approx. 400
              words)
            </FormHelperText>
          </FormControl>

          <FormControl
            variant="floating"
            isInvalid={Boolean(errors.shirtSize)}
            isRequired
          >
            <FormLabel>Shirt Size</FormLabel>
            <Select<{ value: string | null; label: string } & OptionBase, false>
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
            />

            <FormErrorMessage>{errors.shirtSize}</FormErrorMessage>

            <FormHelperText>
              Select a shirt size or none if you don't want one
            </FormHelperText>
          </FormControl>

          <Center>
            <Button type="submit">Submit application</Button>
          </Center>
        </form>
      )}
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
