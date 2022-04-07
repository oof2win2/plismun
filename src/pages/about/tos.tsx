import Header from "@components/header"
import Link from "next/link"
import React from "react"

export default function About() {
  return (
    <div className="c-page">
      <div className="container">
        <div className="page animate">
          <Header title="TERMS AND CONDITIONS" />

          <p>
            In these Terms and Conditions, the PLISMUN Secretariat and Park Lane
            Internation School is collectively referred to as 'we' or 'us', with
            all participants referred to as 'you'. By applying to attend, and by
            attending PLISMUN, you accept and agree to these Terms and
            Conditions.
          </p>

          <h4>1. PARTICIPANT DUTIES</h4>
          <p>By applying for a participating position, you agree to:</p>
          <ol type="a">
            <li>
              <span>
                Providing truthful and correct personal information about
                yourself
              </span>
            </li>
            <li>
              <span>
                Ensuring that you are not currently charged with criminal
                offences in any country
              </span>
            </li>
            <li>
              <span>
                Accept and respect the responsibility of all authorised persons
                and act upon their command during all formal conference time and
                in emergency situations
              </span>
            </li>
            <li>
              <span>
                Treat other participants, including guests and staff, with
                respect, dignity and in a civil manner
              </span>
            </li>
            <li>
              <span>
                Not cause damage to the property of school nor the venues used
                by us
              </span>
            </li>
            <li>
              <span>Not deal with and/or use any of the following:</span>
            </li>
            <ol type="i">
              <li>
                <span>Mind-altering substances</span>
              </li>
              <li>
                <span>Cigarettes, including e-cigarettes</span>
              </li>
              <li>
                <span>
                  Life-endangering objects that have the capacity to cause
                  bodily harm
                </span>
              </li>
            </ol>
            <li>
              <span>
                Acknowledge PLISMUN's right to expulsion from the conference in
                the event of breaking any of the above-mentioned duties
              </span>
            </li>
          </ol>

          <h4>2. LIABILITY</h4>
          <p>By applying to and attending PLISMUN, you:</p>
          <ol type="a">
            <li>
              <span>
                Acknowledge that PLISMUN and Park Lane Internation School are
                not responsible for any actions you take nor your well-being
                outside of formal conference time
              </span>
            </li>
            <ol type="i">
              <li>
                <span>
                  Waive any and all claims against PLISMUN and Park Lane
                  Internation School involving compensation in any form for
                  damages or losses sustained during travel or in accomodation
                </span>
              </li>
            </ol>
            <li>
              <span>
                Accept responsibility and will compensate for repair costs of
                any damage you inflict on the property of the school or any
                other conference venues
              </span>
            </li>
          </ol>

          <h4>3. PAYMENT</h4>
          <ol type="a">
            <li>
              Conference fees must be paid in full prior to the conference
            </li>
            <li>
              You forfeit your right to refund after registering and applying
              unless in case of the fault of the PLISMUN Secretariat
            </li>
          </ol>

          <h4>4. CONTENT OWNERSHIP</h4>
          <p>By applying to and participating in PLISMUN, you agree to:</p>
          <ol type="a">
            <li>
              <span>
                Waive ownership of and give consent to being photographed or
                filmed by conference press
              </span>
            </li>
            <li>
              <span>
                Give consent to photographic or cinematographic content
                including you in it to be shared and displayed, including, but
                not limited to:
              </span>
            </li>
            <ol type="i">
              <li>
                <span>
                  Social media - Facebook, instagram, Snapchat and Twitter
                </span>
              </li>
              <li>
                <span>The official PLISMUN website</span>
              </li>
              <li>
                <span>
                  Videos published to YouTube and played during opening and
                  closing ceremonies
                </span>
              </li>
              <li>
                <span>Future educational or promotional content</span>
              </li>
            </ol>
          </ol>

          <h4>5. DATA PRIVACY</h4>
          <p>
            By using this website, as well as registering and applying to the
            conference, you agree to our{" "}
            <Link href="/about/privacy">
              <a>Privacy Policy</a>
            </Link>
            , including use of cookies for analytical purposes.
          </p>

          <h4>6. LAW</h4>
          <p>
            Czech Law is applicable in Prague; all participants must abide by
            the law
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
