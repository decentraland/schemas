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

export type AssetBundleConvertedEvent = BaseEvent & {
  type: Events.Type.ASSET_BUNDLE
  subType: Events.SubType.AssetBundle.CONVERTED
  metadata: {
    entityId: string
    platform: 'windows' | 'mac' | 'webglb'
  }
}

export namespace AssetBundleConvertedEvent {
  export const schema: JSONSchema<AssetBundleConvertedEvent> = {
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
          platform: { type: 'string', enum: ['windows', 'mac', 'webglb'] }
        },
        required: ['entityId', 'platform']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: true
  }

  export const validate: ValidateFunction<AssetBundleConvertedEvent> = generateLazyValidator(schema)
}
