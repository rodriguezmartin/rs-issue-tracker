import { Request, Response } from 'express'
import { request } from '@octokit/request'
import { isString } from 'typed-assert'

import { adaptIssue } from '../adapters'
import sendError from '../../../utils/sendError'

const { ORGANIZATION = '', REPOSITORY = '' } = process.env

export default async function getIssues({ query }: Request, res: Response) {
  try {
    const assignee = query.assignee || '*'
    isString(assignee, '[ASSERT] Multiple assignees not allowed')

    const { data } = await request('GET /repos/{owner}/{repo}/issues', {
      owner: ORGANIZATION,
      repo: REPOSITORY,
      assignee: '*',
    })

    const response = data.map(adaptIssue).sort((a, b) => b.score - a.score)

    res.send(response)
  } catch (err) {
    sendError(res, err, "Couldn't fetch repository issues")
  }
}
