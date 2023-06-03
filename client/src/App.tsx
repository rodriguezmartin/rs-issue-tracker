import React, { useState } from 'react'
import useSWR from 'swr'
import Select from './components/Select'
import { ItemType } from './components/Select/Item'
import { fetchIssues, fetchMembers, GetIssuesParams } from './api'
import classes from './styles.module.scss'

import { getParam, setParam } from './utils/queryParams'
import Issue from './components/Issue'

function App() {
  const [member, setMember] = useState<string>(getParam('who') || '')

  const memberOptions = useSWR('members', async () => {
    const data = await fetchMembers()
    const options: ItemType[] = [
      { value: '', label: 'All' },
      ...data.map(({ username, avatar }) => ({
        value: username,
        icon: avatar
      }))
    ]
    return options
  }, {
    fallbackData: []
  })

  const issues = useSWR(['issues', member], async () => {
    const params: GetIssuesParams = {}
    if (member) {
      params.assignee = member
    }
    return fetchIssues(params)
  }, {
    fallbackData: []
  })

  function handleChangeMember(value: string) {
    setMember(value)
    setParam('who', value)
  }

  return (
    <div className={classes.container}>
      <div className={classes.filters}>
        <p>Show issues assigned to:</p>
        <Select items={memberOptions.data} value={member} onChange={handleChangeMember} />
      </div>
      <div>
        <ul className={classes.issueList}>
          {issues.data.map(issue => <Issue issue={issue} />)}
        </ul>
      </div>
    </div>
  )
}

export default App
