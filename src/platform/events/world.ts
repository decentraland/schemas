import { AuthChain } from '../../misc/auth-chain'
import { IPFSv1, IPFSv2 } from '../../misc'
import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'

const WORLD_NAME_SCHEMA = {
  type: 'string' as const,
  minLength: 5,
  maxLength: 255,
  pattern: '^[a-zA-Z0-9_-]+(?:\\.dcl)?\\.eth$'
}
const EVENT_KEY_SCHEMA = { type: 'string' as const, minLength: 1, maxLength: 2048 }
const ENTITY_ID_SCHEMA = { type: 'string' as const, oneOf: [IPFSv1.schema, IPFSv2.schema] }
const PARCEL_SCHEMA = { type: 'string' as const, pattern: '^(?:0|-?[1-9][0-9]*),(?:0|-?[1-9][0-9]*)$' }

export type WorldsPermissionGrantedEvent = BaseEvent & {
  type: Events.Type.WORLD
  subType: Events.SubType.Worlds.WORLDS_PERMISSION_GRANTED
  metadata: {
    title: string
    description: string
    world: string
    permissions: string[]
    url: string
    address: string
  }
}

export type WorldsPermissionRevokedEvent = BaseEvent & {
  type: Events.Type.WORLD
  subType: Events.SubType.Worlds.WORLDS_PERMISSION_REVOKED
  metadata: {
    title: string
    description: string
    world: string
    permissions: string[]
    url: string
    address: string
  }
}

export type WorldsAccessRestrictedEvent = BaseEvent & {
  type: Events.Type.WORLD
  subType: Events.SubType.Worlds.WORLDS_ACCESS_RESTRICTED
  metadata: {
    title: string
    description: string
    when: number
    address: string
  }
}

export type WorldsAccessRestoredEvent = BaseEvent & {
  type: Events.Type.WORLD
  subType: Events.SubType.Worlds.WORLDS_ACCESS_RESTORED
  metadata: {
    title: string
    description: string
    url: string
    attendee: string
  }
}

export type WorldsMissingResourcesEvent = BaseEvent & {
  type: Events.Type.WORLD
  subType: Events.SubType.Worlds.WORLDS_MISSING_RESOURCES
  metadata: {
    title: string
    description: string
    url: string
    when: number
    address: string
  }
}

export type WorldDeploymentEvent = BaseEvent & {
  type: Events.Type.WORLD
  subType: Events.SubType.Worlds.DEPLOYMENT
  entity: {
    entityId: string
    authChain: AuthChain
  }
  contentServerUrls?: string[]
  force?: boolean
  animation?: string
  lods?: string[]
}

export type WorldScenesUndeploymentEvent = BaseEvent & {
  type: Events.Type.WORLD
  subType: Events.SubType.Worlds.WORLD_SCENES_UNDEPLOYMENT
  metadata: {
    worldName: string
    scenes: Array<{
      entityId: string
      baseParcel: string
    }>
  }
}

export type WorldUndeploymentEvent = BaseEvent & {
  type: Events.Type.WORLD
  subType: Events.SubType.Worlds.WORLD_UNDEPLOYMENT
  metadata: {
    worldName: string
  }
}

export type WorldSpawnCoordinateSetEvent = BaseEvent & {
  type: Events.Type.WORLD
  subType: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET
  metadata: {
    name: string
    oldCoordinate: {
      x: number
      y: number
    } | null
    newCoordinate: {
      x: number
      y: number
    }
  }
}

export type WorldSettingsChangedEvent = BaseEvent & {
  type: Events.Type.WORLD
  subType: Events.SubType.Worlds.WORLD_SETTINGS_CHANGED
  metadata: {
    worldName: string
    title?: string
    description?: string
    contentRating?: string
    skyboxTime?: number | null
    categories?: string[]
    singlePlayer?: boolean
    showInPlaces?: boolean
    thumbnailUrl?: string
    accessType?: string
  }
}

export namespace WorldSettingsChangedEvent {
  export const schema: JSONSchema<WorldSettingsChangedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.WORLD },
      subType: { type: 'string', const: Events.SubType.Worlds.WORLD_SETTINGS_CHANGED },
      key: EVENT_KEY_SCHEMA,
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          worldName: WORLD_NAME_SCHEMA,
          title: { type: 'string', nullable: true },
          description: { type: 'string', nullable: true },
          contentRating: { type: 'string', maxLength: 64, nullable: true },
          skyboxTime: { type: 'number', nullable: true },
          categories: {
            type: 'array',
            items: { type: 'string', minLength: 1, maxLength: 64 },
            maxItems: 50,
            uniqueItems: true,
            nullable: true
          },
          singlePlayer: { type: 'boolean', nullable: true },
          showInPlaces: { type: 'boolean', nullable: true },
          thumbnailUrl: { type: 'string', maxLength: 2048, pattern: '^https?://', nullable: true },
          accessType: { type: 'string', maxLength: 64, nullable: true }
        },
        required: ['worldName'],
        additionalProperties: false
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  export const validate = generateLazyValidator(schema)
}

export namespace WorldSpawnCoordinateSetEvent {
  export const schema: JSONSchema<WorldSpawnCoordinateSetEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.WORLD },
      subType: { type: 'string', const: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET },
      key: EVENT_KEY_SCHEMA,
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          name: WORLD_NAME_SCHEMA,
          oldCoordinate: {
            type: 'object',
            properties: { x: { type: 'number' }, y: { type: 'number' } },
            required: ['x', 'y'],
            additionalProperties: false,
            nullable: true
          },
          newCoordinate: {
            type: 'object',
            properties: { x: { type: 'number' }, y: { type: 'number' } },
            required: ['x', 'y'],
            additionalProperties: false
          }
        },
        required: ['name', 'oldCoordinate', 'newCoordinate'],
        additionalProperties: false
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<WorldSpawnCoordinateSetEvent> = generateLazyValidator(schema)
}

export namespace WorldScenesUndeploymentEvent {
  export const schema: JSONSchema<WorldScenesUndeploymentEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.WORLD },
      subType: { type: 'string', const: Events.SubType.Worlds.WORLD_SCENES_UNDEPLOYMENT },
      key: EVENT_KEY_SCHEMA,
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          worldName: WORLD_NAME_SCHEMA,
          scenes: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                entityId: ENTITY_ID_SCHEMA,
                baseParcel: PARCEL_SCHEMA
              },
              required: ['entityId', 'baseParcel'],
              additionalProperties: false
            },
            minItems: 1,
            uniqueItems: true
          }
        },
        required: ['worldName', 'scenes'],
        additionalProperties: false
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  const schemaValidator: ValidateFunction<WorldScenesUndeploymentEvent> = generateLazyValidator(schema)
  export const validate: ValidateFunction<WorldScenesUndeploymentEvent> = (
    event: unknown
  ): event is WorldScenesUndeploymentEvent => {
    if (!schemaValidator(event)) {
      return false
    }

    const entityIds = event.metadata.scenes.map((scene) => scene.entityId)
    const baseParcels = event.metadata.scenes.map((scene) => scene.baseParcel)
    return new Set(entityIds).size === entityIds.length && new Set(baseParcels).size === baseParcels.length
  }

  Object.defineProperty(validate, 'errors', {
    get() {
      return schemaValidator.errors
    }
  })
}

export namespace WorldUndeploymentEvent {
  export const schema: JSONSchema<WorldUndeploymentEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.WORLD },
      subType: { type: 'string', const: Events.SubType.Worlds.WORLD_UNDEPLOYMENT },
      key: EVENT_KEY_SCHEMA,
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          worldName: WORLD_NAME_SCHEMA
        },
        required: ['worldName'],
        additionalProperties: false
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<WorldUndeploymentEvent> = generateLazyValidator(schema)
}

export namespace WorldDeploymentEvent {
  export const schema: JSONSchema<WorldDeploymentEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.WORLD },
      subType: { type: 'string', const: Events.SubType.Worlds.DEPLOYMENT },
      key: EVENT_KEY_SCHEMA,
      timestamp: { type: 'number', minimum: 0 },
      entity: {
        type: 'object',
        properties: { entityId: ENTITY_ID_SCHEMA, authChain: AuthChain.schema },
        additionalProperties: false,
        required: ['entityId', 'authChain']
      },
      contentServerUrls: {
        type: 'array',
        items: { type: 'string', minLength: 1, maxLength: 2048, pattern: '^https?://' },
        minItems: 1,
        maxItems: 10,
        uniqueItems: true,
        nullable: true
      },
      force: { type: 'boolean', nullable: true },
      animation: { type: 'string', nullable: true },
      lods: {
        type: 'array',
        items: { type: 'string' },
        nullable: true
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'entity'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<WorldDeploymentEvent> = generateLazyValidator(schema)
}

export namespace WorldsAccessRestoredEvent {
  export const schema: JSONSchema<WorldsAccessRestoredEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.WORLD },
      subType: { type: 'string', const: Events.SubType.Worlds.WORLDS_ACCESS_RESTORED },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          url: { type: 'string' },
          attendee: { type: 'string' }
        },
        required: ['title', 'description', 'url', 'attendee'],
        additionalProperties: false
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<WorldsAccessRestoredEvent> = generateLazyValidator(schema)
}

export namespace WorldsPermissionRevokedEvent {
  export const schema: JSONSchema<WorldsPermissionRevokedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.WORLD },
      subType: { type: 'string', const: Events.SubType.Worlds.WORLDS_PERMISSION_REVOKED },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          world: { type: 'string' },
          permissions: { type: 'array', items: { type: 'string' } },
          url: { type: 'string' },
          address: { type: 'string' }
        },
        required: ['title', 'description', 'world', 'permissions', 'url', 'address'],
        additionalProperties: false
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<WorldsPermissionRevokedEvent> = generateLazyValidator(schema)
}

export namespace WorldsPermissionGrantedEvent {
  export const schema: JSONSchema<WorldsPermissionGrantedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.WORLD },
      subType: { type: 'string', const: Events.SubType.Worlds.WORLDS_PERMISSION_GRANTED },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          world: { type: 'string' },
          permissions: { type: 'array', items: { type: 'string' } },
          url: { type: 'string' },
          address: { type: 'string' }
        },
        required: ['title', 'description', 'world', 'permissions', 'url', 'address'],
        additionalProperties: false
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<WorldsPermissionGrantedEvent> = generateLazyValidator(schema)
}

export namespace WorldsAccessRestrictedEvent {
  export const schema: JSONSchema<WorldsAccessRestrictedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.WORLD },
      subType: { type: 'string', const: Events.SubType.Worlds.WORLDS_ACCESS_RESTRICTED },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          when: { type: 'number' },
          address: { type: 'string' }
        },
        required: ['title', 'description', 'when', 'address'],
        additionalProperties: false
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<WorldsAccessRestrictedEvent> = generateLazyValidator(schema)
}

export namespace WorldsMissingResourcesEvent {
  export const schema: JSONSchema<WorldsMissingResourcesEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.WORLD },
      subType: { type: 'string', const: Events.SubType.Worlds.WORLDS_MISSING_RESOURCES },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          url: { type: 'string' },
          when: { type: 'number' },
          address: { type: 'string' }
        },
        required: ['title', 'description', 'url', 'when', 'address'],
        additionalProperties: false
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<WorldsMissingResourcesEvent> = generateLazyValidator(schema)
}
