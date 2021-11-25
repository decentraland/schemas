import { WearableCategory } from '../../dapps/wearable-category'
import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'
import { WearableBodyShape } from './wearable-body-shape'

/** @alpha */
export type WearableRepresentation = {
  bodyShapes: WearableBodyShape[]
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
        items: WearableBodyShape.schema,
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
        uniqueItems: true
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
    additionalProperties: false,
    required: [
      'bodyShapes',
      'mainFile',
      'contents',
      'overrideHides',
      'overrideReplaces'
    ]
  }

  const schemaValidator: ValidateFunction<WearableRepresentation> =
    generateValidator(schema)
  export const validate: ValidateFunction<WearableRepresentation> = (
    representation: any
  ): representation is WearableRepresentation =>
    schemaValidator(representation) &&
    representation.contents.includes(representation.mainFile)
}
