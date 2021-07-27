import { generateValidator, JSONSchema, ValidateFunction } from '../../validation'
import { Rarity } from '../../dapps/rarity'
import { WearableCategory } from '../../dapps/wearable-category'
import { I18N } from './i18n'
import { WearableRepresentation } from './representation'
import { Metrics } from './metrics'

export type Wearable = {
  id: string
  description: string
  collectionAddress: string
  rarity: Rarity
  i18n: I18N,
  data: {
    replaces: WearableCategory[]
    hides: WearableCategory[]
    tags: string[]
    representations: WearableRepresentation[]
    category: WearableCategory
  }
  thumbnail: string
  image: string
  metrics?: Metrics
}

export namespace Wearable {
  export const schema: JSONSchema<Wearable> = {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      collectionAddress: {
        type: 'string',
      },
      rarity: Rarity.schema,
      i18n: I18N.schema,
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
        additionalProperties: false,
        required: ['replaces', 'hides', 'tags', 'representations', 'category']
      },
      thumbnail: {
        type: 'string',
      },
      image: {
        type: 'string',
      },
      metrics: {
        ...Metrics.schema,
        nullable: true
      }
    },
    additionalProperties: false,
    required: [
      'id',
      'description',
      'collectionAddress',
      'rarity',
      'i18n',
      'data',
      'thumbnail',
      'image',
    ],
  }

  export const validate: ValidateFunction<Wearable> = generateValidator(schema)
}
