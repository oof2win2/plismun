import React, { useEffect } from "react"
import Image from "next/image"
import { ParagraphTypography } from "@utils/styles"

export default function Home() {
  return (
    <div className="c-page">
      <section className="c-hero">
        <div className="container">
          <div className="bgWrap">
            <Image
              src="/images/school_img2.jpg"
              layout="fill"
              objectFit="cover"
              className="backgroundImage"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              paddingTop: "16rem",
            }}
            className="page animate"
          >
            <Image src="/logolarge.png" height={350} width={350} />
            <h1 style={{ color: "white" }}>JANUARY 26TH - 29RD, 2023</h1>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingTop: "16rem" }}>
        <div className="page animate">
          <p>
            Park Lane International School Model United Nations, or PLISMUN for
            short, is a conference where students aged 13 - 18 discuss topics of
            global importance by representing countries in a simulation of
            select committees of the United Nations. Delegations from schools
            anywhere in the world are invited to participate.
          </p>
          <p>
            The conference takes place in-person and is managed by a completely
            student-led team. January 2023 will mark the sixth annual edition of
            PLISMUN - and by no means the last!
          </p>
          <p>
            9 committees in PLISMUN '23 means that first-time MUN debutants and
            seasoned debating veterans alike will find their place.
          </p>
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
