import Header from "@/components/header"
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks"
import { login } from "@/utils/redux/parts/user"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function About() {
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

  const loginForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // disable page reload
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    // get field data as JS variables
    const email = formData.get("email")
    const password = formData.get("password")

    // submit a fetch query to login
    setLoading(true)
    try {
      const req = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await req.json()
      if (data.status === "success") {
        // data.data is the user object
        dispatch(login(data.data))
      }

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
    <div className="c-page">
      <div className="container">
        <div className="page animate">
          <Header title="LOGIN" />

          <div className="row" style={{ justifyContent: "center" }}>
            {wasSuccess && (
              <h2>
                Success logging in, you will be redirected to the homepage soon
              </h2>
            )}
            {loading && <h2>Loading...</h2>}
            {error && <h2>{error}</h2>}
            {!wasSuccess && (
              <div
                className="col col-8"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {!loading && (
                  <form className="c-contact-form__form" onSubmit={loginForm}>
                    <div className="c-contact-form__form-group">
                      <label
                        className="c-contact-form__form-label screen-reader-text"
                        htmlFor="form-name"
                      >
                        Your Name
                      </label>
                      <input
                        className="c-contact-form__form-input"
                        name="email"
                        placeholder="Your email..."
                        required={true}
                        type="email"
                      />
                    </div>
                    <div className="c-contact-form__form-group">
                      <label
                        className="c-contact-form__form-label screen-reader-text"
                        htmlFor="form-email"
                      >
                        Your Email
                      </label>
                      <input
                        className="c-contact-form__form-input"
                        name="password"
                        placeholder="Your password..."
                        required={true}
                        type="password"
                      />
                    </div>
                    <div className="c-contact-form__form-group c-contact-form__form-group--button">
                      <button
                        className="c-button c-button--primary c-button--large"
                        type="submit"
                      >
                        Log in
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
