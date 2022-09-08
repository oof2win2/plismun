import Image from "next/image"
import { Heading, Center } from "@chakra-ui/react"

type HeaderProps =
  | {
      title?: undefined
      mainPage: true
    }
  | {
      title: string
      mainPage?: undefined
    }

export default ({ title, mainPage }: HeaderProps) => {
  return (
    <div
      style={{
        paddingBottom: mainPage ? "12vh" : "16vh",
      }}
    >
      <Center
        paddingTop="8vh"
        flexDir="column"
        backgroundImage={'url("/images/school_img2.jpg")'}
        backgroundPosition="center center"
        paddingBottom="8vh"
      >
        {mainPage ? (
          <>
            <Image src="/images/fulllogo.png" height={350} width={350} />
            <Heading color="white">JANUARY 26TH - 29TH, 2023</Heading>
          </>
        ) : (
          <Heading color="white">{title}</Heading>
        )}
      </Center>
    </div>
  )
}
