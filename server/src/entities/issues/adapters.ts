import { GHIssue, Issue, GHLabel } from '../../types'
import { calculateScore } from '../../scoreCalculation'

const { OVERDUE_THRESHOLD = '100' } = process.env

function adaptLabel(label: GHLabel) {
  if (typeof label === 'string') {
    return {
      name: label
    }
  }

  return {
    name: label.name || '',
    color: label.color
  }
}

export function adaptIssue(issue: GHIssue): Issue {
  const { title, html_url, number, created_at, user, labels } = issue

  const score = calculateScore(issue)

  const adapted: Issue = {
    title,
    url: html_url,
    number,
    createdAt: created_at,
    labels: labels.map(adaptLabel),
    score,
    overdue: score >= Number(OVERDUE_THRESHOLD)
  }

  if (user) {
    adapted.opener = {
      username: user?.login,
      url: user?.html_url
    }
  }

  return adapted
}
