import React from 'react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import classes from './styles.module.scss'
import { IssueType } from '../../types'
import Label from '../Label'
import Link from '../Link'

type Props = {
  issue: IssueType
}

export default function Issue({
  issue: {
    score,
    url,
    title,
    number,
    createdAt,
    opener,
    labels,
    overdue
  }
}: Props) {
  return (
    <div className={clsx(classes.container, { [classes.overdue]: overdue })}>
      <div className={classes.score}>
        <span>{score}</span>
      </div>
      <div className={classes.content}>
        <Link className={classes.title} href={url}>
          {title}
        </Link>
        <p className={classes.info}>
          <Link className={classes.number} href={url}>
            #{number}
          </Link>
          {opener && (
            <span className={classes.opener}>
              opened {dayjs(createdAt).fromNow()} by
              <Link href={opener.username}>{opener.username}</Link>
            </span>
          )}
        </p>
        <ul>
          {labels.map(({ name, color }) => (
            <Label name={name} color={color} />
          ))}
        </ul>
      </div>
    </div>
  )
}
