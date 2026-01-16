import { AuthChain } from '../../misc/auth-chain'
import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'

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
    entityIds: string[]
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

export namespace WorldSpawnCoordinateSetEvent {
  export const schema: JSONSchema<WorldSpawnCoordinateSetEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.WORLD },
      subType: { type: 'string', const: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          name: { type: 'string', pattern: '^[a-zA-Z0-9_-]+\\.dcl\\.eth|[a-zA-Z0-9_-]+\\.eth$' },
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
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: { entityIds: { type: 'array', items: { type: 'string' }, minItems: 1 } },
        required: ['entityIds'],
        additionalProperties: false
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }
}

export namespace WorldDeploymentEvent {
  export const schema: JSONSchema<WorldDeploymentEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.WORLD },
      subType: { type: 'string', const: Events.SubType.Worlds.DEPLOYMENT },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      entity: {
        type: 'object',
        properties: { entityId: { type: 'string' }, authChain: AuthChain.schema },
        additionalProperties: true,
        required: ['entityId', 'authChain']
      },
      contentServerUrls: { type: 'array', items: { type: 'string' }, nullable: true },
      force: { type: 'boolean', nullable: true },
      animation: { type: 'string', nullable: true },
      lods: { type: 'array', items: { type: 'string' }, nullable: true }
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
