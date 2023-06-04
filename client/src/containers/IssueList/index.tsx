import React from 'react'
import useSWR from 'swr'
import Issue from '../../components/Issue'
import { fetchIssues, GetIssuesParams } from '../../api'
import { getDummyIssues } from '../../utils/dummyData'
import classes from './styles.module.scss'
import EmptyState from './EmptyState'

type Props = {
  member: string
  onClearFilters: () => void
}

export default function IssueList({ member, onClearFilters }: Props) {
  const { data, isLoading, error } = useSWR(['issues', member], async () => {
    const params: GetIssuesParams = {}
    if (member) {
      params.assignee = member
    }
    return fetchIssues(params)
  }, {
    fallbackData: getDummyIssues(5)
  })

  if (!isLoading && !data.length) {
    return (
      <EmptyState
        member={member}
        onClearFilters={onClearFilters}
      />
    )
  }

  return (
    <div>
      <ul className={classes.issueList}>
        {data.map(issue => <Issue skeleton={isLoading || error} issue={issue} />)}
      </ul>
    </div>
  )
}
