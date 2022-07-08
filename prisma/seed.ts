import "tsconfig-paths/register"

import { AppliedUser, CommitteeCountries, PrismaClient } from "@prisma/client"
import faker from "@faker-js/faker"
import { SingleBar } from "cli-progress"
import { randomElementFromList } from "@/utils/utils"
import { hashPassword } from "@/utils/dbUtil"

const amountsToGenerate = {
  committees: 10,
  users: 100,
  delegations: 10,
  delegates: 25,
  chairs: 25,
  staff: 5,
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

  await db.$queryRaw`DELETE FROM sqlite_sequence;` // reset the autoincrement

  const userBar = new SingleBar({
    format:
      "Generating users [{bar}] {percentage}% | ETA: {eta_formatted} |  {value}/{total}",
  })
  userBar.start(amountsToGenerate.users, 0)
  let availableUserIDs = new Set<number>()
  for (let i = 0; i < amountsToGenerate.users; i++) {
    const user = await db.user.create({
      data: {
        email: faker.internet.email(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        password: await hashPassword(randomElementFromList(userPasswords)),
        createdAt: new Date(),
        birthdate: faker.date.past(18), // create a fake birthdate up to 18 years in the past
        phone: Math.random() > 0.5 ? faker.phone.phoneNumber() : undefined,
        nationality: faker.address.country(),
      },
    })
    availableUserIDs.add(user.id)
    userBar.increment()
  }
  userBar.stop()
  // shuffle the available user IDs
  availableUserIDs = new Set(
    [...availableUserIDs].sort(() => Math.random() - 0.5)
  )
  const getRandomUserID = () => {
    const [first] = availableUserIDs
    availableUserIDs.delete(first)
    if (first === undefined) throw new Error("No available users to get IDs of")
    return first
  }

  const committeeBar = new SingleBar({
    format:
      "Generating committees [{bar}] {percentage}% | ETA: {eta_formatted} | {value}/{total}",
  })
  const committeeIDs: number[] = []
  committeeBar.start(amountsToGenerate.committees, 0)
  for (let i = 0; i < amountsToGenerate.committees; i++) {
    const hasTopic2 = Math.random() > 0.5
    const x = await db.committee.create({
      data: {
        displayname: faker.company.companyName(),
        difficulty: randomElementFromList([
          "beginner",
          "intermediate",
          "advanced",
        ]),
        topic1: faker.lorem.sentence(),
        para1: faker.lorem.paragraph(),
        topic2: hasTopic2 ? faker.lorem.sentence() : undefined,
        para2: hasTopic2 ? faker.lorem.paragraph() : undefined,
      },
    })
    committeeIDs.push(x.id)
    committeeBar.increment()
  }
  committeeBar.stop()

  const committeeCountryBar = new SingleBar({
    format:
      "Generating committee countries [{bar}] {percentage}% | ETA: {eta_formatted} | {value}/{total}",
  })
  const countries = faker.helpers.uniqueArray(faker.address.country, 25)
  let committeeCountries: CommitteeCountries[] = []
  committeeCountryBar.start(amountsToGenerate.committees * countries.length, 0)
  for (let i = 0; i < amountsToGenerate.committees; i++) {
    for (const country of countries) {
      committeeCountries.push(
        await db.committeeCountries.create({
          data: {
            committeeId: randomElementFromList(committeeIDs),
            country: country,
            difficulty: randomElementFromList([
              "beginner",
              "intermediate",
              "advanced",
            ]),
          },
        })
      )
      committeeCountryBar.increment()
    }
  }
  committeeCountryBar.stop()
  // shuffle committee countries
  committeeCountries = committeeCountries.sort(() => Math.random() - 0.5)

  const delegationBar = new SingleBar({
    format:
      "Generating delegations [{bar}] {percentage}% | ETA: {eta_formatted} | {value}/{total}",
  })
  delegationBar.start(amountsToGenerate.delegations, 0)
  let currentDelegates = 0
  for (let i = 0; i < amountsToGenerate.delegations; i++) {
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
        delegationLeaderId: getRandomUserID(),
        name: faker.company.companyName(),
        country: faker.address.country(),
        // make the estimated number of delegates be
        estimatedDelegates: estimatedDelegates,
        phone: faker.phone.phoneNumber(),
        diet: "None",
        shirtSize: null,
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
  const allDelegates: AppliedUser[] = []
  for (let i = 0; i < amountsToGenerate.delegates; i++) {
    // make sure that a user can be a delegate only once
    // make sure that a user can only lead OR delegate, not both
    const userId = getRandomUserID()
    const choices = [
      randomElementFromList(committeeCountries),
      randomElementFromList(committeeCountries),
      randomElementFromList(committeeCountries),
    ]
    const delegate = await db.appliedUser.create({
      data: {
        userId: userId,
        delegationId: faker.datatype.number({
          min: 0,
          max: amountsToGenerate.delegations - 1,
        }),
        choice1committee: choices[0].committeeId,
        choice1country: choices[0].country,
        choice2committee: choices[1].committeeId,
        choice2country: choices[1].country,
        choice3committee: choices[2].committeeId,
        choice3country: choices[2].country,
        experience: faker.lorem.sentences(),
        motivation: faker.lorem.sentences(),
        paymentStatus: ["pending", "paid", "rejected"][
          Math.floor(Math.random() * 3)
        ],
        finalCommittee:
          Math.random() > 0.6
            ? choices[Math.floor(Math.random() * 3)].committeeId
            : null,
        finalCountry:
          Math.random() > 0.6
            ? choices[Math.floor(Math.random() * 3)].country
            : null,
      },
    })
    allDelegates.push(delegate)
    delegateBar.increment()
  }
  delegateBar.stop()

  const ChairBar = new SingleBar({
    format:
      "Generating chairs [{bar}] {percentage}% | ETA: {eta_formatted} | {value}/{total}",
  })
  ChairBar.start(amountsToGenerate.chairs, 0)
  for (let i = 0; i < amountsToGenerate.chairs; i++) {
    const userId = getRandomUserID()
    const choices = [
      randomElementFromList(committeeCountries),
      randomElementFromList(committeeCountries),
      randomElementFromList(committeeCountries),
    ]
    await db.chairApplication.create({
      data: {
        userId: userId,
        delegationId: faker.datatype.number({
          min: 0,
          max: amountsToGenerate.delegations - 1,
        }),
        choice1committee: choices[0].committeeId,
        choice2committee: choices[1].committeeId,
        choice3committee: choices[2].committeeId,
        experience: faker.lorem.sentences(),
        motivation: faker.lorem.sentences(),
        paymentStatus: ["pending", "paid", "rejected"][
          Math.floor(Math.random() * 3)
        ],
        finalCommittee:
          Math.random() > 0.6
            ? choices[Math.floor(Math.random() * 3)].committeeId
            : null,
        phone: faker.phone.phoneNumber(),
        diet: "None",
        shirtSize: null,
      },
    })
    ChairBar.increment()
  }
  ChairBar.stop()

  const StaffBar = new SingleBar({
    format:
      "Generating staff [{bar}] {percentage}% | ETA: {eta_formatted} | {value}/{total}",
  })
  StaffBar.start(amountsToGenerate.staff, 0)
  for (let i = 0; i < amountsToGenerate.staff; i++) {
    await db.staffMember.create({
      data: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        position: faker.lorem.words(),
        text: faker.lorem.paragraphs(),
        image: faker.image.avatar(),
      },
    })
    StaffBar.increment()
  }
  StaffBar.stop()
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
