import { Request, Response } from 'express'
import request from '../../../utils/requestWithAuth'

import { adaptMember } from '../adapters'
import sendError from '../../../utils/sendError'
import { Member } from '../../../types'

const { ORGANIZATION = '' } = process.env

export default async function getMembers(_: Request, res: Response) {
  try {
    const { data } = await request('GET /orgs/{org}/members', {
      org: ORGANIZATION,
    })

    const response: Member[] = data.map(adaptMember)

    res.send(response)
  } catch (err) {
    sendError(res, err, "Couldn't fetch organization members")
  }
}
