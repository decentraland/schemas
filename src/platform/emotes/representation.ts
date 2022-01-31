import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'
import { WearableBodyShape } from '../wearables'
import { EmoteData } from './data'

/** @alpha */
export type EmoteRepresentation = {
  bodyShapes: WearableBodyShape[]
  mainFile: string
  data: EmoteData | null
}

/** @alpha */
export namespace EmoteRepresentation {
  export const schema: JSONSchema<EmoteRepresentation> = {
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
      data: EmoteData.nullableSchema
    },
    additionalProperties: false,
    required: ['bodyShapes', 'mainFile']
  }

  const schemaValidator: ValidateFunction<EmoteRepresentation> =
    generateValidator(schema)
  export const validate: ValidateFunction<EmoteRepresentation> = (
    representation: any
  ): representation is EmoteRepresentation => schemaValidator(representation)
}
