import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'

export type BadgeGrantedEvent = BaseEvent & {
  type: Events.Type.BADGE
  subType: Events.SubType.Badge.GRANTED
  metadata: {
    badgeId: string
    badgeName: string
    badgeTierName?: string
    badgeImageUrl: string
    address: string
  }
}

export namespace BadgeGrantedEvent {
  export const schema: JSONSchema<BadgeGrantedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.BADGE },
      subType: { type: 'string', const: Events.SubType.Badge.GRANTED },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          badgeId: { type: 'string' },
          badgeTierName: { type: 'string', nullable: true },
          badgeName: { type: 'string' },
          badgeImageUrl: { type: 'string' },
          address: { type: 'string' }
        },
        required: ['badgeId', 'badgeName', 'badgeImageUrl', 'address']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: true
  }

  export const validate: ValidateFunction<BadgeGrantedEvent> = generateLazyValidator(schema)
}

export type AssetBundleConversionFinishedEvent = BaseEvent & {
  type: Events.Type.ASSET_BUNDLE
  subType: Events.SubType.AssetBundle.CONVERTED
  metadata: {
    entityId: string
    platform: 'windows' | 'mac' | 'webglb'
    statusCode: number
    isLods: boolean
  }
}

export namespace AssetBundleConversionFinishedEvent {
  export const schema: JSONSchema<AssetBundleConversionFinishedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.ASSET_BUNDLE },
      subType: { type: 'string', const: Events.SubType.AssetBundle.CONVERTED },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          entityId: { type: 'string' },
          platform: { type: 'string', enum: ['windows', 'mac', 'webglb'] },
          statusCode: { type: 'number' },
          isLods: { type: 'boolean' }
        },
        required: ['entityId', 'platform', 'statusCode', 'isLods']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: true
  }

  export const validate: ValidateFunction<AssetBundleConversionFinishedEvent> = generateLazyValidator(schema)
}
