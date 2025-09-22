import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'

export type UserJoinedRoomEvent = BaseEvent & {
  type: Events.Type.COMMS
  subType: Events.SubType.Comms.USER_JOINED_ROOM
  metadata: {
    parcel: string
    sceneId: string
    userAddress: string
    realmName: string
    isWorld: boolean
  }
}

export namespace UserJoinedRoomEvent {
  export const schema: JSONSchema<UserJoinedRoomEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.COMMS },
      subType: { type: 'string', const: Events.SubType.Comms.USER_JOINED_ROOM },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          parcel: { type: 'string' },
          sceneId: { type: 'string' },
          userAddress: { type: 'string' },
          realmName: { type: 'string' },
          isWorld: { type: 'boolean' }
        },
        required: ['parcel', 'sceneId', 'userAddress', 'realmName', 'isWorld']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata']
  }

  export const validate = generateLazyValidator(schema)
}

export type UserLeftRoomEvent = BaseEvent & {
  type: Events.Type.COMMS
  subType: Events.SubType.Comms.USER_LEFT_ROOM
  metadata: {
    sceneId?: string
    isWorld: boolean
    userAddress: string
    realmName: string
  }
}

export namespace UserLeftRoomEvent {
  export const schema: JSONSchema<UserLeftRoomEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.COMMS },
      subType: { type: 'string', const: Events.SubType.Comms.USER_LEFT_ROOM },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          isWorld: { type: 'boolean' },
          sceneId: { type: 'string', nullable: true },
          userAddress: { type: 'string' },
          realmName: { type: 'string' }
        },
        required: ['isWorld', 'userAddress', 'realmName']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<UserLeftRoomEvent> = generateLazyValidator(schema)
}

export type UserBannedFromSceneEvent = BaseEvent & {
  type: Events.Type.COMMS
  subType: Events.SubType.Comms.USER_BANNED_FROM_SCENE
  metadata: {
    placeTitle: string
    userAddress: string
  }
}

export namespace UserBannedFromSceneEvent {
  export const schema: JSONSchema<UserBannedFromSceneEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.COMMS },
      subType: { type: 'string', const: Events.SubType.Comms.USER_BANNED_FROM_SCENE },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          placeTitle: { type: 'string' },
          userAddress: { type: 'string' }
        },
        required: ['placeTitle', 'userAddress']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<UserBannedFromSceneEvent> = generateLazyValidator(schema)
}

export type UserUnbannedFromSceneEvent = BaseEvent & {
  type: Events.Type.COMMS
  subType: Events.SubType.Comms.USER_UNBANNED_FROM_SCENE
  metadata: {
    placeTitle: string
    userAddress: string
  }
}

export namespace UserUnbannedFromSceneEvent {
  export const schema: JSONSchema<UserUnbannedFromSceneEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.COMMS },
      subType: { type: 'string', const: Events.SubType.Comms.USER_UNBANNED_FROM_SCENE },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          placeTitle: { type: 'string' },
          userAddress: { type: 'string' }
        },
        required: ['placeTitle', 'userAddress']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<UserUnbannedFromSceneEvent> = generateLazyValidator(schema)
}
