import type { JSONSchema } from '../../../validation/types.js'
import { WearableCategory, wearableCategorySchema } from './wearable-category.js'
import { WearableRepresentation, wearableRepresentationSchema } from './representation.js'
import { BaseItem, baseItemProperties, isBaseAvatar, requiredBaseItemProps } from '../base-item.js'
import { StandardProps, standardProperties } from '../standard-props.js'
import { isThirdParty, ThirdPartyProps, schema as thirdPartyPropsSchema } from '../third-party-props.js'
import { HideableWearableCategory, hideableWearableCategorySchema } from './hideable-category.js'
import {
  ContractNetwork,
  rangeMappingFromLteKeyword,
  mappingsIsMappingsValidKeyword
} from '../linked-wearable-mappings.js'

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
export const wearableSchema: JSONSchema<Wearable> = {
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
          items: hideableWearableCategorySchema
        },
        hides: {
          type: 'array',
          items: hideableWearableCategorySchema
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
          items: wearableRepresentationSchema,
          minItems: 1
        },
        category: wearableCategorySchema,
        removesDefaultHiding: {
          type: 'array',
          nullable: true,
          items: hideableWearableCategorySchema
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

const wearableValidContractNetworks = new Set(Object.values(ContractNetwork))

const wearableIsThirdPartyKeyword = {
  keyword: '_isThirdParty',
  validate: (schema: boolean, data: any) => {
    if (!schema) return true
    if (!isThirdParty(data)) return false
    // Also validate mappings keys if present (duck-type isThirdParty doesn't check this)
    if (data.mappings && typeof data.mappings === 'object') {
      const keys = Object.keys(data.mappings)
      if (!keys.every((k: string) => wearableValidContractNetworks.has(k as ContractNetwork))) return false
    }
    return true
  },
  errors: false
}

const wearableIsBaseAvatarKeyword = {
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
 * @alpha
 */
export const wearableKeywordDefinitions = [
  wearableIsThirdPartyKeyword,
  wearableIsBaseAvatarKeyword,
  rangeMappingFromLteKeyword,
  mappingsIsMappingsValidKeyword
]
