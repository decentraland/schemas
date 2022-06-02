import { Wearable } from '.'
import { Rarity } from '../../dapps/rarity'
import { BaseItem } from './base-item'

export type StandardProps = {
  collectionAddress: string
  rarity: Rarity
}

export const standardProperties = {
  collectionAddress: {
    type: 'string',
    nullable: false
  },
  rarity: Rarity.schema
} as const

export function isStandard<T extends BaseItem>(
  item: T
): item is T & StandardProps {
  const itemAsStandard = item as T & StandardProps
  return (
    !!itemAsStandard.collectionAddress &&
    itemAsStandard.rarity &&
    Rarity.validate(itemAsStandard.rarity)
  )
}
