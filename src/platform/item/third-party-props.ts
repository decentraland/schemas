import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { MerkleProof } from '../merkle-tree'
import { BaseItem } from './base-item'
import { Mappings, RangeMapping } from './linked-wearable-mappings'

export type ThirdPartyProps = {
  merkleProof: MerkleProof
  content: Record<string, string>
  mappings?: Mappings
}

export const schema: JSONSchema<ThirdPartyProps> = {
  type: 'object',
  properties: {
    merkleProof: MerkleProof.schema,
    content: {
      type: 'object',
      nullable: false,
      additionalProperties: { type: 'string' },
      required: [] as any[]
    },
    mappings: {
      nullable: true,
      ...Mappings.schema
    }
  },
  required: ['merkleProof', 'content'],
  _containsHashingKeys: true
}

const _containsHashingKeys = {
  keyword: '_containsHashingKeys',
  validate: function (schema: boolean, data: any) {
    const itemAsThirdParty = data as ThirdPartyProps
    if (itemAsThirdParty?.merkleProof?.hashingKeys) {
      return itemAsThirdParty.merkleProof.hashingKeys.every((key) => itemAsThirdParty.hasOwnProperty(key))
    }
    return false
  },
  errors: false
}

const validate: ValidateFunction<ThirdPartyProps> = generateLazyValidator(schema, [
  _containsHashingKeys,
  RangeMapping._fromLessThanOrEqualTo,
  Mappings._isMappingsValid
])

export function isThirdParty<T extends BaseItem>(item: T): item is T & ThirdPartyProps {
  return validate(item)
}
