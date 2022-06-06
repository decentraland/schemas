import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../../../validation'
import { BodyShape } from '../../body-shape'

/** @alpha */
export type EmoteRepresentationADR73 = {
  bodyShapes: BodyShape[]
  mainFile: string
  contents: string[]
}

/** @alpha */
export namespace EmoteRepresentationADR73 {
  export const schema: JSONSchema<EmoteRepresentationADR73> = {
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

  const schemaValidator: ValidateFunction<EmoteRepresentationADR73> =
    generateValidator(schema)
  export const validate: ValidateFunction<EmoteRepresentationADR73> = (
    representation: any
  ): representation is EmoteRepresentationADR73 =>
    schemaValidator(representation) &&
    representation.contents.includes(representation.mainFile)
}
