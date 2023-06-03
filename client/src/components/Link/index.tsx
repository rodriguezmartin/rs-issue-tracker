import React, { HTMLProps } from 'react'
import clsx from 'clsx'
import classes from './styles.module.scss'

type Props = {
  className?: string
  sameTab?: boolean
} & HTMLProps<HTMLAnchorElement>

export default function Link({ className, sameTab, children, ...props }: Props) {
  return (
    <a
      className={clsx(classes.anchor, className)}
      target={sameTab ? '_self' : '_blank'}
      rel="noreferrer"
      {...props}>
      {children}
    </a>
  )
}
