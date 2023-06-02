import { Issue, Label } from '../../types'
import { calculateScore } from '../../scoreCalculation'

function adaptLabel(label: Label) {
  if (typeof label === 'string') {
    return {
      name: label
    }
  }

  const { name, color } = label

  return {
    name,
    color
  }
}

export function adaptIssue(issue: Issue) {
  const { title, url, number, created_at, user, labels } = issue

  return {
    title,
    url,
    number,
    createdAt: created_at,
    opener: {
      username: user?.login,
      url: user?.html_url
    },
    labels: labels.map(adaptLabel),
    score: calculateScore(issue)
  }
}
