import { WearableCategory } from '../../../dapps/wearable-category'
import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../../validation'
import { BodyShape } from '../body-shape'

/** @alpha */
export type WearableRepresentation = {
  bodyShapes: BodyShape[]
  mainFile: string
  contents: string[]
  overrideHides: WearableCategory[]
  overrideReplaces: WearableCategory[]
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
        items: WearableCategory.schema
      },
      overrideReplaces: {
        type: 'array',
        items: WearableCategory.schema
      }
    },
    required: [
      'bodyShapes',
      'mainFile',
      'contents',
      'overrideHides',
      'overrideReplaces'
    ]
  }

  export const validate: ValidateFunction<WearableRepresentation> =
    generateValidator(schema)
}