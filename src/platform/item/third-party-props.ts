import type { JSONSchema, KeywordDefinition } from '../../validation/types.js'
import { MerkleProof, merkleProofSchema } from '../merkle-tree/index.js'
import { BaseItem } from './base-item.js'
import { Mappings, mappingsSchema } from './linked-wearable-mappings.js'

export type ThirdPartyProps = {
  merkleProof: MerkleProof
  content: Record<string, string>
  mappings?: Mappings
}

export const schema: JSONSchema<ThirdPartyProps> = {
  type: 'object',
  properties: {
    merkleProof: merkleProofSchema,
    content: {
      type: 'object',
      nullable: false,
      additionalProperties: { type: 'string' },
      required: [] as any[]
    },
    mappings: {
      nullable: true,
      ...mappingsSchema
    }
  },
  required: ['merkleProof', 'content'],
  _containsHashingKeys: true
}

export const _containsHashingKeys: KeywordDefinition = {
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

export function isThirdParty<T extends BaseItem>(item: T): item is T & ThirdPartyProps {
  const data = item as any
  if (!data || !data.merkleProof || !data.content) return false
  if (data.merkleProof.hashingKeys) {
    return data.merkleProof.hashingKeys.every((key: string) => data.hasOwnProperty(key))
  }
  return false
}
