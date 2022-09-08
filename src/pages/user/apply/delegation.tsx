import React, { useCallback, useEffect, useReducer, useState } from "react"
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
  Image,
  NumberInput,
  Text,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"
import { Select, OptionBase } from "chakra-react-select"
import {
  DelegateApply,
  DelegationApply,
  DietaryOptions,
  refineDelegateApply,
} from "@/utils/validators"
import { useFormik } from "formik"
import Link from "next/link"
import { Committee, CommitteeCountries, Delegation } from "@prisma/client"
import { GetStaticPropsResult } from "next"
import { useDebouncedCallback } from "use-debounce"
import CountryCodes from "@/utils/countryCodes.json"

interface DelegationAppProps {}

interface CommitteeChoice extends OptionBase {
  label: string
  value: number
}
interface CountryChoice extends OptionBase {
  label: string
  value: string
}

function Signup({}: DelegationAppProps) {
  const userData = useAppSelector((state) => state.user)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean | null>(null)

  const submitApplication = async (form: DelegationApply) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const result = await fetch("/api/user/application/delegation", {
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
    useFormik<DelegationApply>({
      initialValues: {
        delegationLeaderId: userData.user?.id ?? -1,
        name: "",
        country: "",
        estimatedDelegates: -1,
        delegates: null,
        diet: "None",
        phone: "",
        shirtSize: null,
      },
      onSubmit: submitApplication,
      validate: (values) => {
        // this function should return errors it finds
        const results = DelegationApply.safeParse(values)

        // if success, return an empty object (no errors)
        if (results.success) return {}
        // here we need to map the errors to the form fields

        // this is an object of fieldname:list of errors
        // we can however only have one error at a time, so we need to change that
        const errors = results.error.flatten().fieldErrors as Partial<
          Record<keyof DelegationApply, string[]>
        >

        const newErrors = {}
        for (const [field, error] of Object.entries(errors)) {
          // @ts-expect-error
          newErrors[field] = error[0]
        }

        return newErrors
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
        <Heading>DELEGATION APPLICATIONS</Heading>

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
        <Heading>DELEGATION APPLICATIONS</Heading>

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

  // stuff that is shown when the user is logged in
  return (
    <Container maxW="110ch">
      <br />

      <Heading>Information for delegations</Heading>
      {/* some more specific information here */}

      <br />

      {loading && <Heading>Loading...</Heading>}
      {error && <Heading>{error}</Heading>}
      {success && (
        <>
          <Heading>
            You have successfully applied to be a delegation leader
          </Heading>
          <br />
          <Text>
            Go back <Link href="/">home</Link>
          </Text>
        </>
      )}

      {/* application form */}
      {!success && (
        <form onSubmit={handleSubmit}>
          <FormControl>
            {/* committee choices */}
            <Grid
              width="100%"
              templateRows="repeat(1, 0.1fr)"
              templateColumns="repeat(6, 1fr)"
              gap={4}
              style={{ paddingBottom: "2rem" }}
              templateAreas={`"name name country country number number"
										"phone phone phone diet diet diet"
										"divider divider divider divider divider divider"
										"size size size image image image"
										"text text text image image image"`}
            >
              {/* delegation name */}
              <GridItem area={"name"}>
                <FormControl
                  variant="floating"
                  isInvalid={Boolean(errors.name)}
                  isRequired
                >
                  <Input
                    isInvalid={Boolean(errors.name)}
                    onChange={(e) =>
                      debouncedHandleChange("name", e.target.value)
                    }
                    placeholder=" "
                  />
                  <FormLabel>Delegation name</FormLabel>
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                  <FormHelperText>The name of your delegation</FormHelperText>
                </FormControl>
              </GridItem>

              {/* delegation country */}
              <GridItem area="country">
                <FormControl
                  variant="floating"
                  isInvalid={Boolean(errors.country)}
                  isRequired
                >
                  <Select<{ value: string; label: string } & OptionBase, false>
                    options={CountryCodes.map((item) => ({
                      label: item.name,
                      value: item.code,
                    }))}
                    isInvalid={Boolean(errors.country)}
                    onChange={(option) =>
                      setFieldValue("country", option?.value ?? "")
                    }
                    placeholder=" "
                  />
                  <FormLabel>Delegation country</FormLabel>
                  <FormErrorMessage>{errors.country}</FormErrorMessage>
                  <FormHelperText>
                    The country of origin of your delegation
                  </FormHelperText>
                </FormControl>
              </GridItem>

              {/* estimated amount of delegates */}
              <GridItem area="number">
                <FormControl
                  variant="floating"
                  isInvalid={Boolean(errors.estimatedDelegates)}
                  isRequired
                >
                  <NumberInput
                    isInvalid={Boolean(errors.estimatedDelegates)}
                    onChange={(e) =>
                      debouncedHandleChange("estimatedDelegates", parseInt(e))
                    }
                    defaultValue={5}
                    min={1}
                    placeholder=" "
                  >
                    <NumberInputField />
                    <FormLabel>Estimated amount of delegates</FormLabel>
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  {errors.estimatedDelegates ? (
                    <FormErrorMessage>
                      {errors.estimatedDelegates}
                    </FormErrorMessage>
                  ) : (
                    <FormHelperText>
                      The estimated amount of delegates you will be representing
                    </FormHelperText>
                  )}
                </FormControl>
              </GridItem>

              {/* phone number */}
              <GridItem area="phone">
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
                  <FormHelperText>
                    Please put in your phone number
                  </FormHelperText>
                </FormControl>
              </GridItem>

              {/* dietary choice */}
              <GridItem area="diet">
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
                  <FormHelperText>
                    Select a diet that you personally have
                  </FormHelperText>
                </FormControl>
              </GridItem>

              <GridItem area="divider">
                <Divider />
              </GridItem>

              {/* shirt size */}
              <GridItem area="size">
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

              {/* shirt description */}
              <GridItem area="text">
                <Text>
                  The shirt is made from a mix of polyester and cotton, all
                  renewably sourced
                </Text>
                <br />
                <Text>Cost: 400czk</Text>
              </GridItem>

              {/* shirt image */}
              <GridItem area="image">
                <Image src="/images/shirt.png" width="100%" height="100%" />
              </GridItem>
            </Grid>
            <Center>
              <Button type="submit">Submit application</Button>
            </Center>
          </FormControl>
        </form>
      )}
    </Container>
  )
}

Signup.pageName = "DELEGATION APPLICATIONS"
export default Signup

export async function getStaticProps(): Promise<
  GetStaticPropsResult<DelegationAppProps>
> {
  return {
    props: {},
  }
}
