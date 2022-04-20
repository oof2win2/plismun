import { useState } from "react"
import {
  useColorMode,
  Flex,
  Button,
  IconButton,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  useColorModeValue,
  Heading,
  Box,
} from "@chakra-ui/react"
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons"
import NextLink from "next/link"

type Page = {
  type: "page"
  title: string
  href: string
}
type Category = {
  type: "category"
  categoryName: string
  pages: Page[]
}

const pages: (Page | Category)[] = [
  {
    type: "page",
    title: "Home",
    href: "/",
  },
  {
    categoryName: "About",
    type: "category",
    pages: [
      { title: "About PLISMUN", href: "/about", type: "page" },
      {
        title: "Privacy Policy",
        href: "/about/privacy",
        type: "page",
      },
      {
        title: "Terms of Service",
        href: "/about/tos",
        type: "page",
      },
    ],
  },
  {
    type: "page",
    title: "Contact",
    href: "/contact",
  },
  {
    type: "page",
    title: "Committees",
    href: "/committees",
  },
]

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === "dark"
  const [display, changeDisplay] = useState("none")

  return (
    <Flex alignItems="center" padding="20px 10px 20px 10px">
      <Flex alignItems="center" width="100%">
        <Box padding="4">
          <Heading whiteSpace="nowrap">PLISMUN '23</Heading>
        </Box>

        {/* Desktop */}
        <Flex
          display={["none", "none", "flex", "flex"]}
          marginLeft="auto"
          alignItems="center"
        >
          {pages.map((page, i) =>
            page.type === "category" ? (
              <Menu key={i}>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  my={5}
                  variant="ghost"
                >
                  {page.categoryName}
                </MenuButton>
                <MenuList>
                  {page.pages.map((pg, i) => (
                    <MenuItem key={i}>
                      <NextLink href={pg.href}>
                        <Button as="a" variant="ghost">
                          {pg.title}
                        </Button>
                      </NextLink>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            ) : (
              <NextLink href={page.href} key={i}>
                <Button as="a" variant="ghost" my={5}>
                  {page.title}
                </Button>
              </NextLink>
            )
          )}
          <IconButton
            aria-label="Toggle dark mode"
            icon={isDark ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            as="a"
            variant="ghost"
          />
        </Flex>

        {/* Mobile closed */}
        <Flex
          display={["flex", "flex", "none", "none"]}
          marginLeft="auto"
          alignItems="center"
        >
          <IconButton
            aria-label="Open Menu"
            size="lg"
            icon={<HamburgerIcon />}
            onClick={() => changeDisplay("flex")}
            as="a"
            variant="ghost"
          />
          <IconButton
            aria-label="Toggle dark mode"
            size="lg"
            icon={isDark ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            as="a"
            variant="ghost"
          />
        </Flex>
        {/* Mobile open */}
        <Flex
          w="100vw"
          display={display}
          padding="20px 10px 20px 10px"
          bgColor={useColorModeValue("white", "gray.800")}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          zIndex={20}
          overflowY="auto"
          flexDir="column"
        >
          <Flex justify="flex-end">
            <IconButton
              mt={2}
              mr={2}
              aria-label="Open Menu"
              size="lg"
              icon={<CloseIcon />}
              onClick={() => changeDisplay("none")}
              variant="ghost"
            />
          </Flex>

          <Flex flexDir="column" align="center">
            {pages.map((page, i) =>
              page.type === "category" ? (
                <Menu key={i}>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    my={5}
                    variant="ghost"
                  >
                    {page.categoryName}
                  </MenuButton>
                  <MenuList>
                    {page.pages.map((pg, i) => (
                      <MenuItem key={i}>
                        <NextLink href={pg.href}>
                          <Button
                            as="a"
                            variant="ghost"
                            aria-label={pg.title}
                            w="100%"
                            onClick={() => changeDisplay("none")}
                          >
                            {pg.title}
                          </Button>
                        </NextLink>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              ) : (
                <NextLink href={page.href} key={i}>
                  <Button
                    as="a"
                    variant="ghost"
                    my={5}
                    onClick={() => changeDisplay("none")}
                  >
                    {page.title}
                  </Button>
                </NextLink>
              )
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Navbar
