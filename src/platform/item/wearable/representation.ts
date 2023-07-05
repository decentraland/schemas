import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../validation'
import { BodyShape } from '../body-shape'
import { HideableWearableCategory } from './hideable-category'

/** @alpha */
export type WearableRepresentation = {
  bodyShapes: BodyShape[]
  mainFile: string
  contents: string[]
  overrideHides: HideableWearableCategory[]
  overrideReplaces: HideableWearableCategory[]
}

/** @alpha */
export namespace WearableRepresentation {
  export const schema: JSONSchema<WearableRepresentation> = {
    type: 'object',
    properties: {
      bodyShapes: {
        type: 'array',
        items: BodyShape.schema,
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
        items: HideableWearableCategory.schema
      },
      overrideReplaces: {
        type: 'array',
        items: HideableWearableCategory.schema
      }
    },
    required: ['bodyShapes', 'mainFile', 'contents', 'overrideHides', 'overrideReplaces']
  }

  export const validate: ValidateFunction<WearableRepresentation> = generateLazyValidator(schema)
}
