import {
  generateLazyValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'

/** @alpha */
export type WorldConfiguration = {
  name: string
  skybox?: number
  minimapVisible?: boolean
  fixedAdapter?: string
}

/** @alpha */
export namespace WorldConfiguration {
  export const schema: JSONSchema<WorldConfiguration> = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        nullable: false
      },
      skybox: {
        type: 'number',
        nullable: true
      },
      minimapVisible: {
        type: 'boolean',
        nullable: true
      },
      fixedAdapter: {
        type: 'string',
        nullable: true
      }
    },
    required: ['name']
  }

  export const validate: ValidateFunction<WorldConfiguration> =
    generateLazyValidator(schema)
}
