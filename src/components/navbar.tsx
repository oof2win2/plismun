// import { useAppSelector } from "@/utils/redux/hooks"
// import Image from "next/image"
// import Link from "next/link"
// import { useRouter } from "next/router"
// import { useState } from "react"
// import { Flex, Center, Text, Square, Spacer } from "@chakra-ui/react"

// type Page = {
//   type: "page"
//   title: string
//   href: string
// }
// type Category = {
//   type: "category"
//   categoryName: string
//   pages: Page[]
// }

// const pages: (Page | Category)[] = [
//   {
//     type: "page",
//     title: "Home",
//     href: "/",
//   },
//   {
//     categoryName: "About",
//     type: "category",
//     pages: [
//       { title: "About PLISMUN", href: "/about", type: "page" },
//       {
//         title: "Privacy Policy",
//         href: "/about/privacy",
//         type: "page",
//       },
//       {
//         title: "Terms of Service",
//         href: "/about/tos",
//         type: "page",
//       },
//     ],
//   },
//   {
//     type: "page",
//     title: "Contact",
//     href: "/contact",
//   },
//   {
//     type: "page",
//     title: "Committees",
//     href: "/committees",
//   },
// ]

// const Navbar = () => {
//   const router = useRouter()
//   const [navIsOpen, setNavIsOpen] = useState(false)
//   const { user } = useAppSelector((state) => state.user)

//   const currentPage = router.asPath

//   return (
//     // <header className="c-header">
//     //   <div className="container">
//     //     <div className="row">
//     //       <div className="c-header__inner">
//     //         <div className="logo">
//     //           {/* nbsp here so it looks good guaranteed */}
//     //           <h3>PLISMUN&nbsp;'23</h3>
//     //         </div>
//     //         <nav className={`main-nav${navIsOpen ? " is-open" : ""}`}>
//     //           <div className="main-nav__box">
//     //             <div
//     //               className="nav__icon-close"
//     //               onClick={() => setNavIsOpen(false)}
//     //             >
//     //               <ion-icon name="close" />
//     //             </div>

//     //             <div className="nav__title">Menu</div>

//     //             <ul className="nav__list list-reset">
//     //               {pages
//     //                 // .filter((page): page is Page => page.type == "page")
//     //                 .map((page) => {
//     //                   return page.type == "page" ? (
//     //                     <li className="nav__item" key={page.href}>
//     //                       <Link href={page.href}>
//     //                         <a
//     //                           className={
//     //                             "nav__link" +
//     //                             (currentPage === page.href
//     //                               ? " active-link"
//     //                               : "")
//     //                           }
//     //                           onClick={() => setNavIsOpen(false)}
//     //                         >
//     //                           {page.title}
//     //                         </a>
//     //                       </Link>
//     //                     </li>
//     //                   ) : (
//     //                     <li
//     //                       className="nav__item dropdown"
//     //                       key={page.categoryName}
//     //                     >
//     //                       <span className="nav__link dropdown-toggle">
//     //                         {page.categoryName}{" "}
//     //                         <ion-icon
//     //                           name="chevron-down-outline"
//     //                           style={{ verticalAlign: "middle" }}
//     //                         />
//     //                       </span>
//     //                       <div className="dropdown-menu">
//     //                         {page.pages.map((pg) => {
//     //                           return (
//     //                             <Link href={pg.href} key={pg.href}>
//     //                               <a
//     //                                 className={
//     //                                   "nav__link" +
//     //                                   (currentPage === pg.href
//     //                                     ? " active-link"
//     //                                     : "")
//     //                                 }
//     //                                 onClick={() => setNavIsOpen(false)}
//     //                               >
//     //                                 {pg.title}
//     //                               </a>
//     //                             </Link>
//     //                           )
//     //                         })}
//     //                       </div>
//     //                     </li>
//     //                   )
//     //                 })}
//     //             </ul>
//     //           </div>

//     //           <div className="user">
//     //             <ul className="user__list list-reset">
//     //               {user ? (
//     //                 <li className="user__item user__link">
//     //                   <Link href="/user/logout">
//     //                     <a
//     //                       className={
//     //                         "nav__link" +
//     //                         (currentPage === "/user/logout"
//     //                           ? " active-link"
//     //                           : "")
//     //                       }
//     //                       onClick={() => setNavIsOpen(false)}
//     //                     >
//     //                       Log out
//     //                     </a>
//     //                   </Link>
//     //                 </li>
//     //               ) : (
//     //                 <li className="user__item user__link">
//     //                   <Link href="/user/login">
//     //                     <a
//     //                       className={
//     //                         "nav__link" +
//     //                         (currentPage === "/user/login"
//     //                           ? " active-link"
//     //                           : "")
//     //                       }
//     //                       onClick={() => setNavIsOpen(false)}
//     //                     >
//     //                       Log in
//     //                     </a>
//     //                   </Link>
//     //                 </li>
//     //               )}
//     //             </ul>
//     //           </div>
//     //         </nav>
//     //         <div className="nav-button" onClick={() => setNavIsOpen(true)}>
//     //           <ion-icon class="nav_button nav__icon-menu" name="menu-outline" />
//     //           {/* <i className="nav__icon nav__icon-menu ion ion-md-menu"></i> */}
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </header>
//     <Flex as="header" w="100vw">
//       <Square size="150">
//         <Text>PLISMUN '23</Text>
//       </Square>
//       <Spacer />
//     </Flex>
//   )
// }

// export default Navbar

import { useState } from "react"
import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton,
  Text,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  useColorModeValue,
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
    <Flex zIndex={1}>
      <Flex position={"absolute"} top="1rem" right="1rem" align="center">
        {/* Desktop */}
        <Flex display={["none", "none", "flex", "flex"]}>
          {pages.map((page) =>
            page.type === "category" ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  my={5}
                  variant="ghost"
                >
                  {page.categoryName}
                </MenuButton>
                <MenuList>
                  {page.pages.map((pg) => (
                    <MenuItem>
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
              <NextLink href={page.href}>
                <Button as="a" variant="ghost" my={5}>
                  {page.title}
                </Button>
              </NextLink>
            )
          )}
        </Flex>
        <IconButton
          aria-label="Toggle dark mode"
          icon={isDark ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          as="a"
          variant="ghost"
          display={["none", "none", "flex", "flex"]}
        />

        {/* Mobile */}
        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          onClick={() => changeDisplay("flex")}
          display={["flex", "flex", "none", "none"]}
          as="a"
        />
        <IconButton
          aria-label="Toggle dark mode"
          size="lg"
          mr={2}
          icon={isDark ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          as="a"
          display={["flex", "flex", "none", "none"]}
        />
      </Flex>

      {/* Mobile Content */}
      <Flex
        w="100vw"
        display={display}
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
          />
        </Flex>

        <Flex flexDir="column" align="center">
          {pages.map((page) =>
            page.type === "category" ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  my={5}
                  variant="ghost"
                >
                  {page.categoryName}
                </MenuButton>
                <MenuList>
                  {page.pages.map((pg) => (
                    <MenuItem>
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
              <NextLink href={page.href}>
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
  )
}

export default Navbar
