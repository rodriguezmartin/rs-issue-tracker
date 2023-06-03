import React, { useMemo } from 'react'
import fontColorContrast from 'font-color-contrast'
import classes from './styles.module.scss'
import { LabelType } from '../../types'

type Props = LabelType

export default function Label({ name, color }: Props) {
  return (
    <div
      className={classes.label}
      style={color ? {
        background: `#${color}`,
        color: fontColorContrast(color)
      } : {}}>
      {name}
    </div>
  )
}
