import { Committee, CommitteeCountries } from "@prisma/client"

export let committees: Committee[] = []
export const setCommittees = (c: Committee[]) => (committees = c)

export let committeeCountries: CommitteeCountries[] = []
export const setCommitteeCountries = (cc: CommitteeCountries[]) =>
  (committeeCountries = cc)
