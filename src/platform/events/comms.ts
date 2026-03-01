import type { JSONSchema } from '../../validation/types.js'
import { BaseEvent, EventType, EventSubTypeComms } from './base.js'

export type UserJoinedRoomEvent = BaseEvent & {
  type: EventType.COMMS
  subType: EventSubTypeComms.USER_JOINED_ROOM
  metadata: {
    parcel: string
    sceneId: string
    userAddress: string
    realmName: string
    islandName?: string
    communityId?: string
    voiceChatId?: string
    isWorld: boolean
    roomType: RoomType
  }
}

export enum RoomType {
  PRIVATE_MESSAGE = 'private-message',
  VOICE_CHAT = 'voice-chat',
  COMMUNITY_VOICE_CHAT = 'community-voice-chat',
  ISLAND = 'island',
  SCENE = 'scene',
  WORLD = 'world',
  UNKNOWN = 'unknown'
}

export const userJoinedRoomEventSchema: JSONSchema<UserJoinedRoomEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.COMMS },
    subType: { type: 'string', const: EventSubTypeComms.USER_JOINED_ROOM },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        parcel: { type: 'string' },
        sceneId: { type: 'string' },
        userAddress: { type: 'string' },
        realmName: { type: 'string' },
        islandName: { type: 'string', nullable: true },
        communityId: { type: 'string', nullable: true },
        voiceChatId: { type: 'string', nullable: true },
        isWorld: { type: 'boolean' },
        roomType: { type: 'string', enum: Object.values(RoomType) }
      },
      required: ['parcel', 'sceneId', 'userAddress', 'realmName', 'isWorld', 'roomType']
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata']
}

export type UserLeftRoomEvent = BaseEvent & {
  type: EventType.COMMS
  subType: EventSubTypeComms.USER_LEFT_ROOM
  metadata: {
    sceneId?: string
    isWorld: boolean
    userAddress: string
    realmName: string
    roomType: RoomType
    islandName?: string
    communityId?: string
    voiceChatId?: string
  }
}

export const userLeftRoomEventSchema: JSONSchema<UserLeftRoomEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.COMMS },
    subType: { type: 'string', const: EventSubTypeComms.USER_LEFT_ROOM },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        userAddress: { type: 'string' },
        realmName: { type: 'string' },
        isWorld: { type: 'boolean' },
        roomType: { type: 'string', enum: Object.values(RoomType) },
        sceneId: { type: 'string', nullable: true },
        islandName: { type: 'string', nullable: true },
        communityId: { type: 'string', nullable: true },
        voiceChatId: { type: 'string', nullable: true }
      },
      required: ['isWorld', 'userAddress', 'realmName', 'roomType']
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export type UserBannedFromSceneEvent = BaseEvent & {
  type: EventType.COMMS
  subType: EventSubTypeComms.USER_BANNED_FROM_SCENE
  metadata: {
    placeTitle: string
    userAddress: string
  }
}

export const userBannedFromSceneEventSchema: JSONSchema<UserBannedFromSceneEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.COMMS },
    subType: { type: 'string', const: EventSubTypeComms.USER_BANNED_FROM_SCENE },
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

export type UserUnbannedFromSceneEvent = BaseEvent & {
  type: EventType.COMMS
  subType: EventSubTypeComms.USER_UNBANNED_FROM_SCENE
  metadata: {
    placeTitle: string
    userAddress: string
  }
}

export const userUnbannedFromSceneEventSchema: JSONSchema<UserUnbannedFromSceneEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.COMMS },
    subType: { type: 'string', const: EventSubTypeComms.USER_UNBANNED_FROM_SCENE },
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
