import Header from "@components/header"
import React from "react"

export default function About() {
  return (
    <div className="c-page">
      <div className="container">
        <div className="page animate">
          <Header title="ABOUT PLISMUN" />
          <p>
            With pride, we present to you the fifth annual Model United Nations
            conference hosted by{" "}
            <a href="https://parklane-is.com">Park Lane International School</a>
            . The conference is open to all students aged 13 - 18, targeted at
            both Model UN debutants and seasoned debating veterans.
          </p>
          <p>
            The conference is completely student-led, with a passionate team of
            high-school MUN enthusiasts paving the way for several days of
            quality debate. We have worked day and night to ensure that all
            attendees develop skills and experience that will last a lifetime.
          </p>
          <p>
            PLISMUN '22 is the result of several years of hard work that went
            towards perfecting the ultimate MUN experience. We have no doubt
            that this conference will be a successful event that participants
            will never forget!
          </p>

          <h1>OUR MISSION</h1>
          <p>
            PLISMUN is proudly hosted by Park Lane International school and we
            believe in crafting an experience that follows our school motto,
            'preparing the young people of today for the unknown occupations of
            tomorrow.'
          </p>
          <p>
            With this in mind, we have set ourselves six key goals which we aim
            to achieve:
          </p>
          <ol>
            <li>
              Ensuring high-quality and challenging debate in which experienced
              participants are pushed to the limit,
            </li>
            <li>
              Providing a supportive environment where beginner delegates are
              introduced to MUN,
            </li>
            <li>
              Broadening all participants' spectrum of knowledge and creating
              well-rounded global citizens,
            </li>
            <li>
              Promoting mutual cooperation and rational conflict resolution,
            </li>
            <li>
              Promoting mutual cooperation and rational conflict resolution,
            </li>
            <li>
              Educating today's generation about the work of the United Nations
              and the importance of diplomacy,
            </li>
            <li>
              Kindling new friendships and expanding a dynamic community of MUN
              enthusiasts.
            </li>
          </ol>
          <p>
            It is our mission to contribute to the future of democracy by
            teaching the generations of today to influence the future world.
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
