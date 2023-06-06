import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/** @alpha */
export type MiniMapConfiguration = {
  visible?: boolean
  dataImage?: string
  estateImage?: string
}

/** @alpha */
export type SkyboxConfiguration = {
  fixedTime?: number
  textures?: string[]
}

/**
 * Configuration for deploying a DreamSpace
 *
 * @alpha
 */
export type DreamSpaceConfiguration = {
  name: string
  miniMapConfig?: MiniMapConfiguration
  skyboxConfig?: SkyboxConfiguration
  fixedAdapter?: string
  placesConfig?: {
    optOut?: boolean
  }
}

const miniMapConfigurationSchema: JSONSchema<MiniMapConfiguration> = {
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
}

const skyboxConfigurationSchema: JSONSchema<SkyboxConfiguration> = {
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
}

/** @alpha */
export namespace DreamSpaceConfiguration {
  export const schema: JSONSchema<DreamSpaceConfiguration> = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        nullable: false
      },
      miniMapConfig: {
        ...miniMapConfigurationSchema,
        nullable: true
      },
      skyboxConfig: {
        ...skyboxConfigurationSchema,
        nullable: true
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
    required: ['name']
  }

  export const validate: ValidateFunction<DreamSpaceConfiguration> = generateLazyValidator(schema)
}
