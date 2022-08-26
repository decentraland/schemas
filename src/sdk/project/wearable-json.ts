import { Rarity } from '../../dapps/rarity'
import { WearableCategory } from '../../dapps/wearable-category'
import { WearableRepresentation } from '../../platform/item/wearable/representation'
import { Wearable } from '../../platform/item/wearable/wearable'
import {
  generateLazyValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'

/**
 * @alpha
 */
export type WearableJson = Pick<Wearable, 'data' | 'name' | 'description'> & {
  rarity: Rarity
}

/**
 * @alpha
 */
export namespace WearableJson {
  export const schema: JSONSchema<WearableJson> = {
    type: 'object',
    properties: {
      description: {
        type: 'string'
      },
      rarity: {
        ...Rarity.schema,
        nullable: true
      },
      name: {
        type: 'string'
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
      }
    },
    additionalProperties: true,
    required: ['description', 'name', 'data']
  }

  export const validate: ValidateFunction<WearableJson> =
    generateLazyValidator(schema)
}
