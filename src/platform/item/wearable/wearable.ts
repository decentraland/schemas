import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../../validation'
import { Rarity } from '../../../dapps/rarity'
import { WearableCategory } from '../../../dapps/wearable-category'
import { I18N } from '../i18n'
import { WearableRepresentation } from './representation'
import { Metrics } from '../metrics'
import { displayableProperties } from '../../shared/displayable'
import { MerkleProof } from '../../merkle-tree'
import { BaseItem } from '../base-item'
import { StandardProps } from '../standard-props'
import { ThirdPartyProps } from '../third-party-props'

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
      ...displayableProperties,
      id: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      collectionAddress: {
        type: 'string',
        nullable: true
      },
      rarity: {
        ...Rarity.schema,
        nullable: true
      },
      name: {
        type: 'string'
      },
      i18n: {
        type: 'array',
        items: I18N.schema,
        minItems: 1,
        uniqueItemProperties: ['code'],
        errorMessage: '${0#} array should not have duplicates for "code"'
      },
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
      },
      thumbnail: {
        type: 'string'
      },
      image: {
        type: 'string'
      },
      metrics: {
        ...Metrics.schema,
        nullable: true
      },
      merkleProof: {
        ...MerkleProof.schema,
        nullable: true
      },
      content: {
        type: 'object',
        nullable: true,
        additionalProperties: { type: 'string' },
        required: []
      }
    },
    additionalProperties: true,
    required: [
      'id',
      'description',
      'name',
      'data',
      'thumbnail',
      'image',
      'i18n'
    ],
    oneOf: [
      {
        required: ['collectionAddress', 'rarity'],
        prohibited: ['merkleProof', 'content'],
        errorMessage:
          'for standard wearables "merkleProof" and "content" are not allowed'
      },
      {
        required: ['merkleProof', 'content'],
        prohibited: ['collectionAddress', 'rarity'],
        errorMessage:
          'for third party wearables "collectionAddress" and "rarity" are not allowed'
      }
    ]
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
  export const validate: ValidateFunction<Wearable> = generateValidator(schema)
}
