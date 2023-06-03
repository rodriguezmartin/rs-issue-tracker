import { request } from '@octokit/request'
import { Route, RequestParameters } from '@octokit/types'

const { GITHUB_TOKEN } = process.env

export default function requestWithAuth(route: Route, parameters: RequestParameters = {}) {
  const headers = { ...parameters.headers }

  if (!headers.authorization && GITHUB_TOKEN) {
    headers.authorization = `token ${GITHUB_TOKEN}`
  }

  return request(route, {
    ...parameters,
    headers
  })
}
