import Header from "@/components/header"
import { useAppSelector } from "@/utils/redux/hooks"
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  DietaryOptions,
  SignupSchema,
  SignupSchemaType,
} from "@/utils/validators"
import {
  Button,
  Center,
  FormControl,
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

export default function Signup() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [wasSuccess, setSuccess] = useState(false)
  //
  const [birthdate, setBirthdate] = useState(new Date())

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
  })

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

  return (
    <div className="c-page">
      <div className="container">
        <div className="page animate">
          <Header title="SIGN UP" />

          {!wasSuccess && (
            <div className="row" style={{ justifyContent: "center" }}>
              <Text>
                Already have an account?{" "}
                <Link href="/user/login">
                  <a>Log in</a>
                </Link>
              </Text>
            </div>
          )}

          <br />

          <div className="row" style={{ justifyContent: "center" }}>
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
              <div
                className="col col-8"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <form onSubmit={handleSubmit(signupForm)}>
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
                        <FormLabel>First name</FormLabel>
                        <Input
                          {...register("firstname")}
                          isInvalid={Boolean(errors.firstname)}
                        />
                        <FormHelperText>
                          {errors.firstname?.message}&nbsp;
                        </FormHelperText>
                      </GridItem>

                      {/* Last name */}
                      <GridItem rowSpan={1} colSpan={3}>
                        <FormLabel>Last name</FormLabel>
                        <Input
                          {...register("lastname")}
                          isInvalid={Boolean(errors.lastname)}
                        />
                        <FormHelperText>
                          {errors.lastname?.message}&nbsp;
                        </FormHelperText>
                      </GridItem>

                      {/* Phone number */}
                      <GridItem rowSpan={1} colSpan={3}>
                        <FormLabel>Phone number</FormLabel>
                        <Input
                          {...register("phone")}
                          isInvalid={Boolean(errors.phone)}
                        />
                        <FormHelperText>
                          {errors.phone?.message}&nbsp;
                        </FormHelperText>
                      </GridItem>

                      {/* School name */}
                      <GridItem rowSpan={1} colSpan={3}>
                        <FormLabel>School name</FormLabel>
                        <Input
                          {...register("schoolname")}
                          isInvalid={Boolean(errors.schoolname)}
                        />
                        <FormHelperText>
                          {errors.schoolname?.message}&nbsp;
                        </FormHelperText>
                      </GridItem>

                      {/* Email */}
                      <GridItem rowSpan={1} colSpan={3}>
                        <FormLabel>Email</FormLabel>
                        <Input
                          {...register("email")}
                          isInvalid={Boolean(errors.email)}
                        />
                        <FormHelperText>
                          {errors.email?.message}&nbsp;
                        </FormHelperText>
                      </GridItem>

                      {/* Password */}
                      <GridItem rowSpan={1} colSpan={3}>
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
                          {...register("password")}
                          isInvalid={Boolean(errors.password)}
                        />
                        <FormHelperText>
                          {errors.password?.message}&nbsp;
                        </FormHelperText>
                      </GridItem>

                      {/* Dietary */}
                      <GridItem rowSpan={1} colSpan={3}>
                        <FormLabel>Dietary</FormLabel>
                        <AutoComplete
                          openOnFocus
                          disableFilter
                          // when we get the value, map it to the country code
                          onChange={(value) => setValue("dietary", value)}
                        >
                          <AutoCompleteInput variant="outline" />
                          <AutoCompleteList>
                            {DietaryOptions.options.map((dietName, i) => (
                              <AutoCompleteItem value={dietName} key={i}>
                                {dietName}
                              </AutoCompleteItem>
                            ))}
                          </AutoCompleteList>
                        </AutoComplete>
                        <FormHelperText>
                          {errors.dietary?.message}&nbsp;
                        </FormHelperText>
                      </GridItem>

                      {/* Confirm password */}
                      <GridItem rowSpan={1} colSpan={3}>
                        <FormLabel>Confirm password</FormLabel>
                        <Input
                          type="password"
                          {...register("passwordConfirm")}
                          isInvalid={Boolean(errors.passwordConfirm)}
                        />
                        <FormHelperText>
                          {errors.passwordConfirm?.message}&nbsp;
                        </FormHelperText>
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
                        <FormLabel>Birthdate</FormLabel>
                        <Popover>
                          <PopoverTrigger>
                            <Input readOnly value={format(birthdate, "PP")} />
                          </PopoverTrigger>
                          <PopoverContent>
                            <DayPicker
                              mode="single"
                              selected={getValues("birthdate")}
                              onSelect={(date = new Date()) => {
                                setValue("birthdate", date)
                                setBirthdate(date)
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormHelperText>
                          {errors.birthdate?.message}&nbsp;
                        </FormHelperText>
                      </GridItem>

                      {/* Nationality */}
                      <GridItem rowSpan={1} colSpan={4}>
                        <FormLabel>Nationality</FormLabel>
                        <AutoComplete
                          openOnFocus
                          // when we get the value, map it to the country code
                          onChange={(value) =>
                            setValue(
                              "nationality",
                              countryList.getCode(value) || "None"
                            )
                          }
                        >
                          <AutoCompleteInput variant="outline" />
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
                        <FormHelperText>
                          {errors.nationality?.message}&nbsp;
                        </FormHelperText>
                      </GridItem>

                      {/* Other info (big textbox) */}
                      <GridItem rowSpan={2} colSpan={6}>
                        <FormLabel>Other information</FormLabel>
                        <Textarea {...register("otherInfo")} />
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
