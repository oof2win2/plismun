import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks"
import { logout } from "@/utils/redux/parts/user"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Center, Container, Heading } from "@chakra-ui/react"

function Logout() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)

  // redirect the user back home, since they already are logged in

  const tryLogout = async () => {
    // submit a fetch query to login
    setLoading(true)
    try {
      const req = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await req.json()

      if (req.status !== 200) {
        setError(data.message)
      } else {
        // logged out
        dispatch(logout())
        // go to homepage in 2s
        setTimeout(() => {
          router.push("/")
        }, 2000)
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  // try logging out once
  useEffect(() => {
    if (user) {
      tryLogout()
    } else {
      router.push("/")
    }
  }, [])

  return (
    <Container maxW="110ch">
      <Center maxW="110ch">
        {loading && (
          <Heading style={{ width: "min-content" }}>Loading...</Heading>
        )}
        {error && <Heading style={{ width: "min-content" }}>{error}</Heading>}
        {!loading && !error && (
          <Heading>
            Success logging out, you will be redirected to the homepage soon
          </Heading>
        )}
      </Center>
    </Container>
  )
}

Logout.pageName = "LOGOUT"
export default Logout
