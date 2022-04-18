import Header from "@/components/header"
import { Container, Heading, Text } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"

export default function About() {
  return (
    <Container maxW="110ch">
      <Header title="TERMS AND CONDITIONS" />

      <Text>
        In these Terms and Conditions, the PLISMUN Secretariat and Park Lane
        Internation School is collectively referred to as 'we' or 'us', with all
        participants referred to as 'you'. By applying to attend, and by
        attending PLISMUN, you accept and agree to these Terms and Conditions.
      </Text>

      <br />

      <Heading size="lg">1. PARTICIPANT DUTIES</Heading>
      <Text>By applying for a participating position, you agree to:</Text>
      <ol type="a">
        <li>
          <Text>
            Providing truthful and correct personal information about yourself
          </Text>
        </li>
        <li>
          <Text>
            Ensuring that you are not currently charged with criminal offences
            in any country
          </Text>
        </li>
        <li>
          <Text>
            Accept and respect the responsibility of all authorised persons and
            act upon their command during all formal conference time and in
            emergency situations
          </Text>
        </li>
        <li>
          <Text>
            Treat other participants, including guests and staff, with respect,
            dignity and in a civil manner
          </Text>
        </li>
        <li>
          <Text>
            Not cause damage to the property of school nor the venues used by us
          </Text>
        </li>
        <li>
          <Text>Not deal with and/or use any of the following:</Text>
        </li>
        <ol type="i">
          <li>
            <Text>Mind-altering substances</Text>
          </li>
          <li>
            <Text>Cigarettes, including e-cigarettes</Text>
          </li>
          <li>
            <Text>
              Life-endangering objects that have the capacity to cause bodily
              harm
            </Text>
          </li>
        </ol>
        <li>
          <Text>
            Acknowledge PLISMUN's right to expulsion from the conference in the
            event of breaking any of the above-mentioned duties
          </Text>
        </li>
      </ol>

      <br />

      <Heading size="lg">2. LIABILITY</Heading>
      <Text>By applying to and attending PLISMUN, you:</Text>
      <ol type="a">
        <li>
          <Text>
            Acknowledge that PLISMUN and Park Lane Internation School are not
            responsible for any actions you take nor your well-being outside of
            formal conference time
          </Text>
        </li>
        <ol type="i">
          <li>
            <Text>
              Waive any and all claims against PLISMUN and Park Lane Internation
              School involving compensation in any form for damages or losses
              sustained during travel or in accomodation
            </Text>
          </li>
        </ol>
        <li>
          <Text>
            Accept responsibility and will compensate for repair costs of any
            damage you inflict on the property of the school or any other
            conference venues
          </Text>
        </li>
      </ol>

      <br />

      <Heading size="lg">3. PAYMENT</Heading>
      <ol type="a">
        <li>
          <Text>
            Conference fees must be paid in full prior to the conference
          </Text>
        </li>
        <li>
          <Text>
            You forfeit your right to refund after registering and applying
            unless in case of the fault of the PLISMUN Secretariat
          </Text>
        </li>
      </ol>

      <br />

      <Heading size="lg">4. CONTENT OWNERSHIP</Heading>
      <p>By applying to and participating in PLISMUN, you agree to:</p>
      <ol type="a">
        <li>
          <Text>
            Waive ownership of and give consent to being photographed or filmed
            by conference press
          </Text>
        </li>
        <li>
          <Text>
            Give consent to photographic or cinematographic content including
            you in it to be shared and displayed, including, but not limited to:
          </Text>
        </li>
        <ol type="i">
          <li>
            <Text>
              Social media - Facebook, instagram, Snapchat and Twitter
            </Text>
          </li>
          <li>
            <Text>The official PLISMUN website</Text>
          </li>
          <li>
            <Text>
              Videos published to YouTube and played during opening and closing
              ceremonies
            </Text>
          </li>
          <li>
            <Text>Future educational or promotional content</Text>
          </li>
        </ol>
      </ol>

      <br />

      <Heading size="lg">5. DATA PRIVACY</Heading>
      <p>
        By using this website, as well as registering and applying to the
        conference, you agree to our{" "}
        <Link href="/about/privacy">
          <a>Privacy Policy</a>
        </Link>
        , including use of cookies for analytical purposes.
      </p>

      <br />

      <Heading size="lg">6. LAW</Heading>
      <Text>
        Czech Law is applicable in Prague; all participants must abide by the
        law
      </Text>
    </Container>
  )
}

// this makes the page render only once on server startup, which is good for SEO + performance
// makes TTFB faster since the page is just sent immediately after the request rather than rendering it
export function getStaticProps() {
  return {
    props: {},
  }
}
