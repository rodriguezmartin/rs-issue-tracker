import { Response } from 'express'
import { RequestError } from '@octokit/request-error'

// It says "error" param is not being used which is technically true
// but we need it anyways for the type predicate
// @ts-ignore
const isOctokitError = (error: any): error is RequestError => true

export default function sendError(res: Response, error?: unknown, defaultMessage?: string) {
  if (isOctokitError(error) && error.status === 404 && error.request?.url) {
    res.status(404).send(`Not found: ${error.request.url}`)
  }
  
  if (error instanceof Error && error.message.startsWith('[ASSERT] ')) {
    res.status(400).send(error.message.split('[ASSERT] ')[1])
  }

  res.status(500).send(defaultMessage || 'Something went wrong')
}
