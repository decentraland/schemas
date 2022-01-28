import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'

/** @alpha */
export type EmoteData = {
  loop: boolean
  thumbnail: string
}

/** @alpha */
export namespace EmoteData {
  export const schema: JSONSchema<EmoteData> = {
    type: 'object',
    properties: {
      loop: {
        type: 'boolean',
      },
      thumbnail: {
        type: 'string',
        minLength: 1
      }
    },
    additionalProperties: false,
    required: [
      'loop',
      'thumbnail'
    ]
  }

  const schemaValidator: ValidateFunction<EmoteData> =
    generateValidator(schema)
  export const validate: ValidateFunction<EmoteData> = (
    data: any
  ): data is EmoteData =>
    schemaValidator(data)
}
