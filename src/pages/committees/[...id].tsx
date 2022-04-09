import Header from "@components/header"
import { Committee, CommitteeCountries } from "@prisma/client"
import { Committee as CommitteeSchema } from "@utils/validators"
import { z } from "zod"
import { db } from "@utils/db"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import React from "react"

interface CommitteeProps {
  committee: Committee
  committeeCountries: CommitteeCountries[]
}

const CommitteePage = ({ committee, committeeCountries }: CommitteeProps) => {
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
      <Header title="COMMITTEES" />

      <div className="container">
        <div className="c-page-heading">
          <h1 className="c-page-heading__title">{committee.displayname}</h1>

          <p className="c-page-heading__description">
            ({committee.difficulty})
          </p>
        </div>
      </div>

      <div className="page animate">
        <p>{committee.description}</p>

        <h3>Topic 1: {committee.topic1}</h3>
        <p>{committee.para1}</p>

        {committee.topic2 && (
          <>
            <h3>Topic 2: {committee.topic2}</h3>
            <p>{committee.para2}</p>
          </>
        )}

        <h3>Country matrix</h3>
        <h4>Beginner ({beginnerCountries.length})</h4>
        <p>{beginnerCountries.map((c) => c.country).join(", ")}</p>

        <h4>Intermediate ({intermediateCountries.length})</h4>
        <p>{intermediateCountries.map((c) => c.country).join(", ")}</p>

        <h4>Advanced ({advancedCountries.length})</h4>
        <p>{advancedCountries.map((c) => c.country).join(", ")}</p>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<CommitteeProps> = async ({
  params,
}) => {
  if (!params) throw new Error("Expected params")
  const committeeIds = z
    .array(z.string().regex(/^\d+$/).transform(Number))
    .parse(params.id)
  const committeeId = committeeIds[0]
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

  return {
    props: {
      committee: committee,
      committeeCountries: countries,
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
          id: [committee.id.toString()],
        },
      }
    }),

    // return a 404 if the path is NOT in the paths array
    fallback: false,
  }
}

export default CommitteePage
