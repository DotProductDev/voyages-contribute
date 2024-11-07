import { combineChanges, EntityChange } from "./changeSets"

export interface ChangeSet {
  id: number
  author: string
  title: string
  comments: string
  timestamp: number
  changes: EntityChange[]
}

export interface PublicationBatch {
  title: string
  comments: string
  published: boolean
}

export enum ContributionStatus {
  WorkInProgress = 0,
  Submitted = 1,
  Accepted = 2,
  Rejected = 3,
  Published = 4
}

export interface Review {
  changeSet: ChangeSet
  stackOrder: number
}

export interface ContributionMedia {
  type: "audio" | "image" | "document"
  file: string
  name: string
  comments: string
}

export interface Contribution {
  /**
   * The original contribution change set.
   */
  changeSet: ChangeSet
  status: ContributionStatus
  /**
   * The linear sequence of editorial reviews applied to this contribution.
   */
  reviews: Review[]
  media: ContributionMedia[]
  batch?: PublicationBatch
}

export const combineContributionChanges = (contrib: Contribution) => {
  const sorted = [...contrib.reviews]
  sorted.sort((a, b) => a.stackOrder - b.stackOrder)
  return combineChanges([
    ...contrib.changeSet.changes,
    ...sorted.map((r) => r.changeSet.changes).flat()
  ])
}
