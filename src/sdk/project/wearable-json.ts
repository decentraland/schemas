import { Rarity, raritySchema } from '../../dapps/rarity.js'
import { wearableCategorySchema } from '../../platform/item/wearable/wearable-category.js'
import { wearableRepresentationSchema } from '../../platform/item/wearable/representation.js'
import { Wearable } from '../../platform/item/wearable/wearable.js'
import type { JSONSchema } from '../../validation/types.js'
import { hideableWearableCategorySchema } from '../../platform/item/wearable/hideable-category.js'

/**
 * @alpha
 */
export type WearableJson = Pick<Wearable, 'data' | 'name' | 'description'> & {
  rarity: Rarity
}

/**
 * @alpha
 */
export const wearableJsonSchema: JSONSchema<WearableJson> = {
  type: 'object',
  properties: {
    description: {
      type: 'string'
    },
    rarity: {
      ...raritySchema,
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
          items: wearableCategorySchema
        },
        hides: {
          type: 'array',
          items: wearableCategorySchema
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
  required: ['description', 'name', 'data']
}
