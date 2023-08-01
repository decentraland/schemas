import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { DisplayableDeployment, displayableProperties } from '../shared/displayable'
import { FeatureToggles } from './feature-toggles'
import { SceneParcels } from './scene-parcels'
import { Source } from './source'
import { SpawnPoint } from './spawn-point'
import { WorldConfiguration } from './world-configuration'

/** @alpha */
export enum RequiredPermission {
  ALLOW_TO_MOVE_PLAYER_INSIDE_SCENE = 'ALLOW_TO_MOVE_PLAYER_INSIDE_SCENE',
  ALLOW_TO_TRIGGER_AVATAR_EMOTE = 'ALLOW_TO_TRIGGER_AVATAR_EMOTE',
  ALLOW_MEDIA_HOSTNAMES = 'ALLOW_MEDIA_HOSTNAMES',
  USE_WEB3_API = 'USE_WEB3_API',
  USE_FETCH = 'USE_FETCH',
  USE_WEBSOCKET = 'USE_WEBSOCKET',
  OPEN_EXTERNAL_LINK = 'OPEN_EXTERNAL_LINK'
}

/** @alpha */
export type Scene = DisplayableDeployment & {
  isPortableExperience?: boolean
  main: string
  scene: SceneParcels
  display?: {
    title?: string
    /** @deprecated use menuBarIcon instead */
    favicon?: string
    description?: string
    navmapThumbnail?: string
  }
  owner?: string
  contact?: {
    name?: string
    email?: string
    im?: string
    url?: string
  }
  tags?: string[]
  source?: Source
  spawnPoints?: SpawnPoint[]
  requiredPermissions?: RequiredPermission[]
  featureToggles?: FeatureToggles
  worldConfiguration?: WorldConfiguration
  allowedMediaHostnames?: string[]
}

/** @alpha */
export namespace Scene {
  export const schema: JSONSchema<Scene> = {
    type: 'object',
    properties: {
      isPortableExperience: {
        description: 'Define the current scene as a Portable Experience',
        type: 'boolean',
        nullable: true
      },
      main: {
        description: "File that contains the entry point of the scene's code",
        type: 'string',
        minLength: 1
      },
      scene: SceneParcels.schema,
      ...displayableProperties,
      display: {
        description:
          'Information related to how should this land be displayed apart from the normal rendering of the scene',
        type: 'object',
        properties: {
          title: {
            description: 'A name so other users can identify what the contents of this land should be',
            type: 'string',
            nullable: true
          },
          favicon: {
            description: 'DEPRECATED. Allow the land owner to set up a favicon to this land',
            type: 'string',
            nullable: true
          },
          description: {
            description: "A description that will be shown on client's nav map when the scene is selected",
            type: 'string',
            nullable: true
          },
          navmapThumbnail: {
            type: 'string',
            nullable: true
          }
        },
        nullable: true,
        required: []
      },
      owner: {
        type: 'string',
        nullable: true
      },
      contact: {
        description: 'Describe different ways of contacting the land owner',
        type: 'object',
        properties: {
          name: { type: 'string', nullable: true },
          email: { type: 'string', nullable: true },
          im: { type: 'string', nullable: true },
          url: { type: 'string', nullable: true }
        },
        nullable: true,
        required: []
      },
      tags: {
        type: 'array',
        items: {
          type: 'string',
          minLength: 1
        },
        nullable: true
      },
      source: {
        ...Source.schema,
        nullable: true
      },
      spawnPoints: {
        type: 'array',
        items: SpawnPoint.schema,
        nullable: true
      },
      requiredPermissions: {
        type: 'array',
        items: {
          type: 'string',
          enum: Object.values(RequiredPermission)
        },
        uniqueItems: true,
        nullable: true
      },
      featureToggles: {
        ...FeatureToggles.schema,
        nullable: true
      },
      worldConfiguration: {
        ...WorldConfiguration.schema,
        nullable: true
      },
      allowedMediaHostnames: {
        type: 'array',
        items: {
          type: 'string'
        },
        nullable: true
      }
    },
    additionalProperties: true,
    required: ['main', 'scene'],
    dependencies: {
      requiredPermissions: {
        if: {
          properties: {
            requiredPermissions: {
              type: 'array',
              contains: {
                const: RequiredPermission.ALLOW_MEDIA_HOSTNAMES
              }
            }
          }
        },
        then: {
          properties: {
            allowedMediaHostnames: {
              type: 'array',
              items: {
                type: 'string'
              },
              nullable: false,
              minItems: 1
            }
          },
          required: ['allowedMediaHostnames']
        },
        else: {
          properties: {
            allowedMediaHostnames: {
              type: ['null', 'array'],
              nullable: true,
              maxItems: 0
            }
          }
        }
      }
    }
  }

  export const validate: ValidateFunction<Scene> = generateLazyValidator(schema)
}
