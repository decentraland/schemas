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
  required: ['merkleProof', 'content'],
  _containsHashingKeys: true
}

export const _containsHashingKeys = {
  keyword: '_containsHashingKeys',
  validate: (schema: boolean, data: any) => {
    const itemAsThirdParty = data as ThirdPartyProps
    if (itemAsThirdParty?.merkleProof?.hashingKeys) {
      return itemAsThirdParty.merkleProof.hashingKeys.every((key) =>
        itemAsThirdParty.hasOwnProperty(key)
      )
    }
    return false
  },
  errors: false
}

export const _isThirdPartyKeywordDef = {
  keyword: '_isThirdParty',
  validate: (schema: boolean, data: any) => !schema || isThirdParty(data),
  errors: false
}

const validate: ValidateFunction<ThirdPartyProps> = generateValidator(schema, [
  _containsHashingKeys
])

export function isThirdParty<T extends BaseItem>(
  item: T
): item is T & ThirdPartyProps {
  return validate(item)
}
