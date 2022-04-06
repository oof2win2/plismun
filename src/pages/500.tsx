import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const router = useRouter()

  return (
    <div className="c-page">
      <div className="container">
        <div className="page animate">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image src="/images/logolarge.png" width={350} height={350} />
          </div>
          <h1>
            Sorry, but the server encountered an error whilst processing your
            request
          </h1>
          <h2>
            You can go to the{" "}
            <Link href="/">
              <a>homepage</a>
            </Link>{" "}
            , try going <a onClick={() => router.back()}>back</a>, or try{" "}
            <a onClick={() => router.reload()}>reloading</a>.
          </h2>
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
