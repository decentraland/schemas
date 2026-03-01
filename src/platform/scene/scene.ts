import type { JSONSchema } from '../../validation/types.js'
import { DisplayableDeployment, displayableProperties } from '../shared/displayable.js'
import { FeatureToggles, featureTogglesSchema } from './feature-toggles.js'
import { SceneParcels, sceneParcelsSchema } from './scene-parcels.js'
import { Source, sourceSchema } from './source.js'
import { SpawnPoint, spawnPointSchema } from './spawn-point.js'
import { WorldConfiguration, worldConfigurationSchema } from './world-configuration.js'

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
  creator?: string
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
export const sceneSchema: JSONSchema<Scene> = {
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
    scene: sceneParcelsSchema,
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
    creator: {
      type: 'string',
      nullable: true,
      description: 'Wallet address of the creator of the scene',
      pattern: '^(0x[a-fA-F0-9]{40})?$',
      errorMessage: 'Creator must be a valid wallet address'
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
      ...sourceSchema,
      nullable: true
    },
    spawnPoints: {
      type: 'array',
      items: spawnPointSchema,
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
      ...featureTogglesSchema,
      nullable: true
    },
    worldConfiguration: {
      ...worldConfigurationSchema,
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
