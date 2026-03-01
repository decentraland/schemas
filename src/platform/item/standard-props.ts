import { Rarity, raritySchema } from '../../dapps/rarity.js'
import { BaseItem } from './base-item.js'

export type StandardProps = {
  collectionAddress: string
  rarity: Rarity
}

export const standardProperties = {
  collectionAddress: {
    type: 'string',
    nullable: false
  },
  rarity: raritySchema
} as const

export function isStandard<T extends BaseItem>(item: T): item is T & StandardProps {
  const data = item as any
  if (!data) return false
  return typeof data.collectionAddress === 'string' && Object.values(Rarity).includes(data.rarity)
}
