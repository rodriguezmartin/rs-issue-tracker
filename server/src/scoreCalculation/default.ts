import dayjs from 'dayjs'
import { GHIssue } from '../types'

const { LABELS_WEIGHT = '' } = process.env

const labelWeightFormatRegex = /^(\d+:\d+,)+\d+:\d+?$/

type Weights = {
  [id: string]: number
}

let weights: Weights = {}

if (LABELS_WEIGHT) {
  if (labelWeightFormatRegex.test(LABELS_WEIGHT)) {
    weights = LABELS_WEIGHT.split(',').reduce((accum, pair) => {
      const [id, weight] = pair.split(':')
      return {
        ...accum,
        [id]: Number(weight)
      }
    }, {})
  } else {
    console.warn('Invalid LABELS_WEIGHT format, ignoring it')
  }
}

export default function calculateScore(issue: GHIssue) {
  const weight = issue.labels.reduce((accum, label) => {
    const labelId = typeof label !== 'string' && label.id
    if (labelId && weights[labelId] && weights[labelId] > accum) {
      return weights[labelId]
    }
    return accum
  }, 0)

  const daysOpen = dayjs().diff(issue.created_at, 'days')

  return weight * daysOpen
}
