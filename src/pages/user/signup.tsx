import { useAppSelector } from "@/utils/redux/hooks"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import {
  DietaryOptions,
  SignupSchema,
  SignupSchemaType,
} from "@/utils/validators"
import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  Textarea,
} from "@chakra-ui/react"
import countryList from "country-list"
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { format } from "date-fns"
import { useFormik } from "formik"
import { zodErrorToFormik } from "@/utils/utils"
import { useDebouncedCallback } from "use-debounce"

function Signup() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [wasSuccess, setSuccess] = useState(false)
  // this is to bypass the fact that the form is an uncontrolled form, i.e. the DOM is handling the form itself which is then just validated with JS
  // otherwise it would render the date once only, which doesn't seem very intuitive
  // see https://reactjs.org/docs/uncontrolled-components.html
  const [birthdate, setBirthdate] = useState(new Date())

  const { user } = useAppSelector((state) => state.user)

  // redirect the user back home, since they already are logged in
  useEffect(() => {
    if (user) router.push("/")
  }, [])

  const signupForm = async (form: SignupSchemaType) => {
    // submit a fetch query to signup
    setLoading(true)
    try {
      const req = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await req.json()

      if (req.status !== 200) {
        const error = data.errors[0]
        if (!error) setFetchError("An error occured")
        switch (error.message) {
          case "User already exists":
            setFetchError("Email address is already in use")
            break
          default:
            setFetchError("An unknown error occured")
        }
      } else {
        setSuccess(true)
        setFetchError(null)
        // go to homepage in 2s
        setTimeout(() => {
          router.push("/")
        }, 2000)
      }
    } catch (error) {
      setFetchError("An unknown error occured")
    } finally {
      setLoading(false)
    }
  }

  const { setFieldValue, values, handleSubmit, errors } =
    useFormik<SignupSchemaType>({
      initialValues: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirm: "",
        nationality: "",
        birthdate: new Date(),
      },
      onSubmit: signupForm,
      validate: (data) => {
        const results = SignupSchema.safeParse(data)

        return zodErrorToFormik(results)
      },
    })

  const debouncedHandleChange = useDebouncedCallback(
    (field: string, value: any) => setFieldValue(field, value),
    500
  )

  return (
    <Container maxW="110ch">
      {!wasSuccess && (
        <Center>
          <Text>
            Already have an account?{" "}
            <Link href="/user/login">
              <a>Log in</a>
            </Link>
          </Text>
        </Center>
      )}

      <br />

      <Center maxW="110ch">
        {wasSuccess && (
          <>
            <Heading>Success signing up, please log in</Heading>
          </>
        )}
        {loading && <Heading>Loading...</Heading>}
        {!loading && fetchError && <Heading>{fetchError}</Heading>}
        {!wasSuccess && (
          <Center maxW="110ch">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Grid
                  // make a grid that is 4x6 so that we can fit in the form nicely
                  height="100%"
                  templateRows="repeat(7, 0.1fr)"
                  templateColumns="repeat(6, 1fr)"
                  gap={4}
                  style={{ paddingBottom: "4rem" }}
                >
                  {/* First name */}
                  <GridItem rowSpan={1} colSpan={3}>
                    <FormControl
                      variant="floating"
                      isRequired
                      isInvalid={Boolean(errors.firstname)}
                    >
                      <Input
                        isInvalid={Boolean(errors.firstname)}
                        placeholder="    "
                        onChange={(e) =>
                          debouncedHandleChange("firstname", e.target.value)
                        }
                      />
                      <FormLabel>First name</FormLabel>
                      <FormErrorMessage>{errors.firstname}</FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  {/* Last name */}
                  <GridItem rowSpan={1} colSpan={3}>
                    <FormControl
                      variant="floating"
                      isRequired
                      isInvalid={Boolean(errors.lastname)}
                    >
                      <Input
                        isInvalid={Boolean(errors.lastname)}
                        onChange={(e) =>
                          debouncedHandleChange("lastname", e.target.value)
                        }
                        placeholder="    "
                      />
                      <FormLabel>Last name</FormLabel>
                      <FormErrorMessage>{errors.lastname}</FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  {/* Email */}
                  <GridItem rowSpan={1} colSpan={6}>
                    <FormControl
                      variant="floating"
                      isRequired
                      isInvalid={Boolean(errors.email)}
                    >
                      <Input
                        isInvalid={Boolean(errors.email)}
                        onChange={(e) =>
                          debouncedHandleChange("email", e.target.value)
                        }
                        placeholder="    "
                      />
                      <FormLabel>Email</FormLabel>
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  {/* Password */}
                  <GridItem rowSpan={1} colSpan={3}>
                    <FormControl
                      variant="floating"
                      isRequired
                      isInvalid={Boolean(errors.password)}
                    >
                      <Input
                        type="password"
                        isInvalid={Boolean(errors.password)}
                        onChange={(e) =>
                          debouncedHandleChange("password", e.target.value)
                        }
                        placeholder="    "
                      />
                      <FormLabel>Password</FormLabel>
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  {/* Confirm password */}
                  <GridItem rowSpan={1} colSpan={3}>
                    <FormControl
                      variant="floating"
                      isRequired
                      isInvalid={Boolean(errors.passwordConfirm)}
                    >
                      <Input
                        type="password"
                        isInvalid={Boolean(errors.passwordConfirm)}
                        onChange={(e) =>
                          debouncedHandleChange(
                            "passwordConfirm",
                            e.target.value
                          )
                        }
                        placeholder="		"
                      />
                      <FormLabel>Confirm password</FormLabel>
                      <FormErrorMessage>
                        {errors.passwordConfirm}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  {/* Birthdate */}
                  <GridItem rowSpan={1} colSpan={3}>
                    <FormControl
                      variant="floating"
                      isRequired
                      isInvalid={Boolean(errors.birthdate)}
                    >
                      <Input
                        type="date"
                        isInvalid={Boolean(errors.birthdate)}
                        onChange={(e) =>
                          debouncedHandleChange(
                            "birthdate",
                            new Date(e.target.value || "")
                          )
                        }
                      />
                      <FormLabel>Birthdate</FormLabel>
                      <FormErrorMessage>{errors.birthdate}</FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  {/* Nationality */}
                  <GridItem rowSpan={1} colSpan={3}>
                    <FormControl
                      variant="floating"
                      isRequired
                      isInvalid={Boolean(errors.nationality)}
                    >
                      <AutoComplete
                        openOnFocus
                        // when we get the value, map it to the country code
                        onChange={(value) =>
                          setFieldValue(
                            "nationality",
                            countryList.getCode(value) ?? " "
                          )
                        }
                      >
                        <AutoCompleteInput
                          variant="outline"
                          isInvalid={Boolean(errors.nationality)}
                          placeholder=""
                        />

                        <AutoCompleteList>
                          {countryList
                            .getData()
                            // sort the country names alphabetically
                            .sort((a, b) => {
                              const an = a.name,
                                bn = b.name
                              if (an < bn) return -1
                              if (an > bn) return 1
                              return 0
                            })
                            .map((country, i) => (
                              <AutoCompleteItem value={country.name} key={i}>
                                {country.name}
                              </AutoCompleteItem>
                            ))}
                        </AutoCompleteList>
                      </AutoComplete>
                      <FormLabel>Nationality</FormLabel>
                      <FormErrorMessage>{errors.nationality}</FormErrorMessage>
                    </FormControl>
                  </GridItem>
                </Grid>

                <Center>
                  <Button
                    colorScheme="cyan"
                    variant="outline"
                    size="lg"
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Center>
              </FormControl>
            </form>
          </Center>
        )}
      </Center>
    </Container>
  )
}

Signup.pageName = "SIGN UP"
export default Signup
