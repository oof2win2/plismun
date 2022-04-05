import "tsconfig-paths/register"

import { AppliedUser, PrismaClient } from "@prisma/client"
import faker from "@faker-js/faker"
import { SingleBar } from "cli-progress"
import { randomElementFromList } from "@utils/utils"
import { hashPassword } from "@utils/dbUtil"

const amountsToGenerate = {
  committees: 10,
  users: 500,
  delegations: 50,
  delegates: 250,
  committeeMembers: 100,
}

/**
 * Generate an array of random numbers that are different from each other.
 */
const randomDifferentNumbers = (min: number, max: number, count: number) => {
  const results: number[] = []
  while (results.length !== count) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min
    if (!results.includes(random)) {
      results.push(random)
    }
  }
  return results
}

// there is a list of just a few passwords for testing purposes
// fake users will have passwords in this array
const userPasswords = ["password", "password123", "123456"]

const db = new PrismaClient()
db.$connect()
async function main() {
  const resetBar = new SingleBar({
    format:
      "Resetting database [{bar}] {percentage}% | ETA: {eta_formatted} | {value}/{total}",
  })
  // get a list of all tables in the database so they can be truncated
  const allTables: { name: string }[] =
    await db.$queryRaw`SELECT name FROM sqlite_schema WHERE type = 'table' AND name NOT LIKE 'sqlite_%';`
  resetBar.start(allTables.length, 0)
  for (const table of allTables) {
    await db.$queryRawUnsafe(`DELETE FROM ${table.name}`)
    resetBar.increment()
  }
  resetBar.stop()

  const userBar = new SingleBar({
    format:
      "Generating users [{bar}] {percentage}% | ETA: {eta_formatted} |  {value}/{total}",
  })
  userBar.start(amountsToGenerate.users, 0)
  for (let i = 0; i < amountsToGenerate.users; i++) {
    await db.user.create({
      data: {
        email: faker.internet.email(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        password: await hashPassword(randomElementFromList(userPasswords)),
        createdAt: new Date(),
        birthdate: new Date(),
        phone: Math.random() > 0.5 ? faker.phone.phoneNumber() : undefined,
        nationality: faker.address.country(),
      },
    })
    userBar.increment()
  }
  userBar.stop()

  const committeeBar = new SingleBar({
    format:
      "Generating committees [{bar}] {percentage}% | ETA: {eta_formatted} | {value}/{total}",
  })
  committeeBar.start(amountsToGenerate.committees, 0)
  let startingCommitteeId: number | undefined = undefined
  for (let i = 0; i < amountsToGenerate.committees; i++) {
    const x = await db.committee.create({
      data: {
        displayname: faker.company.companyName(),
        difficulty: randomElementFromList([
          "beginner",
          "intermediate",
          "advanced",
        ]),
      },
    })
    if (!startingCommitteeId) startingCommitteeId = x.id
    committeeBar.increment()
  }
  committeeBar.stop()

  const committeeCountryBar = new SingleBar({
    format:
      "Generating committee countries [{bar}] {percentage}% | ETA: {eta_formatted} | {value}/{total}",
  })
  const countries = faker.helpers.uniqueArray(faker.address.countryCode, 25)
  committeeCountryBar.start(amountsToGenerate.committees * countries.length, 0)
  for (let i = 0; i < amountsToGenerate.committees; i++) {
    for (const country in countries) {
      await db.committeeCountries.create({
        data: {
          committeeId: startingCommitteeId! + i,
          countryCode: countries[country],
        },
      })
      committeeCountryBar.increment()
    }
  }
  committeeCountryBar.stop()

  const delegationBar = new SingleBar({
    format:
      "Generating delegations [{bar}] {percentage}% | ETA: {eta_formatted} | {value}/{total}",
  })
  delegationBar.start(amountsToGenerate.delegations, 0)
  const alreadyLeading: Set<number> = new Set()
  let currentDelegates = 0
  for (let i = 0; i < amountsToGenerate.delegations; i++) {
    let leaderId = Infinity
    // eslint-disable-next-line no-constant-condition
    while (true) {
      leaderId = Math.floor(Math.random() * amountsToGenerate.users)
      const canStop = !alreadyLeading.has(leaderId)
      alreadyLeading.add(leaderId)
      if (canStop) break
    }
    // make up a number of estimated delegates that will arrive from this delegation
    // min 1, max half of delegates that are not in a delegation yet
    const estimatedDelegates = faker.datatype.number({
      min: 1,
      max: Math.floor((amountsToGenerate.delegates - currentDelegates) / 2),
    })
    currentDelegates += estimatedDelegates
    await db.delegation.create({
      data: {
        // get a random user ID
        delegationLeaderId: leaderId,
        name: faker.company.companyName(),
        country: faker.address.country(),
        // make the estimated number of delegates be
        estimatedDelegates: estimatedDelegates,
      },
    })
    delegationBar.increment()
  }
  delegationBar.stop()

  const delegateBar = new SingleBar({
    format:
      "Generating delegates [{bar}] {percentage}% | ETA: {eta_formatted} | {value}/{total}",
  })
  delegateBar.start(amountsToGenerate.delegates, 0)
  const alreadyDelegating: Set<number> = new Set()
  const allDelegates: AppliedUser[] = []
  for (let i = 0; i < amountsToGenerate.delegates; i++) {
    // make sure that a user can be a delegate only once
    // make sure that a user can only lead OR delegate, not both
    let userId: number
    // eslint-disable-next-line no-constant-condition
    while (true) {
      userId = Math.floor(Math.random() * amountsToGenerate.users)
      const canStop =
        !alreadyDelegating.has(userId) && !alreadyLeading.has(userId)
      alreadyDelegating.add(userId)
      if (canStop) break
    }
    const choices = randomDifferentNumbers(
      0,
      amountsToGenerate.committees - 1,
      3
    )
    const delegate = await db.appliedUser.create({
      data: {
        delegationId: faker.datatype.number({
          min: 0,
          max: amountsToGenerate.delegations - 1,
        }),
        userId: userId,
        choice1committee: choices[0],
        choice1country: faker.address.country(),
        choice2committee: choices[1],
        choice2country: faker.address.country(),
        choice3committee: choices[2],
        choice3country: faker.address.country(),
        experience: faker.lorem.sentences(),
        motivation: faker.lorem.sentences(),
        paymentStatus: ["pending", "paid", "rejected"][
          Math.floor(Math.random() * 3)
        ],
      },
    })
    allDelegates.push(delegate)
    delegateBar.increment()
  }
  delegateBar.stop()

  const CommitteeMemberBar = new SingleBar({
    format:
      "Generating committee members [{bar}] {percentage}% | ETA: {eta_formatted} | {value}/{total}",
  })
  CommitteeMemberBar.start(amountsToGenerate.committeeMembers, 0)
  const alreadyInCommittee: Set<number> = new Set()
  const delegateUserIds = [...alreadyDelegating]
  for (let i = 0; i < amountsToGenerate.committeeMembers; i++) {
    let userId: number
    // genereate a random user ID that is a delegate and is not already in a committee
    // eslint-disable-next-line no-constant-condition
    while (true) {
      userId =
        delegateUserIds[Math.floor(Math.random() * delegateUserIds.length)]
      const canStop = !alreadyInCommittee.has(userId)
      alreadyInCommittee.add(userId)
      if (canStop) break
    }
    const user = allDelegates.find((delegate) => delegate.userId === userId)
    if (!user) {
      CommitteeMemberBar.increment()
      continue
    }
    // get a random committee from the user

    const committeeId = user.choice1committee
    const committeeCountry = user.choice1country
    await db.committeeMember.create({
      data: {
        userId: user.userId,
        committeeId: committeeId,
        countryCode: committeeCountry,
        displayname: committeeCountry,
        displayname2: committeeCountry,
      },
    })
    CommitteeMemberBar.increment()
  }
  CommitteeMemberBar.stop()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .then(() => {
    db.$disconnect().then(() => console.log("Disconnected DB"))
    console.log("Finished main")
  })
