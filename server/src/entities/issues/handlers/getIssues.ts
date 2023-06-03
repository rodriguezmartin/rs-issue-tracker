import { Request, Response } from 'express'
import { isString } from 'typed-assert'

import { adaptIssue } from '../adapters'
import request from '../../../utils/requestWithAuth'
import sendError from '../../../utils/sendError'
import { Issue } from '../../../types'

const { ORGANIZATION = '', REPOSITORY = '' } = process.env

export default async function getIssues({ query }: Request, res: Response) {
  try {
    const assignee = query.assignee || '*'
    isString(assignee, '[ASSERT] Multiple assignees not allowed')

    const { data } = await request('GET /repos/{owner}/{repo}/issues', {
      owner: ORGANIZATION,
      repo: REPOSITORY,
      assignee,
    })

    const response: Issue[] = data.map(adaptIssue)
    response.sort((a, b) => b.score - a.score)

    res.send(response)
  } catch (err) {
    sendError(res, err, "Couldn't fetch repository issues")
  }
}
