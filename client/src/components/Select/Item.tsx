import React from 'react'
import classes from './styles.module.scss'

export type ItemType = {
  value: string
  label?: string
  icon?: string
}

type Props = {
  item: ItemType,
  onClick?: () => void
}

export default function Item({
  item: { value, label, icon },
  onClick = () => {}
}: Props) {
  const text = label || value

  return (
    <div className={classes.item} onClick={onClick}>
      {icon && <img alt={`${text} avatar`} src={icon} />}
      <span>{text}</span>
    </div>
  )
}
