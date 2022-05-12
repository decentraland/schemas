import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'

/** @alpha */
export type SmartItemJson = {
  id: string
  name: string
  category: string
  tags: string[]
}

/** @alpha */
export namespace SmartItemJson {
  export const schema: JSONSchema<SmartItemJson> = {
    type: 'object',
    properties: {
      id: {
        description:
          'The ID that you will replace in your collection. Also this ID is used for develop purpose, to identify in the kernel.',
        type: 'string'
      },
      name: {
        description: '',
        type: 'string'
      },
      category: {
        type: 'string'
      },
      tags: {
        description: 'A short text that describes the wearable.`',
        type: 'array',
        items: {
          type: 'string'
        }
      }
    },
    additionalProperties: true!,
    required: ['id', 'name', 'category']
  }

  export const validate: ValidateFunction<SmartItemJson> =
    generateValidator(schema)
}
