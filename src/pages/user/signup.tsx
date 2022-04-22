import Header from "@/components/header"
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

export default function Signup() {
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
        dietary: "None",
        nationality: "",
        phone: null,
        schoolname: null,
        birthdate: new Date(),
        otherInfo: null,
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
      <Header title="SIGN UP" />

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
            <Heading>
              Success signing up, please verify your email address
            </Heading>

            <Text>
              Please check your spam folder if you don't get an email soon
            </Text>
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
                      <FormHelperText>Your first name</FormHelperText>
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

                  {/* Phone number */}
                  <GridItem rowSpan={1} colSpan={3}>
                    <FormControl
                      variant="floating"
                      isRequired
                      isInvalid={Boolean(errors.phone)}
                    >
                      <Input
                        isInvalid={Boolean(errors.phone)}
                        onChange={(e) =>
                          debouncedHandleChange("phone", e.target.value)
                        }
                        placeholder="    "
                      />
                      <FormLabel>Phone number</FormLabel>
                      <FormErrorMessage>{errors.phone}</FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  {/* School name */}
                  <GridItem rowSpan={1} colSpan={3}>
                    <FormControl
                      variant="floating"
                      isInvalid={Boolean(errors.schoolname)}
                    >
                      <FormLabel>School name</FormLabel>
                      <Input
                        onChange={(e) =>
                          debouncedHandleChange("schoolname", e.target.value)
                        }
                        isInvalid={Boolean(errors.schoolname)}
                        placeholder="    "
                      />
                      <FormErrorMessage>{errors.schoolname}</FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  {/* Email */}
                  <GridItem rowSpan={1} colSpan={3}>
                    <FormControl
                      variant="floating"
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

                  {/* Dietary */}
                  <GridItem rowSpan={1} colSpan={3}>
                    <FormControl
                      variant="floating"
                      isRequired
                      isInvalid={Boolean(errors.dietary)}
                    >
                      <AutoComplete
                        openOnFocus
                        disableFilter
                        // when we get the value, map it to the country code
                        onChange={(value) => setFieldValue("dietary", value)}
                        placeholder="    "
                      >
                        <AutoCompleteInput
                          variant="outline"
                          isInvalid={Boolean(errors.dietary)}
                        />
                        <AutoCompleteList>
                          {DietaryOptions.options.map((dietName, i) => (
                            <AutoCompleteItem value={dietName} key={i}>
                              {dietName}
                            </AutoCompleteItem>
                          ))}
                        </AutoCompleteList>
                      </AutoComplete>
                      <FormLabel>Dietary</FormLabel>
                      <FormErrorMessage>{errors.dietary}</FormErrorMessage>
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
                  <GridItem
                    rowSpan={1}
                    colSpan={2}
                    css={`
                      --rdp-cell-size: 2rem;
                      --rdp-accent-color: var(--chakra-colors-blue-500);
                      --rdp-background-color: var(--chakra-colors-blue-200);
                    `}
                  >
                    <FormControl
                      variant="floating"
                      isRequired
                      isInvalid={Boolean(errors.birthdate)}
                    >
                      <Popover>
                        <PopoverTrigger>
                          <Input
                            readOnly
                            value={format(values.birthdate, "PP")}
                            isInvalid={Boolean(errors.birthdate)}
                            placeholder=""
                          />
                        </PopoverTrigger>
                        <FormLabel>Birthdate</FormLabel>
                        <PopoverContent>
                          <DayPicker
                            mode="single"
                            selected={values.birthdate}
                            onSelect={(date = new Date()) => {
                              setFieldValue("birthdate", date)
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormHelperText>{errors.birthdate}</FormHelperText>
                    </FormControl>
                  </GridItem>

                  {/* Nationality */}
                  <GridItem rowSpan={1} colSpan={4}>
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

                  {/* Other info (big textbox) */}
                  <GridItem rowSpan={2} colSpan={6}>
                    <FormControl
                      variant="floating"
                      isInvalid={Boolean(errors.otherInfo)}
                    >
                      <Textarea
                        onChange={(e) =>
                          debouncedHandleChange("otherInfo", e.target.value)
                        }
                      />
                      <FormLabel>Other information</FormLabel>
                    </FormControl>
                  </GridItem>

                  <GridItem rowSpan={1} colSpan={3}></GridItem>
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
