import React from 'react'
import useSWR from 'swr'
import Issue from '../../components/Issue'
import { fetchIssues, GetIssuesParams } from '../../api'
import classes from './styles.module.scss'

type Props = {
  member: string
}

export default function IssueList({ member }: Props) {
  const issues = useSWR(['issues', member], async () => {
    const params: GetIssuesParams = {}
    if (member) {
      params.assignee = member
    }
    return fetchIssues(params)
  }, {
    fallbackData: []
  })

  return (
    <div>
      <ul className={classes.issueList}>
        {issues.data.map(issue => <Issue issue={issue} />)}
      </ul>
    </div>
  )
}
