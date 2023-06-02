import { components } from '@octokit/openapi-types'

type schemas = components['schemas']

export type Member = schemas['simple-user']
export type Issue = schemas['issue']
export type Label = Issue['labels'][0]
