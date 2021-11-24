import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'
import { Rarity } from '../../dapps/rarity'
import { WearableCategory } from '../../dapps/wearable-category'
import { I18N } from './i18n'
import { WearableRepresentation } from './representation'
import { Metrics } from './metrics'

/** @alpha */
export type Wearable = {
  id: string
  descriptions: I18N[]
  collectionAddress: string
  rarity: Rarity
  names: I18N[]
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

/** @alpha */
export namespace Wearable {
  export const schema: JSONSchema<Wearable> = {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      descriptions: {
        type: 'array',
        items: I18N.schema,
        minItems: 1
      },
      collectionAddress: {
        type: 'string'
      },
      rarity: Rarity.schema,
      names: {
        type: 'array',
        items: I18N.schema,
        minItems: 1
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
        additionalProperties: false,
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
      }
    },
    additionalProperties: false,
    required: [
      'id',
      'descriptions',
      'collectionAddress',
      'rarity',
      'names',
      'data',
      'thumbnail',
      'image'
    ]
  }

  const schemaValidator: ValidateFunction<Wearable> = generateValidator(schema)
  export const validate: ValidateFunction<Wearable> = (
    wearable: any
  ): wearable is Wearable =>
    schemaValidator(wearable) &&
    validateDuplicatedLocales(wearable.descriptions) &&
    validateDuplicatedLocales(wearable.names)

  // Returns true only if there are no entries with the same locale
  const validateDuplicatedLocales = (i18ns: I18N[]) =>
    i18ns.every(
      ({ code }, index) =>
        i18ns.findIndex((i18n) => i18n.code === code) === index
    )
}
