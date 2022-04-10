import * as React from "react"
import Head from "next/head"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AppProps } from "next/app"
import "../styles/styles.scss"
import { wrapper } from "@/utils/redux/store"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "@/utils/styles"

function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>PLISMUN '23</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </div>
  )
}

// add redux
export default wrapper.withRedux(MyApp)
