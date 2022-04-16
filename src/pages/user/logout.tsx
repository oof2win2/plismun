import Header from "@/components/header"
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks"
import { logout } from "@/utils/redux/parts/user"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function About() {
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
    <div className="c-page">
      <div className="container">
        <div className="page animate">
          <Header title="LOGOUT" />

          <div className="row" style={{ justifyContent: "center" }}>
            <div
              className="col col-8"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {loading && <h2 style={{ width: "min-content" }}>Loading...</h2>}
              {error && <h2 style={{ width: "min-content" }}>{error}</h2>}
              {!loading && !error && (
                <h2>
                  Success logging out, you will be redirected to the homepage
                  soon
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
