import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/**
 * @alpha
 */
export type Skybox = {
  id: string
  name: string
  description: string
  thumbnail: string
  unityPackage: string
}

/**
 * Skybox
 * @alpha
 */
export namespace Skybox {
  export const schema: JSONSchema<Skybox> = {
    type: 'object',
    required: ['id', 'name', 'unityPackage'],
    properties: {
      id: {
        type: 'string'
      },
      name: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      thumbnail: {
        type: 'string'
      },
      unityPackage: {
        type: 'string'
      }
    },
    additionalProperties: true
  }
  export const validate: ValidateFunction<Skybox> = generateLazyValidator(schema)
}
