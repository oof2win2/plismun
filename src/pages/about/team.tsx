import {
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react"
import Header from "@/components/header"

type PersonData = {
  image: string
  name: string
  description: string
  email: string
}

const PersonProfile = (data: PersonData) => {
  return (
    <GridItem>
      <Flex direction="column">
        <Image src={data.image} borderRadius="full" boxSize={300} />
        <Heading>{data.name}</Heading>
        <Text maxW={250}>{data.description}</Text>
        <Text>
          <a href={`mailto:${data.email}`}>{data.email}</a>
        </Text>
      </Flex>
    </GridItem>
  )
}

type AboutUsProps = {
  people: PersonData[]
}

export default function AboutUsPage({ people }: AboutUsProps) {
  return (
    <Container maxW="110ch">
      <Header title="About Us" />
      <Flex justify="center">
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={4}
        >
          {people.map((person, i) => (
            <PersonProfile key={i} {...person} />
          ))}
        </Grid>
      </Flex>
    </Container>
  )
}

export function getStaticProps() {
  return {
    props: {
      people: [
        {
          image: "/images/team/alexh.jpg",
          name: "Alex Houštecký",
          description: "Secretary General",
          email: "pupil.alex.houstecky@parklane-is.com",
        },
        {
          image: "/images/team/laural.jpg",
          name: "Laura Lhotáková",
          description: "Deputy Secretary General",
          email: "pupil.laura.lhotakova@parklane-is.com",
        },
        {
          image: "/images/team/laurak.png",
          name: "Laura Karasová",
          description: "Advisor?",
          email: "pupil.laura.karasova@parklane-is.com",
        },
      ],
    },
  }
}
