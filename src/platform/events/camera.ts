import type { JSONSchema } from '../../validation/types.js'
import { BaseEvent, EventType, EventSubTypeCamera } from './base.js'

export type PhotoTakenEvent = BaseEvent & {
  type: EventType.CAMERA
  subType: EventSubTypeCamera.PHOTO_TAKEN
  metadata: {
    sceneId: string
    realm: string
    userAddress: string
    isPublic: boolean
    photoId: string
    users: Array<{ address: string; isEmoting: boolean }>
    placeId?: string
  }
}

export type PhotoPrivacyChangedEvent = BaseEvent & {
  type: EventType.CAMERA
  subType: EventSubTypeCamera.PHOTO_PRIVACY_CHANGED
  metadata: {
    userAddress: string
    photoId: string
    isPublic: boolean
  }
}

export const photoPrivacyChangedEventSchema: JSONSchema<PhotoPrivacyChangedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.CAMERA },
    subType: { type: 'string', const: EventSubTypeCamera.PHOTO_PRIVACY_CHANGED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        userAddress: { type: 'string' },
        photoId: { type: 'string' },
        isPublic: { type: 'boolean' }
      },
      required: ['userAddress', 'photoId', 'isPublic']
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export const photoTakenEventSchema: JSONSchema<PhotoTakenEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.CAMERA },
    subType: { type: 'string', const: EventSubTypeCamera.PHOTO_TAKEN },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        sceneId: { type: 'string' },
        userAddress: { type: 'string' },
        realm: { type: 'string' },
        photoId: { type: 'string' },
        isPublic: { type: 'boolean' },
        users: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              address: {
                type: 'string'
              },
              isEmoting: {
                type: 'boolean'
              }
            },
            required: ['address', 'isEmoting'],
            additionalProperties: false
          }
        },
        placeId: { type: 'string', nullable: true }
      },
      required: ['userAddress', 'realm', 'photoId', 'isPublic', 'users'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}
