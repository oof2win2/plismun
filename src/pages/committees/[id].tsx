import {
  ChairApplication,
  Committee,
  CommitteeCountries,
  User,
} from "@prisma/client"
import { Committee as CommitteeSchema } from "@/utils/validators"
import { z } from "zod"
import { db } from "@/utils/db"
import { GetStaticPaths, GetStaticProps } from "next"
import React from "react"
import superjson from "superjson"
import { Center, Flex, Heading, Text } from "@chakra-ui/react"

interface CommitteeProps {
  committee: Committee
  committeeCountries: CommitteeCountries[]
  committeeChairs: User[]
}

const CommitteePage = ({ stringified }: { stringified: string }) => {
  const { committee, committeeCountries, committeeChairs }: CommitteeProps =
    superjson.parse(stringified)
  const beginnerCountries = committeeCountries.filter(
    (c) => c.difficulty === "beginner"
  )
  const intermediateCountries = committeeCountries.filter(
    (c) => c.difficulty === "intermediate"
  )
  const advancedCountries = committeeCountries.filter(
    (c) => c.difficulty === "advanced"
  )

  return (
    <div className="container">
      <div className="container">
        <div className="c-page-heading">
          <Heading size="3xl" className="c-page-heading__title">
            {committee.displayname}
          </Heading>

          <Text className="c-page-heading__description">
            ({committee.difficulty})
          </Text>
        </div>
      </div>

      <div className="page animate">
        <Heading size="lg">Topic 1: {committee.topic1}</Heading>
        <Text>{committee.para1}</Text>
        <br />

        {committee.topic2 && (
          <>
            <Heading size="lg">Topic 2: {committee.topic2}</Heading>
            <Text>{committee.para2}</Text>
          </>
        )}
        <br />

        <Heading size="lg">Chairs</Heading>
        <Center>
          <Flex>
            <Center flexDir="column" margin="8px">
              <Heading size="sm">Chair 1</Heading>
              {committeeChairs[0] ? (
                <Text>
                  {committeeChairs[0].firstname} {committeeChairs[0].lastname}
                </Text>
              ) : (
                <Text>No determined chair yet</Text>
              )}
            </Center>
            <Center flexDir="column" margin="8px">
              <Heading size="sm">Chair 2</Heading>
              {committeeChairs[1] ? (
                <Text>
                  {committeeChairs[1].firstname} {committeeChairs[1].lastname}
                </Text>
              ) : (
                <Text>No determined chair yet</Text>
              )}
            </Center>
          </Flex>
        </Center>
        <br />

        <Heading size="lg">Country matrix</Heading>

        <Center>
          <Flex direction="column">
            <Heading size="md" textAlign="center">
              Beginner ({beginnerCountries.length})
            </Heading>
            {beginnerCountries.map((c) => (
              <>
                <Text align="center">{c.country}</Text>
                <br></br>
              </>
            ))}
          </Flex>
        </Center>
        <br />

        <Center>
          <Flex direction="column">
            <Heading size="md" textAlign="center">
              Intermediate ({intermediateCountries.length})
            </Heading>
            {intermediateCountries.map((c) => (
              <>
                <Text align="center">{c.country}</Text>
                <br></br>
              </>
            ))}
          </Flex>
        </Center>
        <br />

        <Center>
          <Flex direction="column">
            <Heading size="md" textAlign="center">
              Advanced ({advancedCountries.length})
            </Heading>
            {advancedCountries.map((c) => (
              <>
                <Text align="center">{c.country}</Text>
                <br></br>
              </>
            ))}
          </Flex>
        </Center>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<{ stringified: string }> = async ({
  params,
}) => {
  if (!params) throw new Error("Expected params")
  const committeeId = z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .parse(params.id)
  const committee = await db.committee.findFirst({
    where: {
      id: committeeId,
    },
  })
  if (!committee) throw new Error("Unexpected committe ID received")

  const countries = await db.committeeCountries.findMany({
    where: {
      committeeId,
    },
  })

  const chairs = await db.chairApplication.findMany({
    where: {
      finalCommittee: committeeId,
    },
  })

  const chairUsers = await db.user.findMany({
    where: {
      id: {
        in: chairs.map((c) => c.userId),
      },
    },
  })

  return {
    props: {
      stringified: superjson.stringify({
        committee: committee,
        committeeCountries: countries,
        committeeChairs: chairUsers,
      }),
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const committees = await fetch("/api/committees").then((r) => r.json())
  const committees = await db.committee.findMany()

  const data = z.array(CommitteeSchema).parse(committees)

  return {
    paths: data.map((committee) => {
      return {
        params: {
          id: committee.id.toString(),
        },
      }
    }),

    // return a 404 if the path is NOT in the paths array
    fallback: false,
  }
}

CommitteePage.pageName = "COMMITTEES"

export default CommitteePage
