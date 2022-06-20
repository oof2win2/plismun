import {
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react"
import Header from "@/components/header"
import { StaffMember } from "@prisma/client"
import { db } from "@/utils/db"
import Link from "next/link"
import { boolean, z } from "zod"

export default function AboutUsPage({ person }: { person: StaffMember }) {
  return (
    <Container maxW="110ch">
      <Header title="About Us" />
      <Flex justify="center">
        <Grid
          gap={4}
          templateAreas={`"name image"
													"description image"
					"description blank"`}
          gridTemplateRows="auto"
          gridTemplateColumns={"250px 1fr"}
        >
          <GridItem area="name" pl={2}>
            <Heading>{person.name}</Heading>
          </GridItem>
          <GridItem area="image" pl={2}>
            <Image src={person.image} borderRadius={4} boxSize={300} />
          </GridItem>
          <GridItem area="description" pl={2}>
            <Text>{person.text}</Text>
            <Text>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </Text>
          </GridItem>
        </Grid>
      </Flex>
    </Container>
  )
}

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
