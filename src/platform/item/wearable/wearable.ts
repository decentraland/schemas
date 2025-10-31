import { generateLazyValidator, JSONSchema } from '../../../validation'
import { WearableCategory } from './wearable-category'
import { WearableRepresentation } from './representation'
import { BaseItem, baseItemProperties, isBaseAvatar, requiredBaseItemProps } from '../base-item'
import { StandardProps, standardProperties } from '../standard-props'
import { isThirdParty, ThirdPartyProps, schema as thirdPartyPropsSchema } from '../third-party-props'
import { HideableWearableCategory } from './hideable-category'
import { Mappings, RangeMapping } from '../linked-wearable-mappings'

/** @alpha */
export type Wearable = BaseItem & {
  data: {
    replaces: HideableWearableCategory[]
    hides: HideableWearableCategory[]
    tags: string[]
    representations: WearableRepresentation[]
    category: WearableCategory
    removesDefaultHiding?: HideableWearableCategory[]
    blockVrmExport?: boolean
    outlineCompatible?: boolean
  }
} & (StandardProps | ThirdPartyProps)

/** @alpha */
export namespace Wearable {
  export const schema: JSONSchema<Wearable> = {
    type: 'object',
    properties: {
      ...baseItemProperties,
      ...standardProperties,
      ...thirdPartyPropsSchema.properties.thirdPartyProps,
      data: {
        type: 'object',
        properties: {
          replaces: {
            type: 'array',
            items: HideableWearableCategory.schema
          },
          hides: {
            type: 'array',
            items: HideableWearableCategory.schema
          },
          tags: {
            type: 'array',
            items: {
              type: 'string',
              minLength: 1
            }
          },
          representations: {
            type: 'array',
            items: WearableRepresentation.schema,
            minItems: 1
          },
          category: WearableCategory.schema,
          removesDefaultHiding: {
            type: 'array',
            nullable: true,
            items: HideableWearableCategory.schema
          },
          blockVrmExport: {
            type: 'boolean',
            nullable: true
          },
          outlineCompatible: {
            type: 'boolean',
            nullable: true
          }
        },
        required: ['replaces', 'hides', 'tags', 'representations', 'category']
      }
    },
    additionalProperties: true,
    required: [],
    oneOf: [
      {
        required: ['id', 'i18n'],
        prohibited: ['merkleProof', 'content', 'collectionAddress', 'rarity', 'mappings'],
        _isBaseAvatar: true
      },
      {
        required: [...requiredBaseItemProps, 'data', 'collectionAddress', 'rarity'],
        prohibited: ['merkleProof', 'content', 'mappings']
      },
      {
        required: [
          ...requiredBaseItemProps,
          'data',
          'merkleProof',
          /* MerkleProof emote required Keys (might be redundant) */
          'content'
        ],
        prohibited: ['collectionAddress', 'rarity'],
        _isThirdParty: true
      }
    ],
    errorMessage: {
      oneOf: 'either standard XOR thirdparty properties conditions must be met'
    }
  }

  const _isThirdPartyKeywordDef = {
    keyword: '_isThirdParty',
    validate: (schema: boolean, data: any) => !schema || isThirdParty(data),
    errors: false
  }

  const _isBaseAvatarKeywordDef = {
    keyword: '_isBaseAvatar',
    validate: (schema: boolean, data: any) => !schema || isBaseAvatar(data),
    errors: false
  }

  /**
   * Validates that the wearable metadata complies with the standard or third party wearable, and doesn't have repeated locales.
   * Some fields are defined as optional but those are validated to be present as standard XOR third party:
   *  Standard Wearables should contain:
   *    - collectionAddress
   *    - rarity
   *  Third Party Wearables should contain:
   *    - merkleProof
   *    - content
   */
  export const validate = generateLazyValidator(schema, [
    _isThirdPartyKeywordDef,
    _isBaseAvatarKeywordDef,
    RangeMapping._fromLessThanOrEqualTo,
    Mappings._isMappingsValid
  ])
}
