import { AuthChain, authChainSchema } from '../../misc/auth-chain.js'
import type { JSONSchema } from '../../validation/types.js'
import { BaseEvent, EventType, EventSubTypeWorlds } from './base.js'

export type WorldsPermissionGrantedEvent = BaseEvent & {
  type: EventType.WORLD
  subType: EventSubTypeWorlds.WORLDS_PERMISSION_GRANTED
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
  type: EventType.WORLD
  subType: EventSubTypeWorlds.WORLDS_PERMISSION_REVOKED
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
  type: EventType.WORLD
  subType: EventSubTypeWorlds.WORLDS_ACCESS_RESTRICTED
  metadata: {
    title: string
    description: string
    when: number
    address: string
  }
}

export type WorldsAccessRestoredEvent = BaseEvent & {
  type: EventType.WORLD
  subType: EventSubTypeWorlds.WORLDS_ACCESS_RESTORED
  metadata: {
    title: string
    description: string
    url: string
    attendee: string
  }
}

export type WorldsMissingResourcesEvent = BaseEvent & {
  type: EventType.WORLD
  subType: EventSubTypeWorlds.WORLDS_MISSING_RESOURCES
  metadata: {
    title: string
    description: string
    url: string
    when: number
    address: string
  }
}

export type WorldDeploymentEvent = BaseEvent & {
  type: EventType.WORLD
  subType: EventSubTypeWorlds.DEPLOYMENT
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
  type: EventType.WORLD
  subType: EventSubTypeWorlds.WORLD_SCENES_UNDEPLOYMENT
  metadata: {
    worldName: string
    scenes: Array<{
      entityId: string
      baseParcel: string
    }>
  }
}

export type WorldUndeploymentEvent = BaseEvent & {
  type: EventType.WORLD
  subType: EventSubTypeWorlds.WORLD_UNDEPLOYMENT
  metadata: {
    worldName: string
  }
}

export type WorldSpawnCoordinateSetEvent = BaseEvent & {
  type: EventType.WORLD
  subType: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET
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
  type: EventType.WORLD
  subType: EventSubTypeWorlds.WORLD_SETTINGS_CHANGED
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

export const worldSettingsChangedEventSchema: JSONSchema<WorldSettingsChangedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.WORLD },
    subType: { type: 'string', const: EventSubTypeWorlds.WORLD_SETTINGS_CHANGED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        worldName: { type: 'string' },
        title: { type: 'string', nullable: true },
        description: { type: 'string', nullable: true },
        contentRating: { type: 'string', nullable: true },
        skyboxTime: { type: 'number', nullable: true },
        categories: { type: 'array', items: { type: 'string' }, nullable: true },
        singlePlayer: { type: 'boolean', nullable: true },
        showInPlaces: { type: 'boolean', nullable: true },
        thumbnailUrl: { type: 'string', nullable: true },
        accessType: { type: 'string', nullable: true }
      },
      required: ['worldName'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export const worldSpawnCoordinateSetEventSchema: JSONSchema<WorldSpawnCoordinateSetEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.WORLD },
    subType: { type: 'string', const: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET },
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

export const worldScenesUndeploymentEventSchema: JSONSchema<WorldScenesUndeploymentEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.WORLD },
    subType: { type: 'string', const: EventSubTypeWorlds.WORLD_SCENES_UNDEPLOYMENT },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        worldName: { type: 'string' },
        scenes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              entityId: { type: 'string' },
              baseParcel: { type: 'string' }
            },
            required: ['entityId', 'baseParcel'],
            additionalProperties: false
          },
          minItems: 1
        }
      },
      required: ['worldName', 'scenes'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export const worldUndeploymentEventSchema: JSONSchema<WorldUndeploymentEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.WORLD },
    subType: { type: 'string', const: EventSubTypeWorlds.WORLD_UNDEPLOYMENT },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        worldName: { type: 'string' }
      },
      required: ['worldName'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export const worldDeploymentEventSchema: JSONSchema<WorldDeploymentEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.WORLD },
    subType: { type: 'string', const: EventSubTypeWorlds.DEPLOYMENT },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    entity: {
      type: 'object',
      properties: { entityId: { type: 'string' }, authChain: authChainSchema },
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

export const worldsAccessRestoredEventSchema: JSONSchema<WorldsAccessRestoredEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.WORLD },
    subType: { type: 'string', const: EventSubTypeWorlds.WORLDS_ACCESS_RESTORED },
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

export const worldsPermissionRevokedEventSchema: JSONSchema<WorldsPermissionRevokedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.WORLD },
    subType: { type: 'string', const: EventSubTypeWorlds.WORLDS_PERMISSION_REVOKED },
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

export const worldsPermissionGrantedEventSchema: JSONSchema<WorldsPermissionGrantedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.WORLD },
    subType: { type: 'string', const: EventSubTypeWorlds.WORLDS_PERMISSION_GRANTED },
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

export const worldsAccessRestrictedEventSchema: JSONSchema<WorldsAccessRestrictedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.WORLD },
    subType: { type: 'string', const: EventSubTypeWorlds.WORLDS_ACCESS_RESTRICTED },
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

export const worldsMissingResourcesEventSchema: JSONSchema<WorldsMissingResourcesEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.WORLD },
    subType: { type: 'string', const: EventSubTypeWorlds.WORLDS_MISSING_RESOURCES },
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
