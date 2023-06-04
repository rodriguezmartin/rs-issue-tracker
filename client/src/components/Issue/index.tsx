import React from 'react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import classes from './styles.module.scss'
import globalClasses from '../../styles.module.scss'
import { IssueType } from '../../types'
import Label from '../Label'
import Link from '../Link'

type Props = {
  issue: IssueType
  skeleton?: boolean
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
  },
  skeleton
}: Props) {
  return (
    <div className={clsx(classes.container, {
      [classes.overdue]: overdue,
      [globalClasses.skeleton]: skeleton
    })}>
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
              <Link href={`https://github.com/${opener.username}`}>
                {opener.username}
              </Link>
            </span>
          )}
        </p>
        <ul>
          <li>
            {labels.map(({ name, color }) => (
              <Label name={name} color={color} />
            ))}
          </li>
        </ul>
      </div>
    </div>
  )
}
