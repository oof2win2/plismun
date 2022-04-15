import Header from "@/components/header"
import { Heading, Text } from "@chakra-ui/react"
import React from "react"

export default function About() {
  return (
    <div className="c-page">
      <div className="container">
        <div className="page animate">
          <Header title="CONTACT US" />

          <div className="big__social">
            <ul className="social__list list-reset">
              <li className="social__item">
                <a
                  aria-label="twitter icon"
                  className="social__link"
                  href="https://twitter.com/plismun"
                  rel="noopener"
                  target="_blank"
                >
                  <ion-icon name="logo-twitter" />
                </a>
                <Text>@plismun</Text>
              </li>

              <li className="social__item">
                <a
                  aria-label="instagram icon"
                  className="social__link"
                  href="https://instagram.com/plismun"
                  rel="noopener"
                  target="_blank"
                >
                  <ion-icon name="logo-instagram" />
                </a>
                <Text>@plismun</Text>
              </li>

              <li className="social__item">
                <a
                  aria-label="facebook icon"
                  className="social__link"
                  href="https://www.facebook.com/Plismunofficial/"
                  rel="noopener"
                  target="_blank"
                >
                  <ion-icon name="logo-facebook" />
                </a>
                <Text>@Plismunofficial</Text>
              </li>

              <li className="social__item">
                <a
                  aria-label="email icon"
                  className="social__link"
                  href="mailto:secretariat@plismun.com"
                  rel="noopener"
                  target="_blank"
                >
                  <ion-icon name="mail" />
                </a>
                <Text>secretariat@plismun.com</Text>
              </li>
            </ul>
          </div>

          <br />

          <div className="c-contact-form" id="contact">
            <div className="container">
              <div className="row">
                <div className="col col-12">
                  <div className="c-contact-form__contact-head">
                    <Heading
                      size="2xl"
                      className="c-contact-form__contact-title"
                    >
                      Get in touch
                    </Heading>
                    <Text className="c-contact-form__contact-description">
                      Any inquiries? Please fill out the form below and we will
                      respond as soon as possible.
                    </Text>

                    <form
                      action=""
                      className="c-contact-form__form"
                      onSubmit={(e) => {
                        // TODO: store the form data somewhere so it can be responded to
                      }}
                    >
                      <div className="c-contact-form__form-group">
                        <label
                          className="c-contact-form__form-label screen-reader-text"
                          htmlFor="form-name"
                        >
                          Your Name
                        </label>
                        <input
                          className="c-contact-form__form-input"
                          id="form-name"
                          name="name"
                          placeholder="Your name..."
                          required={true}
                          type="text"
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
                          id="form-email"
                          name="_replyto"
                          placeholder="Your email..."
                          required={true}
                          type="email"
                        />
                      </div>
                      <div className="c-contact-form__form-group">
                        <label
                          className="c-contact-form__form-label screen-reader-text"
                          htmlFor="form-text"
                        >
                          Your Message
                        </label>
                        <textarea
                          className="c-contact-form__form-input"
                          id="form-text"
                          name="text"
                          placeholder="Your message..."
                          required={true}
                          rows={9}
                        />
                      </div>
                      <div className="c-contact-form__form-group c-contact-form__form-group--button">
                        <button
                          className="c-button c-button--primary c-button--large"
                          type="submit"
                        >
                          Send now
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
