import React from 'react'
import useSWR from 'swr'
import Select from '../../components/Select'
import { fetchMembers } from '../../api'
import classes from './styles.module.scss'
import { ItemType } from '../../components/Select/Item'

type Props = {
  member: string
  onMemberChange: (newMember: string) => void
}

export default function Filters({ member, onMemberChange }: Props) {
  const { data, isLoading, error } = useSWR('members', async () => {
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
    fallbackData: [{ value: '', label: '______' }]
  })

  return (
    <div className={classes.container}>
      <p>Show issues assigned to:</p>
      <Select
        skeleton={isLoading || error}
        items={data}
        value={member}
        onChange={onMemberChange} />
    </div>
  )
}
