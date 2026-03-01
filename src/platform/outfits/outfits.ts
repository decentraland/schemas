import { WearableCategory, wearableCategorySchema } from '../item/wearable/wearable-category.js'
import { Color3, WearableId, color3Schema } from '../../misc/index.js'
import type { JSONSchema } from '../../validation/types.js'

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
export const outfitSchema: JSONSchema<Outfit> = {
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
        color: color3Schema
      }
    },
    hair: {
      type: 'object',
      required: ['color'],
      properties: {
        color: color3Schema
      }
    },
    skin: {
      type: 'object',
      required: ['color'],
      properties: {
        color: color3Schema
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
      items: wearableCategorySchema
    }
  },
  additionalProperties: true
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
export const outfitsSchema: JSONSchema<Outfits> = {
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
          outfit: outfitSchema
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
