import { WearableCategory } from '../item/wearable/wearable-category'
import { Color3, WearableId } from '../../misc'
import { JSONSchema, ValidateFunction, generateLazyValidator } from '../../validation'

/**
 * @alpha
 */
export type Outfit = {
  bodyShape: WearableId
  eyes: { color: Color3 }
  hair: { color: Color3 }
  skin: { color: Color3 }
  wearables: WearableId[]
  forceRender?: WearableCategory[]
}

/**
 * Outfit
 * @alpha
 */
export namespace Outfit {
  export const schema: JSONSchema<Outfit> = {
    type: 'object',
    required: ['bodyShape', 'eyes', 'hair', 'skin', 'wearables'],
    properties: {
      bodyShape: {
        type: 'string'
      },
      eyes: {
        type: 'object',
        required: ['color'],
        properties: {
          color: Color3.schema
        }
      },
      hair: {
        type: 'object',
        required: ['color'],
        properties: {
          color: Color3.schema
        }
      },
      skin: {
        type: 'object',
        required: ['color'],
        properties: {
          color: Color3.schema
        }
      },
      wearables: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      forceRender: {
        type: 'array',
        nullable: true,
        items: WearableCategory.schema
      }
    },
    additionalProperties: true
  }
  export const validate: ValidateFunction<Outfit> = generateLazyValidator(schema)
}

/**
 * @alpha
 */
export type Outfits = {
  outfits: {
    slot: number
    outfit: Outfit
  }[]
  namesForExtraSlots: string[]
}

/**
 * Outfits
 * @alpha
 */
export namespace Outfits {
  export const schema: JSONSchema<Outfits> = {
    type: 'object',
    required: ['outfits', 'namesForExtraSlots'],
    properties: {
      outfits: {
        type: 'array',
        items: {
          type: 'object',
          required: ['slot', 'outfit'],
          properties: {
            slot: {
              type: 'number'
            },
            outfit: Outfit.schema
          }
        }
      },
      namesForExtraSlots: {
        type: 'array',
        uniqueItems: true,
        items: {
          type: 'string'
        }
      }
    },
    additionalProperties: true
  }
  export const validate: ValidateFunction<Outfits> = generateLazyValidator(schema)
}
