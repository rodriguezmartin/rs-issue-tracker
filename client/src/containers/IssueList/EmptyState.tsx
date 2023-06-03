import React from 'react'
import classes from './styles.module.scss'
import emptyStateImage from '../../assets/emptyState.svg'

type Props = {
  member: string
  onClearFilters: () => void
}

export default function EmptyState({ member, onClearFilters }: Props) {
  return (
    <div className={classes.emptyState}>
      <img src={emptyStateImage} alt="" />
      <h1>No open issues</h1>
      {member && (
        <p>
          Assigned to <span>{member}</span>, try with <button onClick={onClearFilters}>All</button>
        </p>
      )}
      {!member && <p>In this repository</p>}
    </div>
  )
}
