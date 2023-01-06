import { Committee, CommitteeCountries } from "@prisma/client"
import { Committee as CommitteeSchema } from "@/utils/validators"
import { z } from "zod"
import { db } from "@/utils/db"
import { NextPage } from "next"
import React from "react"
import ENV from "@/utils/env"
import Link from "next/link"
import Image from "next/image"
import { Flex, Heading, Text } from "@chakra-ui/react"

interface CommitteesProps {
  committees: Committee[]
}

interface SingleCommitteeProps {
  committee: Committee
}

const Committee = ({ committee }: SingleCommitteeProps) => {
  console.log(committee.presentedBy)
  return (
    <article className="c-project-card col col-4 col-d-6 col-t-12">
      <div className="c-project-card__content">
        <Link href={`/committees/${committee.id}`}>
          <a className="c-project-card__image">
            <Image
              src={`/images/committees/${committee.id}.jpg`}
              layout="fill"
            />
          </a>
        </Link>
        {committee.presentedBy && (
          <Flex
            width="128"
            height="128"
            float="right"
            position="absolute"
            alignItems="center"
            justifyContent="center"
            right="2"
            top="2"
          >
            <Text color="whitesmoke">Presented by: </Text>
            <Image src={committee.presentedBy} width="128" height="128" />
          </Flex>
        )}
        <div className="c-project-card__info">
          <div className="c-project-card__info-wrap">
            <Heading size="lg" className="c-project-card__title-shown">
              {committee.displayname}
            </Heading>
            <Text className="c-project-card__subtitle">
              ({committee.difficulty})
            </Text>
          </div>
        </div>
      </div>
    </article>
  )
}

function Committees({ committees }: CommitteesProps) {
  // TODO: convert this to chakra components

  return (
    <div className="c-page">
      <div className="container">
        <div className="container animate">
          <div className="row" style={{ justifyContent: "center" }}>
            {committees.map((committee, i) => (
              <Committee committee={committee} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

Committees.pageName = "COMMITTEES"
export default Committees

export async function getStaticProps() {
  // const committees = await fetch("/api/committees").then((r) => r.json())
  const committees = await db.committee.findMany()

  const data = z.array(CommitteeSchema).parse(committees)

  return {
    props: {
      committees: data,
    },

    // re-generate the page's data at most every 24h (60s*60m*24h) ONLY ON PROD
    // re-generates ONLY if a request comes in, it doesn't re-generate the page if no requests come in
    // on dev, regenerate every second so that it is up to date
    revalidate: 60 * 60 * 24,
  }
}
