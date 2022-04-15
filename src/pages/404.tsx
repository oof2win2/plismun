import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Header from "@/components/header"
import { Heading } from "@chakra-ui/react"

export default function Home() {
  const router = useRouter()

  return (
    <div className="c-page">
      <div className="container">
        <div className="page animate">
          <Header title="404 - Page not found" />
          <Heading>
            Sorry, but the page you are looking for was not found
          </Heading>
          <Heading size="md">
            You can go to the{" "}
            <Link href="/">
              <a>homepage</a>
            </Link>{" "}
            , try going <a onClick={() => router.back()}>back</a>, or try{" "}
            <a onClick={() => router.reload()}>reloading</a>.
          </Heading>
        </div>
      </div>
    </div>
  )
}

// this makes the page render only once on server startup, which is good for SEO + performance
// makes TTFB faster since the page is just sent immediately after the request rather than rendering it
export function getStaticProps() {
  return {
    props: {},
  }
}
