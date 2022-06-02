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

export function isStandard(item: BaseItem): item is BaseItem & StandardProps {
  const itemAsStandard = item as BaseItem & StandardProps
  return (
    !!itemAsStandard.collectionAddress &&
    itemAsStandard.rarity &&
    Rarity.validate(itemAsStandard.rarity)
  )
}
