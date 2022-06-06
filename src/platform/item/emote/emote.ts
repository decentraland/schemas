import { isThirdParty } from '..'
import { generateValidator, JSONSchema } from '../../../validation'
import {
  BaseItem,
  baseItemProperties,
  requiredBaseItemProps
} from '../base-item'
import { standardProperties, StandardProps } from '../standard-props'
import { thirdPartyProps, ThirdPartyProps } from '../third-party-props'
import { EmoteDataADR73 } from './adr73/emote-data-adr73'

export type EmoteADR73 = BaseItem &
  (StandardProps | ThirdPartyProps) & { emoteDataADR73: EmoteDataADR73 }

/** @alpha */
export type Emote = EmoteADR73

/** @alpha */
export namespace Emote {
  export const schema: JSONSchema<Emote> = {
    type: 'object',
    properties: {
      ...baseItemProperties,
      ...standardProperties,
      ...thirdPartyProps,
      emoteDataADR73: EmoteDataADR73.schema
    },
    additionalProperties: true,
    required: [...requiredBaseItemProps],
    oneOf: [
      {
        required: ['emoteDataADR73'],
        // Emotes of ADR73 must be standard XOR thirdparty
        oneOf: [
          {
            required: ['collectionAddress', 'rarity'],
            prohibited: ['merkleProof', 'content'],
            errorMessage:
              'for standard emotes "merkleProof" and "content" are not allowed'
          },
          {
            required: ['merkleProof', 'content'],
            _isThirdParty: true,
            prohibited: ['collectionAddress', 'rarity'],
            errorMessage:
              'for third party emotes "collectionAddress" and "rarity" are not allowed'
          }
        ]
      }
    ]
  }

  const _isThirdPartyKeywordDef = {
    keyword: '_isThirdParty',
    validate: (schema: boolean, data: any) => !schema || isThirdParty(data),
    errors: false
  }

  export const validate = generateValidator(schema, [_isThirdPartyKeywordDef])
}
