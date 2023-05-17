import { Rarity } from '../../dapps/rarity'
import { BaseItem } from './base-item'
import { generateLazyValidator, ValidateFunction, JSONSchema } from '../../validation'

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

const schema: JSONSchema<StandardProps> = {
  type: 'object',
  properties: {
    ...standardProperties
  },
  required: ['collectionAddress', 'rarity']
}

const validate: ValidateFunction<StandardProps> = generateLazyValidator(schema)

export function isStandard<T extends BaseItem>(item: T): item is T & StandardProps {
  return validate(item)
}
