import React, { useMemo, useState } from 'react'
import clsx from 'clsx'
import classes from './styles.module.scss'
import Item, { ItemType } from './Item'

type Props = {
  items: ItemType[]
  onChange: (newValue: string) => void
  value: string
}

export default function Select({ items = [], value, onChange }: Props) {
  const [open, setOpen] = useState(false)

  const selectedItem = useMemo(() => {
    const item = items.find(item => value === item.value)
    return item || { value: '', label: 'All' }
  }, [items, value])

  function handleOnChange(value: string) {
    onChange(value)
    setOpen(false)
  }

  return (
    <div className={clsx(classes.container, {[classes.open]: open})}>
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
