import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/** @alpha */
export type WorldConfiguration = {
  name?: string
  skybox?: number
  minimapVisible?: boolean
  mapDataImage?: string
  estateImage?: string
  fixedAdapter?: string
  placesOptOut?: boolean
  customSkybox?: string[]
}

/** @alpha */
export namespace WorldConfiguration {
  export const schema: JSONSchema<WorldConfiguration> = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        nullable: true
      },
      skybox: {
        type: 'number',
        nullable: true
      },
      minimapVisible: {
        type: 'boolean',
        nullable: true
      },
      mapDataImage: {
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
      },
      customSkybox: {
        type: 'array',
        nullable: true,
        items: { type: 'string' },
        oneOf: [
          {
            minItems: 0,
            maxItems: 0
          },
          {
            minItems: 1,
            maxItems: 1
          },
          {
            minItems: 6,
            maxItems: 6
          }
        ],
        errorMessage: 'customSkybox must be an array of 0, 1 or 6 strings'
      }
    },
    required: []
  }

  export const validate: ValidateFunction<WorldConfiguration> = generateLazyValidator(schema)
}
