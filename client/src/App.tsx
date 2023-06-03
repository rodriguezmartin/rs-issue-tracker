import React, { useEffect, useState } from 'react'
import classes from './styles.module.scss'
import { getParam, setParam } from './utils/queryParams'
import Filters from './containers/Filters'
import IssueList from './containers/IssueList'

function App() {
  const [member, setMember] = useState<string>(getParam('who') || '')

  useEffect(() => {
    setParam('who', member)
  }, [member])

  return (
    <div className={classes.container}>
      <Filters member={member} onMemberChange={setMember} />
      <IssueList member={member} onClearFilters={() => setMember('')} />
    </div>
  )
}

export default App
