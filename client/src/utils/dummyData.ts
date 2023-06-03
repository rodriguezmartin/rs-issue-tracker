import { IssueType, LabelType } from '../types'

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomLengthPhrase(min: number, max: number): string {
  return '____ '.repeat(randomNumber(min, max))
}

function createDummyLabel(): LabelType {
  return {
    name: randomLengthPhrase(1, 3),
  }
}

function createDummyIssue(): IssueType {
  return {
    title: randomLengthPhrase(3, 15),
    url: '#',
    number: randomNumber(1, 200),
    createdAt: Date.now().toString(),
    opener: {
      username: randomLengthPhrase(1, 2),
      url: '#'
    },
    labels: Array(randomNumber(1, 3)).fill(null).map(createDummyLabel),
    score: randomNumber(10, 2000),
    overdue: false
  }
}

export function getDummyIssues(quantity: number): IssueType[] {
  return Array(quantity).fill(null).map(createDummyIssue)
}
