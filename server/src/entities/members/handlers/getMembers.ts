import { Request, Response } from 'express'
import { request } from '@octokit/request'

import { adaptMember } from '../adapters'
import sendError from '../../../utils/sendError'

const { ORGANIZATION = '' } = process.env

export default async function getMembers(_: Request, res: Response) {
  try {
    const { data } = await request('GET /orgs/{org}/members', {
      org: ORGANIZATION,
    })

    const response = data.map(adaptMember)

    res.send(response)
  } catch (err) {
    sendError(res, err, "Couldn't fetch organization members")
  }
}
