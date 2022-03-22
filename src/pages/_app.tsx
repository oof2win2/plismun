// This file overrides the default page. If you want something to be present across all pages (f.e. theme or a page header), put it here

import Navbar from "@components/navbar"
import { ThemeProvider } from "@mui/styles"
import { theme as Theme } from "@utils/styles"
import { CssBaseline } from "@mui/material"
import type { AppProps } from "next/app"
import "@fontsource/roboto"

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
