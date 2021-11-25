import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'
import { FeatureToggles } from './feature-toggles'
import { SceneParcels } from './scene-parcels'
import { Source } from './source'
import { SpawnPoint } from './spawn-point'

/** @alpha */
export type Scene = {
  main: string
  scene: SceneParcels
  display?: {
    title?: string
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
  requiredPermissions?: string[]
  featureToggles?: FeatureToggles
}

/** @alpha */
export namespace Scene {
  export const schema: JSONSchema<Scene> = {
    type: 'object',
    properties: {
      main: {
        description: "File that contains the entry point of the scene's code",
        type: 'string',
        minLength: 1
      },
      scene: SceneParcels.schema,
      display: {
        description:
          'Information related to how should this land be displayed apart from the normal rendering of the scene',
        type: 'object',
        properties: {
          title: {
            description:
              'A name so other users can identify what the contents of this land should be',
            type: 'string',
            nullable: true
          },
          favicon: {
            description:
              'Allow the land owner to set up a favicon to this land',
            type: 'string',
            nullable: true
          },
          description: {
            description:
              "A description that will be shown on client's nav map when the scene is selected",
            type: 'string',
            nullable: true
          },
          navmapThumbnail: {
            type: 'string',
            nullable: true
          }
        },
        nullable: true,
        additionalProperties: false,
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
        additionalProperties: false,
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
          type: 'string'
        },
        nullable: true
      },
      featureToggles: {
        ...FeatureToggles.schema,
        nullable: true
      }
    },
    additionalProperties: false,
    required: ['main', 'scene']
  }

  export const validate: ValidateFunction<Scene> = generateValidator(schema)
}
