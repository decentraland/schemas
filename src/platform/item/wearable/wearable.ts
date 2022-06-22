import { generateValidator, JSONSchema } from '../../../validation'
import { WearableCategory } from '../../../dapps/wearable-category'
import { WearableRepresentation } from './representation'
import {
  BaseItem,
  baseItemProperties,
  requiredBaseItemProps
} from '../base-item'
import { StandardProps, standardProperties } from '../standard-props'
import {
  ThirdPartyProps,
  thirdPartyProps,
  _isThirdPartyKeywordDef
} from '../third-party-props'

/** @alpha */
export type Wearable = BaseItem & {
  data: {
    replaces: WearableCategory[]
    hides: WearableCategory[]
    tags: string[]
    representations: WearableRepresentation[]
    category: WearableCategory
  }
} & (StandardProps | ThirdPartyProps)

/** @alpha */
export namespace Wearable {
  export const schema: JSONSchema<Wearable> = {
    type: 'object',
    properties: {
      ...baseItemProperties,
      ...standardProperties,
      ...thirdPartyProps,
      data: {
        type: 'object',
        properties: {
          replaces: {
            type: 'array',
            items: WearableCategory.schema
          },
          hides: {
            type: 'array',
            items: WearableCategory.schema
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
          category: WearableCategory.schema
        },
        required: ['replaces', 'hides', 'tags', 'representations', 'category']
      }
    },
    additionalProperties: true,
    required: [...requiredBaseItemProps, 'data'],
    oneOf: [
      {
        required: ['collectionAddress', 'rarity'],
        prohibited: ['merkleProof', 'content']
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
          'data'
        ],
        prohibited: ['collectionAddress', 'rarity'],
        _isThirdParty: true
      }
    ],
    errorMessage: {
      oneOf: 'either standard XOR thirdparty properties conditions must be met'
    }
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
  export const validate = generateValidator(schema, [_isThirdPartyKeywordDef])
}
