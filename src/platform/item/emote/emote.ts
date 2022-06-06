import { isThirdParty } from '..'
import { generateValidator, JSONSchema } from '../../../validation'
import {
  BaseItem,
  baseItemProperties,
  requiredBaseItemProps
} from '../base-item'
import { standardProperties, StandardProps } from '../standard-props'
import { thirdPartyProps, ThirdPartyProps } from '../third-party-props'
import { EmoteDataADR95 } from './adr95/emote-data-adr95'

export type EmoteADR95 = BaseItem &
  (StandardProps | ThirdPartyProps) & { emoteDataADR95: EmoteDataADR95 }

/** @alpha */
export type Emote = EmoteADR95

/** @alpha */
export namespace Emote {
  export const schema: JSONSchema<Emote> = {
    type: 'object',
    properties: {
      ...baseItemProperties,
      ...standardProperties,
      ...thirdPartyProps,
      emoteDataADR95: EmoteDataADR95.schema
    },
    additionalProperties: true,
    required: [...requiredBaseItemProps],
    oneOf: [
      {
        required: ['emoteDataADR95'],
        // Emotes of ADR95 must be standard XOR thirdparty
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
