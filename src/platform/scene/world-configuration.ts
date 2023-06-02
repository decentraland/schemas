import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { MiniMapConfiguration, SkyboxConfiguration } from './dream-space-configuration'

/**
 * @deprecated Use `DreamSpaceConfiguration` instead.
 * @alpha
 */
export type WorldConfiguration = {
  name?: string
  /** @alpha @deprecated Use `skyboxConfig.fixedTime` instead */
  skybox?: number
  /** @alpha @deprecated Use `miniMapConfig.visible` instead */
  minimapVisible?: boolean
  miniMapConfig?: MiniMapConfiguration
  skyboxConfig?: SkyboxConfiguration
  fixedAdapter?: string
  placesConfig?: {
    optOut?: boolean
  }
}

/**
 * @deprecated Use `DreamSpaceConfiguration` instead.
 * @alpha
 */
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
      miniMapConfig: {
        type: 'object',
        nullable: true,
        properties: {
          visible: {
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
          }
        }
      },
      skyboxConfig: {
        type: 'object',
        nullable: true,
        properties: {
          fixedTime: {
            type: 'number',
            nullable: true
          },
          textures: {
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
        }
      },
      fixedAdapter: {
        type: 'string',
        nullable: true
      },
      placesConfig: {
        type: 'object',
        nullable: true,
        properties: {
          optOut: {
            type: 'boolean',
            nullable: true
          }
        }
      }
    },
    required: []
  }

  export const validate: ValidateFunction<WorldConfiguration> = generateLazyValidator(schema)
}
