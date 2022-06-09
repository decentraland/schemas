import { isThirdParty } from '..'
import { generateValidator, JSONSchema } from '../../../validation'
import {
  BaseItem,
  baseItemProperties,
  requiredBaseItemProps
} from '../base-item'
import { standardProperties, StandardProps } from '../standard-props'
import { thirdPartyProps, ThirdPartyProps } from '../third-party-props'
import { EmoteDataADR74 } from './adr74/emote-data-adr74'

export type EmoteADR74 = BaseItem &
  (StandardProps | ThirdPartyProps) & { emoteDataADR74: EmoteDataADR74 }

/** @alpha */
export type Emote = EmoteADR74

/** @alpha */
export namespace Emote {
  export const schema: JSONSchema<Emote> = {
    type: 'object',
    properties: {
      ...baseItemProperties,
      ...standardProperties,
      ...thirdPartyProps,
      emoteDataADR74: EmoteDataADR74.schema
    },
    additionalProperties: true,
    required: [...requiredBaseItemProps],
    oneOf: [
      {
        required: ['emoteDataADR74'],
        // Emotes of ADR74 must be standard XOR thirdparty
        oneOf: [
          {
            required: ['collectionAddress', 'rarity'],
            prohibited: ['merkleProof', 'content'],
            errorMessage: 'standard properties conditions are not met'
          },
          {
            required: ['merkleProof', 'content'],
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

  const _isThirdPartyKeywordDef = {
    keyword: '_isThirdParty',
    validate: (schema: boolean, data: any) => !schema || isThirdParty(data),
    errors: false
  }

  export const validate = generateValidator(schema, [_isThirdPartyKeywordDef])
}
