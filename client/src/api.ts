import { IssueType, MemberType } from "./types"

async function doRequest<Response>(endpoint: string, params?: Record<string, string>) {
  const queryParams = new URLSearchParams(params).toString()
  const query = queryParams ? `?${queryParams}` : ''

  return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}${query}`)
    .then(response => response.json())
    .then(data => data as Response)
}

export type GetMembersResponse = MemberType[]

export async function fetchMembers() {
  return doRequest<GetMembersResponse>('members')
}

export type GetIssuesParams = {
  assignee?: string
}

export type GetIssuesResponse = IssueType[]

export async function fetchIssues(params?: GetIssuesParams) {
  return doRequest<GetIssuesResponse>('issues', params)
}
