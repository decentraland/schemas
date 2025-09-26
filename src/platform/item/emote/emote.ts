import { isThirdParty, Mappings, RangeMapping } from '..'
import { generateLazyValidator, JSONSchema } from '../../../validation'
import { BaseItem, baseItemProperties, isBaseEmote, requiredBaseItemProps } from '../base-item'
import { standardProperties, StandardProps } from '../standard-props'
import { schema as thirdPartyPropsSchema, ThirdPartyProps } from '../third-party-props'
import { EmoteDataADR74 } from './adr74/emote-data-adr74'
import { EmoteDataADR287 } from './adr287/emote-data-adr287'

export type EmoteADR74 = BaseItem & (StandardProps | ThirdPartyProps) & { emoteDataADR74: EmoteDataADR74 }
export type EmoteADR287 = BaseItem & (StandardProps | ThirdPartyProps) & { emoteDataADR287: EmoteDataADR287 }

/** @alpha */
export type Emote = EmoteADR74 | EmoteADR287

/** @alpha */
export namespace Emote {
  export const schema: JSONSchema<Emote> = {
    type: 'object',
    properties: {
      ...baseItemProperties,
      ...standardProperties,
      ...thirdPartyPropsSchema.properties,
      emoteDataADR74: EmoteDataADR74.schema,
      emoteDataADR287: EmoteDataADR287.schema
    },
    additionalProperties: true,
    required: [...requiredBaseItemProps],
    allOf: [
      {
        not: {
          required: ['emoteDataADR74', 'emoteDataADR287']
        }
      }
    ],
    if: { required: ['emoteDataADR287'] },
    then: {
      prohibited: ['emoteDataADR74'],
      // ADR287: standard XOR thirdparty
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
            'content',
            'id',
            'name',
            'description',
            'i18n',
            'image',
            'thumbnail',
            'emoteDataADR287'
          ],
          _isThirdParty: true,
          prohibited: ['collectionAddress', 'rarity'],
          errorMessage: 'thirdparty properties conditions are not met'
        }
      ],
      errorMessage: { oneOf: 'emote should have either standard or thirdparty properties' }
    },
    else: {
      required: ['emoteDataADR74'],
      prohibited: ['emoteDataADR287'],
      // ADR74: standard XOR thirdparty
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
      errorMessage: { oneOf: 'emote should have either standard or thirdparty properties' }
    },
    errorMessage: {
      if: 'emote schema branching failed',
      then: 'emote should have "emoteDataADR287" and match its schema',
      else: 'emote should have "emoteDataADR74" and match its schema'
    }
  }

  const _isThirdPartyKeywordDef = {
    keyword: '_isThirdParty',
    validate: (schema: boolean, data: any) => !schema || isThirdParty(data),
    errors: false
  }

  const _isBaseEmoteKeywordDef = {
    keyword: '_isBaseEmote',
    validate: (schema: boolean, data: any) => !schema || isBaseEmote(data),
    errors: false
  }

  export const validate = generateLazyValidator(schema, [
    _isThirdPartyKeywordDef,
    _isBaseEmoteKeywordDef,
    RangeMapping._fromLessThanOrEqualTo,
    Mappings._isMappingsValid
  ])
}
