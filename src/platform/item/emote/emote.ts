import { isThirdParty, ContractNetwork, rangeMappingFromLteKeyword, mappingsIsMappingsValidKeyword } from '../index.js'
import type { JSONSchema } from '../../../validation/types.js'
import { BaseItem, baseItemProperties, isBaseEmote, requiredBaseItemProps } from '../base-item.js'
import { standardProperties, StandardProps } from '../standard-props.js'
import { schema as thirdPartyPropsSchema, ThirdPartyProps } from '../third-party-props.js'
import { EmoteDataADR74, emoteDataADR74Schema } from './adr74/emote-data-adr74.js'

export type EmoteADR74 = BaseItem & (StandardProps | ThirdPartyProps) & { emoteDataADR74: EmoteDataADR74 }

/** @alpha */
export type Emote = EmoteADR74

/** @alpha */
export const emoteSchema: JSONSchema<Emote> = {
  type: 'object',
  properties: {
    ...baseItemProperties,
    ...standardProperties,
    ...thirdPartyPropsSchema.properties,
    emoteDataADR74: emoteDataADR74Schema
  },
  additionalProperties: true,
  required: [...requiredBaseItemProps],
  oneOf: [
    {
      required: ['emoteDataADR74'],
      // Emotes of ADR74 must be standard XOR thirdparty
      oneOf: [
        {
          required: ['id', 'i18n'],
          prohibited: ['merkleProof', 'content', 'collectionAddress', 'rarity'],
          _isBaseEmote: true
        },
        {
          required: ['collectionAddress', 'rarity'],
          prohibited: ['merkleProof', 'content'],
          errorMessage: 'standard properties conditions are not met'
        },
        {
          required: [
            'merkleProof',
            /* MerkleProof emote required Keys (might be redundant) */
            'content',
            'id',
            'name',
            'description',
            'i18n',
            'image',
            'thumbnail',
            'emoteDataADR74'
          ],
          _isThirdParty: true,
          prohibited: ['collectionAddress', 'rarity'],
          errorMessage: 'thirdparty properties conditions are not met'
        }
      ],
      errorMessage: {
        oneOf: 'emote should have either standard or thirdparty properties'
      }
    }
  ],
  errorMessage: {
    oneOf: 'emote should have "emoteDataADR74" and match its schema'
  }
}

const emoteValidContractNetworks = new Set(Object.values(ContractNetwork))

const emoteIsThirdPartyKeyword = {
  keyword: '_isThirdParty',
  validate: (schema: boolean, data: any) => {
    if (!schema) return true
    if (!isThirdParty(data)) return false
    // Also validate mappings keys if present (duck-type isThirdParty doesn't check this)
    if (data.mappings && typeof data.mappings === 'object') {
      const keys = Object.keys(data.mappings)
      if (!keys.every((k: string) => emoteValidContractNetworks.has(k as ContractNetwork))) return false
    }
    return true
  },
  errors: false
}

const emoteIsBaseEmoteKeyword = {
  keyword: '_isBaseEmote',
  validate: (schema: boolean, data: any) => !schema || isBaseEmote(data),
  errors: false
}

/** @alpha */
export const emoteKeywordDefinitions = [
  emoteIsThirdPartyKeyword,
  emoteIsBaseEmoteKeyword,
  rangeMappingFromLteKeyword,
  mappingsIsMappingsValidKeyword
]
