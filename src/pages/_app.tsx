import * as React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AppProps } from "next/app"
import "../styles/styles.scss"
import { wrapper } from "@/utils/redux/store"

function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>PLISMUN '23</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

// add redux
export default wrapper.withRedux(MyApp)
