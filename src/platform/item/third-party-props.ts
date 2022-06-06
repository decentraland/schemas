import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'
import { MerkleProof } from '../merkle-tree/merkle-proof'
import { BaseItem } from './base-item'

export type ThirdPartyProps = {
  merkleProof: MerkleProof
  content: Record<string, string>
}

export const thirdPartyProps = {
  merkleProof: MerkleProof.schema,
  content: {
    type: 'object',
    nullable: false,
    additionalProperties: { type: 'string' },
    required: [] as any[]
  }
} as const

const schema: JSONSchema<ThirdPartyProps> = {
  type: 'object',
  properties: {
    ...thirdPartyProps
  },
  required: ['merkleProof', 'content']
}

const validate: ValidateFunction<ThirdPartyProps> = generateValidator(schema)

export function isThirdParty<T extends BaseItem>(
  item: T
): item is T & ThirdPartyProps {
  const isValid = validate(item)
  if (!isValid) {
    return isValid
  }
  const itemAsThirdParty = item as T & ThirdPartyProps
  const containsAllKeys = itemAsThirdParty.merkleProof.hashingKeys.every(
    (key) => itemAsThirdParty.hasOwnProperty(key)
  )
  return containsAllKeys
}
