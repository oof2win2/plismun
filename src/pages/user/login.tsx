import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks"
import { login } from "@/utils/redux/parts/user"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
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
} from "@chakra-ui/react"
import { LoginSchema } from "@/utils/validators"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [wasSuccess, setSuccess] = useState(false)

  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)

  // redirect the user back home, since they already are logged in
  useEffect(() => {
    if (user) router.push("/")
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof LoginSchema._type>({
    resolver: zodResolver(LoginSchema),
  })

  const loginForm = async (form: typeof LoginSchema._type) => {
    // submit a fetch query to login
    setLoading(true)
    try {
      const req = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await req.json()

      if (req.status !== 200) {
        const error = data.errors[0]
        if (!error) setError("An error occured")
        switch (error.message) {
          case "Email or password is wrong":
            setError("Email address or password is wrong, please try again")
            break
          default:
            setError("An unknown error occured")
        }
      } else {
        if (data.status === "success") {
          // data.data is the user object
          dispatch(login(data.data))
        }
        setSuccess(true)
        setError(null)
        // go to homepage in 2s
        setTimeout(() => {
          router.push("/")
        }, 2000)
      }
    } catch (error) {
      setError(error as string)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxW="110ch">
      {!wasSuccess && (
        <Center>
          <Text>
            Don't have an account?{" "}
            <Link href="/user/signup">
              <a>Sign up</a>
            </Link>
          </Text>
        </Center>
      )}

      <br />

      <Center>
        <Flex direction="column" justifyContent="center">
          {wasSuccess && (
            <Heading>
              Success logging in, you will be redirected to the homepage soon
            </Heading>
          )}
          {loading && <Text>Loading...</Text>}
          {error && <Text>{error}</Text>}

          <br />

          {!wasSuccess && (
            <form onSubmit={handleSubmit(loginForm)}>
              <FormControl>
                <Grid
                  height="100%"
                  templateColumns="repeat(1, 1fr)"
                  templateRows="repeat(2, 1fr)"
                  width="30vw"
                  gap={4}
                >
                  <GridItem rowSpan={1}>
                    <FormLabel>Email</FormLabel>
                    <Input {...register("email")} />
                    <FormHelperText>
                      {errors.email?.message}&nbsp;
                    </FormHelperText>
                  </GridItem>

                  <GridItem rowSpan={1}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" {...register("password")} />
                    <FormHelperText>
                      {errors.password?.message}&nbsp;
                    </FormHelperText>
                  </GridItem>
                </Grid>

                <Center>
                  <Button
                    colorScheme="cyan"
                    variant="outline"
                    size="lg"
                    type="submit"
                  >
                    Log in
                  </Button>
                </Center>
              </FormControl>
            </form>
          )}
        </Flex>
      </Center>
    </Container>
  )
}

Login.pageName = "LOGIN"
export default Login
