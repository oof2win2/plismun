import Header from "@/components/header"
import { useAppSelector } from "@/utils/redux/hooks"
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignupSchema, SignupSchemaType } from "@/utils/validators"

// export default function Signup() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [wasSuccess, setSuccess] = useState(false)
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignupSchemaType>({
//     resolver: zodResolver(SignupSchema),
//   })

//   const { user } = useAppSelector((state) => state.user)

//   // redirect the user back home, since they already are logged in
//   useEffect(() => {
//     if (user) router.push("/")
//   }, [])

//   const signupForm = async (form: SignupSchemaType) => {
//     // submit a fetch query to signup
//     setLoading(true)
//     try {
//       const req = await fetch("/api/auth/signup", {
//         method: "POST",
//         body: JSON.stringify(form),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       const data = await req.json()

//       if (req.status !== 200) {
//         const error = data.errors[0]
//         if (!error) setError("An error occured")
//         switch (error.message) {
//           case "User already exists":
//             setError("Email address is already in use")
//             break
//           default:
//             setError("An unknown error occured")
//         }
//       } else {
//         setSuccess(true)
//         setError(null)
//         // go to homepage in 2s
//         setTimeout(() => {
//           router.push("/")
//         }, 2000)
//       }
//     } catch (error) {
//       setError("An unknown error occured")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
// <div className="c-page">
//   <div className="container">
//     <div className="page animate">
//       <Header title="SIGN UP" />

//           {!wasSuccess && (
//             <div className="row" style={{ justifyContent: "center" }}>
//               <p>
//                 Already have an account?{" "}
//                 <Link href="/user/login">
//                   <a>Log in</a>
//                 </Link>
//               </p>
//             </div>
//           )}

//           <div className="row" style={{ justifyContent: "center" }}>
//             {wasSuccess && (
//               <>
//                 <h2>Success signing up, please verify your email address</h2>
//                 <p>
//                   Please check your spam folder if you don't get an email soon
//                 </p>
//               </>
//             )}
//             {loading && <h2>Loading...</h2>}
//             {error && <h2>{error}</h2>}
//             {!wasSuccess && (
//               <div
//                 className="col col-8"
//                 style={{ display: "flex", justifyContent: "center" }}
//               >
//                 <form
//                   className="c-contact-form__form"
//                   onSubmit={handleSubmit(signupForm)}
//                 >
//                   <div className="c-contact-form__form-group">
//                     <label
//                       className="c-contact-form__form-label screen-reader-text"
//                       htmlFor="form-name"
//                     />
//                     <input
//                       className="c-contact-form__form-input"
//                       placeholder="Email"
//                       {...register("email")}
//                     />
//                     <p style={{ fontSize: "18px" }}>{errors.email?.message}</p>
//                   </div>
//                   <div className="c-contact-form__form-group">
//                     <label
//                       className="c-contact-form__form-label screen-reader-text"
//                       htmlFor="form-email"
//                     />
//                     <input
//                       className="c-contact-form__form-input"
//                       placeholder="Password"
//                       type="password"
//                       {...register("password")}
//                     />
//                     <p>{errors.password?.message}</p>
//                   </div>
//                   <div className="c-contact-form__form-group">
//                     <label
//                       className="c-contact-form__form-label screen-reader-text"
//                       htmlFor="form-email"
//                     />
//                     <input
//                       className="c-contact-form__form-input"
//                       placeholder="Confirm password"
//                       type="password"
//                       {...register("passwordConfirm", { required: true })}
//                     />
//                     <p>{errors.passwordConfirm?.message}</p>
//                   </div>
//                   <div className="c-contact-form__form-group c-contact-form__form-group--button">
//                     <button
//                       className="c-button c-button--primary c-button--large"
//                       type="submit"
//                     >
//                       Sign up
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

export default function Signup() {
  return (
    <div className="c-page">
      <div className="container">
        <div className="page animate">
          <Header title="SIGN UP" />
          <h1>Under construction</h1>
        </div>
      </div>
    </div>
  )
}
