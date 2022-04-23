import { extendTheme } from "@chakra-ui/react"

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
}

export const theme = extendTheme({
  colors: {
    brand: {
      50: "#ddf7fc",
      100: "#bbe6f0",
      200: "#97d8e4",
      300: "#71ccd8",
      400: "#4cc2cd",
      500: "#32adb3",
      600: "#227f8b",
      700: "#125665",
      800: "#002f3e",
      900: "#000f18",
    },
  },
  components: {
    Form: {
      variants: {
        // when using floating labels, the label must come AFTER the input component due to CSS selectors
        // also make sure to have a placeholder on the input element
        // floating: {
        //   container: {
        //     _focusWithin: {
        //       label: {
        //         ...activeLabelStyles,
        //       },
        //     },
        //     "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label":
        //       {
        //         ...activeLabelStyles,
        //       },
        //     label: {
        //       top: 0,
        //       left: 0,
        //       zIndex: 2,
        //       position: "absolute",
        //       // backgroundColor: "white",
        //       pointerEvents: "none",
        //       mx: 3,
        //       px: 1,
        //       my: 2,
        //       transformOrigin: "left top",
        //     },
        //   },
        // },
      },
    },
  },
})
