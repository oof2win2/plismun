import Header from "@components/header"
import Link from "next/link"
import React from "react"

export default function About() {
  return (
    <div className="c-page">
      <div className="container">
        <div className="page animate">
          <Header title="PRIVACY POLICY" />

          <p>
            PLISMUN ('we' or 'us') collect, process and use personally
            identifiable information in accordance with the principles described
            in this privacy policy, as well as in observance with data
            protection laws in the Czech Republic and the European Union.
            PLISMUN is the controller of personal data and we are responsible
            for, and control the processing of, the personal information that we
            collect from you. You can contact us regarding any issues at{" "}
            <a href="mailto:privacy@plismun.com">privacy@plismun.com</a>
          </p>

          <h4>WHAT INFORMATION WILL WE COLLECT?</h4>
          <p>
            Information that we collect from you may include personal
            information, such as name, email address, phone number, gender,
            responses to forms, as well as technical information, such as device
            details, IP address, browsers used to view our website and how you
            use our website. Our website uses cookies for features of Google
            Analytics. PLISMUN and Google may use first-party cookies to
            optimise user experience and to provide data analysis to improve our
            website and services. In an effort to provide more choice on how
            data is collected through Google Analytics, Google has developed an
            Opt-out Browser add-on which may be installed and opt-out of
            Google's programs.
          </p>

          <h4>HOW WILL WE USE COLLECTED INFORMATION?</h4>
          <p>Your information is used by us to:</p>
          <ul>
            <li>
              Facilitate our services and to help us improve them, so we can
              provide the best possible experience for you and other users;
              something in our legitimate interest.
            </li>
            <li>
              To communicate with you with you. Information may be collected
              from correspondances you send to us and can include name, email
              address and phone number. This is necessary for administration and
              provision of our service
            </li>
            <li>
              To identify and administer user accounts. Your information will be
              used to perform associated activites and services pertaining to
              the operation of PLISMUN. This information may include name, email
              address, phone number, date of birth and gender, which may be
              collected during account registration or the application procedure{" "}
            </li>
            <li>
              To administer our website and to carry out data analysis. We use
              your information so that we may view and analyse website usage,
              which is used in the development and improvement of our website.
              This information may be collected in the form of cookies, shared
              with third parties such as Google Analytics
            </li>
          </ul>

          <h4>HOW WILL WE SHARE YOUR DATA?</h4>
          <p>
            PLISMUN will not sell any of your data. To be able to provide our
            services to you and to improve our services, we may share data with
            third parties that provide professional services to us, including
            data analytics and web hosting providers. We store personal data
            within the European Economic Area (EEA) but data may be transferred
            and processed in a third country outside the EEA by us or a third
            party with facilities located outside the EEA. We only work with
            trusted third parties that can ensure the safety of your
            information.
          </p>

          <h4>HOW LONG WE RETAIN YOUR DATA FOR</h4>
          <p>
            Personal data that we collected will not be stored longer than
            necessary. Data that we collected from you used to help develop and
            deliver services may be held for a period of 5 years, unless you
            request to delete your information. The specified period is so that
            the current organisational team and future teams will have a set of
            data to work with and to understand attendee demographics.
          </p>

          <h4>KEEPING YOUR DATA SECURE</h4>
          <p>
            We use technological and organisational measures to ensure your data
            is safe and secure. Information provided to us is stored securely
            with passwords and encryption. Your account is controlled by a
            hashed password unique to you and cannot be accessed by anyone
            without knowledge of your email and password. Access to the database
            storing personal information is secure and restricted, shared with
            only those necessary in overseeing its administration. Be advised
            that the transmission of data over the Internet is not completely
            secure. While your connection to our website is protected by SSL
            encryption and we prioritise maintaining personal data integrity to
            the highest degree, we cannot guarentee the security of your data
            during transmission to our website, hence transmission of data is at
            your own risk. Our website may include links to third parties. Due
            to the fact that we have no control over the content and policies of
            these third parties, we therefore cannot accept responsibility for
            the protection and privacy of any information you provide whilst
            visiting these third party websites.
          </p>

          <h4>YOUR RIGHTS AS A USER</h4>
          <p>
            As a data subject, the General Data Protection Regulation stipulates
            that you, the user, are entitled to rights which we will facilitate
            your access to. These rights are as such:
          </p>

          <ol>
            <li>
              <b>The right to be informed</b> - we must inform you on how we are
              going to use your personal data. We achieve this through this
              privacy policy
            </li>
            <li>
              <b>The right of access</b> - you have the right to access the
              personal data that we hold about you. Upon your request, we must
              respond within up to a month
            </li>
            <li>
              <b>The right to rectification</b> - in the event that you believe
              information that we hold about you is incorrect, you may request
              that we correct it
            </li>
            <li>
              <b>The right to erasure</b> - you have the right to request that
              we delete the personal data that we hold about you. Provided we do
              not have a compelling reason to retain it, we will honour the
              request
            </li>
            <li>
              <b>The right to restrict processing</b> - you have the right to
              change your communication preferences or to suppress the
              processing of your personal data
            </li>
            <li>
              <b>The right to data portability</b> - you have the ability to
              obtain and reuse your personal data for your own purposes across
              different services
            </li>
            <li>
              <b>The right to object</b> - you may request the right to object
              to any processing where our basis is in legitimate interest
            </li>
            <li>
              <b>
                Rights in relation to automated decision making and profiling
              </b>{" "}
              - the right states that we cannot make solely automated decision,
              which includes those base upon profiling or that have legal or
              significant effects on individuals. PLISMUN, does not do this,
              however this privacy policy will be updated accordingly if we ever
              change that
            </li>
          </ol>

          <p>
            If you would like to request or exercise one of these rights, you
            may contact us at{" "}
            <a href="mailto:privacy@plismun.com">privacy@plismun.com</a>
          </p>

          <h4>CHANGES TO THIS PRIVACY POLICY</h4>
          <p>
            We may implement changes to our privacy policy on occasion. Changes
            to our policy will be displayed here on this page so it is advised
            that you check back regularly to ensure you see future updates or
            changes.
          </p>
          <p>Last update: 20 May, 2019</p>
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
