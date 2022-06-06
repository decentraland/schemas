import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../../../validation'
import { BodyShape } from '../../body-shape'

/** @alpha */
export type EmoteRepresentationADR95 = {
  bodyShapes: BodyShape[]
  mainFile: string
  contents: string[]
}

/** @alpha */
export namespace EmoteRepresentationADR95 {
  export const schema: JSONSchema<EmoteRepresentationADR95> = {
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
        uniqueItems: true
      }
    },
    required: ['bodyShapes', 'mainFile', 'contents']
  }

  const schemaValidator: ValidateFunction<EmoteRepresentationADR95> =
    generateValidator(schema)
  export const validate: ValidateFunction<EmoteRepresentationADR95> = (
    representation: any
  ): representation is EmoteRepresentationADR95 =>
    schemaValidator(representation) &&
    representation.contents.includes(representation.mainFile)
}
