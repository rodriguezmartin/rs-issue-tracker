import React, { useMemo, useState, useRef } from 'react'
import { useClickAway } from 'react-use'
import clsx from 'clsx'
import classes from './styles.module.scss'
import globalClasses from '../../styles.module.scss'
import Item, { ItemType } from './Item'

type Props = {
  items: ItemType[]
  onChange: (newValue: string) => void
  value: string
  skeleton: boolean
}

export default function Select({
  items = [],
  value,
  onChange,
  skeleton
}: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useClickAway(ref, () => setOpen(false))

  const selectedItem = useMemo(() => {
    const item = items.find(item => value === item.value)
    return item || { value: '', label: 'All' }
  }, [items, value])

  function handleOnChange(value: string) {
    onChange(value)
    setOpen(false)
  }

  return (
    <div ref={ref} className={clsx(classes.container, {
      [classes.open]: open,
      [globalClasses.skeleton]: skeleton
    })}>
      <Item item={selectedItem} onClick={() => setOpen(!open)} />
      {open && (
        <ul>
          {items.map(item => (
            <li>
              <Item item={item} onClick={() => handleOnChange(item.value)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
