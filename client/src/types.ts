export type MemberType = {
  username: string
  avatar: string
}

export type LabelType = {
  name: string
  color?: string | null
}

export type IssueType = {
  title: string
  url: string
  number: number
  createdAt: string,
  opener?: {
    username: string,
    url: string
  },
  labels: LabelType[],
  score: number
  overdue: boolean
}
