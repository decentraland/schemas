import type { JSONSchema } from '../../../validation/types.js'
import { BodyShape, bodyShapeSchema } from '../body-shape.js'
import { HideableWearableCategory, hideableWearableCategorySchema } from './hideable-category.js'

/** @alpha */
export type WearableRepresentation = {
  bodyShapes: BodyShape[]
  mainFile: string
  contents: string[]
  overrideHides: HideableWearableCategory[]
  overrideReplaces: HideableWearableCategory[]
}

/** @alpha */
export const wearableRepresentationSchema: JSONSchema<WearableRepresentation> = {
  type: 'object',
  properties: {
    bodyShapes: {
      type: 'array',
      items: bodyShapeSchema,
      minItems: 1,
      uniqueItems: true
    },
    mainFile: {
      type: 'string',
      minLength: 1
    },
    contents: {
      type: 'array',
      items: {
        type: 'string'
      },
      minItems: 1,
      uniqueItems: true,
      contains: {
        const: { $data: '2/mainFile' }
      }
    },
    overrideHides: {
      type: 'array',
      items: hideableWearableCategorySchema
    },
    overrideReplaces: {
      type: 'array',
      items: hideableWearableCategorySchema
    }
  },
  required: ['bodyShapes', 'mainFile', 'contents', 'overrideHides', 'overrideReplaces']
}
