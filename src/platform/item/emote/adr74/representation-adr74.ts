import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../../validation'
import { BodyShape } from '../../body-shape'

/** @alpha */
export type EmoteRepresentationADR74 = {
  bodyShapes: BodyShape[]
  mainFile: string
  contents: string[]
}

/** @alpha */
export namespace EmoteRepresentationADR74 {
  export const schema: JSONSchema<EmoteRepresentationADR74> = {
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
        },
        errorMessage: {
          contains: 'contents should contain mainFile: ${1/mainFile}'
        }
      }
    },
    required: ['bodyShapes', 'mainFile', 'contents']
  }

  export const validate: ValidateFunction<EmoteRepresentationADR74> = generateLazyValidator(schema)
}
