import type { JSONSchema } from '../../../../validation/types.js'
import { BodyShape, bodyShapeSchema } from '../../body-shape.js'

/** @alpha */
export type EmoteRepresentationADR74 = {
  bodyShapes: BodyShape[]
  mainFile: string
  contents: string[]
}

/** @alpha */
export const emoteRepresentationADR74Schema: JSONSchema<EmoteRepresentationADR74> = {
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
      },
      errorMessage: {
        contains: 'contents should contain mainFile: ${1/mainFile}'
      }
    }
  },
  required: ['bodyShapes', 'mainFile', 'contents']
}
