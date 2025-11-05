import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'

export type PhotoTakenEvent = BaseEvent & {
  type: Events.Type.CAMERA
  subType: Events.SubType.Camera.PHOTO_TAKEN
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
  type: Events.Type.CAMERA
  subType: Events.SubType.Camera.PHOTO_PRIVACY_CHANGED
  metadata: {
    userAddress: string
    photoId: string
    isPublic: boolean
  }
}

export namespace PhotoPrivacyChangedEvent {
  export const schema: JSONSchema<PhotoPrivacyChangedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.CAMERA },
      subType: { type: 'string', const: Events.SubType.Camera.PHOTO_PRIVACY_CHANGED },
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

  export const validate: ValidateFunction<PhotoPrivacyChangedEvent> = generateLazyValidator(schema)
}

export namespace PhotoTakenEvent {
  export const schema: JSONSchema<PhotoTakenEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.CAMERA },
      subType: { type: 'string', const: Events.SubType.Camera.PHOTO_TAKEN },
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

  export const validate: ValidateFunction<PhotoTakenEvent> = generateLazyValidator(schema)
}
