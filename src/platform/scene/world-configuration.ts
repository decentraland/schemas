import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/** @alpha */
export type WorldConfiguration = {
  name: string
  skybox?: number
  minimapVisible?: boolean
  dataImage?: string
  estateImage?: string
  fixedAdapter?: string
  placesOptOut?: boolean
}

/** @alpha */
export namespace WorldConfiguration {
  export const schema: JSONSchema<WorldConfiguration> = {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      skybox: {
        type: 'number',
        nullable: true
      },
      minimapVisible: {
        type: 'boolean',
        nullable: true
      },
      dataImage: {
        type: 'string',
        nullable: true
      },
      estateImage: {
        type: 'string',
        nullable: true
      },
      fixedAdapter: {
        type: 'string',
        nullable: true
      },
      placesOptOut: {
        type: 'boolean',
        nullable: true
      }
    },
    required: ['name']
  }

  export const validate: ValidateFunction<WorldConfiguration> = generateLazyValidator(schema)
}
