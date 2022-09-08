import {
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react"
import { StaffMember } from "@prisma/client"
import { db } from "@/utils/db"
import { z } from "zod"

function AboutUsPage({ person }: { person: StaffMember }) {
  return (
    <Container maxW="110ch">
      <Flex justify="center" display={["none", "none", "flex", "flex"]}>
        <Grid
          gap={4}
          templateAreas={`"name image"
													"description image"
					"description blank"`}
          gridTemplateRows="auto"
          gridTemplateColumns={"auto auto"}
        >
          <GridItem area="name" pl={2}>
            <Heading>{person.name}</Heading>
          </GridItem>
          <GridItem area="image" pl={2}>
            <Image src={person.image} borderRadius={4} boxSize={300} />
          </GridItem>
          <GridItem area="description" pl={2}>
            {person.text.split("\n").map((x) => (
              <>
                <Text>{x}</Text>
                <br />
              </>
            ))}
            <Text>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </Text>
          </GridItem>
        </Grid>
      </Flex>
      <Flex display={["flex", "flex", "none", "none"]} direction="column">
        <Heading>{person.name}</Heading>
        <Image src={person.image} borderRadius={4} boxSize={300} />

        {person.text.split("\n").map((x) => (
          <>
            <Text>{x}</Text>
            <br />
          </>
        ))}
        <Text>
          <a href={`mailto:${person.email}`}>{person.email}</a>
        </Text>
      </Flex>
    </Container>
  )
}

AboutUsPage.pageName = "ABOUT US"
export default AboutUsPage

export async function getStaticProps({ params }: { params: { id: string } }) {
  const staffId = z.string().regex(/^\d+$/).transform(Number).parse(params.id)

  const person = await db.staffMember.findFirst({
    where: {
      id: staffId,
    },
  })
  return {
    props: {
      person,
    },
  }
}

export async function getStaticPaths() {
  const people = await db.staffMember.findMany({
    select: {
      id: true,
    },
  })
  return {
    paths: people.map((person) => {
      return {
        params: {
          id: person.id.toString(),
        },
      }
    }),
    fallback: false,
  }
}
