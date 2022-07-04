import * as React from "react"
import Head from "next/head"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AppProps } from "next/app"
import "../styles/styles.scss"
import { wrapper } from "@/utils/redux/store"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "@/utils/styles"
import { PersistGate } from "redux-persist/integration/react"
import { useStore } from "react-redux"

function MyApp(props: AppProps) {
  const { Component, pageProps } = props
  const store = useStore()

  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>PLISMUN '23</title>
        <link rel="icon" href="/images/miniiconlogo.png" />
      </Head>
      {/* @ts-expect-error due to the fact that __PERSISTOR is not default and ts will complain */}
      <PersistGate persistor={store.__PERSISTOR}>
        <ChakraProvider theme={theme}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </ChakraProvider>
      </PersistGate>
    </div>
  )
}

// add redux
export default wrapper.withRedux(MyApp)
