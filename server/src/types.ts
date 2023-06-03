import { components } from '@octokit/openapi-types'

type schemas = components['schemas']

export type GHMember = schemas['simple-user']
export type GHIssue = schemas['issue']
export type GHLabel = GHIssue['labels'][0]

export type Member = {
  username: string
  avatar: string
}

export type Label = {
  name: string
  color?: string | null
}

export type Issue = {
  title: string
  url: string
  number: number
  createdAt: string,
  opener?: {
    username: string,
    url: string
  },
  labels: Label[],
  score: number
  overdue: boolean
}
